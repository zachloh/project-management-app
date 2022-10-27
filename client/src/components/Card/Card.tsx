import { Card as MantineCard } from '@mantine/core';
import React from 'react';

import styles from './Card.module.css';

type CardProps = {
  children: React.ReactNode;
  title?: string;
};

function Card({ children, title }: CardProps) {
  return (
    <MantineCard shadow="sm" p="sm" radius="md" withBorder>
      {title && <h3 className={styles['card-title']}>{title}</h3>}
      {children}
    </MantineCard>
  );
}

export default Card;
