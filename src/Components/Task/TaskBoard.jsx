import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchBox from "./SearchBox";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import NoTaskFound from "./NoTaskFound";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem explicabo harum veniam iure laudantium reprehenderit dolor minima id neque tenetur?",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: false,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [updateTask, setUpdateTask] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowTaskModal(false);
  };

  const handleEdit = (task) => {
    setUpdateTask(task)
    setShowTaskModal(true);
  };

  const handleCloseClick = () => {
    setShowTaskModal(false);
    setUpdateTask(null);
  };


  const handleFav = (taskId) => {
    const selectedTask = tasks.findIndex(task => task.id === taskId)
    let newTask = [...tasks]
    newTask[selectedTask].isFavorite = !newTask[selectedTask].isFavorite
    setTasks(newTask)
  }


  const handleDelete = (taskId) => {
    const taskAfterDelete = tasks.filter(task => task.id !== taskId);
    setTasks(taskAfterDelete)
  }


  const handleDeleteAllClick = () => {
    tasks.length = 0;
    setTasks([...tasks])
  }

  const handleSearchTerm = (searchTerm) => {
    console.log(searchTerm)
    const filteredTask = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setTasks([...filteredTask])
  }


  return (
    <section className="mb-20" id="tasks">
      {showTaskModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          onCloseClick={handleCloseClick}
          taskToUpdate={updateTask}
        />
      )}
      <div className="container mx-auto">
        {/* Search Box */}
        <div className="p-2 flex justify-end">
          <SearchBox onSearch={handleSearchTerm} />
        </div>
        {/* Search Box Ends */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions onAddClick={() => setShowTaskModal(true)} onDeleleAllClick={handleDeleteAllClick} />
          {tasks.length > 0 ?
            <TaskList tasks={tasks} onFav={handleFav} onEdit={handleEdit} onDelete={handleDelete} />
            : <NoTaskFound />
          }
        </div>
      </div>
    </section>
  );
}
