import { APISelectMenuComponent } from "discord-api-types";

const useSelectMenu = (selectMenu: APISelectMenuComponent, setSelectMenu: (selectMenu: APISelectMenuComponent) => void) => {
  const setCustomID = (customID: string) => setSelectMenu({
    ...selectMenu,
    custom_id: customID
  });

  return {
    selectMenu,
    setCustomID
  }
}

export { useSelectMenu };