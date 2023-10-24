# build時のnext/fontエラー

## 概要
- npx next build で build しようとしたところ、「next/font」のエラーが発生

## 参考URL
https://nextjs.org/docs/messages/built-in-next-font

## 対応方法
- 次のコマンドをこのリポジトリのトップの階層で実行する

```
npx @next/codemod built-in-next-font .
```

## 補足
- 実行後、Git管理のファイルに変化があるわけではないので、個別に対応が必要そう
