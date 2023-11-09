export default function Home(): JSX.Element {
  const time = 60;
  return (
    <>
      <h1>昼のフェーズ</h1>
      <p>残り時間..</p>
      <p>{time}</p>
    </>
  );
}
