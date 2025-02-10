// // 使用示例
// ColorLog.log({ startGuide: "startGuide" });
// ColorLog.info("This is an info message.");
// ColorLog.error("This is an error message.");
// ColorLog.success("This is a success message.");
// ColorLog.titledLog("Title", { key: "value" });
type LogLevel = 1 | 2 | 3 | 4; // 假设日志级别为1-4

export default class ColorLog {
  private static styles: { [key: string]: string } = {
    on: "color: rgb(75, 0, 130); font-weight: bold; font-size: 12px;",
    default: "color: purple; font-weight: bold; font-size: 20px;",
    info: "color: navy; font-weight: bold; font-size: 14px;",
    warning: "color: orange; font-weight: bold;",
    error: "color: red; font-weight: bold;",
    success: "color: green; font-weight: bold;",
  };
  static esOn(...entry: any): void {
    const formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
    console.log(`%c${formattedEntry}`, this.styles.on);
  }
  static log(...entry: any): void {
    const formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
    console.log(`%c${formattedEntry}`, this.styles.default);
  }
  static info(...entry: any): void {
    const formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
    console.log(`%c${formattedEntry}`, this.styles.info);
  }
  static warn(...entry: any): void {
    const formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
    console.log(`%c${formattedEntry}`, this.styles.warning);
  }
  static error(...entry: any): void {
    const formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
    console.log(`%c${formattedEntry}`, this.styles.error);
  }
}
