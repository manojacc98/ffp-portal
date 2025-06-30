import type { NextApiRequest, NextApiResponse } from 'next'
import { v2 as cloudinary } from 'cloudinary'
import formidable, { File } from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const form = formidable({
    keepExtensions: true,
  })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err)
      return res.status(500).json({ error: 'Failed to parse form' })
    }

    const uploaded = files.file
    const file = Array.isArray(uploaded) ? uploaded[0] : uploaded
    const filePath = file?.filepath

    if (!filePath) {
      return res.status(400).json({ error: 'No file found' })
    }

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'uploads',
      })

      return res.status(200).json({ url: result.secure_url })
    } catch (uploadErr) {
      console.error('Upload failed:', uploadErr)
      return res.status(500).json({ error: 'Upload failed' })
    } finally {
      fs.unlink(filePath, () => {}) // cleanup
    }
  })
}
