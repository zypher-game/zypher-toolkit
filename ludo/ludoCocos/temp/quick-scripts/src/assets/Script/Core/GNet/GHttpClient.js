"use strict";
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