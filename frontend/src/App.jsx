// import React, { useState, useEffect } from 'react';
// // import Navbar from './components/Navbar';
// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   const API_URL = 'http://localhost:5000/tasks';

//   // Récupérer les tâches
//   const fetchTasks = async () => {
//     const res = await fetch(API_URL);
//     const data = await res.json();
//     setTasks(data);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Ajouter une tâche
//   const addTask = async (e) => {
//     e.preventDefault();
//     if (!newTask.trim()) return;

//     const res = await fetch(API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title: newTask }),
//     });

//     if (res.ok) {
//       setNewTask('');
//       fetchTasks();
//     }
//   };

//   // Mettre à jour (toggle complétée)
//   const toggleComplete = async (task) => {
//     await fetch(`${API_URL}/${task._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title: task.title, completed: !task.completed }),
//     });
//     fetchTasks();
//   };

//   // Supprimer tâche
//   const deleteTask = async (id) => {
//     await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
//     fetchTasks();
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 font-sans p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">ToDo List</h1>

//       <form onSubmit={addTask} className="flex mb-6">
//         <input
//           type="text"
//           placeholder="Nouvelle tâche..."
//           className="flex-grow border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r"
//         >
//           Ajouter
//         </button>
//       </form>

//       <ul>
//         {tasks.map((task) => (
//           <li
//             key={task._id}
//             className="flex items-center justify-between mb-3 p-3 border rounded"
//           >
//             <label className="flex items-center cursor-pointer select-none">
//               <input
//                 type="checkbox"
//                 checked={task.completed}
//                 onChange={() => toggleComplete(task)}
//                 className="mr-3 w-5 h-5"
//               />
//               <span
//                 className={`text-lg ${
//                   task.completed ? 'line-through text-gray-400' : ''
//                 }`}
//               >
//                 {task.title}
//               </span>
//             </label>
//             <button
//               onClick={() => deleteTask(task._id)}
//               className="text-red-600 hover:text-red-800 font-semibold"
//             >
//               Supprimer
//             </button>
//           </li>
//         ))}
//       </ul>
//         {/* <Navbar /> */}
//     </div>
//   );
// }

// export default App;




import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/tasks');
      if (!res.ok) throw new Error('Erreur réseau');
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Données invalides');
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle.trim() }),
      });
      if (res.ok) {
        setNewTitle('');
        fetchTasks();
      } else {
        throw new Error('Erreur lors de l’ajout');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleDone = async (id, isDone) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDone: !isDone }),
      });
      if (res.ok) {
        fetchTasks();
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchTasks();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f0f2f5',
        padding: 20,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ color: '#333', marginBottom: 24 }}>Ma Todo List</h1>

      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: 400,
          marginBottom: 24,
        }}
      >
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTask();
          }}
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: 14,
            borderRadius: '4px 0 0 4px',
            border: '1px solid #ccc',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#007bff')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
        />
        <button
          onClick={addTask}
          style={{
            padding: '8px 16px',
            fontSize: 14,
            border: 'none',
            borderRadius: '0 4px 4px 0',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Ajouter
        </button>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

      {!loading && tasks.length === 0 && <p>Aucune tâche trouvée.</p>}

      <ul
        style={{
          listStyleType: 'none',
          paddingLeft: 0,
          width: '100%',
          maxWidth: 400,
        }}
      >
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 12,
              padding: '8px 12px',
              borderRadius: 6,
              backgroundColor: task.isDone ? '#d4edda' : '#f8d7da',
              color: task.isDone ? '#155724' : '#721c24',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)',
            }}
          >
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => toggleDone(task._id, task.isDone)}
              style={{ cursor: 'pointer', marginRight: 12, transform: 'scale(1.2)' }}
            />
            <span
              style={{
                flex: 1,
                textDecoration: task.isDone ? 'line-through' : 'none',
                fontWeight: '500',
              }}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task._id)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#dc3545',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: 18,
                lineHeight: 1,
              }}
              title="Supprimer la tâche"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
