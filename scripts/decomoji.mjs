/**
 * デコモジ本体（node_modules/decomoji）から、このアプリが必要とするデータだけを
 * public/data/decomoji.json に書き出すスクリプト。
 *
 * 生成したファイルはコミットするため、公開時にビルドは不要。
 * デコモジ本体を更新したら `npm run update:decomoji` で作り直す。
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJsonPath = resolve(rootDir, "node_modules/decomoji/package.json");
const configPath = resolve(rootDir, "node_modules/decomoji/configs/v5_all.json");
const outputPath = resolve(rootDir, "public/data/decomoji.json");

/**
 * JSON ファイルを読んでパースする
 * @param {string} path
 * @returns {Promise<any>}
 */
const readJson = async (path) => {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error instanceof Error && /** @type {any} */ (error).code === "ENOENT") {
      throw new Error(
        `${path} がありません。\`npm run update:decomoji\` から実行してください。`
      );
    }
    throw error;
  }
};

/** @type {{ version: string }} */
const { version } = await readJson(packageJsonPath);

/** @type {{ name: string, category: string, path: string, created: string }[]} */
const configs = await readJson(configPath);

const names = configs.map((v) => v.name);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify({ version, names })}\n`, "utf8");

console.log(`v${version} / ${names.length} decomojis -> ${outputPath}`);
