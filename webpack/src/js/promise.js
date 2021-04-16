
//
export function testPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("返回了"), 5000);
  })
}