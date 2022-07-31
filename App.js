import * as React from 'react';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);


  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location==null) {
        console.log(location);
        return;
    }
      setLocation(location);
      console.log(location);
  
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    })();
  }, []);

  const [pin, setPin] = React.useState({latitude: 13.406,
    longitude: 123.3753,})
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      showsUserLocation={true}
      initialRegion={{
        latitude: pin.latitude,
        longitude: pin.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }} >
      <Marker
      draggable={true}
      title='Test title'
      description='test description'
      coordinate={pin}
        onDragEnd={(e)=>{
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude:  e.nativeEvent.coordinate.longitude
          });
        }}
      >
        <Callout><Text>this is a callout</Text></Callout>
        
      </Marker>
      <Circle 
      center={pin}
        radius={100}></Circle>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});