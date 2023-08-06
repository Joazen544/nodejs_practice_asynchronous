const fs = require("fs");
const superagent = require("superagent");

let obj = new Map();
let samePic = 0;
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

//for (let i = 0; i < 10; i++) {
while (counter < 500) {
  counter++;
  superagent
    .get(`https://dog.ceo/api/breeds/image/random`)
    .then((res) => {
      // "then" only works when res exists
      //if (!obj.get(res.body.message)) {
      //  obj.set(res.body.message);
      fs.appendFile("dog-image.txt", `${res.body.message}\n`, (err) => {
        if (err) return console.log(err.message);
        countNum++;
        console.log(`${countNum} random dog image saved to file`);
      });
      //} else {
      //   samePic++;
      //   console.log(samePic);
      //   counter--;
      // }
    })
    .catch((err) => {
      countErr++;
      console.log(`There is ${countErr} error!!!!`);
      if (!ifPrintErr) {
        console.log(err);
        ifPrintErr = true;
      }
    });
}
