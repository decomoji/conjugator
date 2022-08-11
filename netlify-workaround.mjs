import { exec } from "child_process";

((os) => {
  if (os === "linux") {
    exec("npm i @parcel/css-linux-x64-gnu", (error, stdout, stderror) => {
      if (error) {
        console.log(`stderror: ${stderror}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  } else {
    console.log(os);
  }
})(process.platform);
