import React from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { Location } from '../types/LocationType';

type Props = {
  location: Location;
};

export default function MapWithMarker({ location }: Props) {
  if (!location) return null;

  const region: Region = {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <MapView style={styles.map} region={region}>
      <Marker
        coordinate={location}
        title={location.title}
        description={location.description}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
