import { APIEmbed, APIActionRowComponent } from 'discord-api-types';
import { apps } from 'firebase-admin';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import {
  FirestoreDataConverter,
  getFirestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase-admin/firestore';

interface MessageDocument {
  channelID: string;
  messageID: string;
  content: string;
  embeds: APIEmbed[];
  actionRows: APIActionRowComponent[];
}

const isDocument = (doc: any): doc is MessageDocument => {
  const data = doc as Partial<MessageDocument>;
  let result = typeof data.content === 'string';
  result &&= typeof data.actionRows === 'object';
  result &&= typeof data.channelID === 'string';
  result &&= typeof data.embeds === 'object';
  result &&= typeof data.messageID === 'string';
  return result;
};

const MessageDocumentConverter: FirestoreDataConverter<MessageDocument> = {
  toFirestore(data: MessageDocument) {
    return data;
  },
  fromFirestore(snapShot: QueryDocumentSnapshot) {
    const data = snapShot.data();
    if (isDocument(data)) return data;
    throw new Error('');
  },
};

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

const write = async ({ channelID, messageID, content, embeds, actionRows }: MessageDocument) => {
  const db = getFirestore();
  await db.collection('messages').add({
    channelID,
    messageID,
    content,
    embeds,
    actionRows,
  });
};

const getAllMessages = async () => {
  const db = getFirestore();
  const docs = await db
    .collection('messages')
    .withConverter(MessageDocumentConverter)
    .listDocuments();
  const result = await Promise.all(docs.map(async (doc) => await doc.get()));
  return result;
};

const getMessage = async (messageID: string, channelID: string) => {
  const db = getFirestore();
  const query = await db
    .collection('messages')
    .where('messageID', '==', messageID)
    .where('channelID', '==', channelID)
    .withConverter(MessageDocumentConverter)
    .get();

  return query;
};

const editMessage = async (
  documentID: string,
  { content, embeds, actionRows }: Pick<MessageDocument, 'content' | 'embeds' | 'actionRows'>,
) => {
  const db = getFirestore();
  await db
    .collection('messages')
    .doc(documentID)
    .set({ content, embeds, actionRows }, { merge: true });
};

export { write, getAllMessages, getMessage, editMessage };
export type { MessageDocument };
