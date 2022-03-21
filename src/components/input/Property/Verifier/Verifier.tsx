import styles from './Verifier.module.css';

type VerifierProps = {
  errorCondition: boolean;
  alert?: string;
  children: React.ReactNode;
};

const Verifier: React.VFC<VerifierProps> = ({ errorCondition, children, alert }) => {
  return (
    <>
      {children}
      {errorCondition && <span className={styles.alert}>{alert ?? 'Error'}</span>}
    </>
  );
};

export { Verifier };
