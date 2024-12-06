import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../utils/api';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('?q=all').then(response => setMovies(response.data));
  }, []);

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.show.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
          <View style={styles.item}>
            <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
            <View>
              <Text style={styles.title}>{item.show.name}</Text>
              <Text numberOfLines={2} style={styles.summary}>{item.show.summary?.replace(/<[^>]+>/g, '')}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', margin: 10, alignItems: 'center' },
  thumbnail: { width: 100, height: 100, marginRight: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  summary: { fontSize: 14 },
});
