# build時の特定のフォルダ配下を除外

## 概要
- build時に、メモ用として用意している workフォルダ 内のファイルで構文エラーが発生
- テスト用のファイルなので、ファイル側なのではなく、build の対象外としたい

## 方法
- 構文エラーの回避であれば、 `tsconfig.json` の `exclude` に対象フォルダを追加する

## 参考URL
https://github.com/vercel/next.js/discussions/11113
