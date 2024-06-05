import React, { useState, useEffect } from "react";
import { UserService } from "../../Services/GetService";
import { IUser } from "../../Interfaces/IUser";
import { NextBtn } from "../../Components/Button/NextBtn";
import PhoneInfo from "../../Components/Phone/PhoneInfo";
import "../../App.css";

const WaitingLobbyPage: React.FC = () => {
    const [avatars, setAvatars] = useState<{ avatarNumber: number, x: number, y: number }[]>([]);
    const [dots, setDots] = useState('');
    const { orientation } = PhoneInfo();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await UserService.getAll();
                const avatarNumbers = result.items
                    .filter((user: IUser) => user.avatarNumber > 0)
                    .map((user: IUser) => ({
                        avatarNumber: user.avatarNumber,
                        x: Math.floor(Math.random() * 80) + 10, // Random x position from 10% to 90%
                        y: Math.floor(Math.random() * 60) + 20 // Random y position from 20% to 80%
                    }))
                    .slice(0, 10); // Limit to 10 avatars
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
        }, 500); // Update every 500ms

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <div className={`position-relative vh-100 bgColor ${orientation}`}>
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

            <section className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
                <NextBtn path="gameLobby" />
            </section>
        </div>
    );
};

export default WaitingLobbyPage;
