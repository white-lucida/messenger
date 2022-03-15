import { APIButtonComponent } from 'discord-api-types';
import { useActionRow } from '../hooks/use_actionrow';

type ButtonInputProps = {
  button: APIButtonComponent;
  rowIndex: number;
  buttonIndex: number;
};

const ButtonInput: React.VFC<ButtonInputProps> = ({ button, rowIndex, buttonIndex }) => {
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

export { ButtonInput };
