// lib/auth.ts
import { NextApiRequest } from 'next'
import jwt from 'jsonwebtoken'

export function verifyAuth(req: NextApiRequest) {
  const token = req.cookies?.token
  if (!token) throw new Error('No token')

  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    throw new Error('Invalid token')
  }
}
