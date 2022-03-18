import React, { useMemo } from 'react';
import { APIActionRowComponent } from 'discord-api-types';

import { ActionRow, Button, SelectMenu } from '../Input';
import { Button as NewComponentButton } from '../../../ui/Button';

import { useActionRow } from '../../../../hooks/use_actionrow';

import styles from './Form.module.css';

type FormProps = {
  actionRow: APIActionRowComponent;
  rowIndex: number;
};

const Form: React.VFC<FormProps> = React.memo(function Inside({ actionRow, rowIndex }) {
  const dispatch = useActionRow();

  const componentInputs = useMemo(
    () =>
      actionRow.components.map((component, i) => {
        switch (component.type) {
          case 2:
            return <Button key={i} button={component} rowIndex={rowIndex} buttonIndex={i} />;
          case 3:
            return (
              <SelectMenu key={i} selectMenu={component} rowIndex={rowIndex} selectMenuIndex={i} />
            );
        }
      }),
    [actionRow.components, rowIndex],
  );
  return (
    <ActionRow>
      <div className={styles.children}>{componentInputs}</div>
      <NewComponentButton
        onClick={() => dispatch({ type: 'newButton', payload: { index: rowIndex } })}
        label='ボタンを追加する'
      />
    </ActionRow>
  );
});

export { Form };
