// setRooms를 모두 newState로 변경하는방식으로 하고, doWork마지막에 setRooms 해주는걸로 해보기
export class Debounce {
  timer: any;
  newState: any;
  setState: any;
  arr: any[] = [];
  time: number = 0;

  constructor(state: any, setState: Function, t: number) {
    this.newState = state;
    this.setState = setState;
    this.time = t;
  }

  doWork() {
    this.arr.forEach(work => {
      work();
    });
    this.setState(this.newState);
  }

  debounceAct(work: any) {
    if (this.timer) {
      console.log("work has pushed on workList");
      clearTimeout(this.timer);
    }
    this.arr.push(work);
    this.timer = setTimeout(() => {
      this.doWork();
      this.arr = [];
    }, this.time);
  }
}
