import React, { useState, useEffect } from 'react';

const MiniGameBaloons: React.FC = () => {
    const [redValue, setRedValue] = useState(0);
    const [purpleValue, setPurpleValue] = useState(0);

    const handleClick = () => {
        const newRedValue = redValue + Math.random() * 10;
        const newPurpleValue = purpleValue + Math.random() * 10;
        setRedValue(newRedValue);
        setPurpleValue(newPurpleValue);
        //sender value til backend
    }

    useEffect(() => {
        if (redValue > 100) {
            setRedValue(0);
            setPurpleValue(0);
            alert('Gratulerer! Rød har vunnet spillet');
        } else if (purpleValue > 100) {
            setRedValue(0);
            setPurpleValue(0);
            alert('Gratulerer! Lilla har vunnet spillet');
        }
    }, [redValue, purpleValue]);

    return (
        <>
            <div className='position-relative vh-100' onClick={handleClick}>
                <h1 className="text-center position relative top-0 start-0 p-5">
                    Hjelp laget ditt ved å gi luft til ballongen
                </h1>
                <img src="/images/redBaloon.png" alt="redBaloon" className='position-absolute start-0' style={{ bottom: `${redValue}vh`, transition: 'bottom 0.5s ease' }} />
                <img src="/images/purpleBaloon.png" alt="purpleBaloon" className='position-absolute end-0' style={{ bottom: `${purpleValue}vh`, transition: 'bottom 0.5s ease' }} />
            </div>
        </>
    );
};

export default MiniGameBaloons;
