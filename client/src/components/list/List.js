import React from 'react';

const List = ({children}) => {
  return (
    <div className="list-container">
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};

export default List;