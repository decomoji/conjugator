import { Conjugator } from "./Conjugator.mjs";
import { fetchDecomoji } from "./Decomoji.mjs";
import { ThemeNames } from "./ThemeNames.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // body 要素にテーミングクラスを追加する
  document.body.classList.add(
    ThemeNames[Math.floor(Math.random() * ThemeNames.length)]
  );

  const { version, names } = await fetchDecomoji();

  document.querySelector("#decomojiVersion").textContent = version;

  // 活用生成を実行する
  new Conjugator(names);
});
