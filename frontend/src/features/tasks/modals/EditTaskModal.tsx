import { TaskForm } from '../components';
import { ITask } from '../task.interfaces';

type EditTaskModalProps = {
  task: ITask;
};

const EditTaskModal = ({ task }: EditTaskModalProps) => {
  return <TaskForm task={task} />;
};

export default EditTaskModal;
