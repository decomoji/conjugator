/**
 * `npm run update:decomoji` で生成されるデコモジ本体のデータ
 * @typedef {object} DecomojiData
 * @property {string} version デコモジ本体のバージョン
 * @property {string[]} names デコモジ本体のファイル名（拡張子なし）の配列
 */

/**
 * デコモジ本体のデータを取得する
 * @returns {Promise<DecomojiData>}
 */
export const fetchDecomoji = async () => {
  const response = await fetch(
    new URL("../data/decomoji.json", import.meta.url)
  );

  if (!response.ok) {
    throw new Error(
      `デコモジ本体のデータを取得できませんでした: ${response.status}`
    );
  }

  return response.json();
};
