import { Card as MantineCard, CSSObject } from '@mantine/core';
import React from 'react';

import styles from './Card.module.css';

type CardProps = {
  children: React.ReactNode;
  title?: string;
  sx?: CSSObject;
} & React.ComponentPropsWithoutRef<'div'>;

function Card({ children, title, ...rest }: CardProps) {
  return (
    <MantineCard shadow="sm" p="sm" radius="md" withBorder {...rest}>
      {title && <h3 className={styles['card-title']}>{title}</h3>}
      {children}
    </MantineCard>
  );
}

export default Card;
