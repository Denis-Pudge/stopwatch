import React from "react";
import './App.css'
import { useState, useEffect } from 'react'
import { interval, Subject, takeUntil } from 'rxjs'



function App() {

  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  const sec = 1000
  const min = sec * 60
  const hour = min * 60
 
  useEffect(() => {
    const observable$ = new Subject();
    interval(1000)
      .pipe(takeUntil(observable$))
      .subscribe(() => {
        if (start) {
          setTime(prevTime => prevTime + 1000);
        }
      });
    return () => {
      observable$.next();
      observable$.complete();
    };
  }, [start]);

 
  const run = React.useCallback(() => {
    setStart(true);
  }, []);
 
  const stop = React.useCallback(() => {
    setStart(false);
    setTime(0);
  }, []);
 
  const reset = React.useCallback(() => {
    setTime(0);
    setStart(true)
  }, []);
 
  const wait = React.useCallback(() => {
    setStart(false);
  }, []);

 
  return (
    <div className="App">
      <h1> Timer </h1>
      <h1>
        <span>{("0" + Math.floor(time/hour)%60).slice(-2)} : </span>  
        <span>{("0" + Math.floor(time/min)%60).slice(-2)} : </span>  
        <span>{("0" + Math.floor(time/sec)%60).slice(-2)}</span> 
      </h1>
      <div>
        <button onClick={run}> Start </button> 
        <button onClick={stop}> Stop </button> 
        <button onDoubleClick={wait}> Wait </button> 
        <button onClick={reset}> Reset </button> 
      </div>
    </div>
  );
}

export default App;
