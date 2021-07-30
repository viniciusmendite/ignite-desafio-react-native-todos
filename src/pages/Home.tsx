import React, { useState } from 'react';
import { Alert } from 'react-native';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface IEditTask {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === '') return;

    const taskExists = tasks.find(task => task.title === newTaskTitle);

    if (taskExists) return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome!')

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks([...tasks, task]);
  }

  function handleMarkTaskAsDone(id: number) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          id: task.id,
          title: task.title,
          done: !task.done
        }
      } else {
        return task
      }
    })

    setTasks([...newTasks])
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id)),
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }: IEditTask) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          id: task.id,
          title: taskNewTitle,
          done: task.done
        }
      } else {
        return task
      }
    })

    setTasks([...newTasks])
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
        editTask={handleEditTask}
      />
    </>
  )
}