import { APIButtonComponent } from "discord-api-types";

const useButton = (button: APIButtonComponent, setButton: (button: APIButtonComponent) => void) => {
  const setLabel = (label: string) => setButton({
    ...button,
    label
  });

  return {
    button, 
    setLabel
  };
}

export { useButton };