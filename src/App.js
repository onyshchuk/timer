import React, { useState, useEffect, useRef } from "react";

import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import subscribe from "./Observables/Interval";
import formatNumber from "./utils/formatNumber";

const App = () => {
  const waitRef = useRef(null);
  const [time, setTime] = useState(0);
  const [subscription, setSubscription] = useState(0);
  const [addition, setAddition] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, [time]);

  const startTimer = (resetAddition = false) => {
    const subscription = subscribe(setTime, resetAddition === "resetAddition" ? 0 : addition);
    setSubscription(subscription);
  };

  const stopTimer = () => {
    subscription.unsubscribe();
    setSubscription(null);
    setTime(0);
    setAddition(0);
  };

  const handleWait = () => {
    waitRef.current.addEventListener("click", pauseTimer);
    setTimeout(() => waitRef.current.removeEventListener("click", pauseTimer), 300);
  };

  const pauseTimer = () => {
    if (subscription) subscription.unsubscribe();
    setSubscription(null);
    setAddition(time);
  };

  const resetTimer = () => {
    if (subscription) stopTimer();
    else {
      setTime(0);
      setAddition(0);
    }
    startTimer("resetAddition");
  };
  const style = subscription ? { backgroundColor: "#da6085" } : {};
  return (
    <div className="App">
      <div className="App-container">
        <Card className="timer">
          <p>
            {formatNumber(hours)} : {formatNumber(minutes)} : {formatNumber(seconds)}
          </p>
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button style={style} onClick={subscription ? stopTimer : startTimer}>
              {subscription ? "stop" : "start"}
            </Button>
            <Button ref={waitRef} onClick={handleWait}>
              wait
            </Button>
            <Button onClick={resetTimer}>reset</Button>
          </ButtonGroup>
        </Card>
      </div>
    </div>
  );
};

export default App;
