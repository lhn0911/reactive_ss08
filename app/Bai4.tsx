import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Bai4() {
  const [name, setName] = useState('')
  const [savedName, setSavedName] = useState('')

  useEffect(() => {
    const loadName = async () => {
      const value = await AsyncStorage.getItem('userName')
      if (value) setSavedName(value)
    }
    loadName()
  }, [])

  const saveName = async () => {
    await AsyncStorage.setItem('userName', name)
    setSavedName(name)
  }

  const removeName = async () => {
    await AsyncStorage.removeItem('userName')
    setSavedName('')
    setName('')
  }

  return (
    <View style={styles.container}>
      {savedName ? (
        <>
          <Text style={styles.text}>Chào mừng trở lại, {savedName}!</Text>
          <Button title="Quên tôi" onPress={removeName} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên"
            value={name}
            onChangeText={setName}
          />
          <Button title="Lưu" onPress={saveName} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: { borderWidth: 1, width: '100%', padding: 10, marginBottom: 10, borderRadius: 5 },
  text: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
})
