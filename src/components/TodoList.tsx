import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { todosSelectors } from '../redux/slices/todos.slice';
import CircularProgress from '@material-ui/core/CircularProgress';
import TodoListItem from './TodoListItem';

const TodoList = () => {
    const todos = useAppSelector(state => todosSelectors.selectAll(state.todos))
    const { error, loading } = useAppSelector(state => state.todos)

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>
    }

    if (loading) {
        return <div><CircularProgress color="primary" /></div>
    }

    return (
        <div>
            {todos.map(todo =>
                <div
                    key={todo.id}><TodoListItem data={todo} />
                </div>
            )}
        </div>
    );

};

export default TodoList;