import React from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import { ITask } from '../task.interfaces';

type TaskProps = {
  task: ITask;
  deleteTaskFromBackend: (task: ITask) => void;
  showHideEditTaskModal: (task: ITask) => void;
};

export const SingleTask = ({
  task,
  deleteTaskFromBackend,
  showHideEditTaskModal,
}: TaskProps) => {
  const { title, description, status, created, updated } = task;
  const editTaskHandler = () => {
    showHideEditTaskModal(task);
  };

  const deleteTaskHandler = () => {
    deleteTaskFromBackend(task);
  };

  let rowBgColorClasses = 'bg-white border-b dark:border-gray-700';
  if (task.status == 'To Do') {
    rowBgColorClasses += ' dark:bg-gray-800';
  } else if (task.status == 'In Progress') {
    rowBgColorClasses += ' dark:bg-yellow-700';
  } else {
    rowBgColorClasses += ' dark:bg-green-800';
  }

  return (
    <tr className={rowBgColorClasses}>
      <td>{title}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{created}</td>
      <td>{updated}</td>
      <td>
        <IconEdit color='#fcc419' size={24} onClick={editTaskHandler} />
      </td>
      <td>
        <IconTrash color='red' size={24} onClick={deleteTaskHandler} />
      </td>
    </tr>
  );
};
