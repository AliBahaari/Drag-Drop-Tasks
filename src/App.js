import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import DraggableTask from "./DraggableTask";
import DroppableContainer from "./DroppableContainer";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn HTML" },
    { id: 2, text: "Learn PHP" },
    { id: 3, text: "Learn JS" },
    { id: 4, text: "Learn Python" },
  ]);

  const removeTask = (id) => {
    setTasks((previous) => {
      const copiedItems = [...previous];
      const newCopiedItems = copiedItems.filter((item) => item.id !== id);
      return newCopiedItems;
    });
  };

  const addTask = (item) => {
    setTasks((previous) => {
      const copiedItems = [...previous];
      copiedItems.push({ id: item.id, text: item.text });

      return copiedItems;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {tasks?.map((item) => (
            <DraggableTask key={item.id} id={item.id} text={item.text} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            marginTop: "60px",
          }}
        >
          <DroppableContainer
            containerType="ToDo"
            removeTask={removeTask}
            addTask={addTask}
          />
          <DroppableContainer
            containerType="In Progress"
            removeTask={removeTask}
            addTask={addTask}
          />
          <DroppableContainer
            containerType="Done"
            removeTask={removeTask}
            addTask={addTask}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
