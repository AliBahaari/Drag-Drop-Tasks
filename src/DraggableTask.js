import { useDrag } from "react-dnd";

const DraggableTask = ({ id, text }) => {
  const [{ isDragging }, draggableTask] = useDrag(() => ({
    type: "task",
    item: { id, text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={draggableTask}
      style={{
        width: "200px",
        height: "100px",
        backgroundColor: isDragging ? "#0E9594" : "#127475",
        color: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      {text}
    </div>
  );
};

export default DraggableTask;
