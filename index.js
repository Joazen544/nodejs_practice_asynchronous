const fs = require("fs");
const superagent = require("superagent");

let obj = new Map();
let samePic = 0;
for (let i = 0; i < 10; i++) {
  superagent.get(`https://dog.ceo/api/breeds/image/random`).end((err, res) => {
    //console.log(res);
    if (!obj.get(res.body.message)) {
      obj.set(res.body.message);
      fs.appendFile("dog-image.txt", `${res.body.message}\n`, (err) => {
        if (err) return console.log(err.message);
        console.log(`${i} random dog image saved to file`);
      });
    } else {
      samePic++;
      console.log(samePic);
    }
  });
}
