/**
 * 音频播放管理类
 */

import { GAssetImpl, GLoader } from "../GLoader/GLoader";

export enum SoundStorageKey {
  MusicVolume = "music_volume",
  MusicName = "music_name",
  EffectVolume = "effect_Volume",
}

const INVALID_MUSIC_ID = -1;
export class AudioMgr {
  private static _instance: AudioMgr = null;
  public static Ins() {
    if (!this._instance) {
      this._instance = new AudioMgr();
    }
    return this._instance;
  }

  public static setFinishCallBack(audioID: number, callback: any) {
    cc.audioEngine.setFinishCallback(audioID, callback);
  }

  protected _bgMusicId = INVALID_MUSIC_ID;
  protected _bgMusicPath = "";
  protected _lastBgMusicPath = "";
  protected _soundScale = 0.6;
  protected _bgMusicVolume = 1;
  protected _effectMusicVolume = 1;
  protected _curLoadMusicPath = "";
  protected _loopeffEct = false;
  constructor() {
    this._bgMusicId = INVALID_MUSIC_ID;
    this._bgMusicPath = "";
    let vol = cc.sys.localStorage.getItem(SoundStorageKey.MusicVolume);
    this._bgMusicVolume = vol == undefined ? 1 : parseFloat(vol);
    vol = cc.sys.localStorage.getItem(SoundStorageKey.EffectVolume);
    this._effectMusicVolume = vol == undefined ? 1 : parseFloat(vol);
    this.initGameListener();
  }

  /** 注册监听事件 */
  public initGameListener() {
    // 隐藏之前的音乐ID
    let beforeHidPath = "";
    // 当前音乐的播放时长
    let duraiton = 0;
    // 恢复时当前如果没有音乐正在播放则恢复到挂起之前的音乐已经播放的时间。
    cc.game.on(cc.game.EVENT_SHOW, (...args: any[]) => {
      if (beforeHidPath) {
        if (this.getMusicID() == INVALID_MUSIC_ID) {
          this.playMusic(beforeHidPath);
          if (this.getMusicID() != INVALID_MUSIC_ID) {
            cc.audioEngine.setCurrentTime(this.getMusicID(), duraiton);
          }
        }
      }
    });
    // 挂起时记录当前音乐ID和播放时间。
    cc.game.on(cc.game.EVENT_HIDE, (...args: any[]) => {
      if (this.getMusicID() == INVALID_MUSIC_ID) return;
      beforeHidPath = this._bgMusicPath;
      if (!beforeHidPath) return;
      duraiton = cc.audioEngine.getCurrentTime(this.getMusicID());
      this.stopMusic(false);
    });
  }

  public getUrl(subPath): string {
    return cc.url.raw("resources" + subPath);
  }

  public setMusicVolume(volume: number, record: boolean = true) {
    if (record) {
      this._bgMusicVolume = volume;
      cc.sys.localStorage.setItem(
        SoundStorageKey.MusicVolume,
        volume.toFixed(2).toString()
      );
    }
    cc.audioEngine.setMusicVolume(volume * this._soundScale);
    if (this.getMusicID() != INVALID_MUSIC_ID) {
      // cc.audioEngine.setMusicVolume(volume * this._soundScale);
    } else if (volume > 0) {
      if (!!this._bgMusicPath) {
        let path = this._bgMusicPath;
        this._bgMusicPath = null;
        this.playMusic(path);
      } else if (this._curLoadMusicPath != null) {
        this.playMusic(this._curLoadMusicPath);
      }
    }
  }

  public setEffectVolume(volume: number) {
    this._effectMusicVolume = volume;
    cc.sys.localStorage.setItem(
      SoundStorageKey.EffectVolume,
      volume.toFixed(2).toString()
    );
  }

  public playMusic(path: string) {
    if (this._bgMusicPath == path) return;
    this._curLoadMusicPath = GAssetImpl.realUrl(path);
    if (this._bgMusicVolume <= 0) return;
    if (this.getMusicID() != INVALID_MUSIC_ID) {
      this.stopMusic();
    }
    GLoader.audioClip(path, (clip: cc.AudioClip) => {
      if (path != this._curLoadMusicPath) return;
      let musicID = cc.audioEngine.playMusic(clip, true);
      if (musicID >= 0) {
        cc.audioEngine.setMusicVolume(this._bgMusicVolume * this._soundScale);
        this.setMusicID(musicID);
        this.setMusicName(path);
      }
    });
  }

  public playLastMusic() {
    if (!this._lastBgMusicPath) return;
    this.playMusic(this._lastBgMusicPath);
  }

  public stopMusic(recordLastMusicId: boolean = true) {
    if (this.getMusicID() == INVALID_MUSIC_ID) return;
    if (recordLastMusicId) this._lastBgMusicPath = this._bgMusicPath;
    cc.audioEngine.stopMusic();
    this.setMusicID(INVALID_MUSIC_ID);
    this.setMusicName("");
  }

  public playEffect(path: string, playCb?, endCb?): void {
    if (this._effectMusicVolume <= 0) return;
    GLoader.audioClip(path, (clip: cc.AudioClip) => {
      let effectId = cc.audioEngine.play(
        clip,
        false,
        this._effectMusicVolume * this._soundScale
      );
      if (playCb && effectId >= 0) {
        playCb(path, effectId);
      }
      if (endCb && effectId >= 0) {
        cc.audioEngine.setFinishCallback(effectId, () => {
          endCb(path, effectId);
        });
      }
    });
  }

  public stopAll() {
    this.stopMusic();
    cc.audioEngine.stopAll();
  }

  public pauseAll() {
    cc.audioEngine.pauseAll();
  }

  public resumeAll() {
    cc.audioEngine.resumeAll();
  }

  public getMusicName(): string {
    return this._bgMusicPath;
  }

  public setMusicName(path: string) {
    this._bgMusicPath = path;
    cc.sys.localStorage.setItem(SoundStorageKey.MusicName, path);
  }

  public getMusicID(): number {
    return this._bgMusicId;
  }

  public setMusicID(musicID: number) {
    this._bgMusicId = musicID;
  }

  public getMusicVolume(): number {
    return this._bgMusicVolume;
  }

  public getEffectVolume(): number {
    return this._effectMusicVolume;
  }
}
