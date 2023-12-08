import axios from 'axios';
import { linkMSProyect } from 'src/config/constants';

export async function deleteTeamsByName(token: string, nameteam: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(linkMSProyect.secret + `/teams/${nameteam}`, {}, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Error al eliminar equipos.');
  }
}
