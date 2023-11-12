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
      <p>占いたいプレイヤーを選択してください</p>
      <p>
        <button type="button" onClick={buttonHandler}>
          OK
        </button>
      </p>
    </>
  );
}
