export const getLocalTime = (timestamp: number | string) => {
  // 秒
  // 创建日期对象
  const date = new Date(Number(`${timestamp}`) * 1000);

  // 格式化日期
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate; // 输出: April 20, 2024
};
