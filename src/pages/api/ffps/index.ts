import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const ffps = await prisma.frequentFlyerProgram.findMany({
          include: {
            ratios: true,
          },
        })
        return res.status(200).json(ffps)
      } catch (error) {
        console.error('Error fetching FFPs:', error)
        return res.status(500).json({ message: 'Error fetching FFPs', error })
      }

    case 'POST':
      try {
        const { name, assetName, enabled, archived, ratios } = req.body

        for (const r of ratios) {
          const ratioVal = Number(r.ratio)
          if (isNaN(ratioVal) || ratioVal < 0.1 || ratioVal > 5) {
            return res.status(400).json({ message: 'Each ratio must be a number between 0.1 and 5' })
          }
        }

        const newFFP = await prisma.frequentFlyerProgram.create({
          data: {
            name,
            assetName,
            enabled: Boolean(enabled),
            archived: Boolean(archived),
            ratios: {
              create: ratios.map((r: any) => ({
                creditCardId: Number(r.creditCardId),
                ratio: Number(r.ratio),
              })),
            },
          },
          include: {
            ratios: true,
          },
        })

        return res.status(201).json(newFFP)
      } catch (error) {
        console.error('Error creating FFP:', error)
        return res.status(500).json({ message: 'Error creating FFP', error })
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}
