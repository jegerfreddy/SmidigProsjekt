import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AvatarList from "../../Components/Avatar/AvatarList";
import SelectedAvatar from "../../Components/Avatar/SelectedAvatar";
import PhoneInfo from "../../Components/Phone/PhoneInfo";
import { GeneralContext } from "../../Contexts/UserContext";
import { IGeneralContext } from "../../Interfaces/IContext";
import { IUser } from "../../Interfaces/IUser";
import { UserService } from "../../Services/GetService";


const ChooseAvatarPage: React.FC = () => {
    const userContext = useContext(GeneralContext) as IGeneralContext<IUser>;
    const [selectedAvatar, setSelectedAvatar] = useState<string>('/images/Avatar-4.png');
    const [avatarNumber, setAvatarNumber] = useState<number>(0);
    const { username, code } = useParams<{ code: string, username: string }>();
    const navigate = useNavigate();



    const handleClick = (avatarId: number) => {
        const pickedAvatarUrl = `/images/Avatar-${avatarId}.png`;
        setSelectedAvatar(pickedAvatarUrl);
        setAvatarNumber(avatarId);
    };

    const { orientation } = PhoneInfo();
    const { postItem } = userContext;

    const handleSubmit = async (newUser: IUser) => {
        try {
            const result: any = await UserService.post(newUser);
            const postResult = result.result;
            navigate(`/verifyUser/${postResult.userID}/${code}`);

        } catch (error) {
            console.error('Error occurred while submitting user data:', error);
        }
    };
    

    return (
        <div className='position-relative vh-100 bgColor'>
            <section className={`text-center my-4 position-absolute ${orientation === 'vertical' ? 'top-0 start-50 translate-middle-x vertical-layout' : 'top-0 end-50 m-5 p-3 horizontal-layout'}`}>
                <h2>Velg avatar</h2>
            </section>

            <section className={`text-center position-absolute ${orientation === 'vertical' ? 'my-5 p-5 top-0 start-50 translate-middle-x vertical-layout' : ' top-0 end-0 m-5 p-5 horizontal-layout'}`}>
                <SelectedAvatar selectedAvatar={selectedAvatar} username={username ?? ''} />
            </section>

            <section className={`text-center position-absolute ${orientation === 'vertical' ? 'top-50 start-50 mb-5 translate-middle vertical-layout' : 'bottom-0 start-0 mb-5 horizontal-layout'}`}>
                <AvatarList onClick={handleClick} orientation={orientation} />
            </section>

            <section>
                <button className={`position-absolute pinButton ${orientation === 'vertical' ? 'bottom-0 start-50 translate-middle-x mb-4 vertical-layout' : 'bottom-0 end-0 m-5 horizontal-layout'}`} onClick={() => handleSubmit({ avatarNumber, username: username ?? '' })}>Fortsett</button>
            </section>

        </div>
    );
};

export default ChooseAvatarPage;
