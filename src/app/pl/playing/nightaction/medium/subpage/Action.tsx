import { RoleActionSubPage } from '@/config/roleActionSubPage';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setPageFunc: Dispatch<SetStateAction<RoleActionSubPage>>;
};

export default function Home({ setPageFunc }: Props): JSX.Element {
  function buttonHandler() {
    setPageFunc(RoleActionSubPage.Check);
  }

  return (
    <>
      <p>最後に処刑されたプレイヤーの役職を確認します。</p>
      <p>
        <button type="button" onClick={buttonHandler}>
          OK
        </button>
      </p>
    </>
  );
}
