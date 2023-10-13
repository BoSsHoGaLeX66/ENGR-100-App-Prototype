import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { DataTable } from 'react-native-paper';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from 'react-native-cool-speedometer';
import { LineChart, PieChart } from "react-native-gifted-charts";
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useState } from 'react';


stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#1D872B',
        },
        headerTitleStyle: {
          fontFamily: 'Trebuchet MS',
          fontWeight: 'bold',
          fontSize: 28,
          color: '#ffffff'
        },
      }} headerBackTitle={'Back'} >
        <stack.Screen name='PowerPinch' component={SplashScreen}/>
        <stack.Screen name='Electricity Usage Today' component={HomePage} />
        <stack.Screen name='Data' component={Data} />
        <stack.Screen name='Devices' component={Devices} />
        <stack.Screen name='Cost' component={Cost} />
        <stack.Screen name='Current Usage' component={CurrentUsage} />
        <stack.Screen name='Daily Usage' component={DailyUsage}/>
        <stack.Screen name='Predictions' component={Predictions}/>
        <stack.Screen name='About the Creators' component={AboutUs} />
        <stack.Screen name="Info" component={Info}/>
        <stack.Screen name='Map' component={Map}/>
      </stack.Navigator>
    </NavigationContainer>
  );
};

const HomePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.usage, styles.shadowProp]} >
        <Text style={styles.titleSmall} >Usage goes here</Text>
      </View>
      <View>
        <Pressable style={({pressed}) =>[{backgroundColor: pressed ? '#57DB68': '#1D872B'}, styles.mainButtons, styles.shadowProp]} onPress={() => navigation.navigate('Map')} >
          <Text style={[styles.titleSmall, {fontWeight: 'bold', paddingVertical: 15}]} >MAP</Text>
        </Pressable>
      </View>
      <View>
        <Pressable style={({pressed}) =>[{backgroundColor: pressed ? '#57DB68': '#1D872B'}, styles.mainButtons, styles.shadowProp]} onPress={ () => navigation.navigate('Data')} >
          <Text style={[styles.titleSmall, {fontWeight: 'bold', paddingVertical: 15}]}>DATA</Text>
        </Pressable>
      </View>
      <View>
        <Pressable style={({pressed}) =>[{backgroundColor: pressed ? '#57DB68': '#1D872B'}, styles.mainButtons, styles.shadowProp] } onPress={() => navigation.navigate('Devices')} >
          <Text style={[styles.titleSmall, {fontWeight: 'bold', paddingVertical: 15}]} >APPLIANCE USAGE</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Data = ({navigation}) => {
  return(
    <View style={[styles.container, {alignItems: 'center'}]} >
      <DataTable style={styles.table} >
      <Pressable onPress={()=> navigation.navigate('Cost')}>
        <DataTable.Header>
          <DataTable.Title><Text style={styles.chartTitle} >Cost</Text></DataTable.Title>
          <DataTable.Title><Text style={styles.chartTitle} >Savings</Text></DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
        </DataTable.Row>
        </Pressable>
      </DataTable>
      
      <View style={{marginTop: 8}} >
      <Pressable onPress={() => navigation.navigate('Current Usage')}>
      <Speedometer
  value={90}
  fontFamily='Trebuchet MS'
  max={100}
  angle={180}
  lineCap='round'
  accentColor='#1D872B'
>
  <Background angle={190} />
  <Arc arcWidth={20} />
  <Needle/>
  <Progress arcWidth={20} color='linear-gradient(90deg, rgba(0,12,36,1) 0%, rgba(9,9,121,1) 50%, rgba(255,0,69,1) 100%)' />
  <Marks/>
  <Indicator color='black' />
</Speedometer>
</Pressable>
</View>
    <View style={{alignContent: 'center', height: '25%', width: 'auto', marginTop: -35}} >
      <Pressable onPress={() => navigation.navigate('Daily Usage')}>
        <LineChart data={[{value: 10}, {value: 20}, {value: 30}, {value: 40}, {value: 50}, {value: 60}]} />
      </Pressable>
    </View>
      <View style={{alignContent: 'center', marginTop: 20}}>
        <PieChart style={{zIndex: 1}} data={[{value: 15}, {value: 20}, {value: 65}]} onPress={() => navigation.navigate('Predictions')} />
      </View>
    </View>
  );
};

const Devices = ({navigation}) => {
  return(
  <View style={styles.container}>
  <ApplianceOnOff />
  <ApplianceOnOff />
  <ApplianceOnOff />
  <ApplianceOnOff />
  <ApplianceOnOff />
  </View>
  );
};

const ApplianceOnOff = () => {
  const [onOff, setOnOff] = useState(true)
  return(
    <View style={[styles.usage, styles.shadowProp, {flexDirection: 'row', height: 85}]} >
      <Image source={require('./placeholder.png')} style={{width: 75, resizeMode: 'contain', flex: 1,marginHorizontal: 10}} />
      <Text style={[styles.text, {color: 'white', flex: 4}]}>Appliance</Text>
      <Pressable style={{flexDirection: 'row', flex: 2, backgroundColor: '#f4f4f4ff', height: 60, alignItems: 'center', paddingLeft: 5, borderRadius: 15, marginRight: 5}} onPress={() => setOnOff(!onOff)} >
        <Text style={[{flex: 1, color: onOff ? 'black': '#1D872B'}, styles.text]}>ON</Text>
        <Text style={[{flex: 1, color: onOff ? 'red': 'black'}, styles.text]}>OFF</Text>
      </Pressable>
    </View>
  );
};

const Cost = ({navigation}) => {
  return(
    <View style={[styles.container, {alignItems: 'center'}]}>
      <DataTable style={[styles.table, {marginTop: 35}]}>
        <DataTable.Header>
        <DataTable.Title><Text style={styles.chartTitle}>Current Month</Text></DataTable.Title>
        </DataTable.Header>
        <DataTable.Header>
          <DataTable.Title><Text style={styles.chartTitle}>Cost</Text></DataTable.Title>
          <DataTable.Title><Text style={styles.chartTitle}>Savings</Text></DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
          <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <DataTable style={[styles.table, {marginTop: 35}]}>
        <DataTable.Header>
          <DataTable.Title>
          <Text style={styles.chartTitle}>History</Text>
          </DataTable.Title>
        </DataTable.Header>
      <DataTable.Header>
        <DataTable.Title><Text style={styles.chartTitle}>Month</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.chartTitle}>Cost</Text></DataTable.Title>
        <DataTable.Title><Text style={styles.chartTitle}>Savings</Text></DataTable.Title>
      </DataTable.Header>
      <DataTable.Row>
        <DataTable.Cell><Text style={styles.text}>September</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell><Text style={styles.text}>August</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell><Text style={styles.text}>July</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell><Text style={styles.text}>June</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
        <DataTable.Cell><Text style={styles.text}>$00.00</Text></DataTable.Cell>
      </DataTable.Row>
      </DataTable>
    </View>
  );
};

const CurrentUsage = ({navigation}) => {
  return(
    <View style={styles.container}>
       <View style={{marginTop: 100, alignItems: 'center'}} >
      <Speedometer
  value={90}
  fontFamily='Trebuchet MS'
  max={100}
  angle={180}
  lineCap='round'
  accentColor='#1D872B'
  width={400}
>
  <Background angle={190} />
  <Arc arcWidth={20} />
  <Needle/>
  <Progress arcWidth={20} color='linear-gradient(90deg, rgba(0,12,36,1) 0%, rgba(9,9,121,1) 50%, rgba(255,0,69,1) 100%)' />
  <Marks/>
  <Indicator />
</Speedometer>
</View>
<Text style={[styles.titleSmall, {color:'black', marginTop: -50, marginLeft: 50}]}>Analysis:</Text>
<Text style={[styles.text, {marginLeft: 50}]} >*one or two sentence(s) describing the data presented above.</Text>
    </View>
  );
};

const DailyUsage = ({navigation}) => {
  return(
    <View style={[styles.container]}>
    <View style={{alignContent: 'center', height: '50%', width: 'auto', marginTop: 75, marginLeft: 50}} >
      <LineChart data={[{value: 10}, {value: 20}, {value: 30}, {value: 40}, {value: 50}, {value: 60}]} />
    </View>
    <Text style={[styles.titleSmall, {color:'black', marginTop: -100, marginLeft: 50}]}>Analysis:</Text>
<Text style={[styles.text, {marginLeft: 50}]} >*one or two sentence(s) describing the data presented above.</Text>
    </View>
  );
};

const Predictions = ({navigation}) => {
  return(
    <View style={[styles.container, {alignItems:'center'}]}>
      <View style={{alignContent: 'center', height: '50%', width: 'auto', marginTop: 75, marginLeft: 15}} >
        <LineChart data={[{value: 10}, {value: 15}, {value: 30}, {value: 24}, {value: 35}, {value: 29}]} />
      </View>
      <Text style={[styles.title, {color:'black', textDecorationLine: 'underline', marginTop: -50}]}>Top Usage</Text>
      <ApplianceUsage />
      <ApplianceUsage />
    </View>
    
  );
};

const ApplianceUsage = () => {
  return(
    <View style={[styles.usage, styles.shadowProp, {flexDirection: 'row', height: 85}]} >
      <Image source={require('./placeholder.png')} style={{width: 75, resizeMode: 'contain', flex: 1,marginHorizontal: 10}} />
      <Text style={[styles.text, {color: 'white', flex: 2}]}>Appliance</Text>
      <Text style={[styles.text, {color: 'white', flex: 2}]}>Usage</Text>
    </View>
  );
};

const SplashScreen = ({navigation}) => {
  return(
    <View style={[styles.container, {alignItems: 'center'}]}>
      <Image source={require('./logo.jpg')} style={{height: 250, width:250, resizeMode: 'contain'}} />
      <Pressable style={({pressed}) => [{height: 100, border: 'solid', borderColor: 'black', borderWidth: 3, alignItems:'center', justifyContent: 'center', width: '80%', backgroundColor: pressed ? '#1D872B' : '#f4f4f4ff'}]} onPress={() => navigation.navigate('Electricity Usage Today')}>
        <Text style={[styles.titleSmall, {color:'black'}]}>Menu</Text>
      </Pressable>
      <Pressable style={({pressed}) => [{height: 100, border: 'solid', borderColor: 'black', borderWidth: 3, alignItems:'center', justifyContent: 'center', width: '80%', backgroundColor: pressed ? '#1D872B' : '#f4f4f4ff', marginTop: 30}]} onPress={() => navigation.navigate('About the Creators')}>
        <Text style={[styles.titleSmall, {color:'black'}]}>About Us</Text>
      </Pressable>
      <Pressable style={({pressed}) => [{height: 100, border: 'solid', borderColor: 'black', borderWidth: 3, alignItems:'center', justifyContent: 'center', width: '80%', backgroundColor: pressed ? '#1D872B' : '#f4f4f4ff', marginTop: 30}]} onPress={() => navigation.navigate('Info')}>
        <Text style={[styles.titleSmall, {color:'black'}]}>Info</Text>
      </Pressable>
    </View>
  );
};

const AboutUs = ({navigation}) => {
  return(
    <View style={[styles.container, {alignItems: 'center'}]} >
      <View style={{marginTop: 40, flexDirection: 'row', width: '95%', height: '12%', alignContent:'center'}}>
        <Image source={require('./Allison_profile.png')} style={{border: 'solid', borderColor: 'black', borderWidth: 3}} />
        <View style={{border: 'solid', borderColor: 'black', borderWidth: 3, marginLeft: 10}}>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 20}}>Allison Chong</Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}} >Bucknell University Class of 2027 </Text>
          
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}}>
          Civil Engineering Major
          </Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}}>
          Focus: Data Analysis
          </Text>
        </View>
      </View>
      <View style={{marginTop: 40, flexDirection: 'row', width: '95%', height: '12%', alignContent:'center'}}>
        <Image source={require('./Brooke_profile.png')} style={{border: 'solid', borderColor: 'black', borderWidth: 3}} />
        <View style={{border: 'solid', borderColor: 'black', borderWidth: 3, marginLeft: 10}}>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 20}}>Brooke Popella</Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}} >Bucknell University Class of 2027 </Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}}>
          Education Major
          </Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}}>
          Focus: Helping businesses save money 
          </Text>
        </View>
      </View>
      <View style={{marginTop: 40, flexDirection: 'row', width: '95%', height: '12%', alignContent:'center'}}>
        <Image source={require('./IMG_2409.jpg')} style={{border: 'solid', borderColor: 'black', borderWidth: 3, height: 100, width: 100, resizeMode: 'contain'}} />
        <View style={{border: 'solid', borderColor: 'black', borderWidth: 3, marginLeft: 10}}>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 20}}>Alex Searle</Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}} >Bucknell University Class of 2027 </Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}}>
          Computer Science and Engineering Major
          </Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}}>
          Focus: Building tech solutions for the future
          </Text>
        </View>
      </View>
      <View style={{marginTop: 40, flexDirection: 'row', width: '95%', height: '14%', alignContent:'center'}}>
        <Image source={require('./Andrew_profile.png')} style={{border: 'solid', borderColor: 'black', borderWidth: 3}} />
        <View style={{border: 'solid', borderColor: 'black', borderWidth: 3, marginLeft: 10, marginRight: 50}}>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 20}}>Andrew Tandler</Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}} >Bucknell University Class of 2027 </Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14}}>
          Computer Science Major
          </Text>
          <Text style={{fontFamily: 'Trebuchet MS', fontSize: 14, marginRight: 100}}>
          Focus: Creating solutions to help save money and the environment
          </Text>
        </View>
      </View>
    </View>
  );
};

const Info = ({navigation}) => {
  return(
    <View style={[styles.container, {alignItems: 'center'}]}>
      <Image source={require('./sustainibility.png')} style={{marginTop: 30, height: '30%', resizeMode:'contain'}}/>
      <View style={{width: '80%'}}>
      <Text style={{fontFamily: 'Trebuchet MS', fontSize: 20, marginTop: 3}} >Social: Increase your mental stability by helping the environment</Text>
      <Text style={{fontFamily: 'Trebuchet MS', fontSize: 20, marginTop: 3}} >Environmental: Using less electricity=less air pollution</Text>
      <Text style={{fontFamily: 'Trebuchet MS', fontSize: 20, marginTop: 3}} >Economic: Pay less for your electricity</Text>
      </View>
    </View>
  );
};

const Map = ({navigation}) => {
  return(
    <View style={[styles.container, {alignItems: 'center'}]}>
      <Text style={[styles.titleSmall, {color: 'black', fontSize: 25, marginTop: 30}]}>1st Floor</Text>
      <Pressable onPress={() => navigation.navigate('Devices')} style={{height: 250}}>
      <Image source={require('./FirstFloor.png')} style={{height:'90%', resizeMode:"contain", marginTop: -30}}/>
      </Pressable>
      <Text style={[styles.titleSmall, {color: 'black', fontSize: 25}]}>2nd Floor</Text>
      <Pressable onPress={() => navigation.navigate('Devices')} style={{height:250}}>
      <Image source={require('./SecondFloor.png')} style={{height:'90%', resizeMode:"contain", marginTop: -30}}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4ff',
    color: 'white',
    fontFamily: 'Trebuchet MS',
  },
  nav: {
    height: '13%',
    backgroundColor: "#1D872B",
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    alignItems: 'center',
    fontFamily: 'Trebuchet MS',
    fontWeight: 'bold',
  },
  usage: {
    marginTop: 50,
    alignItems: 'center',
    marginHorizontal: 65,
    borderRadius: 15,
    backgroundColor:"#1D872B",
    
  },
  titleSmall: {
    paddingVertical: 8,
    fontSize: 22,
    fontFamily: 'Trebuchet MS',
    color: 'white',
  },
  mainButtons: {
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 65,
    borderRadius: 15,
  },
  shadowProp: {
    shadowColor: 'grey',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: .5,
    shadowRadius: 5,
  },
  table: {
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 2,
    border: 'solid',
    width: '95%',
  },
  text: {
    fontFamily: 'Trebuchet MS',
    fontSize: 16,
  },
  chartTitle: {
    fontFamily: 'Trebuchet MS',
    fontSize: 18,
    fontStyle: 'italic',
    color: 'black',
  },
  cell: {
    border: 'solid',
    borderColor: 'black',
    borderWidth: 2,
  }
});
