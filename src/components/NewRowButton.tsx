import React from "react"
import { useActionRow } from "../hooks/use_actionrow";

const NewRowButton = React.memo(function Inside() {
  const dispatch = useActionRow();
  return (
    <input type="button" onClick={(() => dispatch({ type: "newRow" }))} value="行を追加する" />
  )
})

export { NewRowButton };