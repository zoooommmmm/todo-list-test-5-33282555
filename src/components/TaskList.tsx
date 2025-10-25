import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { addTask, updateTaskProgress, deleteTask } from '../store/taskSlice';

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const categories = useSelector((state: RootState) => state.tasks.categories);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      dispatch(addTask({
        title: newTaskTitle.trim(),
        progress: 0,
        category: selectedCategory
      }));
      setNewTaskTitle('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-200"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <AnimatePresence>
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <h3 className="flex-1 font-medium">{task.title}</h3>
              <span className="px-3 py-1 text-sm rounded-full bg-background-hover">
                {task.category}
              </span>
              <div className="w-48 flex items-center gap-2">
                <input
                  type="range"
                  value={task.progress}
                  onChange={(e) => dispatch(updateTaskProgress({
                    id: task.id,
                    progress: Number(e.target.value)
                  }))}
                  className="flex-1"
                />
                <span className="w-12 text-sm">{task.progress}%</span>
              </div>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;