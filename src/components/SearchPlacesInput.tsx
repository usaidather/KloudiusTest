// components/SearchPlacesInput.tsx
import React, { forwardRef, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { SavedPlace } from '../types/LocationType';
import { GOOGLE_PLACES_API_KEY } from '@env';
import { useResponsiveStyles } from '../hooks/useResponsiveStyles';

type Props = {
  onPlaceSelected: (details: GooglePlaceDetail) => void;
  predefinedPlaces: SavedPlace[];
};
const { scale, verticalScale, moderateScale, height } = useResponsiveStyles();

const SearchPlacesInput = forwardRef<any, Props>(
  ({ onPlaceSelected, predefinedPlaces }, ref) => {
    return (
      <GooglePlacesAutocomplete
        ref={ref}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
        placeholder="Search"
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en',
        }}
        predefinedPlaces={predefinedPlaces}
      />
    );
  },
);

export default SearchPlacesInput;

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'transparent',
    height: verticalScale(56),
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    height: verticalScale(40),
    borderRadius: moderateScale(5),
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    fontSize: scale(15),
    flex: 1,
  },
  listView: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(8),
    backgroundColor: 'white',
  },
});
