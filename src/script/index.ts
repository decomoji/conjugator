// for IE11
import "core-js/stable";
import "regenerator-runtime/runtime";
import { Conjugator } from "./Conjugator";

document.addEventListener("DOMContentLoaded", () => {
  new Conjugator();
});
