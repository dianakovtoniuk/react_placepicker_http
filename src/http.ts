import type { Place } from './types';
import { API_URL } from './config';

export async function fetchAvailablePlaces(): Promise<Place[]> {
  const response = await fetch(`${API_URL}/places`);
  const resData: { places: Place[] } = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return resData.places;
}

export async function fetchUserPlaces(): Promise<Place[]> {
  const response = await fetch(`${API_URL}/user-places`);
  const resData: { places: Place[] } = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }

  return resData.places;
}

export async function updateUserPlaces(places: Place[]): Promise<string> {
  const response = await fetch(`${API_URL}/user-places`, {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData: { message: string } = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update user data.');
  }

  return resData.message;
}