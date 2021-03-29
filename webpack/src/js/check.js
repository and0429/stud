function fn(a, b) {
  // eslint-disable-next-line
  console.log(a, b);
}

fn('a', 's');

const del = function del() {
  // eslint-disable-next-line
  console.log('定时器被调用了 === ');
};

// eslint-disable-next-line
const promise = new Promise((resolve) => {
  setTimeout(() => {
    del();
    resolve('abc');
  }, 1000);
});

promise.then((data) => {
  // eslint-disable-next-line
  console.log(`promise resolve = ${data}`);
});

// eslint-disable-next-line
console.log(12345);
