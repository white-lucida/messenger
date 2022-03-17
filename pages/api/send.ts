// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import {
  APIActionRowComponent,
  APIEmbed,
  RESTPostAPIChannelMessageJSONBody,
} from 'discord-api-types';
import type { NextApiRequest, NextApiResponse } from 'next';

type SendResponse = {};

const getChannelIDfromURL = (url: string): string => {
  const matcher = url.match(/https:\/\/discord\.com\/channels\/.+\/(.+)/);
  if (matcher === null) throw new Error();
  return matcher[1];
};

const getMessagePostEndPoint = (channelID: string): string =>
  `https://discord.com/api/v9/channels/${channelID}/messages`;

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

  if (token === undefined) throw new Error();

  axios
    .post<RESTPostAPIChannelMessageJSONBody>(
      getMessagePostEndPoint(getChannelIDfromURL(url)),
      {
        content,
        embeds,
        components: actionRows,
      },
      { headers: { 'Content-Type': 'application/json', Authorization: `Bot ${token}` } },
    )
    .then((value) => {
      // TODO: valueを返却
      res.status(200).json({});
    })
    .catch((e) => {
      res.status(400).json({});
    });
}
