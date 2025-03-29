import { NextApiRequest, NextApiResponse } from 'next';
import { login, register, logout } from '../../../lib/api/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      if (req.url?.includes('login')) {
        await login(req, res);
      } else if (req.url?.includes('register')) {
        await register(req, res);
      } else if (req.url?.includes('logout')) {
        await logout(req, res);
      } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
