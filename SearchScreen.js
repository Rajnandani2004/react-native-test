import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../utils/api';

export default function SearchScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const searchMovies = () => {
    axios.get(`?q=${searchTerm}`).then(response => setResults(response.data));
  };

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={searchMovies}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
            <View style={styles.item}>
              <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
              <Text style={styles.title}>{item.show.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: { margin: 10, padding: 10, borderWidth: 1, borderRadius: 5 },
  item: { flexDirection: 'row', margin: 10, alignItems: 'center' },
  thumbnail: { width: 50, height: 50, marginRight: 10 },
  title: { fontSize: 16 },
});
