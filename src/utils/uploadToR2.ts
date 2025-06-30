import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const bucket = process.env.R2_BUCKET_NAME!
const accessKeyId = process.env.R2_ACCESS_KEY_ID!
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!
const endpointRaw = process.env.R2_ENDPOINT!
const endpointUrl = new URL(endpointRaw)

console.log('🔍 process.env.R2_ENDPOINT:', process.env.R2_ENDPOINT)
console.log('✅ endpointUrl:', endpointUrl.toString())

const s3Client = new S3Client({
  region: 'auto',
  endpoint: endpointUrl,
  forcePathStyle: true,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  tls: true,
})

export async function uploadToR2(
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  })

  try {
    await s3Client.send(command)
    console.log('✅ Upload successful')
    return `${process.env.NEXT_PUBLIC_R2_ENDPOINT}/${key}`
  } catch (error: any) {
    console.error('❌ R2 upload failed:', error)
    throw new Error('R2 upload failed: ' + error.message)
  }
}
