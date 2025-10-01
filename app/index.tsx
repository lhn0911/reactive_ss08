import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Bai1 from "@/app/Bai1";
import Bai2 from "@/app/Bai2";
import Bai3 from "@/app/Bai3";
import Bai4 from "@/app/Bai4";
import Bai5 from "@/app/Bai5";
import Bai6 from "@/app/Bai6";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <View style={styles.section}><Bai1 /></View> */}
        {/* <View style={styles.section}><Bai2 /></View> */}
        {/* <View style={styles.section}><Bai3 /></View> */}
        {/* <View style={styles.section}><Bai4 /></View> */}
        {/* <View style={styles.section}><Bai5 /></View> */}
        {/* <View style={styles.section}><Bai6 /></View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContent: {
    padding: 10,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 3,
  },
});
