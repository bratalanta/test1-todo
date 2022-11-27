import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TaskEdit from './TaskEdit/TaskEdit';
import { Collection } from '../../const';
import Task from './Task/Task';
import TaskListEmpty from './TaskListEmpty/TaskListEmpty';
import { useApp } from '../../contexts/AppProvider/AppProvider';
import { firestore } from '../../api/firebase';
import Loader from '../Loader/Loader';

function TaskList() {
  const { isAdding, taskEditId } = useApp();
  const { Field } = Collection;

  const [tasks, isLoading] = useCollectionData(
    firestore.collection(Collection.Name).orderBy(Field.Deadline)
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="main _container">
      <div className="main__board board">
        {isAdding && <TaskEdit />}
        {tasks.length
          ? tasks.map((task) => {
              if (taskEditId === task.id) {
                return <TaskEdit task={task} key={task.id} />;
              }

              return <Task task={task} key={task.id} />;
            })
          : null}
        {!isAdding && !tasks.length && <TaskListEmpty />}
      </div>
    </main>
  );
}

export default TaskList;
