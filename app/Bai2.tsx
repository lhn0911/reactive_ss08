import React, { useState, useEffect } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Bai2() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const loadSwitch = async () => {
      const value = await AsyncStorage.getItem('nightMode')
      if (value !== null) setIsEnabled(JSON.parse(value))
    }
    loadSwitch()
  }, [])

  const toggleSwitch = async () => {
    const newValue = !isEnabled
    setIsEnabled(newValue)
    await AsyncStorage.setItem('nightMode', JSON.stringify(newValue))
  }

  return (
    <View style={[styles.container, { backgroundColor: isEnabled ? '#333' : '#fff' }]}>
      <Text style={[styles.text, { color: isEnabled ? '#fff' : '#000' }]}>
        Chế độ ban đêm
      </Text>
      <Switch value={isEnabled} onValueChange={toggleSwitch} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, marginBottom: 10 }
})
