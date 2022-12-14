import firebase from 'firebase/compat';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Task from '../types/task';
import { Collection } from '../const';

firebase.initializeApp({
  apiKey: 'AIzaSyBMDiSLL4Ebfd5MTXo8n2ch-47gHhQRNi8',
  authDomain: 'todo-react-c9ce0.firebaseapp.com',
  projectId: 'todo-react-c9ce0',
  storageBucket: 'todo-react-c9ce0.appspot.com',
  messagingSenderId: '443323677257',
  appId: '1:443323677257:web:53991230ea64faefb3dd98',
  measurementId: 'G-NT0ZGSPZ7L'
});

const firestore = firebase.firestore();
const storage = getStorage();

/**
 * Удалить задачу
 *
 * @param {string} id - id задачи
 */
const deleteTask = async (id) => {
  const query = await firestore.collection(Collection.Name).where('id', '==', id);
  const querySnapshot = await query.get();
  await querySnapshot.forEach((doc) => doc.ref.delete());
};

/**
 * Обновить задачу
 *
 * @param {string} id - id задачи
 * @param {Task} data - данные для загрузки задачи
 */
const updateTask = async (id, data) => {
  const query = await firestore.collection(Collection.Name).where('id', '==', id);
  const querySnapshot = await query.get();
  await querySnapshot.forEach((doc) => doc.ref.update(data));
};

/**
 * Загрузить файлы
 *
 * @param {File[]} files - файлы задачи
 * @param {string} taskId - id задачи
 */
const uploadFiles = async (files, taskId) => {
  const uploadedFiles = [];

  for (const file of Array.from(files)) {
    const storageRef = ref(storage, `/${taskId}/${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    uploadedFiles.push({ name: file.name, url: downloadURL });
  }

  return uploadedFiles;
};

/**
 * Удалить файлы задачи
 *
 * @param {File[]} files - файлы задачи
 * @param {string} taskId - id задачи
 */
const deleteFiles = async (files, taskId) => {
  for (const file of Array.from(files)) {
    const storageRef = ref(storage, `/${taskId}/${file.name}`);

    await deleteObject(storageRef);
  }
};

export { deleteTask, updateTask, storage, firestore, uploadFiles, deleteFiles };
