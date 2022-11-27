import React from 'react';
import { MAX_FILE_NAME_LENGTH } from '../../../../const';

function TaskLinks({ files }) {
  return (
    <ul className="download-list">
      {files.map(({ name, url }) => (
        <li className="download-list__item" key={url}>
          <a href={url} download>
            {name.length > MAX_FILE_NAME_LENGTH ? `${name.slice(0, MAX_FILE_NAME_LENGTH)}..` : name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default TaskLinks;
