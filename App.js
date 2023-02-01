import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const App = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    useEffect(() => {
        fetch('https://mocki.io/v1/7604b5c4-1df8-4c8e-9fe8-375aa1591eae')
            .then(response => response.json())
            .then(data => setData(data.list))
            .catch(error => console.log(error));
    }, []);

    return (
        <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => setFilter(text)}
                    value={filter}
                    placeholder="Wyszukaj"
                    placeholderTextColor="white"
                />

            {selectedTeacher && (
                <View style={styles.selectedTeacherContainer}>
                    <TouchableOpacity onPress={() => setSelectedTeacher(null)}>
                        <Image
                            style={styles.backButton}
                            source={require('./arrow.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.teacherText}>{selectedTeacher.teacher}</Text>
                    <View style={styles.subjectsContainer}>
                        {selectedTeacher.subjects.map(item => (
                            <Text style={styles.subjectText}>{item}</Text>
                        ))}
                    </View>
                </View>
            )}
            {filter && !selectedTeacher && (
                <View style={styles.teachersContainer}>
                    {data.map(item => {
                        if (item.teacher.toLowerCase().includes(filter.toLowerCase()) || item.subjects.some(s => s.toLowerCase().includes(filter.toLowerCase()))) {
                            return (
                                <TouchableOpacity onPress={() => setSelectedTeacher(item)}>
                                    <View style={styles.teacherContainer}>
                                        <Text style={styles.teacherText}>{item.teacher}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#EBEBEB",
        height: "100%",
        flex:1,

    },
    textInput: {
        height: 40,
        width: "80%",
        margin: 90,
        backgroundColor: "#9a7171",
        alignItems: "center",
        borderRadius:20,
        color: "white",

    },
    backButton: {
        width: 25,
        height: 25,
        marginTop: 20,
    },
    selectedTeacherContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    teacherText: {
        fontSize: 20,
        margin: 10,
    },
    subjectsContainer: {
        width: '80%',
        margin: 10,
        alignItems: 'center',
    },
    subjectText: {
        fontSize: 16,
        margin: 5,
    },
    teachersContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    teacherContainer: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
    },
});

export default App;