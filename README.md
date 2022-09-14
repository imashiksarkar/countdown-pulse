```javascript
import cdn from "./node_modules/countdown-pulse/index.js";

const htmlTimer = document.querySelector("#timer"),
  hour = htmlTimer.querySelector("#hh"),
  minute = htmlTimer.querySelector("#mm"),
  second = htmlTimer.querySelector("#ss");

const timer = cdn({
  date: "05",
  month: "November",
  year: "2022",
  hour: "00",
  minute: "00",
  second: "00",
});

// only runs when seconds change
timer.calcSeconds = (time) => {
  second.innerText = time;
  console.log(time, "ss");
};

// only runs when minutes change
timer.calcMinutes = (time) => {
  minute.innerText = time;
  console.log(time, "mm");
};

// only runs when hours change
timer.calcHours = (time) => {
  hour.innerText = time;
  console.log(time, "hh");
};
```
