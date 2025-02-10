
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/Manager/AudioMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9NYW5hZ2VyL0F1ZGlvTWdyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7R0FFRzs7O0FBRUgsOENBQXlEO0FBRXpELElBQVksZUFJWDtBQUpELFdBQVksZUFBZTtJQUN6QiwrQ0FBNEIsQ0FBQTtJQUM1QiwyQ0FBd0IsQ0FBQTtJQUN4QixpREFBOEIsQ0FBQTtBQUNoQyxDQUFDLEVBSlcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFJMUI7QUFFRCxJQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVCO0lBcUJFO1FBUlUsZUFBVSxHQUFHLGdCQUFnQixDQUFDO1FBQzlCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUNsQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRTVCLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxrQkFBa0IsR0FB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QUFVLEdBQWpCLFVBQWtCLE9BQWU7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVNLGlDQUFjLEdBQXJCO1FBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzdCLENBQUM7SUFFTSxrQ0FBZSxHQUF0QjtRQUNFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pDLENBQUM7SUFqTGMsa0JBQVMsR0FBYSxJQUFJLENBQUM7SUFrTDVDLGVBQUM7Q0FuTEQsQUFtTEMsSUFBQTtBQW5MWSw0QkFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDpn7PpopHmkq3mlL7nrqHnkIbnsbtcclxuICovXHJcblxyXG5pbXBvcnQgeyBHQXNzZXRJbXBsLCBHTG9hZGVyIH0gZnJvbSBcIi4uL0dMb2FkZXIvR0xvYWRlclwiO1xyXG5cclxuZXhwb3J0IGVudW0gU291bmRTdG9yYWdlS2V5IHtcclxuICBNdXNpY1ZvbHVtZSA9IFwibXVzaWNfdm9sdW1lXCIsXHJcbiAgTXVzaWNOYW1lID0gXCJtdXNpY19uYW1lXCIsXHJcbiAgRWZmZWN0Vm9sdW1lID0gXCJlZmZlY3RfVm9sdW1lXCIsXHJcbn1cclxuXHJcbmNvbnN0IElOVkFMSURfTVVTSUNfSUQgPSAtMTtcclxuZXhwb3J0IGNsYXNzIEF1ZGlvTWdyIHtcclxuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEF1ZGlvTWdyID0gbnVsbDtcclxuICBwdWJsaWMgc3RhdGljIElucygpIHtcclxuICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgQXVkaW9NZ3IoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgc2V0RmluaXNoQ2FsbEJhY2soYXVkaW9JRDogbnVtYmVyLCBjYWxsYmFjazogYW55KSB7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5zZXRGaW5pc2hDYWxsYmFjayhhdWRpb0lELCBjYWxsYmFjayk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgX2JnTXVzaWNJZCA9IElOVkFMSURfTVVTSUNfSUQ7XHJcbiAgcHJvdGVjdGVkIF9iZ011c2ljUGF0aCA9IFwiXCI7XHJcbiAgcHJvdGVjdGVkIF9sYXN0QmdNdXNpY1BhdGggPSBcIlwiO1xyXG4gIHByb3RlY3RlZCBfc291bmRTY2FsZSA9IDAuNjtcclxuICBwcm90ZWN0ZWQgX2JnTXVzaWNWb2x1bWUgPSAxO1xyXG4gIHByb3RlY3RlZCBfZWZmZWN0TXVzaWNWb2x1bWUgPSAxO1xyXG4gIHByb3RlY3RlZCBfY3VyTG9hZE11c2ljUGF0aCA9IFwiXCI7XHJcbiAgcHJvdGVjdGVkIF9sb29wZWZmRWN0ID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9iZ011c2ljSWQgPSBJTlZBTElEX01VU0lDX0lEO1xyXG4gICAgdGhpcy5fYmdNdXNpY1BhdGggPSBcIlwiO1xyXG4gICAgbGV0IHZvbCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShTb3VuZFN0b3JhZ2VLZXkuTXVzaWNWb2x1bWUpO1xyXG4gICAgdGhpcy5fYmdNdXNpY1ZvbHVtZSA9IHZvbCA9PSB1bmRlZmluZWQgPyAxIDogcGFyc2VGbG9hdCh2b2wpO1xyXG4gICAgdm9sID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFNvdW5kU3RvcmFnZUtleS5FZmZlY3RWb2x1bWUpO1xyXG4gICAgdGhpcy5fZWZmZWN0TXVzaWNWb2x1bWUgPSB2b2wgPT0gdW5kZWZpbmVkID8gMSA6IHBhcnNlRmxvYXQodm9sKTtcclxuICAgIHRoaXMuaW5pdEdhbWVMaXN0ZW5lcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqIOazqOWGjOebkeWQrOS6i+S7tiAqL1xyXG4gIHB1YmxpYyBpbml0R2FtZUxpc3RlbmVyKCkge1xyXG4gICAgLy8g6ZqQ6JeP5LmL5YmN55qE6Z+z5LmQSURcclxuICAgIGxldCBiZWZvcmVIaWRQYXRoID0gXCJcIjtcclxuICAgIC8vIOW9k+WJjemfs+S5kOeahOaSreaUvuaXtumVv1xyXG4gICAgbGV0IGR1cmFpdG9uID0gMDtcclxuICAgIC8vIOaBouWkjeaXtuW9k+WJjeWmguaenOayoeaciemfs+S5kOato+WcqOaSreaUvuWImeaBouWkjeWIsOaMgui1t+S5i+WJjeeahOmfs+S5kOW3sue7j+aSreaUvueahOaXtumXtOOAglxyXG4gICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csICguLi5hcmdzOiBhbnlbXSkgPT4ge1xyXG4gICAgICBpZiAoYmVmb3JlSGlkUGF0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldE11c2ljSUQoKSA9PSBJTlZBTElEX01VU0lDX0lEKSB7XHJcbiAgICAgICAgICB0aGlzLnBsYXlNdXNpYyhiZWZvcmVIaWRQYXRoKTtcclxuICAgICAgICAgIGlmICh0aGlzLmdldE11c2ljSUQoKSAhPSBJTlZBTElEX01VU0lDX0lEKSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEN1cnJlbnRUaW1lKHRoaXMuZ2V0TXVzaWNJRCgpLCBkdXJhaXRvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIOaMgui1t+aXtuiusOW9leW9k+WJjemfs+S5kElE5ZKM5pKt5pS+5pe26Ze044CCXHJcbiAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgKC4uLmFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmdldE11c2ljSUQoKSA9PSBJTlZBTElEX01VU0lDX0lEKSByZXR1cm47XHJcbiAgICAgIGJlZm9yZUhpZFBhdGggPSB0aGlzLl9iZ011c2ljUGF0aDtcclxuICAgICAgaWYgKCFiZWZvcmVIaWRQYXRoKSByZXR1cm47XHJcbiAgICAgIGR1cmFpdG9uID0gY2MuYXVkaW9FbmdpbmUuZ2V0Q3VycmVudFRpbWUodGhpcy5nZXRNdXNpY0lEKCkpO1xyXG4gICAgICB0aGlzLnN0b3BNdXNpYyhmYWxzZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRVcmwoc3ViUGF0aCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gY2MudXJsLnJhdyhcInJlc291cmNlc1wiICsgc3ViUGF0aCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0TXVzaWNWb2x1bWUodm9sdW1lOiBudW1iZXIsIHJlY29yZDogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgIGlmIChyZWNvcmQpIHtcclxuICAgICAgdGhpcy5fYmdNdXNpY1ZvbHVtZSA9IHZvbHVtZTtcclxuICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICAgIFNvdW5kU3RvcmFnZUtleS5NdXNpY1ZvbHVtZSxcclxuICAgICAgICB2b2x1bWUudG9GaXhlZCgyKS50b1N0cmluZygpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5zZXRNdXNpY1ZvbHVtZSh2b2x1bWUgKiB0aGlzLl9zb3VuZFNjYWxlKTtcclxuICAgIGlmICh0aGlzLmdldE11c2ljSUQoKSAhPSBJTlZBTElEX01VU0lDX0lEKSB7XHJcbiAgICAgIC8vIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKHZvbHVtZSAqIHRoaXMuX3NvdW5kU2NhbGUpO1xyXG4gICAgfSBlbHNlIGlmICh2b2x1bWUgPiAwKSB7XHJcbiAgICAgIGlmICghIXRoaXMuX2JnTXVzaWNQYXRoKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLl9iZ011c2ljUGF0aDtcclxuICAgICAgICB0aGlzLl9iZ011c2ljUGF0aCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wbGF5TXVzaWMocGF0aCk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fY3VyTG9hZE11c2ljUGF0aCAhPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5TXVzaWModGhpcy5fY3VyTG9hZE11c2ljUGF0aCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRFZmZlY3RWb2x1bWUodm9sdW1lOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2VmZmVjdE11c2ljVm9sdW1lID0gdm9sdW1lO1xyXG4gICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICBTb3VuZFN0b3JhZ2VLZXkuRWZmZWN0Vm9sdW1lLFxyXG4gICAgICB2b2x1bWUudG9GaXhlZCgyKS50b1N0cmluZygpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBsYXlNdXNpYyhwYXRoOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLl9iZ011c2ljUGF0aCA9PSBwYXRoKSByZXR1cm47XHJcbiAgICB0aGlzLl9jdXJMb2FkTXVzaWNQYXRoID0gR0Fzc2V0SW1wbC5yZWFsVXJsKHBhdGgpO1xyXG4gICAgaWYgKHRoaXMuX2JnTXVzaWNWb2x1bWUgPD0gMCkgcmV0dXJuO1xyXG4gICAgaWYgKHRoaXMuZ2V0TXVzaWNJRCgpICE9IElOVkFMSURfTVVTSUNfSUQpIHtcclxuICAgICAgdGhpcy5zdG9wTXVzaWMoKTtcclxuICAgIH1cclxuICAgIEdMb2FkZXIuYXVkaW9DbGlwKHBhdGgsIChjbGlwOiBjYy5BdWRpb0NsaXApID0+IHtcclxuICAgICAgaWYgKHBhdGggIT0gdGhpcy5fY3VyTG9hZE11c2ljUGF0aCkgcmV0dXJuO1xyXG4gICAgICBsZXQgbXVzaWNJRCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyhjbGlwLCB0cnVlKTtcclxuICAgICAgaWYgKG11c2ljSUQgPj0gMCkge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKHRoaXMuX2JnTXVzaWNWb2x1bWUgKiB0aGlzLl9zb3VuZFNjYWxlKTtcclxuICAgICAgICB0aGlzLnNldE11c2ljSUQobXVzaWNJRCk7XHJcbiAgICAgICAgdGhpcy5zZXRNdXNpY05hbWUocGF0aCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHBsYXlMYXN0TXVzaWMoKSB7XHJcbiAgICBpZiAoIXRoaXMuX2xhc3RCZ011c2ljUGF0aCkgcmV0dXJuO1xyXG4gICAgdGhpcy5wbGF5TXVzaWModGhpcy5fbGFzdEJnTXVzaWNQYXRoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdG9wTXVzaWMocmVjb3JkTGFzdE11c2ljSWQ6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICBpZiAodGhpcy5nZXRNdXNpY0lEKCkgPT0gSU5WQUxJRF9NVVNJQ19JRCkgcmV0dXJuO1xyXG4gICAgaWYgKHJlY29yZExhc3RNdXNpY0lkKSB0aGlzLl9sYXN0QmdNdXNpY1BhdGggPSB0aGlzLl9iZ011c2ljUGF0aDtcclxuICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgdGhpcy5zZXRNdXNpY0lEKElOVkFMSURfTVVTSUNfSUQpO1xyXG4gICAgdGhpcy5zZXRNdXNpY05hbWUoXCJcIik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGxheUVmZmVjdChwYXRoOiBzdHJpbmcsIHBsYXlDYj8sIGVuZENiPyk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2VmZmVjdE11c2ljVm9sdW1lIDw9IDApIHJldHVybjtcclxuICAgIEdMb2FkZXIuYXVkaW9DbGlwKHBhdGgsIChjbGlwOiBjYy5BdWRpb0NsaXApID0+IHtcclxuICAgICAgbGV0IGVmZmVjdElkID0gY2MuYXVkaW9FbmdpbmUucGxheShcclxuICAgICAgICBjbGlwLFxyXG4gICAgICAgIGZhbHNlLFxyXG4gICAgICAgIHRoaXMuX2VmZmVjdE11c2ljVm9sdW1lICogdGhpcy5fc291bmRTY2FsZVxyXG4gICAgICApO1xyXG4gICAgICBpZiAocGxheUNiICYmIGVmZmVjdElkID49IDApIHtcclxuICAgICAgICBwbGF5Q2IocGF0aCwgZWZmZWN0SWQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlbmRDYiAmJiBlZmZlY3RJZCA+PSAwKSB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RmluaXNoQ2FsbGJhY2soZWZmZWN0SWQsICgpID0+IHtcclxuICAgICAgICAgIGVuZENiKHBhdGgsIGVmZmVjdElkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RvcEFsbCgpIHtcclxuICAgIHRoaXMuc3RvcE11c2ljKCk7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5zdG9wQWxsKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcGF1c2VBbGwoKSB7XHJcbiAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZUFsbCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc3VtZUFsbCgpIHtcclxuICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZUFsbCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE11c2ljTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2JnTXVzaWNQYXRoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE11c2ljTmFtZShwYXRoOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2JnTXVzaWNQYXRoID0gcGF0aDtcclxuICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShTb3VuZFN0b3JhZ2VLZXkuTXVzaWNOYW1lLCBwYXRoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNdXNpY0lEKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fYmdNdXNpY0lkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE11c2ljSUQobXVzaWNJRDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9iZ011c2ljSWQgPSBtdXNpY0lEO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE11c2ljVm9sdW1lKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fYmdNdXNpY1ZvbHVtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRFZmZlY3RWb2x1bWUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9lZmZlY3RNdXNpY1ZvbHVtZTtcclxuICB9XHJcbn1cclxuIl19