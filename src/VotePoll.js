import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue, runTransaction } from 'firebase/database';

function VotePoll() {
    const { pollId } = useParams();
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        const db = getDatabase();
        const pollRef = ref(db, `polls/${pollId}`);
        onValue(pollRef, (snapshot) => {
            setPoll(snapshot.val());
        });
    }, [pollId]);

    const vote = () => {
        if (selectedOption) {
            const db = getDatabase();
            const votesRef = ref(db, `polls/${pollId}/votes/${selectedOption}`);
            runTransaction(votesRef, (votes) => (votes || 0) + 1);
        }
        setVoted(true);
    };

    if (!poll) return <div>Loading...</div>;

    return (
        <div>
            <h1>{poll.question}</h1>
            {poll.options.map((option, index) => (
                <div className="option" key={index}>
                    <input
                        type="radio"
                        id={`option${index}`}
                        name="option"
                        value={option}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    />
                    <label htmlFor={`option${index}`}>{option}</label>
                </div>
            ))}
            <button onClick={vote} disabled={voted} id="submit-vote">Vote</button>
        </div>
    );
}

export default VotePoll;
