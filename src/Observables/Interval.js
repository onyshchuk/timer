import { Observable } from "rxjs";

const stream$ = new Observable(observer => {
  let i = 0;

  observer.next(i++);

  const intervalStep = () => {
    setTimeout(() => {
      observer.next(i++);
      intervalStep();
    }, 1000);
  };

  intervalStep();
});

const subscribe = (setTimeCallback, addition = 0) => {
  return stream$.subscribe(value => setTimeCallback(value + addition));
};

export default subscribe;
