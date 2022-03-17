import { APIActionRowComponent, APIEmbed } from 'discord-api-types';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Form } from '../../src/components/Form';

type EditorProps = {
  messageURL: string;
  content: string;
  embeds: APIEmbed[];
  actionRows: APIActionRowComponent[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [] /* この部分はFirestoreのドキュメントリストから取得する */,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EditorProps> = async () => {
  return {
    props: {
      messageURL: '',
      content: '',
      embeds: [],
      actionRows: [],
    } /* この部分をFirestoreの各ドキュメントから取得する */,
    revalidate: false,
  };
};

const Editor: NextPage<EditorProps> = ({ content, embeds, actionRows }) => {
  return <Form defaultValue={{ content, embeds, actionRows }} onSubmit={() => {}} />;
};

export default Editor;
