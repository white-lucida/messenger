import { APIActionRowComponent, APIEmbed } from 'discord-api-types';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Form } from '../../src/components/Form';

type EditorProps = {
  messageURL: string;
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
      embeds: [],
      actionRows: [],
    } /* この部分をFirestoreの各ドキュメントから取得する */,
    revalidate: false,
  };
};

const Editor: NextPage<EditorProps> = ({ embeds, actionRows }) => {
  return <Form defaultValue={{ embeds, actionRows }} onSubmit={() => {}} />;
};

export default Editor;
