import React, { useState } from 'react';
import { env } from '@/shared/environment';

const ComethGaslessTransaction: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleButtonClick = async () => {
        setError(null); // Clear previous error if any
        try {
            const response = await fetch('https://api.connect.cometh.io/sponsored-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apisecret': env.comethSecret,
                },
                body: JSON.stringify({
                    targetAddress: "0x83E6A1A9f3A0bBF368Bb997A66010DDc79ffa779"
                })
            });

            if (!response.ok) {
                throw new Error(`API error with status: ${response.status}`);
            }

            const result = await response.json();
            setData(result);

        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Get Sponsored Address</button>
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            {data && (
                <div>
                    <h3>Result:</h3>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ComethGaslessTransaction;
