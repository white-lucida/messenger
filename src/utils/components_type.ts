import {
  APIActionRowComponent,
  APIButtonComponent,
  APIButtonComponentWithCustomId,
  APIButtonComponentWithURL,
  APIMessageComponent,
  APISelectMenuComponent,
} from 'discord-api-types';

const isActionRow = (component: APIMessageComponent): component is APIActionRowComponent =>
  component.type === 1;
const isButton = (component: APIMessageComponent): component is APIButtonComponent =>
  component.type === 2;
const isSelectMenu = (component: APIMessageComponent): component is APISelectMenuComponent =>
  component.type === 3;

/**
 * `Button.custom_id`が`undefined`でないとき、customIDを持っているとみなします
 * @param  {APIButtonComponent} button - 型を調べるボタン
 * @returns `button`が`APIButtonComponentWithCustomId`かどうか
 */
const isButtonWithCustomID = (
  button: APIButtonComponent,
): button is APIButtonComponentWithCustomId => 'custom_id' in button;

const isButtonWithURL = (button: APIButtonComponent): button is APIButtonComponentWithURL =>
  'url' in button;

export { isActionRow, isButton, isSelectMenu, isButtonWithURL, isButtonWithCustomID };
