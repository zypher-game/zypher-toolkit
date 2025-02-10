const { ccclass } = cc._decorator;
@ccclass
export default class GHttpClient {
  public static url: string = "";

  public static get(
    path: string,
    data: any,
    handler: any,
    extraUrl?: string
  ): XMLHttpRequest {
    // var xhr = cc.loader.getXMLHttpRequest();
    var xhr = new XMLHttpRequest();
    xhr.timeout = 5000;
    var str = "?";
    for (let k in data) {
      if (str != "?") {
        str += "&";
      }
      str += `${k}=${data[k]}`;
    }
    if (extraUrl == null) extraUrl = GHttpClient.url;
    var requestURL = extraUrl + path + str;
    cc.log("RequestURL:" + requestURL);
    xhr.open("GET", requestURL, true);
    // if (cc.sys.isNative){
    //     xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
    //     xhr.setRequestHeader("CONTENT-TYPE", "text/html;charset=UTF-8");
    // }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        cc.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
        try {
          var ret = JSON.parse(xhr.responseText);
          if (handler !== null) {
            handler(null, ret);
          } /* code */
        } catch (e) {
          if (handler !== null) {
            handler(e);
          }
        } finally {
        }
      }
    };

    xhr.send();
    return xhr;
  }

  public static post(
    path: string,
    data: any,
    handler: any,
    extraUrl?: string
  ): XMLHttpRequest {
    // var xhr = cc.loader.getXMLHttpRequest();
    var xhr = new XMLHttpRequest();
    xhr.timeout = 5000;
    if (extraUrl == null) extraUrl = GHttpClient.url;
    var requestURL = extraUrl + path;
    cc.log("RequestURL:" + requestURL);
    xhr.open("POST", requestURL, true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
        cc.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
        try {
          var ret = JSON.parse(xhr.responseText);
          if (handler !== null) {
            handler(ret);
          }
        } catch (e) {
          cc.log("err:" + e);
          //handler(null);
        } finally {
        }
      }
    };
    xhr.send(JSON.stringify(data));
    return xhr;
  }
}
