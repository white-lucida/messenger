import { APIButtonComponent } from 'discord-api-types';
import { useActionRow } from '../../../../../hooks/use_actionrow';

type ButtonProps = {
  button: APIButtonComponent;
  rowIndex: number;
  buttonIndex: number;
};

const Button: React.VFC<ButtonProps> = ({ button, rowIndex, buttonIndex }) => {
  const dispatch = useActionRow();
  return (
    <section>
      <input
        value={button.label ?? ''}
        onChange={(e) =>
          dispatch({
            type: 'setButtonLabel',
            payload: {
              label: e.target.value,
              rowIndex,
              buttonIndex,
            },
          })
        }
      />
    </section>
  );
};

export { Button };
