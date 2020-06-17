// for IE11
import "core-js/stable";
import "regenerator-runtime/runtime";

import { ConjugateContent } from "./ConjugateContent";
import { ConjugateReading } from "./ConjugateReading";

class Conjugator {
  $conjugator: HTMLFormElement;
  $content: HTMLInputElement;
  $reading: HTMLInputElement;
  $conjugateContent: HTMLInputElement;
  $conjugateReading: HTMLInputElement;
  $output: HTMLTextAreaElement;

  constructor() {
    // 要素を取得する
    this.$conjugator = document.querySelector("#conjugator");
    this.$content = document.querySelector("#content");
    this.$reading = document.querySelector("#reading");
    this.$conjugateContent = document.querySelector("#conjugateContent");
    this.$conjugateReading = document.querySelector("#conjugateReading");
    this.$output = document.querySelector("#output");

    // 初期化
    this.init();
  }

  get conjugatedContent() {
    const { value: content } = this.$content;
    const { value: seed } = this.$conjugateContent;

    return seed.split(",").map((v) => v.replace("-", content));
  }

  get conjugatedReading() {
    const { value: reading } = this.$reading;
    const { value: seed } = this.$conjugateReading;

    return seed.split(",").map((v) => v.replace("-", reading));
  }

  handleInput(ev: Event) {
    this.$output.value =
      this.conjugatedContent.join("\n") + this.conjugatedReading.join("\n");
  }

  dispatch() {
    this.$conjugator.addEventListener(
      "input",
      (ev: Event) => {
        this.handleInput(ev);
      },
      false
    );
  }

  init() {
    this.$conjugateContent.value = ConjugateContent;
    this.$conjugateReading.value = ConjugateReading;
    this.dispatch();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Conjugator();
});
