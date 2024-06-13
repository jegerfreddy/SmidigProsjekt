import React, { useState, useEffect } from "react";
import { IUser } from "../../Interfaces/IUser";
import PhoneInfo from "../../Components/Phone/PhoneInfo";
import "../../App.css";
import { UserService } from "../../Services/GetService";

const WaitingLobbyPage: React.FC = () => {
    const [avatars, setAvatars] = useState<{ avatarNumber: number, x: number, y: number }[]>([]);
    const [dots, setDots] = useState('');
    const { orientation } = PhoneInfo();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await UserService.getAll();
                console.log('Fetched users result:', result);
                const users = result.items; 
                const avatarNumbers = users
                    .filter((user: IUser) => user.avatarNumber > 0) 
                    .map((user: IUser) => ({
                        avatarNumber: user.avatarNumber,
                        x: Math.floor(Math.random() * 60) + 10, 
                        y: Math.floor(Math.random() * 20) + 20 
                    }))
                    .slice(0, 20); 
                setAvatars(avatarNumbers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();

        const movingDots = ['', '.', '..', '...', '....']; 
        let index = 0;
        const interval = setInterval(() => {
            setDots(movingDots[index]);
            index = (index + 1) % movingDots.length;
        }, 500); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`position-relative userPage bgColor ${orientation}`}>
            <section className="text-center my-1 position-absolute top-0 start-50 translate-middle-x">
                <h2>Waiting for players{dots}</h2>
            </section>

            <section className={`position-absolute ${orientation === 'vertical' ? 'avatar-grid-container-vertical' : 'avatar-grid-container-horizontal'}`}>
                <div className="avatar-grid">
                    {avatars.map((avatar, index) => (
                        <div key={index} className="avatar-item" style={{ top: `${avatar.y}%`, left: `${avatar.x}%` }}>
                            <img src={`/images/Avatar-${avatar.avatarNumber}.png`} alt="Avatar" className="avatar-img" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default WaitingLobbyPage;
