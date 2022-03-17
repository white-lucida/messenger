import axios from 'axios';
import { APIActionRowComponent, APIEmbed } from 'discord-api-types';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { useCallback } from 'react';
import { Form } from '../../../src/components/Form';
import { Header } from '../../../src/components/Header';
import { getAllMessages, getMessage, MessageDocument } from '../../../src/utils/firestore';

type EditorProps = MessageDocument & { documentID: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const messageDocuments = await getAllMessages();
  const data = messageDocuments.map((doc) => doc.data());

  const paths: string[] = [];

  for (const datum of data) {
    if (datum === undefined) continue;
    paths.push(`/edit/${datum.channelID}/${datum.messageID}`);
  }

  console.log(paths);

  return {
    paths,
    fallback: 'blocking',
  };
};

type EditorParams = {
  channel: string;
  message: string;
};

export const getStaticProps: GetStaticProps<EditorProps, EditorParams> = async ({ params }) => {
  if (params === undefined)
    return {
      props: {
        documentID: '',
        messageID: '',
        channelID: '',
        content: '',
        embeds: [],
        actionRows: [],
      },
    };
  const messageDocument = await getMessage(params.message, params.channel);
  const firstDoc = messageDocument?.docs?.[0];
  const data = firstDoc.data();
  console.log(data);

  return {
    props: { ...data, documentID: firstDoc.id },
    revalidate: false,
  };
};

const Editor: NextPage<EditorProps> = ({
  documentID,
  messageID,
  channelID,
  content,
  embeds,
  actionRows,
}) => {
  const onSubmit = (content: string, embeds: APIEmbed[], actionRows: APIActionRowComponent[]) => {
    axios.post('/api/edit', {
      messageID,
      channelID,
      documentID,
      content,
      embeds,
      actionRows,
    });
  };

  return (
    <section>
      <Header />
      <Form defaultValue={{ content, embeds, actionRows }} onSubmit={onSubmit} />
    </section>
  );
};

export default Editor;
