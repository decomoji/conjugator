import decomojiPackage from "decomoji/package.json";

import { Conjugator } from "./Conjugator";
import { ThemeNames } from "./ThemeNames";

document.addEventListener("DOMContentLoaded", () => {
  // body 要素にテーミングクラスを追加する
  document.body.classList.add(
    ThemeNames[Math.floor(Math.random() * ThemeNames.length)]
  );

  document.querySelector("#decomojiVersion").textContent =
    decomojiPackage.version;

  // 活用生成を実行する
  new Conjugator();
});
