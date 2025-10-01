import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Todo = { id: number; text: string; completed: boolean }

export default function Bai5() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')

  useEffect(() => {
    const loadTodos = async () => {
      const data = await AsyncStorage.getItem('todos')
      if (data) setTodos(JSON.parse(data))
    }
    loadTodos()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (!text.trim()) return
    const newTodo: Todo = { id: Date.now(), text, completed: false }
    setTodos([...todos, newTodo])
    setText('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập công việc"
        value={text}
        onChangeText={setText}
      />
      <Button title="Thêm" onPress={addTodo} />
      <FlatList
        style={{ marginTop: 20, width: '100%' }}
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)} style={{ flex: 1 }}>
              <Text style={[styles.todoText, item.completed && styles.completed]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <Button title="X" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  todoItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  todoText: { fontSize: 18 },
  completed: { textDecorationLine: 'line-through', color: 'gray' }
})
