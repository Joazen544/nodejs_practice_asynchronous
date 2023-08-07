const fs = require("fs");
const superagent = require("superagent");

let counter = 0;
let countNum = 0;
let ifPrintErr = false;
let countErr = 0;

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("An error in readFilePro");
      resolve(data);
    });
  });
};

const appendFilePro = (file, string) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(file, `${string}\n`, (err) => {
      if (err) reject("An error appending file");
      resolve();
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`breed name is ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return appendFilePro(`${__dirname}/dog-image.txt`, res.body.message);
  })
  .then(() => {
    countNum++;
    console.log(`${countNum} random dog image saved to file`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// while (counter < 500) {
//   counter++;
//   superagent
//     .get(`https://dog.ceo/api/breeds/image/random`)
//     .then((res) => {
//       fs.appendFile("dog-image.txt", `${res.body.message}\n`, (err) => {
//         if (err) return console.log(err.message);
//         countNum++;
//         console.log(`${countNum} random dog image saved to file`);
//       });
//     })
//     .catch((err) => {
//       countErr++;
//       console.log(`There is ${countErr} error!!!!`);
//       if (!ifPrintErr) {
//         console.log(err);
//         ifPrintErr = true;
//       }
//     });
// }
