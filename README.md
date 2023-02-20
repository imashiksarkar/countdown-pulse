# ⤴️ Installation

```javascript
$ npm i countdown-pulse
```

# 📃 How to use

```javascript
import cdn from "countdown-pulse";

try {
  const cdn = new Countdown({
    date: 30,
    month: "JANUARY",
    year: 2025,
    hour: 0,
    minute: 0,
    second: 0,
  });

  // only runs when hours change
  cdn.getDays((res) => {
    console.log("Days =>", res);
  });

  // only runs when hours change
  cdn.getHours((res) => {
    console.log("Hours =>", res);
  });

  // only runs when minutes change
  cdn.getMinutes((res) => {
    console.log("Minutes =>", res);
  });

  // only runs when seconds change
  cdn.getSeconds((res) => {
    console.log("Seconds =>", res);
  });
} catch (error) {
  console.log(error);
}
```
