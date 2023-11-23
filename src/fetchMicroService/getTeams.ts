import axios from 'axios';

export async function fetchTeamsOtherBackend(token: string, id_proyect: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    };


    const response = await axios.get(`http://localhost:3002/proyect/teams/${id_proyect}`, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Proyecto no existe en el sistema.');
  }
}