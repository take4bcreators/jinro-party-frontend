import { APIService } from '@/utils/apiService';
import Link from 'next/link';

export default function Home(): JSX.Element {
  async function handleButton() {
    const resData = await APIService.getEndGameReset();
    if (resData == undefined) {
      return;
    }
  }

  return (
    <>
      <h1>役職発表中</h1>
      <p>
        <Link href="/gm/" onClick={handleButton}>
          ゲームを終了する
        </Link>
      </p>
    </>
  );
}
