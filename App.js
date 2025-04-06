import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button  } from 'react-native';
import { 
  NavigationContainer,
  useNavigation, 
  createStaticNavigation,
  useRoute,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState} from "react";

// function formatTime(hoursFloat) {
//   const hours = Math.floor(hoursFloat); // 정수 시간
//   const minutes = (hoursFloat - hours) * 60; // 남은 분

//   const parts = [];
//   if (hours > 0) parts.push(`${hours}시간`);
//   if (minutes > 0) parts.push(`${minutes}분`);
//   if (parts.length === 0) return '0분';

//   return parts.join(' ');
// }

function MainScreen(){
  const navigation = useNavigation();
  const route = useRoute();
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  useEffect(() => {
    if (route.params?.newHealth !== undefined) {
      setNumber1(route.params.newHealth);
    }
  }, [route.params?.newHealth]);
  
  return(
  <View style={styles.container}>
  <Text style={{fontSize: 50}}>건강 : {number1}</Text>
  <Text style={{fontSize: 50}}>지식 : {number2}</Text>
   <View style={styles.button}> 
     <Button title = "운동" 
      onPress={()=> navigation.navigate('ExerciseScreen')}/>
     <Button title = "공부" 
      onPress={()=> navigation.navigate('StudyScreen')}/>
     <Button title = "잠" />
   </View>
   <StatusBar style="auto" />
 </View>  
  );
}

function ExerciseScreen(){
  // const [time1, timenumbe1] = useState(0);
  const navigation = useNavigation();
  const [timenumbe1, setTimenumbe1] = useState(0);
  function formatTime(hoursFloat) {
  const hours = Math.floor(hoursFloat); // 정수 시간
  const minutes = (hoursFloat - hours) * 60; // 남은 분
  
    const parts = [];
    if (hours > 0) parts.push(`${hours}시간`);
    if (minutes > 0) parts.push(`${minutes}분`);
    if (parts.length === 0) return '0분';
    return parts.join(' ');
  };
  
  return(
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>운동한 시간 : {formatTime(timenumbe1) } </Text>
      <View style={styles.button}>
        <Button title='30분 추가'
        onPress={() => setTimenumbe1(timenumbe1 + 0.5)}
        />
        <Button title='30분 감소'
        onPress={() => setTimenumbe1(timenumbe1 - 0.5)}
        disabled={timenumbe1 <= 0}
        />
        <View style={styles.button}>
          <Button title = '취소' 
          onPress={()=> {
            setTimenumbe1(0);
            navigation.navigate('MainScreen');
          }}
          />
          <Button title = '완료' 
            onPress={() => {
            navigation.navigate('MainScreen', {
            newHealth: timenumbe1 * 1,
            });
           }}
          />
        </View>
      </View>
    </View>
  );
}

function StudyScreen(){
  const navigation = useNavigation();
  const [timenumbe2, setTimenumbe2] = useState(0);
  function formatTime(hoursFloat) {
  const hours = Math.floor(hoursFloat); // 정수 시간
  const minutes = (hoursFloat - hours) * 60; // 남은 분
  
    const parts = [];
    if (hours > 0) parts.push(`${hours}시간`);
    if (minutes > 0) parts.push(`${minutes}분`);
    if (parts.length === 0) return '0분';
    return parts.join(' ');
  };
  
  return(
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>공부한 시간 : {formatTime(timenumbe2) } </Text>
      <View style={styles.button}>
        <Button title='30분 추가'
        onPress={() => setTimenumbe2(timenumbe2 + 0.5)}
        />
        <Button title='30분 감소'
        onPress={() => setTimenumbe2(timenumbe2 - 0.5)}
        disabled={timenumbe2 <= 0}
        />
        <View style={styles.button}>
          <Button title = '취소' 
          onPress={()=> {
            setTimenumbe2(0);
            navigation.navigate('MainScreen');
          }}
          />
          <Button title = '완료' 
            onPress={() => {
            navigation.navigate('MainScreen', {
            newHealth: timenumbe2 * 1,
            });
           }}
          />
        </View>
      </View>
    </View>
  );
}

function SleepScreen(){
  const [time3, timenumber3] = useState(0);
  return(
    <View style={styles.container}>
      <Text style={{fontSize: 50}}>수면 시간 : {timenumber3} </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
        <Stack.Screen name="StudyScreen" component={StudyScreen} />
        <Stack.Screen name="SleepScreen" component={SleepScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: "row",
    gap: 30,
    justifyContent: 'space-between',
    marginTop: 30,
  },
});
