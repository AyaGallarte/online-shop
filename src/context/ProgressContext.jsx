import React, { createContext, useState, useContext, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startProgress = useCallback(() => {
    setIsLoading(true);
    setProgress(0);

    const id = setInterval(() => {
      setProgress((prevProgress) => {
        // Increment progress and ensure it does not exceed 100
        const newProgress = Math.min(prevProgress + Math.random() * 10, 100);

        if (newProgress >= 100) {
          clearInterval(id);
          setIsLoading(false); // Close modal when progress is 100%
        }

        return newProgress;
      });
    }, 100); // Slower interval

    setIntervalId(id);
  }, []);

  const closeModal = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIsLoading(false);
  };

  return (
    <ProgressContext.Provider value={{ progress, isLoading, startProgress, closeModal }}>
      {children}
    </ProgressContext.Provider>
  );
}
