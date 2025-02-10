// panel/index.js, this filename needs to match the one registered in package.json
const Fs = require("fire-fs");
const Path = require("fire-path");
Editor.Panel.extend({
  // css style for panel
  style: Fs.readFileSync(
    Editor.url("packages://color-manager/panel/style.css"), "utf8"),
  template: Fs.readFileSync(
    Editor.url("packages://color-manager/panel/index.html"), "utf8"),

  ready() {
    new window.Vue({
      el: this.shadowRoot,
      created: function () {
        Fs.readFile(this.root, 'utf8', (err, data) => {
          if (err) {
            return;
          } else {
            // 停止执行代码直到操作结束
            let colorString = data.toString();
            let stringArr = colorString.split('/**');
            for (let i = 1; i < stringArr.length; i++) {
              let colorInfo = stringArr[i].split("\n")[1];
              let color = {};
              color.describe = stringArr[i].split("\n")[0].split('*/')[0];
              color.colorName = colorInfo.split(":")[0].replace(/\s*/g, "");
              color.colorRGB = colorInfo.split(":")[1].split("(")[1].split(")")[0].split(",");
              color.colorRGB[3] = color.colorRGB[3] ? Number(color.colorRGB[3]) / 255 : 1;
              color.colorRGB = `rgba(${color.colorRGB})`;
              color.colorHex = this.colorRGBtoHex(colorInfo.split(":")[1].split("(")[1].split(")")[0]);
              this.colors.push(color);
            }
          }
        });
      },
      data: function () {
        return {
          root: Editor.url("db://assets/Script/Game/Common/JXColor.ts"),
          oldLength: [],
          colors: [],
          addInfo: {}
        }
      },
      methods: {
        onAddBtnClick() {
          this.checkInfo();
        },

        checkInfo() {
          if (this.addInfo.colorRGB === undefined) {
            this.addInfo.colorRGB = [0, 0, 0, 1];
          }
          if (this.isChn(this.addInfo.colorName)) {
            alert("名称不允许存在中文！");
            return;
          }
          if (this.addInfo.describe === undefined || this.addInfo.colorName === undefined) {
            alert("请输入完整信息！");
            return;
          }
          for (let i = 0; i < this.colors.length; i++) {
            if (this.addInfo.colorName == this.colors[i].colorName) {
              alert("该颜色已被定义！");
              return;
            }
          }
          this.addInfo.colorHex = this.colorRGBtoHex(this.addInfo.colorRGB.join(','));
          this.colors.push(this.addInfo);
          this.addInfo = {}
        },

        isChn(str) {
          if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
            return true;
          }
          return false;
        },

        colorRGBtoHex(color) {
          var rgb = color.split(',');
          var r = parseInt(rgb[0]);
          var g = parseInt(rgb[1]);
          var b = parseInt(rgb[2]);
          var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
          return hex;
        },

        onDeriveBtnClick() {
          const startString = "export const JXColor = {\n"
          const endString = "\n}"
          let addString = "";
          this.colors.forEach(color => {
            let Rgb = "";
            if (typeof (color.colorRGB) === "string") {
              Rgb = color.colorRGB.split("(")[1].split(")")[0];
            } else {
              Rgb = color.colorRGB.join(',');
            }
            let RgbArr = Rgb.split(',');
            if (Number(RgbArr[3]) >= 0 && Number(RgbArr[3]) <= 1) {
              RgbArr[3] = Number(RgbArr[3]) * 255;
            }
            Rgb = RgbArr.join(',');
            addString += `
/**${color.describe}*/\n${color.colorName}: cc.color(${Rgb}),`
          });
          const writeString = startString + addString + endString;
          Editor.assetdb.createOrSave("db://assets/Script/Game/Common/JXColor.ts", writeString, function (err, meta) {
            // do something
            if (err) alert("保存操作失败");
            else alert('保存操作成功');
          });
        },

        onRemoveBtnClick(colorName) {
          this.colors.splice(this.colors.findIndex(color => color.colorName === colorName), 1);
        }
      }
    });
  },

  close() {
    var r = confirm("关闭前请确认数据是否保存！！！");
    return r;
  },
});