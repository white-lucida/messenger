import React, { useMemo } from 'react';
import { APIActionRowComponent } from 'discord-api-types';

import { Button } from '../Input';
import { SelectMenu } from '../Input';

import { useActionRow } from '../../../../hooks/use_actionrow';

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
    <section>
      {componentInputs}
      <input
        type='button'
        onClick={() => dispatch({ type: 'newButton', payload: { index: rowIndex } })}
        value='ボタンを追加する'
      />
    </section>
  );
});

export { Form };
