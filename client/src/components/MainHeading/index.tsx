import React from 'react';

import styles from './MainHeading.module.css';

type MainHeadingProps = {
  title: string;
};

function MainHeading({ title }: MainHeadingProps) {
  return <h1 className={styles.title}>{title}</h1>;
}

export default MainHeading;
