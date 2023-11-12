import { RoleActionSubPage } from '@/config/roleActionSubPage';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setPageFunc: Dispatch<SetStateAction<RoleActionSubPage>>;
};

export default function Home({ setPageFunc }: Props): JSX.Element {
  function buttonHandler() {
    setPageFunc(RoleActionSubPage.Action);
  }

  return (
    <>
      <p>そのままお待ちください...</p>
      <p>
        <button type="button" onClick={buttonHandler}>
          戻る
        </button>
      </p>
    </>
  );
}
