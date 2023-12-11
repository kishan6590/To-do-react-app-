import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import TodoItem from "./components/TodoItem";
import TodoForm from './components/TodoForm'

function App() {
  //  ab store yehi bna skta mtblb wo cheez jo context ki data ko update kregii
  //  yeha phir me direct context wali file me hi ek function bna skta huu jo context ki state ko update krega jesa first context me kr rkha h
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((pretodos) => {
                             // yeha object horaha h and yeha pe array spread ho rha h 
      return [{ id: Date.now(), ...todo }, ...pretodos];
    });
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((prevTodo) => {
        return prevTodo.id !== id;
      });
    });
  };

  function toggleComplete(id) {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) => {
        return prevTodo.id == id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo;
      });
    });
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    //    todos and todos.length individually rkh kr

    //  locastorage me data sting format me store hota h and hum jo complex object store kra h wo ek json.string h not normal stirng
    // and jab hum data ko localstorage se nikal k use krege to us json.stringfy wale json data data ko hum json.parse() parse kr k kind of js object me convert kra lenge
    if (todos && todos.length > 0) {//here if i am removig 2nd second then local storgae in not saving my data whyy
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, toggleComplete, deleteTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm/>
            </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
             {todos.map((todo)=>{
              //  return <TodoItem todo={todo}/>
               return  ( <div key={todo.id} className="w-full">
                <TodoItem todo={todo}/>
               </div>)
             })}
          </div>
        </div>
      </div>  
    </TodoProvider>
  );
}

export default App;
