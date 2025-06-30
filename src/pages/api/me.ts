import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyAuth } from '@/lib/auth'



export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = verifyAuth(req)
    return res.status(200).json({ user })
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
