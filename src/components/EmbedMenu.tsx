import { MessageEmbed } from "../embed";
import { useState } from "react";
import { useForm } from "react-hook-form";

//@ts-ignore
import { DiscordMessage, DiscordMessages } from '@danktuary/react-discord-message';

import styles from "../../styles/EmbedMenu.module.css";

import { Embed } from "./Embed";
import { Form } from "./Form";

const EmbedMenu = ({ baseData, webhookUrl } : { baseData: MessageEmbed, webhookUrl: string }) => {
  const [ data, setData ] = useState<Inputs>({
    title: baseData.title ?? "",
    description: baseData.description ?? "",
    fields: baseData.fields?.map(field => ({ name: field.name, value: field.value })) ?? []
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState
  } = useForm<Inputs>({
    defaultValues: data
  });

  const values = watch();
  const onSubmit = () => {
    console.log("submit")

    const embed = new MessageEmbed()
    .setTitle(values.title)
    .setDescription(values.description)
    .setFields(values.fields.map(field => ({...field, inline: false})))
    .setColor("#178009")

    console.log(embed)

    fetch(webhookUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'White Lucida',
        avatar_url:
          'https://cdn.discordapp.com/icons/813577333516402728/a1b8a9ebbf6382f916539a10b5f79315.png',
        embeds: [ embed.toJSON() ]
      })
    });
  }
  
  return (
    <section className={styles.root}>
      <Form {...{control, register, handleSubmit, formState}} onSubmit={onSubmit} />

      <DiscordMessages>
        <DiscordMessage author="White Lucida" avatar="https://cdn.discordapp.com/icons/813577333516402728/a1b8a9ebbf6382f916539a10b5f79315.png">
          {values.title ?? ""}
          <Embed data={values} />
        </DiscordMessage>
      </DiscordMessages>
      
    </section>
  )

}

export { EmbedMenu }