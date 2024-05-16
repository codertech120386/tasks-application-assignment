import React from 'react';
import { Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import {
  ITask,
  ITaskCreateEditRequest,
  TaskStatuses,
} from '../task.interfaces';
import Button from '../../../ui/button/Button';
import { useAppDispatch } from '../../../app/hooks';
import { EditTaskAction, CreateTaskAction } from '../task.action';
import { lengthValidator } from '../../../utils/components';

type TaskFormProps = {
  task?: ITask;
};

export const TaskFormComponent = ({ task }: TaskFormProps) => {
  const dispatch = useAppDispatch();
  const id = task ? task.id : 0,
    title = task ? task.title : '',
    description = task ? task.title : '',
    status = task ? task.status : 'To Do';

  const form = useForm({
    initialValues: { title, status, description },
    validate: {
      title: (value) => lengthValidator(value, 3, 51, 'Title'),
      description: (value) => lengthValidator(value, 10, 501, 'Description'),
    },
  });

  const handleSubmit = (values: ITaskCreateEditRequest) => {
    const payload: ITaskCreateEditRequest = {
      id: id,
      title: values.title,
      description: values.description,
      status: values.status,
    };
    if (task) {
      dispatch(EditTaskAction({ requestPayload: payload }));
    } else {
      delete payload.id;
      dispatch(CreateTaskAction({ requestPayload: payload }));
    }
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
      style={{ width: '100%' }}
    >
      <TextInput
        placeholder='Title'
        label='Title'
        {...form.getInputProps('title')}
        mb={15}
        size='md'
      />

      <TextInput
        placeholder='Description'
        label='Description'
        {...form.getInputProps('description')}
        mb={15}
        size='md'
      />

      <Select
        label='Status'
        data={Object.values(TaskStatuses)}
        {...form.getInputProps('status')}
        size='md'
      />

      <Button value={task ? 'Edit Task' : 'Create Task'} size='100%' />
    </form>
  );
};
