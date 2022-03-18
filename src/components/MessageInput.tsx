import clsx from 'clsx';

type MessageInputProps = {
  children: React.ReactNode;
  className?: string;
};

const MessageInput: React.VFC<MessageInputProps> = ({ children, className }) => {
  return <section className={clsx(className)}>{children}</section>;
};

export { MessageInput };
