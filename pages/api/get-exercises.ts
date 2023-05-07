import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const timer = setTimeout(() => response.status(500).json({
    message: "Request timeout"
  }), 5000);

  const client = createClient();
  try {
    await client.connect();
    const { rows } = await client.sql`SELECT * from exercises;`;
    clearTimeout(timer);
    response.status(200).json(rows);
  } catch (error) {
    return response.status(500).json({ error });
  } finally {
    client.end();
  }
  response.status(400);
}
