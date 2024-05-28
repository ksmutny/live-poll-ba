import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';

function AdminPoll() {
    const { pollId } = useParams();
    const [poll, setPoll] = useState(null);

    useEffect(() => {
        const db = getDatabase();
        const pollRef = ref(db, `polls/${pollId}`);
        onValue(pollRef, (snapshot) => {
            setPoll(snapshot.val());
        });
    }, [pollId]);

    if (!poll) return <div>Loading...</div>;

    return (
        <div>
            <h1>{poll.question}</h1>
            <ul>
                {Object.keys(poll.votes).map((option, index) => (
                    <li key={index}>
                        {option}: {poll.votes[option]} votes
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPoll;
