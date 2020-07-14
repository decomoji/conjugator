// for IE11
import "core-js/stable";
import "regenerator-runtime/runtime";
import { Conjugator } from "./Conjugator";
import { ThemeNames } from "./ThemeNames";

document.addEventListener("DOMContentLoaded", () => {
  // body 要素にテーミングクラスを追加する
  document.body.classList.add(
    ThemeNames[Math.floor(Math.random() * ThemeNames.length)]
  );

  // 活用生成を実行する
  new Conjugator();
});
