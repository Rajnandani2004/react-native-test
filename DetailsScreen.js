import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.image?.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.summary}>{movie.summary?.replace(/<[^>]+>/g, '')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  image: { width: '100%', height: 300 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  summary: { fontSize: 16 },
});
