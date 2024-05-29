import { useState, useEffect } from 'react';

function PhoneInfo() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
    const [orientation, setOrientation] = useState(screenWidth > screenHeight ? 'horizontal' : 'vertical');

    useEffect(() => {
        const handleResize = () => {
            const newScreenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const newScreenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            setScreenWidth(newScreenWidth);
            setScreenHeight(newScreenHeight);
            setOrientation(newScreenWidth > newScreenHeight ? 'horizontal' : 'vertical');
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        width: screenWidth,
        height: screenHeight,
        orientation: orientation
    };
}

export default PhoneInfo;
