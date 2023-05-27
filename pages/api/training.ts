import { prisma } from '../../lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  switch(request.method) {
    case 'GET': {
      try {
        const trainings = await prisma.training.findMany();
        return response.status(200).json(trainings);
      } catch (error) {
        return response.status(500).json({ error });
      }
    }
    case 'POST': {
      try {
        const newTraining = await prisma.training.create({
          data: {
            duration: request.body.duration,
            restDuration: request.body.restDuration,
            groups: request.body.groups,
            bpm: request.body.bpm,
            exerciseId: request.body.exerciseId,
            exerciseName: request.body.exerciseName,
          },
        });
        return response.status(200).json({ id: newTraining.id });
      } catch (error) {
        return response.status(500).json({ error });
      }
    }
    case 'DELETE': {
      try {
        const deletedTraining = await prisma.training.delete({
          where: {
            id: request.body.id,
          },
        });
        return response.status(200).json({ id: deletedTraining.id });
      } catch (error) {
        return response.status(500).json({ error });
      }
    }
    default:
      return response
        .status(405)
        .end(`Method ${request.method} Not Allowed`);
  }
};
