import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface VoteCounts {
  option1: number;
  option2: number;
  option3: number;
  option4: number;
}

interface ResultPageProps {
  voteCountsClear: boolean;
  onClearProcessed: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ voteCountsClear, onClearProcessed }) => {
  const { actEventId } = useParams<{ actEventId: string }>();
  const [voteCounts, setVoteCounts] = useState<VoteCounts>({ option1: 0, option2: 0, option3: 0, option4: 0 });

  useEffect(() => {
    if (voteCountsClear) {
      setVoteCounts({ option1: 0, option2: 0, option3: 0, option4: 0 });
      onClearProcessed();
    }
  }, [voteCountsClear, onClearProcessed]);

  useEffect(() => {
    const ws = new WebSocket('ws://172.20.10.2:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'VOTE_COUNTS') {
        setVoteCounts((prevCounts) => ({
          ...prevCounts,
          option1: prevCounts.option1 + data.counts.option1,
          option2: prevCounts.option2 + data.counts.option2,
          option3: prevCounts.option3 + data.counts.option3,
          option4: prevCounts.option4 + data.counts.option4,
        }));
      }
      if (data.type === 'WINNER') {
        console.log('Winner:', data.winner);
        console.log('Navigate to break page');
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [actEventId]);

  return (
    <main className="position-relative vh-100 horizontalbg1 bgVectors horizontal-layout">
      <section className="position-absolute top-50 start-50 translate-middle">
        <div className="container">
          <div className="row g-3 m-2">
            <div className="result-container d-flex align-items-end">
              {Object.entries(voteCounts).map(([option, count], index) => (
                count !== 0 ? (
                  <div key={index}>
                    <div
                      className={`result-box option-${index + 1}`}
                      style={{ height: `${count}vh` }}
                      id={option}
                    ></div>
                    <p className="text-center result-text">
                      {count}
                    </p>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResultPage;
