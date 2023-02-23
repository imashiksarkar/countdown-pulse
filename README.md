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
import CdnTimer from "countdown-pulse";
import { useCallback, useEffect, useReducer } from "react";
import { InitState, ReducerType, Types } from "./index.d";

const initState: InitState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case Types.days:
      return { ...state, days: action.payload };
    case Types.hours:
      return { ...state, hours: action.payload };
    case Types.minutes:
      return { ...state, minutes: action.payload };
    case Types.seconds:
      return { ...state, seconds: action.payload };
  }
  return state;
};

function App() {
  const [state, dispatch] = useReducer<ReducerType>(reducer, initState);
  const { days, hours, minutes, seconds } = state;

  let cdn: CdnTimer | null = null;

  useEffect(() => {
    try {
      cdn = new CdnTimer({
        date: 30,
        month: "JANUARY",
        year: 2025,
        hour: 0,
        minute: 0,
        second: 0,
      });
    } catch (error) {
      console.log(error);
    }
    // only runs when days change
    cdn?.calcDays((res) => {
      dispatch({ type: Types.days, payload: res });
    });

    // only runs when hours change
    cdn?.calcHours((res) => {
      dispatch({ type: Types.hours, payload: res });
    });

    // only runs when minutes change
    cdn?.calcMinutes((res) => {
      dispatch({ type: Types.minutes, payload: res });
    });

    // only runs when seconds change
    cdn?.calcSeconds((res) => {
      dispatch({ type: Types.seconds, payload: res });
    });

    // cleanup
    return () => {
      cdn?.stop();
    };
  }, []);

  const handleStop = useCallback(() => {
    cdn?.stop();
  }, [cdn]);

  return (
    <div>
      <span>
        Days: {days} - Hours: {hours} - Minutes: {minutes} - Seconds: {seconds}
      </span>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default App;
```
