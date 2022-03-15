import clsx from "clsx";
import styles from "../../styles/MessageInput.module.css";

type MessageInputProps = {
  children: React.ReactNode,
  className?: string
};

const MessageInput: React.VFC<MessageInputProps> = ({ children, className }) => {
  return (
    <section className={clsx(className, styles.root)}>
      { children }
    </section>
  )
}

export { MessageInput };