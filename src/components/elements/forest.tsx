import styles from '@/styles/components/elements/forest.module.scss';
import Tree from '../svg/tree';

export default function Home(): JSX.Element {
  return (
    <div className={styles.forest}>
      <div className={styles.tree1}>
        <Tree />
      </div>
      <div className={styles.tree2}>
        <Tree />
      </div>
      <div className={styles.tree3}>
        <Tree />
      </div>
      <div className={styles.tree4}>
        <Tree />
      </div>
    </div>
  );
}
