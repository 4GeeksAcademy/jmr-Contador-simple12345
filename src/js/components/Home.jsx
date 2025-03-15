import React, { useState, useEffect } from "react";


const SecondsCounter = ({ initialSeconds = 0, countdown = false, alertTime = null }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [running, setRunning] = useState(true);

    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setSeconds(prev => countdown ? Math.max(0, prev - 1) : prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [running, countdown]);

    
    useEffect(() => {
        if (alertTime !== null && seconds === alertTime) {
            const message = countdown 
                ? ` ¡La cuenta regresiva llegó a ${alertTime}!` 
                : ` ¡Has alcanzado ${alertTime} segundos!`;
            alert(message);
        }
    }, [seconds, alertTime, countdown]);

    
    const handlePause = () => setRunning(false);
    const handleResume = () => setRunning(true);
    const handleReset = () => {
        setSeconds(initialSeconds);
        setRunning(true);
    };

    
    const formattedSeconds = String(seconds).padStart(6, "0").split("");

    return (
        <div className="counter-container">
            <div className="counter">
                {/* Ícono del reloj con el mismo tamaño que los números */}
                <span className="digit"><i className="fas fa-clock clock-icon"></i></span>
                {formattedSeconds.map((num, index) => (
                    <span key={index} className="digit">{num}</span>
                ))}
            </div>
            <div className="buttons">
                <button onClick={handlePause}>Pausar</button>
                <button onClick={handleResume}>Continuar</button>
                <button onClick={handleReset}>Reiniciar</button>
            </div>
        </div>
    );
};


const Home = () => {
    return (
        <SecondsCounter initialSeconds={0} countdown={false} alertTime={10} />
    );
};

// css
const styles = `
.counter-container {
    text-align: center;
    background-color: black;
    padding: 15px;
    color: white;
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: auto;
    border: none;
}
.counter {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    height: 80px;
}
.digit {
    background-color: #222;
    padding: 10px;
    margin: 3px;
    width: 45px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
}
.clock-icon {
    font-size: 40px !important;
    color: white !important;
}
.buttons {
    margin-top: 15px;
}
button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    transition: 0.3s;
}
button:hover {
    background-color: #0056b3;
}
`;


const styleTag = document.createElement("style");
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);

export default Home;
