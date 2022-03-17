import { APIActionRowComponent, APIEmbed } from 'discord-api-types';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Form } from '../../../src/components/Form';
import { Header } from '../../../src/components/Header';
import { getAllMessages, getMessage } from '../../../src/utils/firestore';

type EditorProps = {
  messageID: string;
  channelID: string;
  content: string;
  embeds: APIEmbed[];
  actionRows: APIActionRowComponent[];
};

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
    fallback: false,
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
        messageID: '',
        channelID: '',
        content: '',
        embeds: [],
        actionRows: [],
      },
    };
  const messageDocument = await getMessage(params.message, params.channel);
  const data = messageDocument?.docs?.[0].data();
  console.log(data);

  return {
    props: data,
    revalidate: false,
  };
};

const Editor: NextPage<EditorProps> = ({ content, embeds, actionRows }) => {
  return (
    <section>
      <Header />
      <Form defaultValue={{ content, embeds, actionRows }} onSubmit={() => {}} />
    </section>
  );
};

export default Editor;
