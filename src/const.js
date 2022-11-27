const Collection = {
  Name: 'tasks',
  Field: {
    Title: 'title',
    Description: 'description',
    Deadline: 'deadline',
    Files: 'files',
    isDone: 'isDone'
  }
};

const TaskTextLimit = {
  Title: 12,
  Description: 300
};

const TaskStatus = {
  Idle: 'idle',
  Saving: 'saving',
  Deleting: 'deleting'
};

const FILES_LIMIT = 3;
const MAX_FILE_NAME_LENGTH = 15;

export { Collection, FILES_LIMIT, MAX_FILE_NAME_LENGTH, TaskTextLimit, TaskStatus };
