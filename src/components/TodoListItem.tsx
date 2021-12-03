import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { deleteTodo, updateTodo } from '../redux/slices/todos.slice';
import { Todo } from '../types/todo';
import TodoForm from './TodoForm';

type Props = {
    data: Todo
}

const TodoListItem: React.FC<Props> = ({ data }) => {
    const [isVisible, setVisible] = useState(false)
    console.log(isVisible);

    const dispatch = useAppDispatch()
    const handleDelet = () => {
        dispatch(deleteTodo(data.id))
    }
    const handleEdit: any = (values: any) => {
        dispatch(updateTodo({ id: data.id, ...values }))
    }
    return (
        <div className='out-todo-table'>
            <div className='out-todo-item'>
                <p>№ {data.id} {data.title}</p>
                <p className='todo-status'>{data.status}</p>
            </div>
            <div className='out-todo-tableButton'>
                <Button onClick={handleDelet} style={{ margin: '10px' }} color='secondary' variant='contained'>delete</Button>
                <Button onClick={() => setVisible(!isVisible)} color='primary' variant='contained'>Edit</Button>
            </div>
            {isVisible && <TodoForm data={data} onSubmit={handleEdit} />}
        </div>
    );
};

export default TodoListItem;