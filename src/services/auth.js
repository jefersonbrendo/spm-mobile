import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from './firebase';

const BASE = 'https://identitytoolkit.googleapis.com/v1/accounts';

const HEADERS = {
  'Content-Type': 'application/json',
  'X-Client-Version': 'React/JsCore/10.14.0/FirebaseCore-web',
};

export async function signIn(email, password) {
  const res = await fetch(`${BASE}:signInWithPassword?key=${API_KEY}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  await AsyncStorage.setItem('user', JSON.stringify(data));
  return data;
}

export async function signUp(email, password) {
  const res = await fetch(`${BASE}:signUp?key=${API_KEY}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  await AsyncStorage.setItem('user', JSON.stringify(data));
  return data;
}

export async function signOut() {
  await AsyncStorage.removeItem('user');
}

export async function getStoredUser() {
  const raw = await AsyncStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}
