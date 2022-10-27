import React from 'react';

import styles from './CardHeader.module.css';

type CardHeaderProps = {
  children: React.ReactNode;
};

function CardHeader({ children }: CardHeaderProps) {
  return <h2 className={styles['card-header']}>{children}</h2>;
}

export default CardHeader;
