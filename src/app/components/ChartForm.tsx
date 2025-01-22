'use client';

import React, { useEffect, useState } from 'react';
import Chart from './Chart';

const ChartForm = () => {
  const [username, setUsername] = useState('');
  const [heartRate, setHeartRate] = useState<
    { timestamp: number; heartRate: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);

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
      const newMeasurements = data.measurements.map(
        (entry: { timestamp: number; heartRate: number }) => ({
          timestamp: entry.timestamp,
          heartRate: entry.heartRate,
        }),
      );

      // keep the last 20 data points
      setHeartRate((prev) => {
        const updatedData = [...prev, ...newMeasurements];
        return updatedData.slice(-20);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const signedIn = await signInUser(username);
    if (signedIn) {
      setHeartRate([]);
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (!isFetching) return;

    const interval = setInterval(() => {
      fetchHeartRate(username);
    }, 5000);

    return () => clearInterval(interval);
  }, [isFetching, username]);

  return (
    <div className="mt-8">
      <form className="flex max-w-40 gap-1" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          className="p-2 border border-gray-300 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#2dd4bf] text-[#111827] px-4 py-2 rounded ml-2 "
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-6">
        {heartRate.length > 0 && <Chart heartRate={heartRate} />}
      </div>
    </div>
  );
};

export default ChartForm;
