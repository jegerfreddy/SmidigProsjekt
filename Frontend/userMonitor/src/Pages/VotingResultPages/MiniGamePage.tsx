import React from "react";
import MiniGameBaloons from "../../Components/Minigame/MiniGameComponent";

const MiniGamePage: React.FC = () => {
  const yourTeam = localStorage.getItem('youVotedFor');
  return (
    <main className="vh-100 horizontalbg2">
      <MiniGameBaloons yourTeam={yourTeam} />
    </main>
  )
};

export default MiniGamePage;
