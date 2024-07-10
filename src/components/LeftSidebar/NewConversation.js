import React from "react";

function NewConversation(props) {
  let handleClick = () => {
    props.showNewConvoTab(true);
  };
  return (
    <div className="new-convo">
      <span onClick={handleClick}>
        <i class="fa-regular fa-pen-to-square"></i>
        </span>
    </div>
  );
}

export default NewConversation;