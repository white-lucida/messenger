import { APIButtonComponent, ButtonStyle } from 'discord-api-types';
import { useActionRow } from '../../../../../hooks/use_actionrow';
import { Card, Header, Body } from '../../../Card';
import { Input, Label, Row, Select } from '../../../Property';
import { Button as TabButton, Content, Panel } from '../../../Card/Tab';
import { Button as UIButton } from '../../../../ui/Button';
import { useCardTab } from '../../../../../hooks/use_cardtab';
import { Toggle } from '../../../Property';
import { isButtonWithCustomID, isButtonWithURL } from '../../../../../utils/components_type';
import { useMemo } from 'react';
import { getButtonStyleName } from '../../../../../utils/button_style_type';

type ButtonProps = {
  button: APIButtonComponent;
  rowIndex: number;
  buttonIndex: number;
};

const tabNames = ['テキスト', 'スタイル', '付加情報', 'その他'] as const;
type TabName = typeof tabNames[number];

const Button: React.VFC<ButtonProps> = ({ button, rowIndex, buttonIndex }) => {
  const dispatch = useActionRow();
  const { isCurrentTab, changeTab } = useCardTab<TabName>('テキスト');
  const buttonStyleOptions: { value: ButtonStyle; label: string }[] = useMemo(
    () => [1, 2, 3, 4].map((style) => ({ label: getButtonStyleName(style) ?? '', value: style })),
    [],
  );
  return (
    <Card>
      <Header>{buttonIndex + 1}</Header>
      <Panel>
        {tabNames.map((name, i) => (
          <TabButton
            key={i}
            onClick={() => changeTab(name)}
            tabName={name}
            isEnabled={isCurrentTab(name)}
          />
        ))}
      </Panel>
      <Body>
        <Content isEnabled={isCurrentTab('テキスト')}>
          <Input
            value={button.label ?? ''}
            onChange={(value) =>
              dispatch({
                type: 'setButtonLabel',
                payload: {
                  label: value,
                  rowIndex,
                  componentIndex: buttonIndex,
                },
              })
            }
          />
        </Content>
        <Content isEnabled={isCurrentTab('スタイル')}>
          <Select<ButtonStyle, string>
            onChange={(value) =>
              dispatch({
                type: 'setButtonStyle',
                payload: {
                  rowIndex,
                  componentIndex: buttonIndex,
                  style: value ?? 1,
                },
              })
            }
            options={buttonStyleOptions}
          />
        </Content>
        <Content isEnabled={isCurrentTab('付加情報')}>
          {isButtonWithCustomID(button) && (
            <Row>
              <Label>ID</Label>
              <Input
                onChange={(value) =>
                  dispatch({
                    type: 'setButtonCustomID',
                    payload: { rowIndex, componentIndex: rowIndex, custom_id: value },
                  })
                }
                value={button.custom_id}
              />
            </Row>
          )}
          {isButtonWithURL(button) && (
            <Row>
              <Label>URL</Label>
              <Input
                onChange={(value) =>
                  dispatch({
                    type: 'setButtonURL',
                    payload: { rowIndex, componentIndex: rowIndex, url: value },
                  })
                }
                value={button.url}
              />
            </Row>
          )}
        </Content>
        <Content isEnabled={isCurrentTab('その他')}>
          <Row>
            <Label>ボタンを使用可能にする</Label>
            <Toggle
              onClick={() =>
                dispatch({
                  type: 'toggleButtonDisabled',
                  payload: { rowIndex, componentIndex: buttonIndex },
                })
              }
              isEnabled={!(button.disabled ?? false)}
            />
          </Row>
          <UIButton
            label='このボタンを削除する'
            onClick={() =>
              dispatch({
                type: 'removeComponent',
                payload: { rowIndex, componentIndex: buttonIndex },
              })
            }
          />
        </Content>
      </Body>
    </Card>
  );
};

export { Button };
