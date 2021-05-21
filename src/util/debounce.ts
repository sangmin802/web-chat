export function debounce(cb: any, t: number) {
  let timer: any;
  let arr: any[] = [];
  function debounceAct(work: any) {
    if (timer) {
      console.log("새로운 요청으로 인해 대기합니다");
      clearTimeout(timer);
    }
    arr.push(work);
    timer = setTimeout(() => {
      cb(arr);
      arr = [];
    }, t);
  }
  return debounceAct;
}
