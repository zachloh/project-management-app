import React from 'react';
import { Plus } from 'tabler-icons-react';

import styles from './CreateIssueBtn.module.css';

function CreateIssueBtn() {
  return (
    <button type="button" className={styles.button}>
      <span>
        <Plus size={16} />
      </span>
      <span>Create Issue</span>
    </button>
  );
}

export default CreateIssueBtn;
