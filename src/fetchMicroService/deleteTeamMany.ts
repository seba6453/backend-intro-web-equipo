import axios from 'axios';

export async function deleteTeamsByName(token: string, nameteam: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(`http://localhost:3002/proyect/teams/${nameteam}`, {}, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar equipos.');
  }
}
