import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const storedTime = parseInt(localStorage.getItem('timer') || 0);
    const [time, setTime] = useState(storedTime);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(time + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    useEffect(() => {
        localStorage.setItem('timer', time);
    }, [time]);

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const startTimer = () => {
        setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
    };

    return (
        <div className={`stopwatch ${isRunning ? 'running' : 'stopped'}`} style={{
            borderColor: isRunning ? 'green' : 'red', // Change border color based on the timer state
        }}>
            <div className='stopwatch-main'>
                <p className='stopwatch-time'>
                    {minutes.toString().padStart(2, '0')}m {seconds.toString().padStart(2, '0')}s
                </p>
            </div>
            <div className='stopwatch-buttons'>
                <button className='stopwatch-button' onClick={startTimer} disabled={isRunning}>
                    START
                </button>
                <button className='stopwatch-button' onClick={stopTimer} disabled={!isRunning}>
                    STOP
                </button>
                <button className='stopwatch-button stopwatch-button-reset' onClick={resetTimer}>
                    RESET
                </button>
            </div>
        </div>
    );
};

export default App;





