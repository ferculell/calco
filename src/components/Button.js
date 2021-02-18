import React from "react";

const Button = (props) => {
  return (
    <div class={props.bootClass}>
      <button
        id={props.btnId}
        class={props.btnClass}
        onClick={props.btnFunction}
      >
        {props.btnContent}
      </button>
    </div>
  );
};

export default Button;
