import { ButtonStyle } from 'discord-api-types';
/**
 * ボタンのstyleの文字列表現を取得します
 * @param  {ButtonStyle} style - 文字列表現を取得する`ButtonStyle`
 * @returns 文字列表現
 */

const getButtonStyleName = (style: ButtonStyle) => {
  switch (style) {
    case 1:
      return 'primary';
    case 2:
      return 'secondary';
    case 3:
      return 'success';
    case 4:
      return 'danger';
    case 5:
      return 'link';
  }
};

export { getButtonStyleName };
