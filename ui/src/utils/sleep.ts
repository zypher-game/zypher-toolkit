export function timeoutPromise(timeoutMs = 10000) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Operation timed out")), timeoutMs);
  });
}

export default function sleep(seconds: number): Promise<boolean> {
  const now = +new Date();
  let t: ReturnType<typeof setInterval>;
  return new Promise((resolve, reject) => {
    t = setInterval(() => {
      if (now + seconds * 1000 < +new Date()) {
        clearInterval(t);
        resolve(true);
      }
    }, 10);
  });
}
