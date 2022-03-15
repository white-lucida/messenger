import { APIButtonComponent, APIMessageComponent, APISelectMenuComponent } from "discord-api-types";
import { useState } from "react";

const useComponent = () => {
  const [ component, setComponent ] = useState<APIButtonComponent | APISelectMenuComponent>();
}

export { useComponent };