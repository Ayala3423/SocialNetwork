import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from './App';
import Search from './Search';
import Delete from './Delete';
import Update from './Update';
import Add from './Add';
import Sort from './Sort';
import '../style/Todos.css';
import { apiService } from '../../services/genericServeices';

function Todos() {
    const navigate = useNavigate();
    const [userTodos, setUserTodos] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(CurrentUser);
    const [isChange, setIsChange] = useState(0);

    useEffect(() => {
        setIsChange(0);
        const fetchTodos = async () => {
            try {
                await apiService.getByValue(
                    currentUser.id,
                    "Todos",
                    { userId: currentUser.id },
                    (result) => {
                        setUserTodos(result);
                    },
                    (error) => {
                        console.log("Update was unsuccessful:", error);
                    },
                );
            } catch (err) {
                console.error(err);
                setError("Failed to fetch todos");
            }
        };

        fetchTodos();
    }, [currentUser.id, isChange]);

    if (error) {
        return <div>{error}</div>;
    }

    async function completeFunc(e, itemId) {
        const data = e.target.checked;
        try {
            await apiService.patch(
                currentUser.id,
                "Todos",
                itemId,
                { completed: data },
                (result) => {
                    console.log("Update successful:", result);
                    setIsChange(1);
                },
                (error) => {
                    console.log("Update was unsuccessful:", error);
                },
            );
        } catch (error) {
            console.log("Unexpected error:", error);
        }
    }

    return (
        <>
            <div className='control'>
                <Sort type={"Todos"} options={["id", "title", "completed"]} userData={userTodos} setData={setUserTodos} />
                <Search type={"Todos"} setIsChange={setIsChange} options={["All", "ID", "Title", "Completed"]} data={userTodos} setData={setUserTodos} />
                <Add type={"Todos"} setIsChange={setIsChange} inputs={["title"]} defaultValue={{ userId: currentUser.id, completed: false }} />
            </div>
            <div className='container'>
                <h1>Todos</h1>
                {userTodos.length > 0 ? (
                    <ul className="todos-list">
                        {userTodos.map((todo) => (
                            <li key={todo.id} className="todo-item">
                                <div className="todo-details">
                                    <p>#{todo.id}</p>
                                    <h4>{todo.title}</h4>
                                </div>
                                <div className="todo-actions">
                                    <Update type={"Todos"} itemId={todo.id} setIsChange={setIsChange} inputs={["title"]} />
                                    <Delete type={"Todos"} itemId={todo.id} setIsChange={setIsChange} />
                                    <button>
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={(e) => completeFunc(e, todo.id)}
                                            className="todo-checkbox"
                                        />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Todos found.</p>
                )}
            </div>
        </>
    );
}

export default Todos;