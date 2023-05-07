import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    if (!request.body.id) {
      return response.status(400);
    }

    const timer = setTimeout(() => response.status(500).json({
      message: "Request timeout"
    }), 5000);

    const client = createClient();
    try {
      await client.connect();
      await client.sql`DELETE FROM exercises WHERE id = ${request.body.id}`;
      clearTimeout(timer);
      response.status(200).json('ok');
    } catch (error) {
      return response.status(500).json({ error });
    } finally {
      client.end();
    }
    response.status(400);
  }
  response.status(404);
}
