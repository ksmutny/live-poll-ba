import React, { useState } from 'react';
import { getDatabase, push, ref, set } from 'firebase/database';
import QRCode from 'qrcode.react';

function CreatePoll() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);
    const [pollId, setPollId] = useState(null);
    const [voteUrl, setVoteUrl] = useState('');
    const [adminUrl, setAdminUrl] = useState('');

    const handleChange = (index, value) => {
        const newOptions = options.slice();
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const createPoll = async () => {
        const db = getDatabase();
        const pollsRef = ref(db, 'polls');
        const newPollRef = push(pollsRef);
        const newPollId = newPollRef.key;
        await set(newPollRef, {
            question,
            options: options.filter(option => option !== ''),
            votes: options.reduce((acc, option) => {
                if (option) acc[option] = 0;
                return acc;
            }, {})
        });

        const voteUrl = `${window.location.origin}/vote/${newPollId}`;
        const adminUrl = `${window.location.origin}/admin/${newPollId}`;
        setPollId(newPollId);
        setVoteUrl(voteUrl);
        setAdminUrl(adminUrl);
    };

    return (
        <div>
            <h1>Create a Poll</h1>
            <input
                type="text"
                placeholder="Poll question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleChange(index, e.target.value)}
                />
            ))}
            <button onClick={createPoll} id="create-poll">Create Poll</button>
            {pollId && (
                <div>
                    <p>Voting URL: <a href={voteUrl} id="vote-url">{voteUrl}</a></p>
                    <div id="vote-url-qrcode">
                        <QRCode value={voteUrl} />
                    </div>
                    <p>Admin URL: <a href={adminUrl} id="admin-url">{adminUrl}</a></p>
                </div>
            )}
        </div>
    );
}

export default CreatePoll;
