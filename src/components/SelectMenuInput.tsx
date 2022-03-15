import { APISelectMenuComponent } from 'discord-api-types';
import { useActionRow } from '../hooks/use_actionrow';

type SelectMenuInputProps = {
  selectMenu: APISelectMenuComponent;
  rowIndex: number;
  selectMenuIndex: number;
};

const SelectMenuInput: React.VFC<SelectMenuInputProps> = ({
  selectMenu,
  rowIndex,
  selectMenuIndex,
}) => {
  const dispatch = useActionRow();
  return (
    <section>
      <input value={selectMenu.custom_id} />
    </section>
  );
};

export { SelectMenuInput };
