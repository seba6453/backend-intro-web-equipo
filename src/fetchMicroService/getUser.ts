import axios from 'axios';
import { linkMSAuth } from 'src/config/constants';

export async function fetchUserOtherBackend(token: string, email: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    };


    const response = await axios.get(linkMSAuth.secret + `/${email}`, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Usuario no existe en el sistema.');
  }
}