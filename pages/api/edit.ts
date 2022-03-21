import { NextApiRequest, NextApiResponse } from 'next';
import { APIEmbed, APIActionRowComponent } from 'discord-api-types';
import axios, { AxiosRequestConfig } from 'axios';
import { editMessage, MessageDocument } from '../../src/utils/firestore';
import { isAdminUserOauth2 } from '../../src/utils/check_admin_user';
import { getSession } from 'next-auth/react';

const edit = async (
  endpoint: string,
  data: Omit<MessageDocument, 'actionRows'> & { components: APIActionRowComponent[] },
  // componentsとactionRowsの区別がつらい
  documentID: string,
  config: AxiosRequestConfig,
) => {
  console.log(endpoint, documentID);
  await axios.patch(endpoint, data, config);
  await editMessage(documentID, { ...data, actionRows: data.components });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  const session = await getSession({ req });

  if (!isAdminUserOauth2(session)) {
    res.status(400).end();
    return;
  }

  /** 型ガードを追加したい */
  const content: string = body.content;
  const embeds: APIEmbed[] = body.embeds;
  const actionRows: APIActionRowComponent[] = body.actionRows;

  const token = process.env.DISCORD_TOKEN;
  const channelID: string = body.channelID;
  const messageID: string = body.messageID;
  const documentID: string = body.documentID;

  if (token === undefined) throw new Error();

  Promise.all([
    edit(
      `https://discord.com/api/v9/channels/${channelID}/messages/${messageID}`,
      {
        content,
        embeds,
        messageID,
        channelID,
        components: actionRows,
      },
      documentID,
      { headers: { 'Content-Type': 'application/json', Authorization: `Bot ${token}` } },
    ),
    res.unstable_revalidate(`/edit/${channelID}/${messageID}`),
  ])
    .then((value) => {
      // TODO: valueを返却

      res.status(200).end();
    })
    .catch((e) => {
      console.log(e);
      res.status(400).end();
    });
}
