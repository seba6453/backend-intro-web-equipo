import axios from 'axios';
import { linkMSProyect } from 'src/config/constants';

export async function updateTeamByName(token: string, nameteam: string, newName: string) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.patch(linkMSProyect + `/team/${nameteam}`, {name: newName}, { headers });

    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar el nombre del equipo.');
  }
}
