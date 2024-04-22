import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from 'mongodb';
import { v4 as uuid } from 'uuid';

export const client = new MongoClient(process.env.mongodb_uri as string);
export const Message = client.db(process.env.mongodb_database).collection('messages');

export async function connectDb(res: NextApiResponse<any>) {
  try {
    await client.connect();
    await client.db(process.env.mongodb_database).command({ ping: 1 });
    console.log('Connected successfully to mongo server');
  } catch (error) {
    console.log('Cannot connect to mongo server');
    res.status(500).json({ message: 'Cannot connect to database.' });
    await client.close();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email.trim() 
      || !email.includes('@') 
      || !name.trim() 
      || !message.trim()
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    // Store it in database
    const newMessage = {
      id: uuid(),
      email,
      name,
      message
    };

    await connectDb(res);

    try {
      await Message.insertOne(newMessage);     
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();
    res.status(201).json({ message: 'Successfully stored message', data: newMessage });
  }
};
