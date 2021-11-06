//@ts-ignore
import { DiscordEmbed, DiscordEmbedFields, DiscordEmbedField } from '@danktuary/react-discord-message';

const Embed = ({ data } : { data: Inputs }) => {
  return (
    <DiscordEmbed
      // authorImage="https://cdn.discordapp.com/icons/813577333516402728/a1b8a9ebbf6382f916539a10b5f79315.png"
      // authorName="White Lucida"
      color="#0099ff"
      embedTitle={data.title ?? ""}
      // footerImage="https://i.imgur.com/wSTFkRM.png"
      // image="https://i.imgur.com/wSTFkRM.png"
      // thumbnail="https://i.imgur.com/wSTFkRM.png"
      // timestamp="01/01/2018"
      // url="https://discord.js.org/"
    >
      { data.description ?? "" }
      <DiscordEmbedFields slot="fields">
        {
          data.fields &&
          data.fields.map((field, i) => 
            <DiscordEmbedField fieldTitle={field.name} inline={false} key={i}>
              {field.value}
            </DiscordEmbedField>
          )
        }
      </DiscordEmbedFields>
    </DiscordEmbed>
  )
}

export { Embed }