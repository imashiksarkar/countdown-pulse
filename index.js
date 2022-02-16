class Countdown {
  constructor(cdnTime) {
    // initiated time for the countdown to close
    this.initiatedCountdown = new Date(cdnTime).getTime();
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
}
const countdownTimer = (initatedTime) => {
  return new Countdown(initatedTime);
};
export default countdownTimer;
