import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form'
import { Todo, CreateTodoDto } from '../types/todo';


export type TodoFormOnSubmit = (values: CreateTodoDto) => void

type Props = {
    onSubmit: any,
    data?: Todo
}

const TodoForm: React.FC<Props> = ({
    onSubmit,
    data
}) => {
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm({ mode: 'onBlur' || 'onChange' || 'onSubmit' });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('title', {
                        required: "Напиши что нибудь!",
                        minLength: {
                            value: 5,
                            message: 'Минимум 5 символов'
                        }
                    })}
                    id="outlined-basic"
                    size='small'
                    label="Список задач"
                    variant="outlined"
                />
                <select
                    {...register('status', {
                        required: "Выбери что нибудь!",
                    })}
                    className='selec-option'
                >
                    <option value="">Выбрать статус</option>
                    <option value="TODO">Todo</option>
                    <option value="DOING">Doing</option>
                    <option value="DONE">Done</option>
                </select>
                <Button
                    style={{ marginLeft: '20px' }}
                    type='submit'
                    color='primary'
                    variant="contained"
                >Submit
                </Button>
            </form>
            <span style={{ color: 'red' }}>{errors?.title && <p>{errors?.title?.message}</p>}</span>
            <span style={{ color: 'red' }}>{errors?.status && <p>{errors?.status?.message}</p>}</span>
        </div>
    );
};

export default TodoForm;