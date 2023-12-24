import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/elements/button';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { ButtonStyle } from '@/config/buttonStyle';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { RoleActionSubPage } from '@/config/roleActionSubPage';
import styles from '@/styles/app/pl/playing/playing.module.scss';

type Props = {
  setPageFunc: Dispatch<SetStateAction<RoleActionSubPage>>;
};

export default function Home({ setPageFunc }: Props): JSX.Element {
  function buttonHandler() {
    setPageFunc(RoleActionSubPage.Action);
  }

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.FooterCenter}
      type={PlayingLayoutStyle.Dark}
    >
      <div className={styles.headerTitle}>
        <p>そのままお待ちください...</p>
      </div>
      <form>
        <ul className={styles.bottomButtons}>
          <li className={styles.bottomButtons__button_first}>
            <span onClick={buttonHandler}>
              <Button type={ButtonStyle.Purple}>戻る</Button>
            </span>
          </li>
        </ul>
      </form>
      <PlayingFooter useRoleCheck={true} useLogoLink={true} />
    </PlayingLayout>
  );
}
