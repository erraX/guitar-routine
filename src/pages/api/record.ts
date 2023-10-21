import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

export const prisma = new PrismaClient();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  switch(request.method) {
    case 'GET': {
      try {
        const trainings = await prisma.record.findMany();
        return response.status(200).json(trainings);
      } catch (error) {
        return response.status(500).json({ error });
      }
    }
    case 'POST': {
      try {
        const newTraining = await prisma.record.create({
          data: {
            duration: Number(request.body.duration),
            restDuration: Number(request.body.restDuration),
            groups: Number(request.body.groups),
            bpm: Number(request.body.bpm),
            exerciseId: Number(request.body.exerciseId),
            exerciseName: request.body.exerciseName || '',
          },
        });
        return response.status(200).json({ id: newTraining.id });
      } catch (error) {
        return response.status(500).json({ error });
      }
    }
    case 'DELETE': {
      try {
        const deletedTraining = await prisma.record.delete({
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
