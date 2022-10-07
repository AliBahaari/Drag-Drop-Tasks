import { useDrop } from "react-dnd";
import { useState } from "react";

function DroppableContainer({ containerType, removeTask, addTask }) {
  const [containerTasks, setContainerTasks] = useState([]);

  const [{ isOver }, droppableContainer] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      removeTask(item.id);
      setContainerTasks((previous) => {
        const newCopiedItems = previous.filter(
          (previousItem) => previousItem !== item.id
        );
        return [...newCopiedItems, item];
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const deleteTask = (item) => {
    addTask(item);
    setContainerTasks((previous) => {
      const newCopiedItems = previous.filter(
        (previousItem) => previousItem.id !== item.id
      );
      return [...newCopiedItems];
    });
  };

  return (
    <div style={{ flex: 1 }}>
      <p
        style={{ textAlign: "center", marginBottom: "10px", color: "#F2542D" }}
      >
        {containerType}
      </p>
      <div
        ref={droppableContainer}
        style={{
          minHeight: "100px",
          border: isOver ? "1px solid #F2542D" : "1px solid #161925",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {containerTasks?.map((item) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{ color: "#F2542D", cursor: "pointer", fontSize: "24px" }}
              onClick={() => deleteTask(item)}
            >
              ×
            </span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DroppableContainer;
