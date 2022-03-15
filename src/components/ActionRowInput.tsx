import { APIActionRowComponent, APIButtonComponent, APISelectMenuComponent } from "discord-api-types";
import { useContext, useMemo } from "react";
import { useActionRow } from "../hooks/use_actionrow";
import { useButton } from "../hooks/use_button";
import { useSelectMenu } from "../hooks/use_selectmenu";
import { ButtonInput } from "./ButtonInput";
import { SelectMenuInput } from "./SelectMenuInput";
import React from "react";

type ActionRowInputProps = {
  actionRow: APIActionRowComponent,
  rowIndex: number
}

const ActionRowInput: React.VFC<ActionRowInputProps> = React.memo(function Inside({ actionRow, rowIndex }){
  const dispatch = useActionRow();

  const componentInputs = useMemo(
    () => actionRow.components.map((component, i) => {
      switch (component.type) {
        case 2:
          return <ButtonInput key={i} button={component} rowIndex={rowIndex} buttonIndex={i} />
        case 3:
          return <SelectMenuInput key={i} selectMenu={component} rowIndex={rowIndex} selectMenuIndex={i} />
      }
    }
  ), [actionRow.components, rowIndex]);
  return (
    <section>
      { componentInputs }
      <input type="button" onClick={() => dispatch({ type: "newButton", payload: { index: rowIndex }})} value="ボタンを追加する" />
    </section>
  );
})

export { ActionRowInput };