export interface GDataRaw {}
export interface SGuideChainDataRaw {
  guideId: number;
  chain: number[]; // [106, 107, 108];
  keyStep: number;
  closeId: number;
  viewId: number;
  txt: string;
}

export interface SGuideStepDataRaw {
  stepId: number;
  type: number;
  msgkey: string;
  path: string;
  offset: any;
  aniOffset: any;
  aniRotate: string;
  aniType: string;
  talkPos: number[];
  drags: any;
  listIndex: number;
  time: number;
  fixed: number;
}
