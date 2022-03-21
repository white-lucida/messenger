import {
  DiscordButtons,
  DiscordButton,
  DiscordMessage,
  DiscordMessages,
  DiscordEmbed,
  DiscordEmbedFields,
  DiscordEmbedField,
  //@ts-ignore
} from '@discord-message-components/react';
import { APIActionRowComponent, APIEmbed } from 'discord-api-types';
import '@discord-message-components/react/styles';
import { getButtonStyleName } from '../utils/button_style_type';
import { isButtonWithURL } from '../utils/components_type';

type MessagePreviewProps = {
  children: string;
  embeds: APIEmbed[];
  actionRows: APIActionRowComponent[];
  className?: string;
};

const split = (value: string) =>
  value.split(/(\n)/g).map((t, i) => (t === '\n' ? <br key={i} /> : t));

const MessagePreview: React.VFC<MessagePreviewProps> = ({
  children,
  embeds,
  actionRows,
  className,
}) => {
  return (
    <section className={className}>
      <DiscordMessages>
        <DiscordMessage
          author='White-Lucida'
          avatar='https://cdn.discordapp.com/icons/813577333516402728/a1b8a9ebbf6382f916539a10b5f79315.png'
        >
          {split(children)}
          <div slot='embeds'>
            {embeds.map((embed, i) => (
              <DiscordEmbed
                authorImage={embed.author?.icon_url}
                authorName={embed.author?.name}
                authorURL={embed.author?.url}
                borderColor={embed.color !== undefined ? `#${embed.color.toString(16)}` : undefined}
                embedTitle={embed.title}
                footerImage={embed.footer?.icon_url}
                image={embed.image?.url}
                thumbnail={embed.thumbnail?.url}
                timestamp={embed.timestamp}
                url={embed.url}
                slot='embeds'
                key={i}
              >
                {split(embed.description ?? '')}
                <DiscordEmbedFields slot='fields'>
                  {embed.fields?.map((field, i) => (
                    <DiscordEmbedField fieldTitle={field.name ?? ''} inline={false} key={i}>
                      {split(field.value)}
                    </DiscordEmbedField>
                  )) ?? []}
                </DiscordEmbedFields>
                <span slot='footer'>{embed.footer?.text}</span>
              </DiscordEmbed>
            ))}
          </div>
          {actionRows.map((row, y) => (
            <DiscordButtons slot='actions' key={y}>
              {row.components.map((component, x) => {
                switch (component.type) {
                  case 2:
                    return (
                      <DiscordButton
                        key={x}
                        disabled={component.disabled ?? false}
                        type={getButtonStyleName(component.style)}
                        url={isButtonWithURL(component) ? component.url : undefined}
                      >
                        {component.label ?? ''}
                      </DiscordButton>
                    );
                }
              })}
            </DiscordButtons>
          ))}
        </DiscordMessage>
      </DiscordMessages>
    </section>
  );
};

export { MessagePreview };
