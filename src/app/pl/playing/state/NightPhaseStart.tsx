import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import StateTitle from '@/components/elements/stateTitle';
import PlayingFooter from '@/components/layouts/playingFooter';
import PlayingLayout from '@/components/layouts/playingLayout';
import { FlexBaseLayoutStyle } from '@/config/flexBaseLayoutStyle';
import { PlayerState } from '@/config/playerState';
import { PlayingLayoutStyle } from '@/config/playingLayoutStyle';
import { StateTitleStyle } from '@/config/stateTitleStyle';
import styles from '@/styles/app/pl/playing/playing.module.scss';
import { LocalStorageService } from '@/utils/localStorageService';

type Props = {
  setDropOutFunc: Dispatch<SetStateAction<boolean>>;
};

export default function Home({ setDropOutFunc }: Props): JSX.Element {
  // const router = useRouter();
  useEffect(() => {
    const playerState = LocalStorageService.getPlayingPlayerState();
    if (playerState === PlayerState.Dead) {
      // 脱落した場合は、ページを再読み込みし、
      // 脱落用のページへ進む
      // router.refresh();
      setDropOutFunc(true);
      return;
    }
  }, [setDropOutFunc]);

  return (
    <PlayingLayout
      flexType={FlexBaseLayoutStyle.FooterCenter}
      type={PlayingLayoutStyle.Dark}
    >
      <StateTitle type={StateTitleStyle.Dark} title={'Night Time'}>
        <p>夜になりました</p>
      </StateTitle>
      <PlayingFooter useRoleCheck={true} useLogoLink={true} />
    </PlayingLayout>
  );
}
