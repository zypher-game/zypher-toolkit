
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/GNet/GHttpClient.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ff4feD8bIRMHrb9OKVN/+um', 'GHttpClient');
// Script/Core/GNet/GHttpClient.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ccclass = cc._decorator.ccclass;
var GHttpClient = /** @class */ (function () {
    function GHttpClient() {
    }
    GHttpClient_1 = GHttpClient;
    GHttpClient.get = function (path, data, handler, extraUrl) {
        // var xhr = cc.loader.getXMLHttpRequest();
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        var str = "?";
        for (var k in data) {
            if (str != "?") {
                str += "&";
            }
            str += k + "=" + data[k];
        }
        if (extraUrl == null)
            extraUrl = GHttpClient_1.url;
        var requestURL = extraUrl + path + str;
        cc.log("RequestURL:" + requestURL);
        xhr.open("GET", requestURL, true);
        // if (cc.sys.isNative){
        //     xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        //     xhr.setRequestHeader("CONTENT-TYPE", "text/html;charset=UTF-8");
        // }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                cc.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(null, ret);
                    } /* code */
                }
                catch (e) {
                    if (handler !== null) {
                        handler(e);
                    }
                }
                finally {
                }
            }
        };
        xhr.send();
        return xhr;
    };
    GHttpClient.post = function (path, data, handler, extraUrl) {
        // var xhr = cc.loader.getXMLHttpRequest();
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        if (extraUrl == null)
            extraUrl = GHttpClient_1.url;
        var requestURL = extraUrl + path;
        cc.log("RequestURL:" + requestURL);
        xhr.open("POST", requestURL, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                cc.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                try {
                    var ret = JSON.parse(xhr.responseText);
                    if (handler !== null) {
                        handler(ret);
                    }
                }
                catch (e) {
                    cc.log("err:" + e);
                    //handler(null);
                }
                finally {
                }
            }
        };
        xhr.send(JSON.stringify(data));
        return xhr;
    };
    var GHttpClient_1;
    GHttpClient.url = "";
    GHttpClient = GHttpClient_1 = __decorate([
        ccclass
    ], GHttpClient);
    return GHttpClient;
}());
exports.default = GHttpClient;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9HTmV0L0dIdHRwQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFFbEM7SUFBQTtJQStFQSxDQUFDO29CQS9Fb0IsV0FBVztJQUdoQixlQUFHLEdBQWpCLFVBQ0UsSUFBWSxFQUNaLElBQVMsRUFDVCxPQUFZLEVBQ1osUUFBaUI7UUFFakIsMkNBQTJDO1FBQzNDLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDL0IsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2QsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDbEIsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO2dCQUNkLEdBQUcsSUFBSSxHQUFHLENBQUM7YUFDWjtZQUNELEdBQUcsSUFBTyxDQUFDLFNBQUksSUFBSSxDQUFDLENBQUMsQ0FBRyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxRQUFRLElBQUksSUFBSTtZQUFFLFFBQVEsR0FBRyxhQUFXLENBQUMsR0FBRyxDQUFDO1FBQ2pELElBQUksVUFBVSxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsQyx3QkFBd0I7UUFDeEIsOERBQThEO1FBQzlELHVFQUF1RTtRQUN2RSxJQUFJO1FBQ0osR0FBRyxDQUFDLGtCQUFrQixHQUFHO1lBQ3ZCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ2pFLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3hFLElBQUk7b0JBQ0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3ZDLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTt3QkFDcEIsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztxQkFDcEIsQ0FBQyxVQUFVO2lCQUNiO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTt3QkFDcEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNaO2lCQUNGO3dCQUFTO2lCQUNUO2FBQ0Y7UUFDSCxDQUFDLENBQUM7UUFFRixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFYSxnQkFBSSxHQUFsQixVQUNFLElBQVksRUFDWixJQUFTLEVBQ1QsT0FBWSxFQUNaLFFBQWlCO1FBRWpCLDJDQUEyQztRQUMzQyxJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksUUFBUSxJQUFJLElBQUk7WUFBRSxRQUFRLEdBQUcsYUFBVyxDQUFDLEdBQUcsQ0FBQztRQUNqRCxJQUFJLFVBQVUsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxHQUFHLENBQUMsa0JBQWtCLEdBQUc7WUFDdkIsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtnQkFDakUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDeEUsSUFBSTtvQkFDRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO3dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2Q7aUJBQ0Y7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLGdCQUFnQjtpQkFDakI7d0JBQVM7aUJBQ1Q7YUFDRjtRQUNILENBQUMsQ0FBQztRQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7SUE3RWEsZUFBRyxHQUFXLEVBQUUsQ0FBQztJQURaLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0ErRS9CO0lBQUQsa0JBQUM7Q0EvRUQsQUErRUMsSUFBQTtrQkEvRW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdIdHRwQ2xpZW50IHtcclxuICBwdWJsaWMgc3RhdGljIHVybDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBnZXQoXHJcbiAgICBwYXRoOiBzdHJpbmcsXHJcbiAgICBkYXRhOiBhbnksXHJcbiAgICBoYW5kbGVyOiBhbnksXHJcbiAgICBleHRyYVVybD86IHN0cmluZ1xyXG4gICk6IFhNTEh0dHBSZXF1ZXN0IHtcclxuICAgIC8vIHZhciB4aHIgPSBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci50aW1lb3V0ID0gNTAwMDtcclxuICAgIHZhciBzdHIgPSBcIj9cIjtcclxuICAgIGZvciAobGV0IGsgaW4gZGF0YSkge1xyXG4gICAgICBpZiAoc3RyICE9IFwiP1wiKSB7XHJcbiAgICAgICAgc3RyICs9IFwiJlwiO1xyXG4gICAgICB9XHJcbiAgICAgIHN0ciArPSBgJHtrfT0ke2RhdGFba119YDtcclxuICAgIH1cclxuICAgIGlmIChleHRyYVVybCA9PSBudWxsKSBleHRyYVVybCA9IEdIdHRwQ2xpZW50LnVybDtcclxuICAgIHZhciByZXF1ZXN0VVJMID0gZXh0cmFVcmwgKyBwYXRoICsgc3RyO1xyXG4gICAgY2MubG9nKFwiUmVxdWVzdFVSTDpcIiArIHJlcXVlc3RVUkwpO1xyXG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgcmVxdWVzdFVSTCwgdHJ1ZSk7XHJcbiAgICAvLyBpZiAoY2Muc3lzLmlzTmF0aXZlKXtcclxuICAgIC8vICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdC1FbmNvZGluZ1wiLFwiZ3ppcCxkZWZsYXRlXCIpO1xyXG4gICAgLy8gICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ09OVEVOVC1UWVBFXCIsIFwidGV4dC9odG1sO2NoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAvLyB9XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xyXG4gICAgICAgIGNjLmxvZyhcImh0dHAgcmVzKFwiICsgeGhyLnJlc3BvbnNlVGV4dC5sZW5ndGggKyBcIik6XCIgKyB4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgdmFyIHJldCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICBpZiAoaGFuZGxlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBoYW5kbGVyKG51bGwsIHJldCk7XHJcbiAgICAgICAgICB9IC8qIGNvZGUgKi9cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBpZiAoaGFuZGxlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBoYW5kbGVyKGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5zZW5kKCk7XHJcbiAgICByZXR1cm4geGhyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBwb3N0KFxyXG4gICAgcGF0aDogc3RyaW5nLFxyXG4gICAgZGF0YTogYW55LFxyXG4gICAgaGFuZGxlcjogYW55LFxyXG4gICAgZXh0cmFVcmw/OiBzdHJpbmdcclxuICApOiBYTUxIdHRwUmVxdWVzdCB7XHJcbiAgICAvLyB2YXIgeGhyID0gY2MubG9hZGVyLmdldFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIudGltZW91dCA9IDUwMDA7XHJcbiAgICBpZiAoZXh0cmFVcmwgPT0gbnVsbCkgZXh0cmFVcmwgPSBHSHR0cENsaWVudC51cmw7XHJcbiAgICB2YXIgcmVxdWVzdFVSTCA9IGV4dHJhVXJsICsgcGF0aDtcclxuICAgIGNjLmxvZyhcIlJlcXVlc3RVUkw6XCIgKyByZXF1ZXN0VVJMKTtcclxuICAgIHhoci5vcGVuKFwiUE9TVFwiLCByZXF1ZXN0VVJMLCB0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgY2MubG9nKFwiaHR0cCByZXMoXCIgKyB4aHIucmVzcG9uc2VUZXh0Lmxlbmd0aCArIFwiKTpcIiArIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB2YXIgcmV0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgIGlmIChoYW5kbGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXIocmV0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBjYy5sb2coXCJlcnI6XCIgKyBlKTtcclxuICAgICAgICAgIC8vaGFuZGxlcihudWxsKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIHJldHVybiB4aHI7XHJcbiAgfVxyXG59XHJcbiJdfQ==