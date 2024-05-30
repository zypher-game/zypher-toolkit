export function calculateTimeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000) // 获取当前时间的Unix时间戳（秒）
  const difference = now - timestamp // 计算时间差（秒）

  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30 // 简化计算，假设每月30天
  const year = day * 365 // 简化计算，不考虑闰年

  let timeAgo = ''

  if (difference < minute) {
    timeAgo = `${difference} seconds ago`
  } else if (difference < hour) {
    timeAgo = `${Math.floor(difference / minute)} minutes ago`
  } else if (difference < day) {
    timeAgo = `${Math.floor(difference / hour)} hours ago`
  } else if (difference < month) {
    timeAgo = `${Math.floor(difference / day)} days ago`
  } else if (difference < year) {
    timeAgo = `${Math.floor(difference / month)} months ago`
  } else {
    timeAgo = `${Math.floor(difference / year)} years ago`
  }

  return timeAgo
}
