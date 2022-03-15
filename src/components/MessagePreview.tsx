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
import {
  APIActionRowComponent,
  APIEmbed,
} from 'discord-api-types';
import '@discord-message-components/react/styles';

type MessagePreviewProps = {
  embeds: APIEmbed[];
  actionRows: APIActionRowComponent[];
  className?: string;
};

const MessagePreview: React.VFC<MessagePreviewProps> = ({ embeds, actionRows, className }) => {
  return (
    <section className={className}>
      <DiscordMessages>
        <DiscordMessage
          author='White-Lucida'
          avatar='https://cdn.discordapp.com/icons/813577333516402728/a1b8a9ebbf6382f916539a10b5f79315.png'
        >
          <div slot='embeds'>
            {embeds.map((embed, i) => (
              <DiscordEmbed
                // authorImage=
                borderColor='#0099ff'
                embedTitle={embed.title ?? ''}
                slot='embeds'
                // footerImage="https://i.imgur.com/wSTFkRM.png"
                // image="https://i.imgur.com/wSTFkRM.png"
                // thumbnail="https://i.imgur.com/wSTFkRM.png"
                // timestamp="01/01/2018"
                // url="https://discord.js.org/"
                key={i}
              >
                {embed.description ?? ''}
                <DiscordEmbedFields slot='fields'>
                  {embed.fields?.map((field, i) => (
                    <DiscordEmbedField fieldTitle={field.name ?? ''} inline={false} key={i}>
                      {field.value ?? ''}
                    </DiscordEmbedField>
                  )) ?? []}
                </DiscordEmbedFields>
              </DiscordEmbed>
            ))}
          </div>
          {actionRows.map((row, y) => (
            <DiscordButtons slot='actions' key={y}>
              {row.components.map((component, x) => {
                switch (component.type) {
                  case 2:
                    return <DiscordButton key={x}>{component.label ?? ''}</DiscordButton>;
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
