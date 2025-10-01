import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Settings = {
  username: string
  email: string
  notificationsEnabled: boolean
}

export default function Bai6() {
  const [settings, setSettings] = useState<Settings>({
    username: 'Guest',
    email: '',
    notificationsEnabled: true,
  })

  useEffect(() => {
    const loadSettings = async () => {
      const data = await AsyncStorage.getItem('userSettings')
      if (data) setSettings(JSON.parse(data))
    }
    loadSettings()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem('userSettings', JSON.stringify(settings))
  }, [settings])

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên hiển thị:</Text>
      <TextInput
        style={styles.input}
        value={settings.username}
        onChangeText={text => updateSetting('username', text)}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={settings.email}
        onChangeText={text => updateSetting('email', text)}
        keyboardType="email-address"
      />

      <View style={styles.row}>
        <Text style={styles.label}>Nhận thông báo:</Text>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={val => updateSetting('notificationsEnabled', val)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  label: { fontSize: 16, marginTop: 15 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginTop: 5 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }
})
