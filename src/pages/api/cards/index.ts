import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const cards = await prisma.creditCard.findMany({
        where: { archived: false },
        orderBy: { name: 'asc' },
      })
      res.status(200).json(cards)
    } catch (error) {
      console.error('Error fetching credit cards:', error)
      res.status(500).json({ message: 'Error fetching credit cards' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
