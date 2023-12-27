import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/elements/logo';
import PlayerPanel from '@/components/elements/playerPanel';
import { LogoStyle } from '@/config/logoStyle';
import { PlayerRole } from '@/config/playerRole';
import { PlayerRoleSetting } from '@/config/playerRoleSetting';
import styles from '@/styles/components/layouts/playingFooter.module.scss';
import { LocalStorageService } from '@/utils/localStorageService';

type Props = {
  useRoleCheck?: boolean;
  useLogoLink?: boolean;
};

export default function Home({
  useRoleCheck = false,
  useLogoLink = false,
}: Props): JSX.Element {
  const [visibleRole, setVisibleRole] = useState(false);
  const [userRole, setUserRole] = useState<PlayerRole>(PlayerRole.Empty);

  useEffect(() => {
    const playerRole = LocalStorageService.getPlayingPlayerRole();
    setUserRole(playerRole);
  }, []);

  function handlePanelClick() {
    setVisibleRole(!visibleRole);
  }

  function panelChanger() {
    if (!useRoleCheck) {
      return <PlayerPanel />;
    }
    if (visibleRole) {
      return (
        <div onClick={handlePanelClick}>
          <span>{PlayerRoleSetting.RoleName.get(userRole)}</span>
        </div>
      );
    }
    return (
      <div onClick={handlePanelClick}>
        <PlayerPanel />
      </div>
    );
  }

  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__flexwrapper}>
        <li>{panelChanger()}</li>
        <li>
          {useLogoLink ? (
            <Link href={'.'}>
              <Logo type={LogoStyle.FixedSmall} />
            </Link>
          ) : (
            <Logo type={LogoStyle.FixedSmall} />
          )}
        </li>
      </ul>
    </footer>
  );
}
