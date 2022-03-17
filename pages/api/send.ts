// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosRequestConfig } from 'axios';
import {
  APIActionRowComponent,
  APIEmbed,
  RESTPostAPIChannelMessageResult,
} from 'discord-api-types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../src/utils/firestore';

type SendResponse = {
  messageID: string;
};

const getChannelIDfromURL = (url: string): string => {
  const matcher = url.match(/https:\/\/discord\.com\/channels\/.+\/(.+)/);
  if (matcher === null) throw new Error();
  return matcher[1];
};

const getMessagePostEndPoint = (channelID: string): string =>
  `https://discord.com/api/v9/channels/${channelID}/messages`;

const post = async (
  url: string,
  data: {
    channelID: string;
    content: string;
    embeds: APIEmbed[];
    components: APIActionRowComponent[];
  },
  config: AxiosRequestConfig<any>,
) => {
  const res = await axios.post<RESTPostAPIChannelMessageResult>(url, data, config);
  await write({
    channelID: data.channelID,
    messageID: res.data.id,
    content: data.content,
    embeds: data.embeds,
    actionRows: data.components,
  });
  return res.data.id;
  /*
  try {
    await axios.post(`/api/revalidate?secret=${process.env.NEXTJS_SECRET}`, {
      messageID: res.data.id,
      channelID: data.channelID,
    });
  } catch (e) {
    console.log(e);
  }
  */
};

// 上記関数は外部から注入したい（DI）
export default function handler(req: NextApiRequest, res: NextApiResponse<SendResponse>) {
  const body = req.body;

  const url = body.url;
  if (typeof url !== 'string') {
    res.status(400);
    throw new Error();
  }
  /** 型ガードを追加したい */
  const content: string = body.content;
  const embeds: APIEmbed[] = body.embeds;
  const actionRows: APIActionRowComponent[] = body.actionRows;

  const token = process.env.DISCORD_TOKEN;
  const channelID = getChannelIDfromURL(url);

  if (token === undefined) throw new Error();

  post(
    getMessagePostEndPoint(channelID),
    {
      channelID,
      content,
      embeds,
      components: actionRows,
    },
    { headers: { 'Content-Type': 'application/json', Authorization: `Bot ${token}` } },
  )
    .then((value) => {
      // TODO: valueを返却
      res.status(200).end();
    })
    .catch((e) => {
      res.status(400).end();
    });
}
