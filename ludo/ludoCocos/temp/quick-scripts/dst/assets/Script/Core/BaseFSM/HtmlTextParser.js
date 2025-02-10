
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/BaseFSM/HtmlTextParser.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '38165MEgopO264Gw0SwcJxH', 'HtmlTextParser');
// Script/Core/BaseFSM/HtmlTextParser.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlTextParser = void 0;
var eventRegx = /^(click)(\s)*=|(param)(\s)*=/;
var imageAttrReg = /(\s)*src(\s)*=|(\s)*height(\s)*=|(\s)*width(\s)*=|(\s)*align(\s)*=|(\s)*offset(\s)*=|(\s)*click(\s)*=|(\s)*param(\s)*=/;
var HtmlTextParser = /** @class */ (function () {
    function HtmlTextParser() {
        this._parsedObject = {};
        this._specialSymbolArray = [];
        this._resultObjectArray = [];
        this._stack = [];
        this._specialSymbolArray.push([/&lt;/g, "<"]);
        this._specialSymbolArray.push([/&gt;/g, ">"]);
        this._specialSymbolArray.push([/&amp;/g, "&"]);
        this._specialSymbolArray.push([/&quot;/g, '"']);
        this._specialSymbolArray.push([/&apos;/g, "'"]);
        this._specialSymbolArray.push([/&nbsp;/g, " "]);
    }
    Object.defineProperty(HtmlTextParser, "ins", {
        get: function () {
            if (!this._ins) {
                this._ins = new HtmlTextParser();
            }
            return this._ins;
        },
        enumerable: false,
        configurable: true
    });
    HtmlTextParser.prototype.parse = function (htmlString) {
        this._resultObjectArray = [];
        this._stack = [];
        var startIndex = 0;
        var length = htmlString.length;
        while (startIndex < length) {
            var tagEndIndex = htmlString.indexOf(">", startIndex);
            var tagBeginIndex = -1;
            if (tagEndIndex >= 0) {
                tagBeginIndex = htmlString.lastIndexOf("<", tagEndIndex);
                var noTagBegin = tagBeginIndex < startIndex - 1;
                if (noTagBegin) {
                    tagBeginIndex = htmlString.indexOf("<", tagEndIndex + 1);
                    tagEndIndex = htmlString.indexOf(">", tagBeginIndex + 1);
                }
            }
            if (tagBeginIndex < 0) {
                this._stack.pop();
                this._processResult(htmlString.substring(startIndex));
                startIndex = length;
            }
            else {
                var newStr = htmlString.substring(startIndex, tagBeginIndex);
                var tagStr = htmlString.substring(tagBeginIndex + 1, tagEndIndex);
                if (tagStr === "")
                    newStr = htmlString.substring(startIndex, tagEndIndex + 1);
                this._processResult(newStr);
                if (tagEndIndex === -1) {
                    // cc.error('The HTML tag is invalid!');
                    tagEndIndex = tagBeginIndex;
                }
                else if (htmlString.charAt(tagBeginIndex + 1) === "/") {
                    this._stack.pop();
                }
                else {
                    this._addToStack(tagStr);
                }
                startIndex = tagEndIndex + 1;
            }
        }
        return this._resultObjectArray;
    };
    HtmlTextParser.prototype._processResult = function (value) {
        if (value === "") {
            return;
        }
        value = this._escapeSpecialSymbol(value);
        if (this._stack.length > 0) {
            this._resultObjectArray.push({
                text: value,
                style: this._stack[this._stack.length - 1],
            });
        }
        else {
            this._resultObjectArray.push({ text: value });
        }
    };
    HtmlTextParser.prototype._escapeSpecialSymbol = function (str) {
        for (var i = 0; i < this._specialSymbolArray.length; ++i) {
            var key = this._specialSymbolArray[i][0];
            var value = this._specialSymbolArray[i][1];
            str = str.replace(key, value);
        }
        return str;
    };
    HtmlTextParser.prototype._addToStack = function (attribute) {
        var obj = this._attributeToObject(attribute);
        if (this._stack.length === 0) {
            this._stack.push(obj);
        }
        else {
            if (obj.isNewLine || obj.isImage) {
                return;
            }
            //for nested tags
            var previousTagObj = this._stack[this._stack.length - 1];
            for (var key in previousTagObj) {
                if (!obj[key]) {
                    obj[key] = previousTagObj[key];
                }
            }
            this._stack.push(obj);
        }
    };
    HtmlTextParser.prototype._attributeToObject = function (attribute) {
        attribute = attribute.trim();
        var obj = {};
        var header = attribute.match(/^(color|size)(\s)*=/);
        var tagName;
        var nextSpace;
        var eventObj;
        var eventHanlderString;
        if (header) {
            tagName = header[0];
            attribute = attribute.substring(tagName.length).trim();
            if (attribute === "")
                return obj;
            //parse color
            nextSpace = attribute.indexOf(" ");
            switch (tagName[0]) {
                case "c":
                    if (nextSpace > -1) {
                        obj.color = attribute.substring(0, nextSpace).trim();
                    }
                    else {
                        obj.color = attribute;
                    }
                    break;
                case "s":
                    obj.size = parseInt(attribute);
                    break;
            }
            //tag has event arguments
            if (nextSpace > -1) {
                eventHanlderString = attribute.substring(nextSpace + 1).trim();
                eventObj = this._processEventHandler(eventHanlderString);
                obj.event = eventObj;
            }
            return obj;
        }
        header = attribute.match(/^(br(\s)*\/)/);
        if (header && header[0].length > 0) {
            tagName = header[0].trim();
            if (tagName.startsWith("br") && tagName[tagName.length - 1] === "/") {
                obj.isNewLine = true;
                this._resultObjectArray.push({ text: "", style: { newline: true } });
                return obj;
            }
        }
        header = attribute.match(/^(img(\s)*src(\s)*=[^>]+\/)/);
        if (header && header[0].length > 0) {
            tagName = header[0].trim();
            if (tagName.startsWith("img") && tagName[tagName.length - 1] === "/") {
                header = attribute.match(imageAttrReg);
                var tagValue;
                var remainingArgument;
                var isValidImageTag = false;
                while (header) {
                    //skip the invalid tags at first
                    attribute = attribute.substring(attribute.indexOf(header[0]));
                    tagName = attribute.substr(0, header[0].length);
                    //remove space and = character
                    remainingArgument = attribute.substring(tagName.length).trim();
                    nextSpace = remainingArgument.indexOf(" ");
                    tagValue =
                        nextSpace > -1
                            ? remainingArgument.substr(0, nextSpace)
                            : remainingArgument;
                    tagName = tagName.replace(/[^a-zA-Z]/g, "").trim();
                    tagName = tagName.toLocaleLowerCase();
                    attribute = remainingArgument.substring(nextSpace).trim();
                    if (tagValue.endsWith("/"))
                        tagValue = tagValue.slice(0, -1);
                    if (tagName === "src") {
                        switch (tagValue.charCodeAt(0)) {
                            case 34: // "
                            case 39: // '
                                isValidImageTag = true;
                                tagValue = tagValue.slice(1, -1);
                                break;
                        }
                        obj.isImage = true;
                        obj.src = tagValue;
                    }
                    else if (tagName === "height") {
                        obj.imageHeight = parseInt(tagValue);
                    }
                    else if (tagName === "width") {
                        obj.imageWidth = parseInt(tagValue);
                    }
                    else if (tagName === "align") {
                        switch (tagValue.charCodeAt(0)) {
                            case 34: // "
                            case 39: // '
                                tagValue = tagValue.slice(1, -1);
                                break;
                        }
                        obj.imageAlign = tagValue.toLocaleLowerCase();
                    }
                    else if (tagName === "offset") {
                        obj.imageOffset = tagValue;
                    }
                    else if (tagName === "click") {
                        obj.event = this._processEventHandler(tagName + "=" + tagValue);
                    }
                    if (obj.event && tagName === "param") {
                        obj.event.param = tagValue.replace(/^\"|\"$/g, "");
                    }
                    header = attribute.match(imageAttrReg);
                }
                if (isValidImageTag && obj.isImage) {
                    this._resultObjectArray.push({ text: "", style: obj });
                }
                return {};
            }
        }
        header = attribute.match(/^(outline(\s)*[^>]*)/);
        if (header) {
            attribute = header[0].substring("outline".length).trim();
            var defaultOutlineObject = { color: "#ffffff", width: 1 };
            if (attribute) {
                var outlineAttrReg = /(\s)*color(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=|(\s)*param(\s)*=/;
                header = attribute.match(outlineAttrReg);
                var tagValue;
                while (header) {
                    //skip the invalid tags at first
                    attribute = attribute.substring(attribute.indexOf(header[0]));
                    tagName = attribute.substr(0, header[0].length);
                    //remove space and = character
                    remainingArgument = attribute.substring(tagName.length).trim();
                    nextSpace = remainingArgument.indexOf(" ");
                    if (nextSpace > -1) {
                        tagValue = remainingArgument.substr(0, nextSpace);
                    }
                    else {
                        tagValue = remainingArgument;
                    }
                    tagName = tagName.replace(/[^a-zA-Z]/g, "").trim();
                    tagName = tagName.toLocaleLowerCase();
                    attribute = remainingArgument.substring(nextSpace).trim();
                    if (tagName === "click") {
                        obj.event = this._processEventHandler(tagName + "=" + tagValue);
                    }
                    else if (tagName === "color") {
                        defaultOutlineObject.color = tagValue;
                    }
                    else if (tagName === "width") {
                        defaultOutlineObject.width = parseInt(tagValue);
                    }
                    if (obj.event && tagName === "param") {
                        obj.event.param = tagValue.replace(/^\"|\"$/g, "");
                    }
                    header = attribute.match(outlineAttrReg);
                }
            }
            obj.outline = defaultOutlineObject;
        }
        header = attribute.match(/^(on|u|b|i)(\s)*/);
        if (header && header[0].length > 0) {
            tagName = header[0];
            attribute = attribute.substring(tagName.length).trim();
            switch (tagName[0]) {
                case "u":
                    obj.underline = true;
                    break;
                case "i":
                    obj.italic = true;
                    break;
                case "b":
                    obj.bold = true;
                    break;
            }
            if (attribute === "") {
                return obj;
            }
            eventObj = this._processEventHandler(attribute);
            obj.event = eventObj;
        }
        return obj;
    };
    HtmlTextParser.prototype._processEventHandler = function (eventString) {
        var index = 0;
        var obj = {};
        var eventNames = eventString.match(eventRegx);
        var isValidTag = false;
        while (eventNames) {
            var eventName = eventNames[0];
            var eventValue = "";
            isValidTag = false;
            eventString = eventString.substring(eventName.length).trim();
            if (eventString.charAt(0) === '"') {
                index = eventString.indexOf('"', 1);
                if (index > -1) {
                    eventValue = eventString.substring(1, index).trim();
                    isValidTag = true;
                }
                index++;
            }
            else if (eventString.charAt(0) === "'") {
                index = eventString.indexOf("'", 1);
                if (index > -1) {
                    eventValue = eventString.substring(1, index).trim();
                    isValidTag = true;
                }
                index++;
            }
            else {
                //skip the invalid attribute value
                var match = eventString.match(/(\S)+/);
                if (match) {
                    eventValue = match[0];
                }
                else {
                    eventValue = "";
                }
                index = eventValue.length;
            }
            if (isValidTag) {
                eventName = eventName.substring(0, eventName.length - 1).trim();
                obj[eventName] = eventValue;
            }
            eventString = eventString.substring(index).trim();
            eventNames = eventString.match(eventRegx);
        }
        return obj;
    };
    return HtmlTextParser;
}());
exports.HtmlTextParser = HtmlTextParser;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9CYXNlRlNNL0h0bWxUZXh0UGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sU0FBUyxHQUFHLDhCQUE4QixDQUFDO0FBQ2pELElBQU0sWUFBWSxHQUNoQix3SEFBd0gsQ0FBQztBQUMzSDtJQWFFO1FBWlEsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4QixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBVWxCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFiRCxzQkFBa0IscUJBQUc7YUFBckI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7YUFDbEM7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzs7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QUFDLENBQUM7Z0JBQ3BDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNkLFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDcEQsVUFBVSxHQUFHLElBQUksQ0FBQztpQkFDbkI7Z0JBQ0QsS0FBSyxFQUFFLENBQUM7YUFDVDtpQkFBTTtnQkFDTCxrQ0FBa0M7Z0JBQ2xDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksS0FBSyxFQUFFO29CQUNULFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNMLFVBQVUsR0FBRyxFQUFFLENBQUM7aUJBQ2pCO2dCQUNELEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO2FBQzNCO1lBRUQsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hFLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxVQUFVLENBQUM7YUFDN0I7WUFFRCxXQUFXLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsRCxVQUFVLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzQztRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FyVkEsQUFxVkMsSUFBQTtBQXJWWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV2ZW50UmVneCA9IC9eKGNsaWNrKShcXHMpKj18KHBhcmFtKShcXHMpKj0vO1xyXG5jb25zdCBpbWFnZUF0dHJSZWcgPVxyXG4gIC8oXFxzKSpzcmMoXFxzKSo9fChcXHMpKmhlaWdodChcXHMpKj18KFxccykqd2lkdGgoXFxzKSo9fChcXHMpKmFsaWduKFxccykqPXwoXFxzKSpvZmZzZXQoXFxzKSo9fChcXHMpKmNsaWNrKFxccykqPXwoXFxzKSpwYXJhbShcXHMpKj0vO1xyXG5leHBvcnQgY2xhc3MgSHRtbFRleHRQYXJzZXIge1xyXG4gIHByaXZhdGUgX3BhcnNlZE9iamVjdCA9IHt9O1xyXG4gIHByaXZhdGUgX3NwZWNpYWxTeW1ib2xBcnJheSA9IFtdO1xyXG4gIHByaXZhdGUgX3Jlc3VsdE9iamVjdEFycmF5ID0gW107XHJcbiAgcHJpdmF0ZSBfc3RhY2sgPSBbXTtcclxuXHJcbiAgcHJvdGVjdGVkIHN0YXRpYyBfaW5zOiBIdG1sVGV4dFBhcnNlcjtcclxuICBwdWJsaWMgc3RhdGljIGdldCBpbnMoKTogSHRtbFRleHRQYXJzZXIge1xyXG4gICAgaWYgKCF0aGlzLl9pbnMpIHtcclxuICAgICAgdGhpcy5faW5zID0gbmV3IEh0bWxUZXh0UGFyc2VyKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5faW5zO1xyXG4gIH1cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX3NwZWNpYWxTeW1ib2xBcnJheS5wdXNoKFsvJmx0Oy9nLCBcIjxcIl0pO1xyXG4gICAgdGhpcy5fc3BlY2lhbFN5bWJvbEFycmF5LnB1c2goWy8mZ3Q7L2csIFwiPlwiXSk7XHJcbiAgICB0aGlzLl9zcGVjaWFsU3ltYm9sQXJyYXkucHVzaChbLyZhbXA7L2csIFwiJlwiXSk7XHJcbiAgICB0aGlzLl9zcGVjaWFsU3ltYm9sQXJyYXkucHVzaChbLyZxdW90Oy9nLCAnXCInXSk7XHJcbiAgICB0aGlzLl9zcGVjaWFsU3ltYm9sQXJyYXkucHVzaChbLyZhcG9zOy9nLCBcIidcIl0pO1xyXG4gICAgdGhpcy5fc3BlY2lhbFN5bWJvbEFycmF5LnB1c2goWy8mbmJzcDsvZywgXCIgXCJdKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwYXJzZShodG1sU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX3Jlc3VsdE9iamVjdEFycmF5ID0gW107XHJcbiAgICB0aGlzLl9zdGFjayA9IFtdO1xyXG5cclxuICAgIHZhciBzdGFydEluZGV4ID0gMDtcclxuICAgIHZhciBsZW5ndGggPSBodG1sU3RyaW5nLmxlbmd0aDtcclxuICAgIHdoaWxlIChzdGFydEluZGV4IDwgbGVuZ3RoKSB7XHJcbiAgICAgIHZhciB0YWdFbmRJbmRleCA9IGh0bWxTdHJpbmcuaW5kZXhPZihcIj5cIiwgc3RhcnRJbmRleCk7XHJcbiAgICAgIHZhciB0YWdCZWdpbkluZGV4ID0gLTE7XHJcbiAgICAgIGlmICh0YWdFbmRJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgdGFnQmVnaW5JbmRleCA9IGh0bWxTdHJpbmcubGFzdEluZGV4T2YoXCI8XCIsIHRhZ0VuZEluZGV4KTtcclxuICAgICAgICB2YXIgbm9UYWdCZWdpbiA9IHRhZ0JlZ2luSW5kZXggPCBzdGFydEluZGV4IC0gMTtcclxuXHJcbiAgICAgICAgaWYgKG5vVGFnQmVnaW4pIHtcclxuICAgICAgICAgIHRhZ0JlZ2luSW5kZXggPSBodG1sU3RyaW5nLmluZGV4T2YoXCI8XCIsIHRhZ0VuZEluZGV4ICsgMSk7XHJcbiAgICAgICAgICB0YWdFbmRJbmRleCA9IGh0bWxTdHJpbmcuaW5kZXhPZihcIj5cIiwgdGFnQmVnaW5JbmRleCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRhZ0JlZ2luSW5kZXggPCAwKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhY2sucG9wKCk7XHJcbiAgICAgICAgdGhpcy5fcHJvY2Vzc1Jlc3VsdChodG1sU3RyaW5nLnN1YnN0cmluZyhzdGFydEluZGV4KSk7XHJcbiAgICAgICAgc3RhcnRJbmRleCA9IGxlbmd0aDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbmV3U3RyID0gaHRtbFN0cmluZy5zdWJzdHJpbmcoc3RhcnRJbmRleCwgdGFnQmVnaW5JbmRleCk7XHJcbiAgICAgICAgdmFyIHRhZ1N0ciA9IGh0bWxTdHJpbmcuc3Vic3RyaW5nKHRhZ0JlZ2luSW5kZXggKyAxLCB0YWdFbmRJbmRleCk7XHJcbiAgICAgICAgaWYgKHRhZ1N0ciA9PT0gXCJcIilcclxuICAgICAgICAgIG5ld1N0ciA9IGh0bWxTdHJpbmcuc3Vic3RyaW5nKHN0YXJ0SW5kZXgsIHRhZ0VuZEluZGV4ICsgMSk7XHJcbiAgICAgICAgdGhpcy5fcHJvY2Vzc1Jlc3VsdChuZXdTdHIpO1xyXG4gICAgICAgIGlmICh0YWdFbmRJbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgIC8vIGNjLmVycm9yKCdUaGUgSFRNTCB0YWcgaXMgaW52YWxpZCEnKTtcclxuICAgICAgICAgIHRhZ0VuZEluZGV4ID0gdGFnQmVnaW5JbmRleDtcclxuICAgICAgICB9IGVsc2UgaWYgKGh0bWxTdHJpbmcuY2hhckF0KHRhZ0JlZ2luSW5kZXggKyAxKSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgIHRoaXMuX3N0YWNrLnBvcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9hZGRUb1N0YWNrKHRhZ1N0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXJ0SW5kZXggPSB0YWdFbmRJbmRleCArIDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0T2JqZWN0QXJyYXk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9wcm9jZXNzUmVzdWx0KHZhbHVlKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlID0gdGhpcy5fZXNjYXBlU3BlY2lhbFN5bWJvbCh2YWx1ZSk7XHJcbiAgICBpZiAodGhpcy5fc3RhY2subGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLl9yZXN1bHRPYmplY3RBcnJheS5wdXNoKHtcclxuICAgICAgICB0ZXh0OiB2YWx1ZSxcclxuICAgICAgICBzdHlsZTogdGhpcy5fc3RhY2tbdGhpcy5fc3RhY2subGVuZ3RoIC0gMV0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fcmVzdWx0T2JqZWN0QXJyYXkucHVzaCh7IHRleHQ6IHZhbHVlIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZXNjYXBlU3BlY2lhbFN5bWJvbChzdHIpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc3BlY2lhbFN5bWJvbEFycmF5Lmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIHZhciBrZXkgPSB0aGlzLl9zcGVjaWFsU3ltYm9sQXJyYXlbaV1bMF07XHJcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX3NwZWNpYWxTeW1ib2xBcnJheVtpXVsxXTtcclxuXHJcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2FkZFRvU3RhY2soYXR0cmlidXRlKSB7XHJcbiAgICB2YXIgb2JqID0gdGhpcy5fYXR0cmlidXRlVG9PYmplY3QoYXR0cmlidXRlKTtcclxuXHJcbiAgICBpZiAodGhpcy5fc3RhY2subGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuX3N0YWNrLnB1c2gob2JqKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChvYmouaXNOZXdMaW5lIHx8IG9iai5pc0ltYWdlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIC8vZm9yIG5lc3RlZCB0YWdzXHJcbiAgICAgIHZhciBwcmV2aW91c1RhZ09iaiA9IHRoaXMuX3N0YWNrW3RoaXMuX3N0YWNrLmxlbmd0aCAtIDFdO1xyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJldmlvdXNUYWdPYmopIHtcclxuICAgICAgICBpZiAoIW9ialtrZXldKSB7XHJcbiAgICAgICAgICBvYmpba2V5XSA9IHByZXZpb3VzVGFnT2JqW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3N0YWNrLnB1c2gob2JqKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJvdGVjdGVkIF9hdHRyaWJ1dGVUb09iamVjdChhdHRyaWJ1dGUpIHtcclxuICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZS50cmltKCk7XHJcblxyXG4gICAgdmFyIG9iajogYW55ID0ge307XHJcbiAgICB2YXIgaGVhZGVyID0gYXR0cmlidXRlLm1hdGNoKC9eKGNvbG9yfHNpemUpKFxccykqPS8pO1xyXG4gICAgdmFyIHRhZ05hbWU7XHJcbiAgICB2YXIgbmV4dFNwYWNlO1xyXG4gICAgdmFyIGV2ZW50T2JqO1xyXG4gICAgdmFyIGV2ZW50SGFubGRlclN0cmluZztcclxuICAgIGlmIChoZWFkZXIpIHtcclxuICAgICAgdGFnTmFtZSA9IGhlYWRlclswXTtcclxuICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlLnN1YnN0cmluZyh0YWdOYW1lLmxlbmd0aCkudHJpbSgpO1xyXG4gICAgICBpZiAoYXR0cmlidXRlID09PSBcIlwiKSByZXR1cm4gb2JqO1xyXG5cclxuICAgICAgLy9wYXJzZSBjb2xvclxyXG4gICAgICBuZXh0U3BhY2UgPSBhdHRyaWJ1dGUuaW5kZXhPZihcIiBcIik7XHJcbiAgICAgIHN3aXRjaCAodGFnTmFtZVswXSkge1xyXG4gICAgICAgIGNhc2UgXCJjXCI6XHJcbiAgICAgICAgICBpZiAobmV4dFNwYWNlID4gLTEpIHtcclxuICAgICAgICAgICAgb2JqLmNvbG9yID0gYXR0cmlidXRlLnN1YnN0cmluZygwLCBuZXh0U3BhY2UpLnRyaW0oKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9iai5jb2xvciA9IGF0dHJpYnV0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJzXCI6XHJcbiAgICAgICAgICBvYmouc2l6ZSA9IHBhcnNlSW50KGF0dHJpYnV0ZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy90YWcgaGFzIGV2ZW50IGFyZ3VtZW50c1xyXG4gICAgICBpZiAobmV4dFNwYWNlID4gLTEpIHtcclxuICAgICAgICBldmVudEhhbmxkZXJTdHJpbmcgPSBhdHRyaWJ1dGUuc3Vic3RyaW5nKG5leHRTcGFjZSArIDEpLnRyaW0oKTtcclxuICAgICAgICBldmVudE9iaiA9IHRoaXMuX3Byb2Nlc3NFdmVudEhhbmRsZXIoZXZlbnRIYW5sZGVyU3RyaW5nKTtcclxuICAgICAgICBvYmouZXZlbnQgPSBldmVudE9iajtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG5cclxuICAgIGhlYWRlciA9IGF0dHJpYnV0ZS5tYXRjaCgvXihicihcXHMpKlxcLykvKTtcclxuICAgIGlmIChoZWFkZXIgJiYgaGVhZGVyWzBdLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGFnTmFtZSA9IGhlYWRlclswXS50cmltKCk7XHJcbiAgICAgIGlmICh0YWdOYW1lLnN0YXJ0c1dpdGgoXCJiclwiKSAmJiB0YWdOYW1lW3RhZ05hbWUubGVuZ3RoIC0gMV0gPT09IFwiL1wiKSB7XHJcbiAgICAgICAgb2JqLmlzTmV3TGluZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcmVzdWx0T2JqZWN0QXJyYXkucHVzaCh7IHRleHQ6IFwiXCIsIHN0eWxlOiB7IG5ld2xpbmU6IHRydWUgfSB9KTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGVhZGVyID0gYXR0cmlidXRlLm1hdGNoKC9eKGltZyhcXHMpKnNyYyhcXHMpKj1bXj5dK1xcLykvKTtcclxuICAgIGlmIChoZWFkZXIgJiYgaGVhZGVyWzBdLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGFnTmFtZSA9IGhlYWRlclswXS50cmltKCk7XHJcbiAgICAgIGlmICh0YWdOYW1lLnN0YXJ0c1dpdGgoXCJpbWdcIikgJiYgdGFnTmFtZVt0YWdOYW1lLmxlbmd0aCAtIDFdID09PSBcIi9cIikge1xyXG4gICAgICAgIGhlYWRlciA9IGF0dHJpYnV0ZS5tYXRjaChpbWFnZUF0dHJSZWcpO1xyXG4gICAgICAgIHZhciB0YWdWYWx1ZTtcclxuICAgICAgICB2YXIgcmVtYWluaW5nQXJndW1lbnQ7XHJcbiAgICAgICAgdmFyIGlzVmFsaWRJbWFnZVRhZyA9IGZhbHNlO1xyXG4gICAgICAgIHdoaWxlIChoZWFkZXIpIHtcclxuICAgICAgICAgIC8vc2tpcCB0aGUgaW52YWxpZCB0YWdzIGF0IGZpcnN0XHJcbiAgICAgICAgICBhdHRyaWJ1dGUgPSBhdHRyaWJ1dGUuc3Vic3RyaW5nKGF0dHJpYnV0ZS5pbmRleE9mKGhlYWRlclswXSkpO1xyXG4gICAgICAgICAgdGFnTmFtZSA9IGF0dHJpYnV0ZS5zdWJzdHIoMCwgaGVhZGVyWzBdLmxlbmd0aCk7XHJcbiAgICAgICAgICAvL3JlbW92ZSBzcGFjZSBhbmQgPSBjaGFyYWN0ZXJcclxuICAgICAgICAgIHJlbWFpbmluZ0FyZ3VtZW50ID0gYXR0cmlidXRlLnN1YnN0cmluZyh0YWdOYW1lLmxlbmd0aCkudHJpbSgpO1xyXG4gICAgICAgICAgbmV4dFNwYWNlID0gcmVtYWluaW5nQXJndW1lbnQuaW5kZXhPZihcIiBcIik7XHJcblxyXG4gICAgICAgICAgdGFnVmFsdWUgPVxyXG4gICAgICAgICAgICBuZXh0U3BhY2UgPiAtMVxyXG4gICAgICAgICAgICAgID8gcmVtYWluaW5nQXJndW1lbnQuc3Vic3RyKDAsIG5leHRTcGFjZSlcclxuICAgICAgICAgICAgICA6IHJlbWFpbmluZ0FyZ3VtZW50O1xyXG4gICAgICAgICAgdGFnTmFtZSA9IHRhZ05hbWUucmVwbGFjZSgvW15hLXpBLVpdL2csIFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgYXR0cmlidXRlID0gcmVtYWluaW5nQXJndW1lbnQuc3Vic3RyaW5nKG5leHRTcGFjZSkudHJpbSgpO1xyXG4gICAgICAgICAgaWYgKHRhZ1ZhbHVlLmVuZHNXaXRoKFwiL1wiKSkgdGFnVmFsdWUgPSB0YWdWYWx1ZS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gXCJzcmNcIikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRhZ1ZhbHVlLmNoYXJDb2RlQXQoMCkpIHtcclxuICAgICAgICAgICAgICBjYXNlIDM0OiAvLyBcIlxyXG4gICAgICAgICAgICAgIGNhc2UgMzk6IC8vICdcclxuICAgICAgICAgICAgICAgIGlzVmFsaWRJbWFnZVRhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0YWdWYWx1ZSA9IHRhZ1ZhbHVlLnNsaWNlKDEsIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5pc0ltYWdlID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2JqLnNyYyA9IHRhZ1ZhbHVlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSBcImhlaWdodFwiKSB7XHJcbiAgICAgICAgICAgIG9iai5pbWFnZUhlaWdodCA9IHBhcnNlSW50KHRhZ1ZhbHVlKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PT0gXCJ3aWR0aFwiKSB7XHJcbiAgICAgICAgICAgIG9iai5pbWFnZVdpZHRoID0gcGFyc2VJbnQodGFnVmFsdWUpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSBcImFsaWduXCIpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0YWdWYWx1ZS5jaGFyQ29kZUF0KDApKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAzNDogLy8gXCJcclxuICAgICAgICAgICAgICBjYXNlIDM5OiAvLyAnXHJcbiAgICAgICAgICAgICAgICB0YWdWYWx1ZSA9IHRhZ1ZhbHVlLnNsaWNlKDEsIC0xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5pbWFnZUFsaWduID0gdGFnVmFsdWUudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PT0gXCJvZmZzZXRcIikge1xyXG4gICAgICAgICAgICBvYmouaW1hZ2VPZmZzZXQgPSB0YWdWYWx1ZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PT0gXCJjbGlja1wiKSB7XHJcbiAgICAgICAgICAgIG9iai5ldmVudCA9IHRoaXMuX3Byb2Nlc3NFdmVudEhhbmRsZXIodGFnTmFtZSArIFwiPVwiICsgdGFnVmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChvYmouZXZlbnQgJiYgdGFnTmFtZSA9PT0gXCJwYXJhbVwiKSB7XHJcbiAgICAgICAgICAgIG9iai5ldmVudC5wYXJhbSA9IHRhZ1ZhbHVlLnJlcGxhY2UoL15cXFwifFxcXCIkL2csIFwiXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGhlYWRlciA9IGF0dHJpYnV0ZS5tYXRjaChpbWFnZUF0dHJSZWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzVmFsaWRJbWFnZVRhZyAmJiBvYmouaXNJbWFnZSkge1xyXG4gICAgICAgICAgdGhpcy5fcmVzdWx0T2JqZWN0QXJyYXkucHVzaCh7IHRleHQ6IFwiXCIsIHN0eWxlOiBvYmogfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoZWFkZXIgPSBhdHRyaWJ1dGUubWF0Y2goL14ob3V0bGluZShcXHMpKltePl0qKS8pO1xyXG4gICAgaWYgKGhlYWRlcikge1xyXG4gICAgICBhdHRyaWJ1dGUgPSBoZWFkZXJbMF0uc3Vic3RyaW5nKFwib3V0bGluZVwiLmxlbmd0aCkudHJpbSgpO1xyXG4gICAgICB2YXIgZGVmYXVsdE91dGxpbmVPYmplY3QgPSB7IGNvbG9yOiBcIiNmZmZmZmZcIiwgd2lkdGg6IDEgfTtcclxuICAgICAgaWYgKGF0dHJpYnV0ZSkge1xyXG4gICAgICAgIHZhciBvdXRsaW5lQXR0clJlZyA9XHJcbiAgICAgICAgICAvKFxccykqY29sb3IoXFxzKSo9fChcXHMpKndpZHRoKFxccykqPXwoXFxzKSpjbGljayhcXHMpKj18KFxccykqcGFyYW0oXFxzKSo9LztcclxuICAgICAgICBoZWFkZXIgPSBhdHRyaWJ1dGUubWF0Y2gob3V0bGluZUF0dHJSZWcpO1xyXG4gICAgICAgIHZhciB0YWdWYWx1ZTtcclxuICAgICAgICB3aGlsZSAoaGVhZGVyKSB7XHJcbiAgICAgICAgICAvL3NraXAgdGhlIGludmFsaWQgdGFncyBhdCBmaXJzdFxyXG4gICAgICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlLnN1YnN0cmluZyhhdHRyaWJ1dGUuaW5kZXhPZihoZWFkZXJbMF0pKTtcclxuICAgICAgICAgIHRhZ05hbWUgPSBhdHRyaWJ1dGUuc3Vic3RyKDAsIGhlYWRlclswXS5sZW5ndGgpO1xyXG4gICAgICAgICAgLy9yZW1vdmUgc3BhY2UgYW5kID0gY2hhcmFjdGVyXHJcbiAgICAgICAgICByZW1haW5pbmdBcmd1bWVudCA9IGF0dHJpYnV0ZS5zdWJzdHJpbmcodGFnTmFtZS5sZW5ndGgpLnRyaW0oKTtcclxuICAgICAgICAgIG5leHRTcGFjZSA9IHJlbWFpbmluZ0FyZ3VtZW50LmluZGV4T2YoXCIgXCIpO1xyXG4gICAgICAgICAgaWYgKG5leHRTcGFjZSA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRhZ1ZhbHVlID0gcmVtYWluaW5nQXJndW1lbnQuc3Vic3RyKDAsIG5leHRTcGFjZSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YWdWYWx1ZSA9IHJlbWFpbmluZ0FyZ3VtZW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGFnTmFtZSA9IHRhZ05hbWUucmVwbGFjZSgvW15hLXpBLVpdL2csIFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgYXR0cmlidXRlID0gcmVtYWluaW5nQXJndW1lbnQuc3Vic3RyaW5nKG5leHRTcGFjZSkudHJpbSgpO1xyXG4gICAgICAgICAgaWYgKHRhZ05hbWUgPT09IFwiY2xpY2tcIikge1xyXG4gICAgICAgICAgICBvYmouZXZlbnQgPSB0aGlzLl9wcm9jZXNzRXZlbnRIYW5kbGVyKHRhZ05hbWUgKyBcIj1cIiArIHRhZ1ZhbHVlKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PT0gXCJjb2xvclwiKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRPdXRsaW5lT2JqZWN0LmNvbG9yID0gdGFnVmFsdWU7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09IFwid2lkdGhcIikge1xyXG4gICAgICAgICAgICBkZWZhdWx0T3V0bGluZU9iamVjdC53aWR0aCA9IHBhcnNlSW50KHRhZ1ZhbHVlKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAob2JqLmV2ZW50ICYmIHRhZ05hbWUgPT09IFwicGFyYW1cIikge1xyXG4gICAgICAgICAgICBvYmouZXZlbnQucGFyYW0gPSB0YWdWYWx1ZS5yZXBsYWNlKC9eXFxcInxcXFwiJC9nLCBcIlwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBoZWFkZXIgPSBhdHRyaWJ1dGUubWF0Y2gob3V0bGluZUF0dHJSZWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBvYmoub3V0bGluZSA9IGRlZmF1bHRPdXRsaW5lT2JqZWN0O1xyXG4gICAgfVxyXG5cclxuICAgIGhlYWRlciA9IGF0dHJpYnV0ZS5tYXRjaCgvXihvbnx1fGJ8aSkoXFxzKSovKTtcclxuICAgIGlmIChoZWFkZXIgJiYgaGVhZGVyWzBdLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGFnTmFtZSA9IGhlYWRlclswXTtcclxuICAgICAgYXR0cmlidXRlID0gYXR0cmlidXRlLnN1YnN0cmluZyh0YWdOYW1lLmxlbmd0aCkudHJpbSgpO1xyXG4gICAgICBzd2l0Y2ggKHRhZ05hbWVbMF0pIHtcclxuICAgICAgICBjYXNlIFwidVwiOlxyXG4gICAgICAgICAgb2JqLnVuZGVybGluZSA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaVwiOlxyXG4gICAgICAgICAgb2JqLml0YWxpYyA9IHRydWU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiYlwiOlxyXG4gICAgICAgICAgb2JqLmJvbGQgPSB0cnVlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGF0dHJpYnV0ZSA9PT0gXCJcIikge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgIH1cclxuICAgICAgZXZlbnRPYmogPSB0aGlzLl9wcm9jZXNzRXZlbnRIYW5kbGVyKGF0dHJpYnV0ZSk7XHJcbiAgICAgIG9iai5ldmVudCA9IGV2ZW50T2JqO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvYmo7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9wcm9jZXNzRXZlbnRIYW5kbGVyKGV2ZW50U3RyaW5nKSB7XHJcbiAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgdmFyIGV2ZW50TmFtZXMgPSBldmVudFN0cmluZy5tYXRjaChldmVudFJlZ3gpO1xyXG4gICAgdmFyIGlzVmFsaWRUYWcgPSBmYWxzZTtcclxuICAgIHdoaWxlIChldmVudE5hbWVzKSB7XHJcbiAgICAgIHZhciBldmVudE5hbWUgPSBldmVudE5hbWVzWzBdO1xyXG4gICAgICB2YXIgZXZlbnRWYWx1ZSA9IFwiXCI7XHJcbiAgICAgIGlzVmFsaWRUYWcgPSBmYWxzZTtcclxuICAgICAgZXZlbnRTdHJpbmcgPSBldmVudFN0cmluZy5zdWJzdHJpbmcoZXZlbnROYW1lLmxlbmd0aCkudHJpbSgpO1xyXG4gICAgICBpZiAoZXZlbnRTdHJpbmcuY2hhckF0KDApID09PSAnXCInKSB7XHJcbiAgICAgICAgaW5kZXggPSBldmVudFN0cmluZy5pbmRleE9mKCdcIicsIDEpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBldmVudFZhbHVlID0gZXZlbnRTdHJpbmcuc3Vic3RyaW5nKDEsIGluZGV4KS50cmltKCk7XHJcbiAgICAgICAgICBpc1ZhbGlkVGFnID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgfSBlbHNlIGlmIChldmVudFN0cmluZy5jaGFyQXQoMCkgPT09IFwiJ1wiKSB7XHJcbiAgICAgICAgaW5kZXggPSBldmVudFN0cmluZy5pbmRleE9mKFwiJ1wiLCAxKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgZXZlbnRWYWx1ZSA9IGV2ZW50U3RyaW5nLnN1YnN0cmluZygxLCBpbmRleCkudHJpbSgpO1xyXG4gICAgICAgICAgaXNWYWxpZFRhZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4Kys7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9za2lwIHRoZSBpbnZhbGlkIGF0dHJpYnV0ZSB2YWx1ZVxyXG4gICAgICAgIHZhciBtYXRjaCA9IGV2ZW50U3RyaW5nLm1hdGNoKC8oXFxTKSsvKTtcclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgIGV2ZW50VmFsdWUgPSBtYXRjaFswXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXZlbnRWYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZGV4ID0gZXZlbnRWYWx1ZS5sZW5ndGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc1ZhbGlkVGFnKSB7XHJcbiAgICAgICAgZXZlbnROYW1lID0gZXZlbnROYW1lLnN1YnN0cmluZygwLCBldmVudE5hbWUubGVuZ3RoIC0gMSkudHJpbSgpO1xyXG4gICAgICAgIG9ialtldmVudE5hbWVdID0gZXZlbnRWYWx1ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXZlbnRTdHJpbmcgPSBldmVudFN0cmluZy5zdWJzdHJpbmcoaW5kZXgpLnRyaW0oKTtcclxuICAgICAgZXZlbnROYW1lcyA9IGV2ZW50U3RyaW5nLm1hdGNoKGV2ZW50UmVneCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcbn1cclxuIl19