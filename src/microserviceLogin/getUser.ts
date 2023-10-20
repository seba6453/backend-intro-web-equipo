import axios from 'axios';

export async function fetchUserOtherBackend(token: string, email: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    };


    const response = await axios.get(`http://localhost:3000/user/${email}`, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Usuario no existe en el sistema.');
  }
}