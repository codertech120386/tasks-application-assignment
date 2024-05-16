import React from 'react';
import { useEffect, useState } from 'react';
import { Group, rem, Pagination, Flex } from '@mantine/core';
import { modals } from '@mantine/modals';

import { TaskTableColumnSorter, Task } from '../components';
import { ITask, TaskStatusesWithAll } from '../task.interfaces';
import { GetAllTasksAction, DeleteTaskAction } from '../task.action';
import { EditTaskModal, CreateTaskModal } from '../modals';

import Button from '../../../ui/button/Button';
import SelectInput from '../../../ui/select-input/SelectInput';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { removeItemFromLocalStorage } from '../../../utils/components';

export const TaskList = () => {
  const [status, setStatus] = useState('All');
  const { allTasksDetails } = useAppSelector((state) => state.getAllTasks);
  const { tasks, totalPages, activePage } = allTasksDetails;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetAllTasksAction({ requestPayload: { status: 'All' } }));
  }, []);

  const deleteTaskFromBackend = (task: ITask) => {
    dispatch(DeleteTaskAction({ requestPayload: { id: task.id } }));
  };

  const showHideEditTaskModal = (task: ITask) => {
    modals.open({
      title: 'Edit Task',
      children: <EditTaskModal task={task} />,
    });
  };

  const showCreateNewTaskModal = () => {
    modals.open({
      title: 'Create Task',
      children: <CreateTaskModal />,
    });
  };

  const onStatusFilterChanged = (value: keyof typeof TaskStatusesWithAll) => {
    setStatus(value);
    dispatch(GetAllTasksAction({ requestPayload: { status: value } }));
  };

  const fetchTasksForThePage = (pageNumber: number) => {
    dispatch(
      GetAllTasksAction({
        requestPayload: { status: status, page: pageNumber },
      })
    );
  };

  const sortTaskBy = (field: string, direction: string) => {
    const sort = `${field},${direction}`;
    dispatch(
      GetAllTasksAction({
        requestPayload: { status: status, sort: sort },
      })
    );
  };

  const logoutUser = () => {
    removeItemFromLocalStorage('token');
    removeItemFromLocalStorage('user');
    window.location.reload();
  };

  return (
    <div className='relative overflow-x-auto'>
      <Flex justify={'end'} mt={-30}>
        <Button
          value='Logout'
          size='10%'
          onClick={logoutUser}
          style={{ backgroundColor: '#fcc419', color: '#000' }}
        />
      </Flex>
      <Group position='right' spacing={275} mt={50}>
        <Button
          value='Create a Task'
          size='20%'
          onClick={showCreateNewTaskModal}
        />
        <SelectInput
          label='Task Status'
          value={status}
          onChange={onStatusFilterChanged}
          data={Object.keys(TaskStatusesWithAll)}
          style={{ width: '15%', marginBottom: rem(25) }}
        />
      </Group>
      <table>
        <thead>
          <tr>
            <th>
              <TaskTableColumnSorter
                columnHeader='TITLE'
                columnName='title'
                sortTaskByColumnAndDirection={sortTaskBy}
              />
            </th>
            <th>
              <TaskTableColumnSorter
                columnHeader='DESCRIPTION'
                columnName='description'
                sortTaskByColumnAndDirection={sortTaskBy}
              />
            </th>
            <th>
              <TaskTableColumnSorter
                columnHeader='STATUS'
                columnName='status'
                sortTaskByColumnAndDirection={sortTaskBy}
              />
            </th>
            <th>
              <TaskTableColumnSorter
                columnHeader='CREATED'
                columnName='created'
                sortTaskByColumnAndDirection={sortTaskBy}
              />
            </th>
            <th>
              <TaskTableColumnSorter
                columnHeader='UPDATED'
                columnName='updated'
                sortTaskByColumnAndDirection={sortTaskBy}
              />
            </th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTaskFromBackend={deleteTaskFromBackend}
              showHideEditTaskModal={showHideEditTaskModal}
            />
          ))}
        </tbody>
      </table>
      <Flex justify={'center'} mt={'md'}>
        <Pagination
          total={totalPages}
          value={activePage}
          onChange={(pageNumber) => fetchTasksForThePage(pageNumber)}
          color='blue'
        />
      </Flex>
    </div>
  );
};
