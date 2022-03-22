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
            return (
              <li key={i}>
                <Button button={component} rowIndex={rowIndex} buttonIndex={i} />
              </li>
            );
          case 3:
            return (
              <SelectMenu key={i} selectMenu={component} rowIndex={rowIndex} selectMenuIndex={i} />
            );
        }
      }),
    [actionRow.components, rowIndex],
  );
  return (
    <ActionRow index={rowIndex}>
      <ul className={styles.children}>{componentInputs}</ul>
      <NewComponentButton
        onClick={() => dispatch({ type: 'newButton', payload: { rowIndex } })}
        label='ボタンを追加する'
      />
    </ActionRow>
  );
});

export { Form };
