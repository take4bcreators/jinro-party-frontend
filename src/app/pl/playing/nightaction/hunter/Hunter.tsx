import { RoleActionSubPage } from '@/config/roleActionSubPage';
import { Dispatch, SetStateAction, useState } from 'react';
import Action from './subpage/Action';
import Wait from '../common/Wait';

type Props = {
  setPageFunc: Dispatch<SetStateAction<RoleActionSubPage>>;
};

export default function Home(): JSX.Element {
  const [page, setPage] = useState<RoleActionSubPage>(RoleActionSubPage.Action);

  let ActionPage = ({ setPageFunc }: Props) => {
    return <></>;
  };
  switch (page) {
    case RoleActionSubPage.Action:
      ActionPage = Action;
      break;
    case RoleActionSubPage.Wait:
      ActionPage = Wait;
      break;
    default:
      break;
  }

  return (
    <>
      <ActionPage setPageFunc={setPage} />
    </>
  );
}
