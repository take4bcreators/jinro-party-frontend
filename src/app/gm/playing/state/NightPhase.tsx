export default function Home(): JSX.Element {
  const time = 60;
  return (
    <>
      <h1>夜のフェーズ</h1>
      <p>残り時間...</p>
      <p>{time}</p>
    </>
  );
}
