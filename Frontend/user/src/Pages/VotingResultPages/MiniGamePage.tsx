import React from "react";
import MiniGameBaloons from "../../Components/Minigame/MiniGameComponent";

const MiniGamePage: React.FC = () => {
  const yourTeam = localStorage.getItem('youVotedFor');
  console.log('Your team:', yourTeam);
  return (
    <main className="userPage horizontalbg2">
      <MiniGameBaloons yourTeam={yourTeam} />
    </main>
  )
};

export default MiniGamePage;
