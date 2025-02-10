"use strict";
cc._RF.push(module, '44a3ckGuhNHNo49V45H+54D', 'AudioMgr');
// Script/Core/Manager/AudioMgr.ts

"use strict";
/**
 * 音频播放管理类
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioMgr = exports.SoundStorageKey = void 0;
var GLoader_1 = require("../GLoader/GLoader");
var SoundStorageKey;
(function (SoundStorageKey) {
    SoundStorageKey["MusicVolume"] = "music_volume";
    SoundStorageKey["MusicName"] = "music_name";
    SoundStorageKey["EffectVolume"] = "effect_Volume";
})(SoundStorageKey = exports.SoundStorageKey || (exports.SoundStorageKey = {}));
var INVALID_MUSIC_ID = -1;
var AudioMgr = /** @class */ (function () {
    function AudioMgr() {
        this._bgMusicId = INVALID_MUSIC_ID;
        this._bgMusicPath = "";
        this._lastBgMusicPath = "";
        this._soundScale = 0.6;
        this._bgMusicVolume = 1;
        this._effectMusicVolume = 1;
        this._curLoadMusicPath = "";
        this._loopeffEct = false;
        this._bgMusicId = INVALID_MUSIC_ID;
        this._bgMusicPath = "";
        var vol = cc.sys.localStorage.getItem(SoundStorageKey.MusicVolume);
        this._bgMusicVolume = vol == undefined ? 1 : parseFloat(vol);
        vol = cc.sys.localStorage.getItem(SoundStorageKey.EffectVolume);
        this._effectMusicVolume = vol == undefined ? 1 : parseFloat(vol);
        this.initGameListener();
    }
    AudioMgr.Ins = function () {
        if (!this._instance) {
            this._instance = new AudioMgr();
        }
        return this._instance;
    };
    AudioMgr.setFinishCallBack = function (audioID, callback) {
        cc.audioEngine.setFinishCallback(audioID, callback);
    };
    /** 注册监听事件 */
    AudioMgr.prototype.initGameListener = function () {
        var _this = this;
        // 隐藏之前的音乐ID
        var beforeHidPath = "";
        // 当前音乐的播放时长
        var duraiton = 0;
        // 恢复时当前如果没有音乐正在播放则恢复到挂起之前的音乐已经播放的时间。
        cc.game.on(cc.game.EVENT_SHOW, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (beforeHidPath) {
                if (_this.getMusicID() == INVALID_MUSIC_ID) {
                    _this.playMusic(beforeHidPath);
                    if (_this.getMusicID() != INVALID_MUSIC_ID) {
                        cc.audioEngine.setCurrentTime(_this.getMusicID(), duraiton);
                    }
                }
            }
        });
        // 挂起时记录当前音乐ID和播放时间。
        cc.game.on(cc.game.EVENT_HIDE, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.getMusicID() == INVALID_MUSIC_ID)
                return;
            beforeHidPath = _this._bgMusicPath;
            if (!beforeHidPath)
                return;
            duraiton = cc.audioEngine.getCurrentTime(_this.getMusicID());
            _this.stopMusic(false);
        });
    };
    AudioMgr.prototype.getUrl = function (subPath) {
        return cc.url.raw("resources" + subPath);
    };
    AudioMgr.prototype.setMusicVolume = function (volume, record) {
        if (record === void 0) { record = true; }
        if (record) {
            this._bgMusicVolume = volume;
            cc.sys.localStorage.setItem(SoundStorageKey.MusicVolume, volume.toFixed(2).toString());
        }
        cc.audioEngine.setMusicVolume(volume * this._soundScale);
        if (this.getMusicID() != INVALID_MUSIC_ID) {
            // cc.audioEngine.setMusicVolume(volume * this._soundScale);
        }
        else if (volume > 0) {
            if (!!this._bgMusicPath) {
                var path = this._bgMusicPath;
                this._bgMusicPath = null;
                this.playMusic(path);
            }
            else if (this._curLoadMusicPath != null) {
                this.playMusic(this._curLoadMusicPath);
            }
        }
    };
    AudioMgr.prototype.setEffectVolume = function (volume) {
        this._effectMusicVolume = volume;
        cc.sys.localStorage.setItem(SoundStorageKey.EffectVolume, volume.toFixed(2).toString());
    };
    AudioMgr.prototype.playMusic = function (path) {
        var _this = this;
        if (this._bgMusicPath == path)
            return;
        this._curLoadMusicPath = GLoader_1.GAssetImpl.realUrl(path);
        if (this._bgMusicVolume <= 0)
            return;
        if (this.getMusicID() != INVALID_MUSIC_ID) {
            this.stopMusic();
        }
        GLoader_1.GLoader.audioClip(path, function (clip) {
            if (path != _this._curLoadMusicPath)
                return;
            var musicID = cc.audioEngine.playMusic(clip, true);
            if (musicID >= 0) {
                cc.audioEngine.setMusicVolume(_this._bgMusicVolume * _this._soundScale);
                _this.setMusicID(musicID);
                _this.setMusicName(path);
            }
        });
    };
    AudioMgr.prototype.playLastMusic = function () {
        if (!this._lastBgMusicPath)
            return;
        this.playMusic(this._lastBgMusicPath);
    };
    AudioMgr.prototype.stopMusic = function (recordLastMusicId) {
        if (recordLastMusicId === void 0) { recordLastMusicId = true; }
        if (this.getMusicID() == INVALID_MUSIC_ID)
            return;
        if (recordLastMusicId)
            this._lastBgMusicPath = this._bgMusicPath;
        cc.audioEngine.stopMusic();
        this.setMusicID(INVALID_MUSIC_ID);
        this.setMusicName("");
    };
    AudioMgr.prototype.playEffect = function (path, playCb, endCb) {
        var _this = this;
        if (this._effectMusicVolume <= 0)
            return;
        GLoader_1.GLoader.audioClip(path, function (clip) {
            var effectId = cc.audioEngine.play(clip, false, _this._effectMusicVolume * _this._soundScale);
            if (playCb && effectId >= 0) {
                playCb(path, effectId);
            }
            if (endCb && effectId >= 0) {
                cc.audioEngine.setFinishCallback(effectId, function () {
                    endCb(path, effectId);
                });
            }
        });
    };
    AudioMgr.prototype.stopAll = function () {
        this.stopMusic();
        cc.audioEngine.stopAll();
    };
    AudioMgr.prototype.pauseAll = function () {
        cc.audioEngine.pauseAll();
    };
    AudioMgr.prototype.resumeAll = function () {
        cc.audioEngine.resumeAll();
    };
    AudioMgr.prototype.getMusicName = function () {
        return this._bgMusicPath;
    };
    AudioMgr.prototype.setMusicName = function (path) {
        this._bgMusicPath = path;
        cc.sys.localStorage.setItem(SoundStorageKey.MusicName, path);
    };
    AudioMgr.prototype.getMusicID = function () {
        return this._bgMusicId;
    };
    AudioMgr.prototype.setMusicID = function (musicID) {
        this._bgMusicId = musicID;
    };
    AudioMgr.prototype.getMusicVolume = function () {
        return this._bgMusicVolume;
    };
    AudioMgr.prototype.getEffectVolume = function () {
        return this._effectMusicVolume;
    };
    AudioMgr._instance = null;
    return AudioMgr;
}());
exports.AudioMgr = AudioMgr;

cc._RF.pop();