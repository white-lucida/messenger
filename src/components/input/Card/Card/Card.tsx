import clsx from 'clsx';
import React from 'react';
import styles from './Card.module.css';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.VFC<CardProps> = ({ children, className }) => {
  return <section className={clsx(styles.root, className)}>{children}</section>;
};

export { Card };
