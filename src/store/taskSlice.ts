import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  progress: number;
  category: string;
  createdAt: number;
}

interface TaskState {
  tasks: Task[];
  categories: string[];
}

const initialState: TaskState = {
  tasks: [],
  categories: ['Work', 'Personal', 'Shopping', 'Health']
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      state.tasks.push({
        ...action.payload,
        id: Date.now().toString(),
        createdAt: Date.now()
      });
    },
    updateTaskProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.progress = Math.max(0, Math.min(100, action.payload.progress));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    }
  }
});

export const { addTask, updateTaskProgress, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;