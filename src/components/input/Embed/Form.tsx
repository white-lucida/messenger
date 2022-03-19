import React from 'react';
import { APIEmbed } from 'discord-api-types';
import { CirclePicker } from 'react-color';

import { Label, Input, TextArea, Row, Datetime } from '../Property';
import { Card, Body as CardBody, Header as CardHeader } from '../Card';
import { Button as TabButton, Panel as TabPanel, Content } from '../Card/Tab';

import { useEmbed } from '../../../hooks/use_embed';
import { useCardTab } from '../../../hooks/use_cardtab';
import { Button } from '../../ui';

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
          <TabButton
            onClick={() => changeTab(name)}
            isEnabled={isCurrentTab(name)}
            tabName={name}
            key={i}
          />
        ))}
      </TabPanel>

      <CardBody>
        <Content isEnabled={isCurrentTab('基本情報')}>
          <Row>
            <Label> タイトル</Label>
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
          </Row>
          <Row>
            <Label>説明</Label>
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
          </Row>
        </Content>
        <Content isEnabled={isCurrentTab('フィールド')}>
          {embed.fields?.map((field, i) => (
            <Row key={i}>
              <Label>{i + 1}</Label>
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
            </Row>
          ))}

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
