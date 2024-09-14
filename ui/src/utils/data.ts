export const getUTCSeconds = () => {
  const now = new Date();
  const utcSeconds = Math.floor(now.getTime() / 1000);
  return utcSeconds;
};
const SECONDS_PER_DAY = 24 * 60 * 60;
const OFFSET19700101 = 2440588;

export function timestampToDateStr(timestamp: number, split?: string): string {
  const _days = Math.floor(timestamp / SECONDS_PER_DAY);
  let L = _days + 68569 + OFFSET19700101;
  const N = Math.floor((4 * L) / 146097);
  L = L - Math.floor((146097 * N + 3) / 4);
  let year = Math.floor((4000 * (L + 1)) / 1461001);
  L = L - Math.floor((1461 * year) / 4) + 31;
  let month = Math.floor((80 * L) / 2447);
  const day = L - Math.floor((2447 * month) / 80);
  L = Math.floor(month / 11);
  month = month + 2 - 12 * L;
  year = 100 * (N - 49) + year + L;

  return `${year.toFixed(0)}${split ?? "-"}${month.toFixed(0)}${
    split ?? "-"
  }${day.toFixed(0)}`;
}

export const getFormattedTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; // 月份从 0 开始，所以要加 1
  // const year = date.getFullYear()

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${day}/${month}`;

  return formattedTime;
};
export function isTimeout(startedAt: number, timeout: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000); // 获取当前时间戳（以秒为单位）
  const elapsedSeconds = currentTime - startedAt; // 计算经过的秒数

  return elapsedSeconds > timeout;
}

export const getFormattedTimeMobile = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1; // 月份从 0 开始，所以要加 1
  // const year = date.getFullYear()

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${day}-${month}`;

  return formattedTime;
};
