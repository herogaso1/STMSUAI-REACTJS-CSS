import React, { useState, useEffect, useRef } from "react";
import "./Pomodoro.css";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 phút
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(1);
  const [mode, setMode] = useState("focus"); // focus / break
  const timerRef = useRef(null);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  // chạy đếm ngược
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleTimerEnd();
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, timeLeft]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearTimeout(timerRef.current);
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setMode("focus");
    setCycle(1);
  };

  const handleTimerEnd = () => {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.play();
    if (mode === "focus") {
      setMode("break");
      setTimeLeft(5 * 60);
    } else {
      setMode("focus");
      setTimeLeft(25 * 60);
      setCycle((prev) => prev + 1);
    }
  };

  const progress = mode === "focus" ? (timeLeft / (25 * 60)) * 100 : (timeLeft / (5 * 60)) * 100;

  return (
    <div className="pomodoro-container">
      <div className="pomodoro-header">
        <h1>Pomodoro Timer</h1>
      </div>

      <div className="pomodoro-circle">
        <svg width="220" height="220">
          <circle cx="110" cy="110" r="100" stroke="#e6e6e6" strokeWidth="10" fill="none" />
          <circle
            cx="110"
            cy="110"
            r="100"
            stroke="#3b5bdb"
            strokeWidth="10"
            fill="none"
            strokeDasharray="628"
            strokeDashoffset={628 - (628 * progress) / 100}
            strokeLinecap="round"
            transform="rotate(-90 110 110)"
          />
        </svg>
        <div className="pomodoro-time">
          <h2>{minutes}:{seconds}</h2>
          <p>{mode.toUpperCase()}</p>
        </div>
      </div>

      <div className="pomodoro-controls">
        <button onClick={handleReset} title="Reset">⟲</button>
        <button onClick={handleStartPause} className="main-btn">
          {isRunning ? "⏸" : "▶"}
        </button>
        <button onClick={handleTimerEnd} title="Skip">⏭</button>
      </div>

      <p className="pomodoro-cycle">{cycle}/4</p>
      <footer className="pomodoro-footer">
        Made with 💙 by STMSUAI Team
      </footer>
    </div>
  );
};

export default Pomodoro;
