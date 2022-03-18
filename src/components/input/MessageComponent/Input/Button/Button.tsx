import { APIButtonComponent } from 'discord-api-types';
import { useActionRow } from '../../../../../hooks/use_actionrow';
import { Card, Header, Body } from '../../../Card';
import { Input, Label, Row } from '../../../Property';
import { Button as TabButton, Content, Panel } from '../../../Card/Tab';
import { Button as UIButton } from '../../../../ui/Button';
import { useCardTab } from '../../../../../hooks/use_cardtab';
import { Toggle } from '../../../Property';

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
  return (
    <section>
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
                    buttonIndex,
                  },
                })
              }
            />
          </Content>
          <Content isEnabled={isCurrentTab('スタイル')}>
            <></>
          </Content>
          <Content isEnabled={isCurrentTab('付加情報')}>
            <></>
          </Content>
          <Content isEnabled={isCurrentTab('その他')}>
            <Row>
              <Label>ボタンを使用可能にする</Label>
              <Toggle
                onClick={() =>
                  dispatch({ type: 'toggleButtonDisabled', payload: { rowIndex, buttonIndex } })
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
    </section>
  );
};

export { Button };
