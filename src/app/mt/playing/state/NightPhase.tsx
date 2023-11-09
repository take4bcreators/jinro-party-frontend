export default function Home(): JSX.Element {
  const time = 60;
  return (
    <>
      <h1>夜のフェーズ</h1>
      <p>各自の端末で操作してください</p>
      <p>残り時間...</p>
      <p>{time}</p>
    </>
  );
}
