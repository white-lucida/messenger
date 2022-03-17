import { APIEmbed, APIActionRowComponent } from 'discord-api-types';
import { apps } from 'firebase-admin';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const normalize = (value: string | undefined) => {
  if (value === undefined) throw new TypeError();
  return value.replace(/\\n/g, '\n');
};

if (apps === null || apps.length === 0)
  initializeApp({
    credential: cert({
      projectId: normalize(process.env.FIREBASE_PROJECT_ID),
      privateKey: normalize(process.env.FIREBASE_PRIVATE_KEY),
      clientEmail: normalize(process.env.FIREBASE_CLIENT_EMAIL),
    }),
  });

const write = async (
  channelID: string,
  messageID: string,
  content: string,
  embeds: APIEmbed[],
  actionRows: APIActionRowComponent[],
) => {
  const db = getFirestore();
  await db.collection('messages').add({
    channelID,
    messageID,
    content,
    embeds,
    actionRows,
  });
};

export { write };
