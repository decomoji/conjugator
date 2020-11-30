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

  // テンプレートに活用を乗せて配列で返す
  get conjugatedContent() {
    const { value: word } = this.$word;
    const { value: base } = this.$conjugateWords;

    return base.split(",").map((v) => v.replace("-", word));
  }

  // テンプレートに読みを乗せて配列で返す
  get conjugatedReading() {
    const { value: reading } = this.$reading;
    const { value: base } = this.$conjugateReadings;

    return base.split(",").map((v) => v.replace("-", reading));
  }

  // デコモジ本体と読みを突合させるか否かを返す
  get duplicateCheck() {
    return this.$duplicationChecker.checked;
  }

  // デコモジ本体と読みを突合させて重複する読みを配列で返す
  get duplicatedReading() {
    return this.conjugatedReading.filter((v) => this.isDuplicates(v));
  }

  // デコモジ本体と読みを突合させて重複する活用をを配列で返す
  get duplicatedContent() {
    return this.conjugatedReading
      .map((v, i) => (this.isDuplicates(v) ? i.toString() : null))
      .filter((v) => v)
      .map((dup) => this.conjugatedContent[Number(dup)]);
  }

  // デコモジ本体と読みを突合させて重複する読みを配列で返す
  get uniqueReading() {
    return this.conjugatedReading.filter((v) => !this.isDuplicates(v));
  }

  // デコモジ本体と読みを突合させて重複していない読みの index を配列で返す
  get uniqueReadingIndexs() {
    return this.conjugatedReading
      .map((v, i) => (this.isDuplicates(v) ? null : i.toString()))
      .filter((v) => v);
  }

  // デコモジ本体に引数で与えた文字列が含まれているか否かを返す
  isDuplicates(name: string) {
    return this.decomojis.includes(name);
  }

  // 活用を生成して画面に渡す
  setConjugatedValues() {
    this.$generatedContents.value = this.duplicateCheck
      ? this.uniqueReadingIndexs
          .map((uniq) => this.conjugatedContent[Number(uniq)])
          .join("\n")
      : this.conjugatedContent.join("\n");
    this.$generatedReadings.value = this.duplicateCheck
      ? this.uniqueReading.join("\n")
      : this.conjugatedReading.join("\n");
  }

  // 重複を生成して画面に渡す
  setDuplicatedValues() {
    this.$duplicatedContents.value = this.duplicatedReadingIndexs
      .map((dup) => this.conjugatedContent[dup])
      .join("\n");
    this.$duplicatedReadings.value = this.duplicatedReading.join("\n");
  }

  handleInput(ev: Event) {
    this.setConjugatedValues();
    this.setDuplicatedValues();
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
    this.setDuplicatedValues();
  }
}
