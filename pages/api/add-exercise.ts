import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const timer = setTimeout(() => response.status(500).json({
      message: "Request timeout"
    }), 5000);
    const client = createClient();
    try {
      await client.connect();
      const { rows } = await client.sql`INSERT INTO exercises (name, description, link) VALUES (${request.body.name}, ${request.body.description}, ${request.body.link}) RETURNING id;`;
      clearTimeout(timer);
      const id = rows?.[0]?.id;
      response.status(200).json({ id });
    } catch (error) {
      return response.status(500).json({ error });
    } finally {
      client.end();
    }
    response.status(400);
  }
  response.status(404);
}
