import React, { useState, useEffect } from "react";

const EndGamePage: React.FC = () => {
   return(
    <main className="min-vh-100 bgColor">
        <div className="text-center">
            <img src="/images/LoadingLogo.png" alt="Loading" className="" />    
        </div>
        <div className="text-center fs-1 z-index-3">
            THE GAME HAS ENDED
        </div>
    </main>
   ) 
};

export default EndGamePage