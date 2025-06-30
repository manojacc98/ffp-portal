import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const USERNAME = 'admin'
const PASSWORD = 'admin123'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const { username, password } = req.body

  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    })

    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 3600,
    })

    res.setHeader('Set-Cookie', cookie)
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' })
  }
}
