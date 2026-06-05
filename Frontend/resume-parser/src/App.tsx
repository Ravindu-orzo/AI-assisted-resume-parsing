import React, { useState } from "react";

const App = () => {
  type Task = {
    text: string;
    isComplete: boolean;
    isEditing: boolean;
    id: number;
  };

  const [taskArray, setTaskArray] = useState<Task[]>([]);
  const [savedInput, setSavedInput] = useState<string>("");
  const [nextid, setNextId] = useState<number>(0);

  const addTask = (): void => {
    const newTask: Task = {
      text: savedInput,
      isComplete: false,
      isEditing: false,
      id: nextid,
    };
    setNextId((prev) => prev + 1);
    setTaskArray((currentArray: Task[]) => [...currentArray, newTask]);
  };

  const saveInput = (input: string) => {
    setSavedInput(input);
  };

  const completeTask = (id: number): void => {
    setTaskArray((prev) => {
      const newArray: Task[] = prev.map((task: Task) => {
        if (task.id == id) {
          return {
            ...task,
            isComplete: true,
          };
        } else {
          return task;
        }
      });

      return newArray;
    });
  };

  const deleteTask = (id: number): void => {
    setTaskArray((prev) => prev.filter((task) => !(task.id == id)));
  };

  const editInput = (value: string, id: number): void => {
    setTaskArray((prev) => {
      return prev.map((task) => {
        if (task.id == id) {
          const editedTask: Task = {
            ...task,
            text: value,
          };
          return editedTask;
        } else {
          return task;
        }
      });
    });
  };

  return (
    <>
      <div>
        <h1>add your task</h1>
        <input onChange={(e) => saveInput(e.target.value)} />
        <button onClick={addTask}>Add</button>
      </div>
      <div>
        <h1>current tasks</h1>
        {taskArray.map((task: Task) => (
          <div key={task.id}>
            <p>{task.text}</p>
            <p>state is {task.isComplete ? "Complete" : "Incomplete"}</p>
            <button
              onClick={() => {
                completeTask(task.id);
              }}
            >
              mark complete
            </button>
            <button onClick={() => deleteTask(task.id)}>delete task</button>
            <button
              onClick={() =>
                setTaskArray((prev) => {
                  return prev.map((currentTask) => {
                    if (task.id == currentTask.id) {
                      const editedTask: Task = {
                        ...task,
                        isEditing: !currentTask.isEditing,
                      };
                      return editedTask;
                    } else {
                      return currentTask;
                    }
                  });
                })
              }
            >
              edit task {task.id}
            </button>
            {task.isEditing ? (
              <input
                value={task.text}
                onChange={(e) => editInput(e.target.value, task.id)}
              />
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
