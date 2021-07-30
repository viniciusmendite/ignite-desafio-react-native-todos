import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, View, Image, StyleSheet, TextInput } from 'react-native';

import EditIcon from '../assets/icons/edit.png';
import XIcon from '../assets/icons/X.png';

interface IEditTask {
  taskId: number;
  taskNewTitle: string;
}

interface ITasksItemProps {
  task: {
    id: number;
    title: string;
    done: boolean;
  };
  index: number;
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: IEditTask) => void;
}

export function TaskItem({ task, editTask, onLongPress, onPress, index }: ITasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitle, setTaskNewTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskNewTitle });
    setIsEditing(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        onLongPress={() => onLongPress(task.id)}
        onPress={() => onPress(task.id)}
        style={task.done ? styles.taskButtonDone : styles.taskButton}
      >
        <View
          testID={`marker-${index}`}
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        />

        <TextInput
          ref={textInputRef}
          value={taskNewTitle}
          onChangeText={setTaskNewTitle}
          editable={isEditing}
          onSubmitEditing={handleSubmitEditing}
          style={task.done ? styles.taskTextDone : styles.taskText}
        />
      </TouchableOpacity>
      {isEditing ? (
        <TouchableOpacity onPress={handleCancelEditing}>
          <Image source={XIcon} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleStartEditing}>
          <Image source={EditIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D3D4D',
    marginRight: 10
  },
  taskText: {
    color: '#3D3D4D',
  },
  taskButtonDone: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(25, 61, 223, 0.1)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#273FAD',
    marginRight: 10
  },
  taskTextDone: {
    color: '#A09CB1',
    textDecorationLine: 'line-through'
  }
})