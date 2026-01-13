import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListsView from './CustomComponents/ListsView';
import LoginView from './CustomComponents/LoginView';
import SignupView from './CustomComponents/SignupView';
import TasksView from './CustomComponents/TasksView';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path ="/" element={<LoginView />} />
    <Route path="/signup" element={<SignupView />} />
    <Route path="/tasks/:listId" element={<TasksView />} />
    <Route path="/lists" element={<ListsView />} />


   </Routes>
   </BrowserRouter>
  );
}

export default App;
