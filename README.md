# ⤴️ Installation

```javascript
$ npm i countdown-pulse
```

# 📃 How to use

```javascript
import CdnTimer from "countdown-pulse";

try {
  const cdn = new CdnTimer({
    date: 30,
    month: "JANUARY",
    year: 2025,
    hour: 0,
    minute: 0,
    second: 0,
  });

  // only runs when days change
  cdn.calcDays((res) => {
    console.log("Days =>", res);
  });

  // only runs when hours change
  cdn.calcHours((res) => {
    console.log("Hours =>", res);
  });

  // only runs when minutes change
  cdn.calcMinutes((res) => {
    console.log("Minutes =>", res);
  });

  // only runs when seconds change
  cdn.calcSeconds((res) => {
    console.log("Seconds =>", res);
  });
} catch (error) {
  console.log(error);
}
```

# 📃 How to use With React

```typescript
import Countdown, { cdnReducer, initState } from "countdown-pulse";
import { MouseEvent, useCallback, useEffect, useReducer } from "react";

interface CustomEvent {
  target: {
    name: string;
  };
}
type extendedMouseEvent = MouseEvent<HTMLButtonElement> & CustomEvent;

function App() {
  const [cdnState, cdnDispatch] = useReducer(cdnReducer, initState);
  const { days, hours, minutes, seconds } = cdnState;
  let cdn: Countdown | null = null;

  useEffect(() => {
    try {
      cdn = new Countdown({
        date: 5,
        hour: 0,
        minute: 0,
        month: "FEBRUARY",
        second: 0,
        year: 2024,
      });

      cdn.cdnDispatch(cdnDispatch);
    } catch (error) {
      cdn?.stop();
    }
    // cleanup
    return () => cdn?.stop();
  }, []);

  const handleBtnClick = useCallback((e: extendedMouseEvent) => {
    if (e.target.name === "start") cdn?.start();
    if (e.target.name === "stop") cdn?.stop();
  }, []);

  return (
    <div>
      <span>
        Days: {days} | Hours: {hours} | Minutes: {minutes} | Seconds: {seconds}
        <button type="button" name="stop" onClick={handleBtnClick}>
          Stop Timer
        </button>
        <button type="button" name="start" onClick={handleBtnClick}>
          Start Timer
        </button>
      </span>
    </div>
  );
}

export default App;
```
