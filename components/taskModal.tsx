import Modal from "@/components/modals/modal";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import todoColors from "./todoColors";
import todoIcons from "./todoIcons";
import { createTaskFatch } from "@/utils/fatch/task/createTaskFatch";

import { updateTaskFatch } from "@/utils/fatch/task/updateTaskFatch";
import { removeTaskFatch } from "@/utils/fatch/task/removeTaskFatch";
import { AxiosResponse } from "axios";
import { ITask } from "@/app/todos/page";

interface Props {
  setTask: Dispatch<SetStateAction<ITask | undefined>>;
  setShowTodoModal: Dispatch<SetStateAction<boolean>>;
  setShowTaskModal: Dispatch<SetStateAction<boolean>>;
  setTasks: Dispatch<SetStateAction<ITask[]>>;
  taskType?: "Add" | "Edit" | undefined;
  task: ITask | undefined;
}

interface DeleteResponseData {
  ok: boolean;
}

const TaskModal: React.FC<Props> = ({
  setTask,
  setShowTodoModal,
  setShowTaskModal,
  setTasks,
  taskType = "Add",
  task,
}) => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState<keyof typeof todoIcons | undefined>();
  const [bgColor, setBgColor] = useState<string>();

  const createTask = async () => {
    if (bgColor && icon) {
      const result = await createTaskFatch({ title, color: bgColor, icon });
      if (result) {
        console.log(result);
        setTasks((prevTask) => {
          return [...prevTask, result];
        });
        setShowTaskModal(false);
      } else {
        console.log("실패");
      }
    }
  };

  const updateTask = async () => {
    if (task?.id && bgColor && icon) {
      const updateTask: ITask = { id: task?.id, title, color: bgColor, icon };
      await updateTaskFatch({ id: task?.id, title, color: bgColor, icon });
      setTask(updateTask);
      setTasks((prevTasks) => {
        return prevTasks.map((prevTask) =>
          prevTask.id === task.id ? updateTask : prevTask
        );
      });
    }
    setShowTaskModal(false);
  };

  const deleteTask = async () => {
    const confirm = window.confirm(
      "Task와 Task에 속한 모든 Todo 기록이 삭제됩니다!"
    );
    console.log("confirm", confirm);
    if (task && confirm) {
      const result: AxiosResponse<DeleteResponseData> | undefined =
        await removeTaskFatch({ id: task.id });
      console.log(result);

      if (result?.data.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((prevTask) => prevTask.id !== task.id)
        );
        setShowTodoModal(false);
        setShowTaskModal(false);
      }
    }
  };

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTitle(value);
  };

  useEffect(() => {
    if (taskType === "Edit" && task) {
      setTitle(task.title);
      setIcon(task.icon);
      setBgColor(task.color);
    }
  }, [taskType, task]);

  return (
    <Modal setShowModal={setShowTaskModal}>
      <div className="flex flex-col p-8 bg-slate-800 gap-8">
        <h1 className="text-2xl font-bold">{taskType}</h1>
        <div className="relative">
          <input
            style={{
              backgroundColor: bgColor,
              color: bgColor ? "white" : "black",
            }}
            className="w-[20rem] text-3xl text-white text-center p-2"
            type="text"
            defaultValue={title}
            onChange={onChangeHandle}
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-5">
            <div className="text-3xl rounded-full flex justify-center items-center">
              {icon && todoIcons[icon as keyof typeof todoIcons]}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {todoColors.map((colorTypes, index) => (
            <div key={index} className="flex gap-4">
              {colorTypes.map((color) => (
                <div
                  onClick={() => {
                    setBgColor(color);
                  }}
                  key={color}
                  className="w-8 h-8 rounded-full hover:ring-4"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          ))}
        </div>

        <div className="w-[20rem] flex flex-wrap gap-3">
          {Object.keys(todoIcons).map((icon) => (
            <div
              key={icon}
              onClick={() =>
                setIcon(icon as keyof typeof todoIcons | undefined)
              }
              className="text-[1.6rem] p-2 hover:ring-2 rounded-full"
            >
              {todoIcons[icon as keyof typeof todoIcons]}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {taskType === "Edit" ? (
            <div
              onClick={deleteTask}
              className="border-4 rounded-lg py-3 px-5 cursor-pointer"
            >
              삭제
            </div>
          ) : (
            <div />
          )}
          <div className="flex gap-3">
            <div
              className="border-4 rounded-lg py-3 px-5 cursor-pointer"
              onClick={() => {
                setShowTaskModal(false);
              }}
            >
              취소
            </div>
            <div
              onClick={
                taskType === "Add" ? () => createTask() : () => updateTask()
              }
              className="border-4 rounded-lg py-3 px-5 cursor-pointer"
            >
              저장
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
