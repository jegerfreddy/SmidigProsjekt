import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../Services/GetService";
import { IUser } from "../../Interfaces/IUser";
import { NextBtn } from "../../Components/Button/NextBtn";
import PhoneInfo from "../../Components/Phone/PhoneInfo";
import "../../App.css";

const WaitingLobbyPage: React.FC = () => {
    const [avatars, setAvatars] = useState<{ avatarNumber: number, x: number, y: number }[]>([]);
    const [dots, setDots] = useState('');
    const { orientation } = PhoneInfo();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await UserService.getAll();
                const avatarNumbers = result.items
                    .filter((user: IUser) => user.avatarNumber > 0) // Ingen avatar med avatarNumber 0, så den hopper vi over
                    .map((user: IUser) => ({
                        avatarNumber: user.avatarNumber,
                        x: Math.floor(Math.random() * 80) + 10, // Random x pos. fra 10% til 90%
                        y: Math.floor(Math.random() * 60) + 20 // random y pos. fra 20% til 80%
                    }))
                    .slice(0, 10); // Begrenser antall avatarer som vises
                setAvatars(avatarNumbers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();

        const movingDots = ['', '.', '..', '...', '....']; // Liten array til prikker som det skal "spille" igjennom
        let index = 0;
        const interval = setInterval(() => {
            setDots(movingDots[index]);
            index = (index + 1) % movingDots.length;
        }, 500); // Oppdateres hver 500ms

        return () => clearInterval(interval);
    }, []);

    const handleNextClick = () => {
        navigate("/gamelobby");
    };

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
                <button onClick={handleNextClick} className="pinButton">Next</button>
            </section>
        </div>
    );
};

export default WaitingLobbyPage;
