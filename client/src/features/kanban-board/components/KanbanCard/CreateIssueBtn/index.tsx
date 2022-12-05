import React from 'react';
import { Plus } from 'tabler-icons-react';

import styles from './CreateIssueBtn.module.css';

type CreateIssueBtnProps = {
  onOpenCreateIssueForm: () => void;
};

function CreateIssueBtn({ onOpenCreateIssueForm }: CreateIssueBtnProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onOpenCreateIssueForm}
    >
      <span>
        <Plus size={16} />
      </span>
      <span>Create Issue</span>
    </button>
  );
}

export default CreateIssueBtn;
