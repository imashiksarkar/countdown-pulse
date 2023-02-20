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
