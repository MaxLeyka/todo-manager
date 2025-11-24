import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskList from 'app/TaskList/TaskList';
import AddTask from 'app/AddTask/AddTask';
import NotFound from 'app/NotFound/NotFound';
import EditTask from 'app/EditTask/EditTask';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:taskId" element={<EditTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
