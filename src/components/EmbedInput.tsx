import { PropertyLabel } from './input/property_label';
import { PropertyInput } from './input/property_input';
import { Row } from './input/row';
import { useEmbed } from '../hooks/use_embed';
import React from 'react';
import { APIEmbed } from 'discord-api-types';
import clsx from 'clsx';
import styles from '../../styles/EmbedInput.module.css';
import { PropertyTextArea } from './input/property_textarea';
import { EmbedInputTab } from './EmbedInputTab';
import { useInputTab } from '../hooks/use_inputtab';
import { EmbedInputTabButton } from './EmbedInputTabButton';

type EmbedInputProps = {
  index: number;
  embed: APIEmbed;
  className?: string;
};

const tabNames = ['基本情報', '著者', 'フィールド'] as const;
type TabName = typeof tabNames[number];

export type { TabName };

const EmbedInput: React.VFC<EmbedInputProps> = React.memo(function Inside({
  index,
  embed,
  className,
}) {
  /*
    react/display-name エラーが発生したため、functionを使用
  */
  const { isCurrentTab, changeTab } = useInputTab(tabNames, '基本情報');
  const dispatch = useEmbed();

  return (
    <section className={clsx(className, styles.root)}>
      <div className={styles.cardHeader}>
        {index + 1}
        <input
          type='button'
          onClick={() => dispatch({ type: 'removeEmbed', payload: { embedIndex: index } })}
        />
      </div>

      <div className={styles.cardTabButtons}>
        {tabNames.map((name) => (
          <EmbedInputTabButton onClick={() => changeTab(name)} isEnabled={isCurrentTab(name)}>
            {name}{' '}
          </EmbedInputTabButton>
        ))}
      </div>

      <div className={styles.cardBody}>
        <EmbedInputTab isEnabled={isCurrentTab('基本情報')}>
          <Row>
            <PropertyLabel>タイトル</PropertyLabel>
            <PropertyInput
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
            <PropertyLabel>説明</PropertyLabel>
            <PropertyTextArea
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
        </EmbedInputTab>
        <EmbedInputTab isEnabled={isCurrentTab('著者')}>
          <Row>
            <PropertyLabel>Author名</PropertyLabel>
            <PropertyInput
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
        </EmbedInputTab>
        <EmbedInputTab isEnabled={isCurrentTab('フィールド')}>
          <Row>
            <PropertyLabel>フィールド</PropertyLabel>
          </Row>
          {embed.fields?.map((field, i) => (
            <Row key={i}>
              <PropertyLabel>{i + 1}</PropertyLabel>
              <PropertyInput
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
              <PropertyTextArea
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

          <input
            type='button'
            onClick={() => dispatch({ type: 'newField', payload: { embedIndex: index } })}
            value='フィールドを追加する'
          />
        </EmbedInputTab>
      </div>
    </section>
  );
});

export { EmbedInput };
