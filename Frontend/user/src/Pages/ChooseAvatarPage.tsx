import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AvatarList from '../assets/Avatar/AvatarList';
import SelectedAvatar from '../assets/Avatar/SelectedAvatar';
import PhoneInfo from '../assets/Phone/PhoneInfo';
import { IUser } from '../Interfaces/IUser';
import { GeneralContext } from '../Contexts/UserContext';
import { IGeneralContext } from '../Interfaces/IContext';
import { UserService } from '../Services/GetService';

const ChooseAvatarPage: React.FC = () => {
    const userContext = useContext(GeneralContext) as IGeneralContext<IUser>;
    const location = useLocation();
    const { username } = location.state || { username: 'Username' };
    const [selectedAvatar, setSelectedAvatar] = useState<string>('/images/Avatar-4.png');
    const [avatarNumber, setAvatarNumber] = useState<number>(0);
    const [yourUserID, setPostResult] = useState<number>(0);

    const handleClick = (avatarId: number) => {
        const pickedAvatarUrl = `/images/Avatar-${avatarId}.png`;
        setSelectedAvatar(pickedAvatarUrl);
        setAvatarNumber(avatarId);
    };

    const { orientation } = PhoneInfo();
    const { postItem } = userContext;

    const handleSubmit = async (newUser: IUser) => {
        try {
            const result: any = await UserService.post(newUser); // Use UserService to post data
            const postResult = result.result; // Store postResult from result object
            console.log(`I page`, postResult.userID);
            setPostResult(postResult.userID); // Set postResult in component state
            // Optionally redirect to the /waiting page
            window.location.href = `/waiting`
        } catch (error) {
            // Handle error during submission
            console.error('Error occurred while submitting user data:', error);
        }
    };

    return (
        <div className='position-relative vh-100'>
            <section className={`text-center my-4 position-absolute ${orientation === 'vertical' ? 'top-0 start-50 translate-middle-x vertical-layout' : 'top-0 end-50 m-5 p-3 horizontal-layout'}`}>
                <h2>Velg avatar</h2>
            </section>

            <section className={`text-center position-absolute ${orientation === 'vertical' ? 'my-5 p-5 top-0 start-50 translate-middle-x vertical-layout' : ' top-0 end-0 m-5 p-5 horizontal-layout'}`}>
                <SelectedAvatar selectedAvatar={selectedAvatar} username={username} />
            </section>

            <section className={`text-center position-absolute ${orientation === 'vertical' ? 'top-50 start-50 mb-5 translate-middle vertical-layout' : 'bottom-0 start-0 mb-5 horizontal-layout'}`}>
                <AvatarList onClick={handleClick} orientation={orientation} />
            </section>

            <section>
                <button className={`position-absolute pinButton ${orientation === 'vertical' ? 'bottom-0 start-50 translate-middle-x mb-4 vertical-layout' : 'bottom-0 end-0 m-5 horizontal-layout'}`} onClick={() => handleSubmit({ avatarNumber, username })}>Fortsett</button>
            </section>

        </div>
    );
};

export default ChooseAvatarPage;
