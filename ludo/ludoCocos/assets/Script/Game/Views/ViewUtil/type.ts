export type TimerTaskInfo = {
  time: number;
  tickTime: number;
  end?: number;
  start?: number;
  update?: (subTime: number, totalTime: number) => {};
  endcb?: () => {};
};

export type TimerTickInfo = {
  time: number;
  tickTime: number;
  update?: (subTime: number, totalTime: number) => {};
  endcb?: () => {};
};
export type PreventClicksValue = {
  target: any;
  time: number;
  startCb?: () => {};
  endCb?: () => {};
};
