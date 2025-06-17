import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useLocation } from '../hooks/useLocation';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { Location, SavedPlace } from '../types/LocationType';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MapWithMarker from '../components/MapWithMarker';
import SearchPlacesInput from '../components/SearchPlacesInput';

export default function SearchLocationWithMapScreen() {
  const { location, error, loading, getCurrentLocation } = useLocation();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [history, setHistory] = useState<SavedPlace[]>([]);
  const searchRef = useRef<any>(null);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('SEARCH_HISTORY');
        if (jsonValue != null) {
          setHistory(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load search history', e);
      }
    };

    getCurrentLocation();
    loadSavedData();
  }, []);

  useEffect(() => {
    if (error) Alert.alert(error);
  }, [error]);

  useEffect(() => {
    setSelectedLocation(location);
  }, [location]);

  const onHandlePlaceSelect = async (details: GooglePlaceDetail) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;

    if (lat && lng) {
      const newLocation = {
        description: details.formatted_address || details.name,
        geometry: { location: { lat, lng } },
      };

      setSelectedLocation({
        latitude: lat,
        longitude: lng,
        title: details.name,
        description: details.formatted_address,
      });

      const updatedHistory = [newLocation, ...history];
      setHistory(updatedHistory);

      try {
        await AsyncStorage.setItem(
          'SEARCH_HISTORY',
          JSON.stringify(updatedHistory),
        );
      } catch (e) {
        console.error('Failed to save search history', e);
      }

      // Dismiss input manually
      searchRef.current?.blur();
    } else {
      Alert.alert('Could not get location data.');
    }
  };

  if (loading) return <ActivityIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {selectedLocation && <MapWithMarker location={selectedLocation} />}

          <View style={styles.searchContainer}>
            <SearchPlacesInput
              ref={searchRef}
              onPlaceSelected={onHandlePlaceSelect}
              predefinedPlaces={history}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
