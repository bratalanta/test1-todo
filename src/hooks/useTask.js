import { useEffect, useState } from 'react';
import { Collection, TaskStatus } from '../const';
import { deleteFiles, deleteTask, firestore, updateTask, uploadFiles } from '../api/firebase';
import { useApp } from '../contexts/AppProvider/AppProvider';

const useTask = (formData, task) => {
  const [taskStatus, setTaskStatus] = useState(TaskStatus.Idle);
  const { isAdding, setIsAdding, setTaskEditId } = useApp();
  const { Field } = Collection;

  useEffect(() => {
    if (taskStatus === TaskStatus.Saving) {
      const sendData = async () => {
        const newTaskId = firestore.collection(Collection.Name).doc().id;

        if (isAdding) {
          const files = await uploadFiles(formData.files, newTaskId);
          setIsAdding(false);
          await firestore.collection(Collection.Name).add({
            ...formData,
            id: newTaskId,
            [Field.Files]: files,
            [Field.isDone]: false
          });
        } else {
          await deleteFiles(task.files, task.id);
          const files = await uploadFiles(formData.files, task.id);
          await updateTask(task.id, {
            ...formData,
            [Field.Files]: files,
            [Field.isDone]: false
          });

          setTaskEditId(null);
        }

        setTaskStatus(TaskStatus.Idle);
      };
      sendData().catch((err) => {
        throw new Error(err);
      });
    }
  }, [taskStatus]);

  useEffect(() => {
    if (taskStatus === TaskStatus.Deleting) {
      const deleteData = async () => {
        if (task) {
          await deleteTask(task.id);
          await deleteFiles(task.files, task.id);
        }

        setIsAdding(false);
        setTaskStatus(TaskStatus.Idle);
      };

      deleteData().catch((err) => {
        throw new Error(err);
      });
    }
  }, [taskStatus]);

  return [taskStatus, setTaskStatus];
};

export default useTask;
