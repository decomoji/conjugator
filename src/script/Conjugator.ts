import DecomojiAll from "decomoji/configs/v5_all.json";
import { ConjugateContents } from "./ConjugateContents";
import { ConjugateReadings } from "./ConjugateReadings";

export class Conjugator {
  $conjugator: HTMLFormElement;
  $word: HTMLInputElement;
  $reading: HTMLInputElement;
  $conjugateWords: HTMLInputElement;
  $conjugateReadings: HTMLInputElement;
  $generatedContents: HTMLTextAreaElement;
  $generatedReadings: HTMLTextAreaElement;
  $duplicationChecker: HTMLInputElement;
  $duplicatedContents: HTMLTextAreaElement;
  $duplicatedReadings: HTMLTextAreaElement;
  decomojis: string[];

  constructor() {
    // 要素を取得する
    this.$conjugator = document.querySelector("#conjugator");
    this.$word = document.querySelector("#word");
    this.$reading = document.querySelector("#reading");
    this.$conjugateWords = document.querySelector("#conjugateWords");
    this.$conjugateReadings = document.querySelector("#conjugateReadings");
    this.$generatedContents = document.querySelector("#generatedContents");
    this.$generatedReadings = document.querySelector("#generatedReadings");
    this.$duplicationChecker = document.querySelector("#duplicationChecker");
    this.$duplicatedContents = document.querySelector("#duplicatedContents");
    this.$duplicatedReadings = document.querySelector("#duplicatedReadings");

    // デコモジ本体のファイル名を配列化したもの
    this.decomojis = DecomojiAll.map((v) => v.name);

    // 初期化
    this.init();
  }

  get conjugatedContent() {
    const { value: word } = this.$word;
    const { value: base } = this.$conjugateWords;

    return base.split(",").map((v) => v.replace("-", word));
  }

  get conjugatedReading() {
    const { value: reading } = this.$reading;
    const { value: base } = this.$conjugateReadings;

    return base.split(",").map((v) => v.replace("-", reading));
  }

  // デコモジ本体と読みを突合させるか否かを返す
  get duplicateCheck() {
    return this.$duplicationChecker.checked;
  }
  setConjugatedValues() {
    this.$generatedContents.value = this.conjugatedContent.join("\n");
    this.$generatedReadings.value = this.conjugatedReading.join("\n");
  }

  handleInput(ev: Event) {
    this.setConjugatedValues();
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
    this.$conjugateWords.value = ConjugateContents;
    this.$conjugateReadings.value = ConjugateReadings;
    this.dispatch();
    this.setConjugatedValues();
  }
}
