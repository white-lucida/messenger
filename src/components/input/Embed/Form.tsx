import React from 'react';
import { APIEmbed } from 'discord-api-types';
import { CirclePicker } from 'react-color';

import { Label, Input, TextArea, Row, Datetime, Verifier } from '../Property';
import { Card, Body as CardBody, Header as CardHeader } from '../Card';
import { Button as TabButton, Panel as TabPanel, Content } from '../Card/Tab';

import { useEmbed } from '../../../hooks/use_embed';
import { useCardTab } from '../../../hooks/use_cardtab';
import { Button } from '../../ui';

import styles from './Form.module.css';
import 'react-datepicker/dist/react-datepicker.css';

type FormProps = {
  index: number;
  embed: APIEmbed;
  className?: string;
};

const tabNames = [
  '基本情報',
  'フィールド',
  'サムネイル',
  '画像',
  'フッター',
  '著者欄',
  'その他',
] as const;
type TabName = typeof tabNames[number];

const Form: React.VFC<FormProps> = React.memo(function Inside({ index, embed, className }) {
  /*
    react/display-name エラーが発生したため、functionを使用
  */
  const { isCurrentTab, changeTab } = useCardTab<TabName>('基本情報');
  const dispatch = useEmbed();

  return (
    <Card className={className}>
      <CardHeader> {index + 1} </CardHeader>

      <TabPanel>
        {tabNames.map((name, i) => (
          <li key={i}>
            <TabButton
              onClick={() => changeTab(name)}
              isEnabled={isCurrentTab(name)}
              tabName={name}
              key={i}
            />
          </li>
        ))}
      </TabPanel>

      <CardBody>
        <Content isEnabled={isCurrentTab('基本情報')}>
          <Row>
            <Label> タイトル</Label>
            <Verifier
              errorCondition={(embed.title?.length ?? 0) > 256}
              alert='タイトルを256文字より短くしてください'
            >
              <Input
                onChange={(value) =>
                  dispatch({
                    type: 'setTitle',
                    payload: {
                      embedIndex: index,
                      title: value,
                    },
                  })
                }
                value={embed.title}
              />
            </Verifier>
          </Row>
          <Row>
            <Label>説明</Label>
            <Verifier
              errorCondition={(embed.description?.length ?? 0) > 4096}
              alert='説明を4096文字より短くしてください'
            >
              <TextArea
                onChange={(value) =>
                  dispatch({
                    type: 'setDescription',
                    payload: {
                      embedIndex: index,
                      description: value,
                    },
                  })
                }
                value={embed.description}
              />
            </Verifier>
          </Row>
        </Content>
        <Content isEnabled={isCurrentTab('フィールド')}>
          <ul className={styles.fields}>
            {embed.fields?.map((field, i) => (
              <li key={i}>
                <Row>
                  <Label>{i + 1}</Label>

                  <Verifier
                    errorCondition={field.name === ''}
                    alert='フィールド名を入力してください'
                  >
                    <Verifier
                      errorCondition={(field.name?.length ?? 0) > 256}
                      alert='フィールド名を256文字より短くしてください'
                    >
                      <Input
                        onChange={(value) =>
                          dispatch({
                            type: 'setFieldName',
                            payload: {
                              embedIndex: index,
                              fieldIndex: i,
                              name: value,
                            },
                          })
                        }
                        value={field.name}
                      />
                    </Verifier>
                  </Verifier>
                  <Verifier
                    errorCondition={field.value === ''}
                    alert='フィールドの値を入力してください'
                  >
                    <Verifier
                      errorCondition={(field.value?.length ?? 0) > 1024}
                      alert='フィールドの値を1024文字より短くしてください'
                    >
                      <TextArea
                        onChange={(value) =>
                          dispatch({
                            type: 'setFieldValue',
                            payload: {
                              embedIndex: index,
                              fieldIndex: i,
                              value: value,
                            },
                          })
                        }
                        value={field.value}
                      />
                    </Verifier>
                  </Verifier>
                  <Button
                    onClick={() =>
                      dispatch({
                        type: 'removeField',
                        payload: { embedIndex: index, fieldIndex: i },
                      })
                    }
                    label='このフィールドを削除する'
                  />
                </Row>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => dispatch({ type: 'newField', payload: { embedIndex: index } })}
            label='フィールドを追加する'
          />
        </Content>
        <Content isEnabled={isCurrentTab('サムネイル')}>
          <Row>
            <Label> サムネイルURL </Label>
            <Input
              onChange={(value) =>
                dispatch({
                  type: 'setThumbnailURL',
                  payload: {
                    embedIndex: index,
                    url: value,
                  },
                })
              }
              value={embed.thumbnail?.url ?? ''}
            />
          </Row>
        </Content>
        <Content isEnabled={isCurrentTab('画像')}>
          <Row>
            <Label> 画像URL </Label>
            <Input
              onChange={(value) =>
                dispatch({
                  type: 'setImageURL',
                  payload: {
                    embedIndex: index,
                    url: value,
                  },
                })
              }
              value={embed.image?.url ?? ''}
            />
          </Row>
        </Content>
        <Content isEnabled={isCurrentTab('フッター')}>
          <Row>
            <Label> テキスト </Label>
            <Verifier
              errorCondition={(embed.footer?.text.length ?? 0) > 2048}
              alert='フッターのテキストは2048文字より短くしてください'
            >
              <Input
                onChange={(value) =>
                  dispatch({
                    type: 'setFooterText',
                    payload: {
                      embedIndex: index,
                      text: value,
                    },
                  })
                }
                value={embed.footer?.text ?? ''}
              />
            </Verifier>
          </Row>
          <Row>
            <Label> アイコンURL </Label>
            <Input
              onChange={(value) =>
                dispatch({
                  type: 'setFooterIconURL',
                  payload: {
                    embedIndex: index,
                    icon_url: value,
                  },
                })
              }
              value={embed.footer?.icon_url ?? ''}
            />
          </Row>
        </Content>
        <Content isEnabled={isCurrentTab('著者欄')}>
          <Row>
            <Label>著者名</Label>
            <Verifier
              errorCondition={(embed.author?.name.length ?? 0) > 256}
              alert='著者名は256文字より短くしてください'
            >
              <Input
                onChange={(value) =>
                  dispatch({
                    type: 'setAuthorName',
                    payload: {
                      embedIndex: index,
                      name: value,
                    },
                  })
                }
                value={embed.author?.name ?? ''}
              />
            </Verifier>
          </Row>
          <Row>
            <Label>著者アイコンURL</Label>
            <Input
              onChange={(value) =>
                dispatch({
                  type: 'setAuthorIconURL',
                  payload: {
                    embedIndex: index,
                    icon_url: value,
                  },
                })
              }
              value={embed.author?.icon_url ?? ''}
            />
          </Row>
          <Row>
            <Label>著者リンクURL</Label>
            <Input
              onChange={(value) =>
                dispatch({
                  type: 'setAuthorURL',
                  payload: {
                    embedIndex: index,
                    url: value,
                  },
                })
              }
              value={embed.author?.url ?? ''}
            />
          </Row>
        </Content>
        <Content isEnabled={isCurrentTab('その他')}>
          <Row>
            <CirclePicker
              onChangeComplete={(color) =>
                dispatch({
                  type: 'changeColor',
                  payload: { embedIndex: index, color: color.hex },
                })
              }
            />
          </Row>
          <Row>
            <Label> URL </Label>
            <Input
              onChange={(value) =>
                dispatch({
                  type: 'setURL',
                  payload: {
                    embedIndex: index,
                    url: value,
                  },
                })
              }
              value={embed.url ?? ''}
            />
          </Row>
          <Row>
            <Label> タイムスタンプ </Label>
            <Datetime
              onChange={(value) => {
                if (value === null) return;

                dispatch({
                  type: 'setTimestamp',
                  payload: {
                    embedIndex: index,
                    timestamp: value.toISOString(),
                  },
                });
              }}
              date={
                new Date(embed.timestamp === undefined ? Date.now() : Date.parse(embed.timestamp))
              }
            />
          </Row>
          <Row>
            <Button
              onClick={() => dispatch({ type: 'removeEmbed', payload: { embedIndex: index } })}
              label='この埋め込みを削除する'
            />
          </Row>
        </Content>
      </CardBody>
    </Card>
  );
});

export { Form };
