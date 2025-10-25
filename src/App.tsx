import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TaskList from './components/TaskList';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen p-4 md:p-6">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-semibold text-primary">Task Progress Tracker</h1>
        </motion.header>
        <main>
          <TaskList />
        </main>
      </div>
    </Provider>
  );
};

export default App;