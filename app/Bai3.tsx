import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Bai3() {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const loadCount = async () => {
      const value = await AsyncStorage.getItem('counter')
      if (value !== null) setCount(Number(value))
    }
    loadCount()
  }, [])

  const updateCount = async (newValue: number) => {
    setCount(newValue)
    await AsyncStorage.setItem('counter', String(newValue))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
      <View style={styles.buttons}>
        <Button title="Tăng" onPress={() => updateCount(count + 1)} />
        <Button title="Giảm" onPress={() => updateCount(count - 1)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 40, marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 20 }
})
