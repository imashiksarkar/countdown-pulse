class Countdown {
  constructor(cdnTime) {
    const validatedTime = this.valitateTime(cdnTime);
    // initiated time for the countdown to close
    this.initiatedCountdown = new Date(validatedTime).getTime();
    // previous states are stored here
    this.states = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  calculateTime() {
    // current time
    const currentTime = new Date().getTime();

    // time difference between initated time and current time
    const timeDifferent = this.initiatedCountdown - currentTime;

    // calculation for days, hours, minutes and seconds
    const days = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifferent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifferent % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifferent % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  mainTimeOut = setInterval(() => {
    const { days, hours, minutes, seconds } = this.calculateTime();
    if (this.calcSeconds && this.states.seconds !== seconds) {
      this.states.seconds = seconds;
      this.calcSeconds(seconds);
    }
    if (this.calcMinutes && this.states.minutes !== minutes) {
      this.states.minutes = minutes;
      this.calcMinutes(minutes);
    }
    if (this.calcHours && this.states.hours !== hours) {
      this.states.hours = hours;
      this.calcHours(hours);
    }
    if (this.calcDays && this.states.days !== days) {
      this.states.days = days;
      this.calcDays(days);
    }
  }, 1000);

  stop() {
    clearInterval(this.mainTimeOut);
  }
  // this function validates the user submitted time
  valitateTime(time) {
    // throwing error if the date is not valid
    if (!time.date || time.date > 31 || typeof time.date !== "string")
      throw new Error("Put a valid date [example: '02' or '16']");
    const date = time.date.slice(0, 2);
    // name of months
    const monthNames = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];
    const isValidMonth =
      (time.month &&
        monthNames.includes(time.month.toLowerCase()) &&
        time.month !== "string") ||
      false;
    // throwing error if the month is not valid
    if (!isValidMonth)
      throw new Error(
        "Provide a valide month name [example: 'february' or 'February']"
      );
    const month = this.toUpperCase(time.month).slice(0, 3);

    // throwing error if the year is not valid
    if (!time.year || typeof time.year !== "string")
      throw new Error("Put a valid year [example: '2022']");
    const year = time.year.slice(0, 4);

    // throwing error if the hour is not valid
    if (!time.hour || typeof time.hour !== "string" || time.hour > 24)
      throw new Error("Put a valid hour [example: '20']");
    const hour = time.hour.slice(0, 2);

    // throwing error if the minute is not valid
    if (!time.minute || typeof time.minute !== "string" || time.minute > 60)
      throw new Error("Put a valid minute [example: '60']");
    const minute = time.minute.slice(0, 2);

    // throwing error if the second is not valid
    if (!time.second || typeof time.second !== "string" || time.second > 60)
      throw new Error("Put a valid second [example: '60']");
    const second = time.second.slice(0, 2);

    return `${month} ${date}, ${year} ${hour}:${minute}:${second}`;
  }
  // this method helps converting string to upper case
  toUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
const countdownTimer = (initatedTime) => {
  return new Countdown(initatedTime);
};

export default countdownTimer;
