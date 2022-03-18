import clsx from 'clsx';

import { Button } from '../../../../ui';

import { useActionRow } from '../../../../../hooks/use_actionrow';

import styles from './ActionRow.module.css';

type ActionRowProps = {
  children: React.ReactNode;
  className?: string;
  index: number;
};

const ActionRow: React.VFC<ActionRowProps> = ({ children, className, index }) => {
  const dispatch = useActionRow();
  return (
    <section className={clsx(styles.root, className)}>
      {children}
      <Button
        label='この行を削除する'
        onClick={() => dispatch({ type: 'removeRow', payload: { rowIndex: index } })}
      />
    </section>
  );
};

export { ActionRow };
