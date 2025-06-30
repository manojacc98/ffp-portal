import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { verifyAuth } from '@/lib/auth'


const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end('Method Not Allowed')

  try {
    verifyAuth(req)

    const id = Number(req.query.id)
    const ffp = await prisma.frequentFlyerProgram.findUnique({ where: { id } })
    if (!ffp) return res.status(404).json({ message: 'FFP not found' })

    const updated = await prisma.frequentFlyerProgram.update({
      where: { id },
      data: { enabled: !ffp.enabled },
    })

    res.status(200).json(updated)
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized or error' })
  }
}

