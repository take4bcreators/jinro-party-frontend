import styles from '@/styles/components/elements/arrows.module.scss';

export default function Home(): JSX.Element {
  return (
    <>
      <div className={styles.arrows}>
        <div className={styles.arrow01}></div>
        <div className={styles.arrow02}></div>
        <div className={styles.arrow03}></div>
      </div>
    </>
  );
}
