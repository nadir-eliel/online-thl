import React from 'react';
import { Todo } from './Todo';


export const Tabla = () => {
  const generateTodoItems = () => {
    const items = [];

    for (let i = 1; i <= 32; i++) {
      items.push(
        <div key={i} className="col-3">
          <Todo number={i} />
        </div>
      );
    }

    return items;
  };

  return (
    <div className="row">
      {generateTodoItems()}
    </div>
  );
};
