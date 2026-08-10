import { ConjugateContents } from "./ConjugateContents.mjs";
import { ConjugateReadings } from "./ConjugateReadings.mjs";

export class Conjugator {
  /** @type {HTMLFormElement} */
  $conjugator;
  /** @type {HTMLInputElement} */
  $word;
  /** @type {HTMLInputElement} */
  $reading;
  /** @type {HTMLInputElement} */
  $conjugateWords;
  /** @type {HTMLInputElement} */
  $conjugateReadings;
  /** @type {HTMLTextAreaElement} */
  $generatedContents;
  /** @type {HTMLTextAreaElement} */
  $generatedReadings;
  /** @type {HTMLInputElement} */
  $duplicationChecker;
  /** @type {HTMLTextAreaElement} */
  $duplicatedContents;
  /** @type {HTMLTextAreaElement} */
  $duplicatedReadings;
  /** @type {string[]} */
  decomojis;

  /**
   * @param {string[]} decomojis デコモジ本体のファイル名を配列化したもの
   */
  constructor(decomojis) {
    // 要素を取得する
    this.$conjugator = /** @type {HTMLFormElement} */ (
      document.querySelector("#conjugator")
    );
    this.$word = /** @type {HTMLInputElement} */ (
      document.querySelector("#word")
    );
    this.$reading = /** @type {HTMLInputElement} */ (
      document.querySelector("#reading")
    );
    this.$conjugateWords = /** @type {HTMLInputElement} */ (
      document.querySelector("#conjugateWords")
    );
    this.$conjugateReadings = /** @type {HTMLInputElement} */ (
      document.querySelector("#conjugateReadings")
    );
    this.$generatedContents = /** @type {HTMLTextAreaElement} */ (
      document.querySelector("#generatedContents")
    );
    this.$generatedReadings = /** @type {HTMLTextAreaElement} */ (
      document.querySelector("#generatedReadings")
    );
    this.$duplicationChecker = /** @type {HTMLInputElement} */ (
      document.querySelector("#duplicationChecker")
    );
    this.$duplicatedContents = /** @type {HTMLTextAreaElement} */ (
      document.querySelector("#duplicatedContents")
    );
    this.$duplicatedReadings = /** @type {HTMLTextAreaElement} */ (
      document.querySelector("#duplicatedReadings")
    );

    this.decomojis = decomojis;

    // 初期化
    this.init();
  }

  /**
   * テンプレートに活用を乗せて配列で返す
   * @returns {string[]}
   */
  get conjugatedContent() {
    const { value: word } = this.$word;
    const { value: base } = this.$conjugateWords;

    return base.split(",").map((v) => v.replace("~", word));
  }

  /**
   * テンプレートに読みを乗せて配列で返す
   * @returns {string[]}
   */
  get conjugatedReading() {
    const { value: reading } = this.$reading;
    const { value: base } = this.$conjugateReadings;

    return base.split(",").map((v) => v.replace("~", reading));
  }

  /**
   * デコモジ本体と読みを突合させるか否かを返す
   * @returns {boolean}
   */
  get duplicateCheck() {
    return this.$duplicationChecker.checked;
  }

  /**
   * デコモジ本体と読みを突合させて重複する読みを配列で返す
   * @returns {string[]}
   */
  get duplicatedReading() {
    return this.conjugatedReading.filter((v) => this.isDuplicates(v));
  }

  /**
   * デコモジ本体と読みを突合させて重複する活用をを配列で返す
   * @returns {string[]}
   */
  get duplicatedContent() {
    return this.conjugatedReading
      .map((v, i) => (this.isDuplicates(v) ? i.toString() : null))
      .filter((v) => v)
      .map((dup) => this.conjugatedContent[Number(dup)]);
  }

  /**
   * デコモジ本体と読みを突合させて重複する読みを配列で返す
   * @returns {string[]}
   */
  get uniqueReading() {
    return this.conjugatedReading.filter((v) => !this.isDuplicates(v));
  }

  /**
   * デコモジ本体と読みを突合させて重複していない活用を配列で返す
   * @returns {string[]}
   */
  get uniqueContent() {
    return this.conjugatedReading
      .map((v, i) => (this.isDuplicates(v) ? null : i.toString()))
      .filter((v) => v)
      .map((uniq) => this.conjugatedContent[Number(uniq)]);
  }

  /**
   * デコモジ本体に引数で与えた文字列が含まれているか否かを返す
   * @param {string} name
   * @returns {boolean}
   */
  isDuplicates(name) {
    return this.decomojis.includes(name);
  }

  /**
   * 活用を切り替えて画面に渡す
   * @returns {void}
   */
  setConjugateValues() {
    const { value } = /** @type {RadioNodeList} */ (
      this.$conjugator.elements.namedItem("type")
    );
    const t = Number(value);
    // マニュアル編集モードの時は値を上書きしない
    if (t === 3) return;
    this.$conjugateWords.value = ConjugateContents[t];
    this.$conjugateReadings.value = ConjugateReadings[t];
  }

  /**
   * 活用を生成して画面に渡す
   * @returns {void}
   */
  setConjugatedValues() {
    this.$generatedContents.value = (
      this.duplicateCheck ? this.uniqueContent : this.conjugatedContent
    ).join("\n");
    this.$generatedReadings.value = (
      this.duplicateCheck ? this.uniqueReading : this.conjugatedReading
    ).join("\n");
  }

  /**
   * 重複を生成して画面に渡す
   * @returns {void}
   */
  setDuplicatedValues() {
    this.$duplicatedContents.value = this.duplicatedContent.join("\n");
    this.$duplicatedReadings.value = this.duplicatedReading.join("\n");
  }

  /** @returns {void} */
  handleInput() {
    this.setConjugateValues();
    this.setConjugatedValues();
    this.setDuplicatedValues();
  }

  /** @returns {void} */
  dispatch() {
    this.$conjugator.addEventListener(
      "input",
      () => {
        this.handleInput();
      },
      false
    );
  }

  /** @returns {void} */
  init() {
    this.dispatch();
    this.setConjugateValues();
    this.setConjugatedValues();
    this.setDuplicatedValues();
  }
}
