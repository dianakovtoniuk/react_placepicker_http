import Places from './Places';
import ErrorPage from './Error';
import { sortPlacesByDistance } from '../loc';
import { fetchAvailablePlaces } from '../http';
import { useFetch } from '../hooks/useFetch';
import type { Place } from '../types';

async function fetchSortedPlaces(): Promise<Place[]> {
  const places = await fetchAvailablePlaces();

  return new Promise<Place[]>((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
}

interface AvailablePlacesProps {
  onSelectPlace: (place: Place) => void;
}

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}