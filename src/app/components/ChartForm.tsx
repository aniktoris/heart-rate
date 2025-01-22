'use client';

import React, { useState } from 'react';
import Chart from './Chart';

const ChartForm = () => {
  const [username, setUsername] = useState('');
  const [heartRate, setHeartRate] = useState<
    { timestamp: number; heartRate: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const signInUser = async (username: string) => {
    try {
      const res = await fetch(
        'https://nowatch-fullstack-test-assignment.vercel.app/api/signin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        },
      );
      if (!res.ok) {
        throw new Error('Failed to sign in');
      }
      return true;
    } catch (err) {
      console.error(err);
      setError('Failed to sign in. Please try again.');
      return false;
    }
  };

  const fetchHeartRate = async (username: string) => {
    try {
      const res = await fetch(`/api/measurements?username=${username}`);
      if (!res.ok) {
        throw new Error('Failed to fetch heart rate');
      }
      const data = await res.json();
      console.log(data.measurements);
      setHeartRate(data.measurements);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch heart rate. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const signedIn = await signInUser(username);
    if (signedIn) {
      fetchHeartRate(username);
    }
  };

  return (
    <div className="mt-10">
      <form className="flex max-w-40 gap-1" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          className="p-2 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded ml-2 "
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <h2 className="text-2xl font-bold">Heart Rate</h2>
        <ul className="mt-2">
          {heartRate.length > 0 ? (
            <Chart heartRate={heartRate} />
          ) : (
            <p>No heart rate data available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChartForm;
