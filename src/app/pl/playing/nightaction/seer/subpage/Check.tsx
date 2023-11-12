import { RoleActionSubPage } from '@/config/roleActionSubPage';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setPageFunc: Dispatch<SetStateAction<RoleActionSubPage>>;
};

export default function Home({ setPageFunc }: Props): JSX.Element {
  function buttonHandler() {
    setPageFunc(RoleActionSubPage.Wait);
  }

  return (
    <>
      <p>〇〇さんは「人狼」です</p>
      <p>
        <button type="button" onClick={buttonHandler}>
          OK
        </button>
      </p>
    </>
  );
}
