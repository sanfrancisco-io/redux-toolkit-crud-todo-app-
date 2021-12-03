import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { CreateTodoDto, Todo } from "../../types/todo";
import { $api } from "../../utils/api";

interface TodoState {
  ids: number[];
  entities: { [id: string]: Todo };
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  loading: false,
  error: null,
  ids: [],
  entities: {},
}

export const todosAdapter = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
  sortComparer: (a: Todo, b: Todo) => a.id - b.id
});

export const todosSelectors = todosAdapter.getSelectors();

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const { data } = await $api.get<Todo[]>('/todos');
    return data;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await $api.delete(`/todos/${id}`);
    return id;
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todo: Todo) => {
    await $api.patch(`/todos/${todo.id}`, todo);
    return todo;
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo: CreateTodoDto) => {
    const { data } = await $api.post<Todo>('/todos', todo);
    return data;
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(initialState),
  reducers: {
  },
  extraReducers: builder => {
    // FETCH_TODOS
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      todosAdapter.setAll(state, action.payload);
      state.loading = false;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.loading = false;
    });

    // CREATE_TODO
    builder.addCase(createTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      todosAdapter.addOne(state, action.payload);
      state.loading = false;
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.loading = false;
    });

    // UPDATE_TODO
    builder.addCase(updateTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      todosAdapter.updateOne(state, { id: action.payload.id, changes: action.payload });
      state.loading = false;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.loading = false;
    });

    // DELETE_TODO
    builder.addCase(deleteTodo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      todosAdapter.removeOne(state, action.payload);
      state.loading = false;
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong';
      state.loading = false;
    });
  }
});