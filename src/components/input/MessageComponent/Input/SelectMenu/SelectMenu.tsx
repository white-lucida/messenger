import { APISelectMenuComponent } from 'discord-api-types';
import { useActionRow } from '../../../../../hooks/use_actionrow';

type SelectMenuProps = {
  selectMenu: APISelectMenuComponent;
  rowIndex: number;
  selectMenuIndex: number;
};

const SelectMenu: React.VFC<SelectMenuProps> = ({ selectMenu, rowIndex, selectMenuIndex }) => {
  const dispatch = useActionRow();
  return (
    <section>
      <input value={selectMenu.custom_id} />
    </section>
  );
};

export { SelectMenu };
