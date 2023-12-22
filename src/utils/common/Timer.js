export default class Timer {
  constructor(interval, tick) {
    this.TimerInterval = interval && interval;
    this.TimerTick = tick && tick;
  }
  //timer
  Timer = null;
  //Timer operation
  TimerTick = null;
  //time interval
  TimerInterval = 1000;
  //End Timer
  Stop() {
    this.Timer && clearInterval(this.Timer);
    this.Timer = null;
  }
  //Start Timer
  Start() {
    let that = this;
    if (!that.Timer && that.TimerTick) {
      that.TimerTick();
      that.Timer = setInterval(() => {
        that.TimerTick();
      }, that.TimerInterval);
    }
  }
}
