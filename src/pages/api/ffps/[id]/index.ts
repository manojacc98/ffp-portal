import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id)

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' })
  }

  switch (req.method) {
    case 'GET':
      try {
        const ffp = await prisma.frequentFlyerProgram.findUnique({
          where: { id },
          include: { ratios: true },
        })

        if (!ffp) {
          return res.status(404).json({ message: 'FFP not found' })
        }

        return res.status(200).json(ffp)
      } catch (error) {
        console.error('Error fetching FFP by ID:', error)
        return res.status(500).json({ message: 'Error fetching FFP', error })
      }

    case 'PUT':
      try {
        const { name, assetName, enabled, archived, ratios } = req.body


        for (const r of ratios) {
          const ratioVal = Number(r.ratio)
          if (isNaN(ratioVal) || ratioVal < 0.1 || ratioVal > 5) {
            return res.status(400).json({ message: 'Each ratio must be a number between 0.1 and 5' })
          }
        }

        await prisma.ratio.deleteMany({
          where: { ffpId: id },
        })

        const updatedFFP = await prisma.frequentFlyerProgram.update({
          where: { id },
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
          include: { ratios: true },
        })

        return res.status(200).json(updatedFFP)
      } catch (error) {
        console.error('Error updating FFP:', error)
        return res.status(500).json({ message: 'Error updating FFP', error })
      }

    case 'DELETE':
      try {
        await prisma.ratio.deleteMany({ where: { ffpId: id } })
        await prisma.frequentFlyerProgram.delete({ where: { id } })

        return res.status(200).json({ message: 'FFP deleted successfully' })
      } catch (error) {
        console.error('Error deleting FFP:', error)
        return res.status(500).json({ message: 'Error deleting FFP', error })
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}
