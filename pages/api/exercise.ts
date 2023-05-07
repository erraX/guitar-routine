import { prisma } from '../../lib/prismaClient';
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  switch(request.method) {
    case 'GET': {
      try {
        const exercises = await prisma.exercise.findMany();
        return response.status(200).json(exercises);
      } catch (error) {
        return response.status(500).json({ error });
      }
    }
    case 'POST': {
      try {
        const newExercise = await prisma.exercise.create({
          data: {
            name: request.body.name,
            description: request.body.description,
            link: request.body.link,
          },
        });
        return response.status(200).json({ id: newExercise.id });
      } catch (error) {
        return response.status(500).json({ error });
      }
    }
    case 'PUT': {
      try {
        const updatedExercise = await prisma.exercise.update({
          where: {
            id: request.body.id,
          },
          data: {
            name: request.body.name,
            description: request.body.description,
            link: request.body.link,
          }
        });
        return response.status(200).json({ id: updatedExercise.id });
      } catch (error) {
        return response.status(500).json({ error });
      }
    }
    case 'DELETE': {
      try {
        const deletedExercise = await prisma.exercise.delete({
          where: {
            id: request.body.id,
          },
        });
        return response.status(200).json({ id: deletedExercise.id });
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
