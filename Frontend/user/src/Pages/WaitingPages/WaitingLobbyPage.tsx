import React, { useState, useEffect } from "react";
import { UserService } from "../../Services/GetService";
import { IUser } from "../../Interfaces/IUser";
import { NextBtn } from "../../Components/Button/NextBtn";

const WaitingLobbyPage: React.FC = () => {
    const [avatars, setAvatars] = useState<{ avatarNumber: number, x: number, y: number }[]>([]);
    const [dots, setDots] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await UserService.getAll();
                const avatarNumbers = result.items
                    .filter((user: IUser) => user.avatarNumber > 0) // Filter out avatarNumber 0
                    .map((user: IUser) => ({
                        avatarNumber: user.avatarNumber,
                        x: Math.floor(Math.random() * 80) + 10, // Random x position from 10% to 90%
                        y: Math.floor(Math.random() * 80) + 10 // Random y position from 10% to 90%
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
        <main className="bgColor vh-100">
            <div>
                <div className="Cloud1"></div>
                <h1 className="text-center">
                    <div>Waiting for</div>
                    <div>players{dots}</div>
                </h1>
                <div className="avatar-container">
                    {avatars.map((avatar, index) => (
                        <div
                            key={index}
                            className="avatar-item"
                            style={{ top: `${avatar.y}%`, left: `${avatar.x}%` }}
                        >
                            <img src={`/images/Avatar-${avatar.avatarNumber}.png`} alt="Avatar" />
                        </div>
                    ))}
                </div>
                <NextBtn path="gameLobby" />
            </div>
        </main>
    );
};

export default WaitingLobbyPage;
