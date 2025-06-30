# FFP Portal – Pneuma FSE Intern Challenge

This is a single-page admin portal built using **Next.js** (with API Routes), **TypeScript**, **Tailwind CSS**, and **PostgreSQL + Prisma ORM**. 
It allows admins to manage **Frequent Flyer Programs (FFPs)**, their **logos**, and **transfer ratios** with Credit Card partners.

---

## Features

- Add / Edit / Delete Frequent Flyer Programs
- Upload and display logo images via **Cloudinary**
- Set dynamic transfer ratios for each FFP with selected credit cards
- Toggle FFPs as Enabled / Archived
- JWT-based login authentication
- Responsive UI and form validation
- Persisted data using PostgreSQL (Neon) with Prisma

---

## Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes (Node.js, REST)
- **Database**: SQLite + Prisma ORM
- **File Storage**: Cloudinary (logo uploads)
- **Auth**: JWT (via `/api/login`)
- **Deployment**: Works on **Vercel**

---

##  Live Demo

[Click to View Deployed App][https://your-vercel-url.vercel.app]https://ffp-portal-l4amogy0e-manojs-projects-4ea21a96.vercel.app

---

## .env Configuration

Create a `.env` file in your root folder:

# Cloudinary credentials (you need your own Cloudinary account)
CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

# JWT secret for login
JWT_SECRET=your_jwt_secret

# Prisma database
DATABASE_URL="file:./dev.db"
Test Login
Username: admin
Password: admin123
Cloudinary Integration
Image uploads are handled via /api/upload:
FFPFormModal.tsx handles image file input.

The backend route parses the image with formidable, uploads it to Cloudinary, and returns the secure URL.

This URL is stored as assetName and displayed in the FFP list.

# Folder Structure (Important Files)
pages/
├── ffps.tsx # Admin dashboard for FFPs
├── login.tsx # Login page
├── api/
│ ├── ffps/ # CRUD for FFPs
│ ├── cards/ # Get credit cards
│ ├── login.ts # Auth
│ ├── logout.ts # Logout session
│ ├── me.ts # Session check
│ └── upload.ts # Cloudinary file upload

components/
├── FFPFormModal.tsx # Modal for Add/Edit FFP

prisma/
├── schema.prisma # DB schema


# Setup Instructions
Install dependencies:


npm install
Generate and migrate database:


npx prisma generate
npx prisma migrate dev --name init
Run dev server:


npm run dev
Open http://localhost:3000

# Notes
You must create your own Cloudinary account to make image uploads work.

Deployed version will work on Vercel, as API Routes and Cloudinary both are fully compatible.

Deliverables
-GitHub repo with complete source code

Live deployment URL (on Vercel)

README with setup instructions and env configuration

# Author
Manoj R
Email: r.amojacc@gmail.com
LinkedIn: linkedin.com/in/manoj--r



