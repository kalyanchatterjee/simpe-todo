import React from "react";

const TodoCount = (props) => {
  return (
    <p>
      Priority: {props.priority} (<strong>{props.count}</strong>)
    </p>
  );
};

export default TodoCount;
