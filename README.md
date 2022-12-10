# ⤴️ Installation
```javascript
$ npm i countdown-pulse
```
# 📃 How to use
```javascript
import cdn from "countdown-pulse";

const timer = cdn({
  date: "05",
  month: "November",
  year: "2022",
  hour: "00",
  minute: "00",
  second: "00",
});

// only runs when seconds change
timer.calcSeconds = (seconds) => {
  console.log(`${seconds} left...`);
};

// only runs when minutes change
timer.calcMinutes = (minutes) => {
  console.log(`${minutes} left...`);
};

// only runs when hours change
timer.calcHours = (hours) => {
  console.log(`${hours} left...`);
};

// only runs when hours change
timer.calcDays = (days) => {
  console.log(`${days} left...`);
};
```
