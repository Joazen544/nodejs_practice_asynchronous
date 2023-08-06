const fs = require("fs");
const superagent = require("superagent");

let obj = new Map();
let samePic = 0;
let counter = 0;
while (counter < 10) {
  superagent.get(`https://dog.ceo/api/breeds/image/random`).end((err, res) => {
    try {
      if (!obj.get(res.body.message)) {
        obj.set(res.body.message);
        fs.appendFile("dog-image.txt", `${res.body.message}\n`, (err) => {
          if (err) return console.log(err.message);
          console.log(`${counter} random dog image saved to file`);
          counter++;
        });
      } else {
        samePic++;
        console.log(samePic);
      }
    } catch (e) {
      console.log("There is an error!!!!!");
      console.log(res);
    }
  });
}
