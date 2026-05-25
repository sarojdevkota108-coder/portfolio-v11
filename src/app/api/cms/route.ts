import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'portfolio.json')
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'certificates')

async function ensureUploadsDir() {
  try { await fs.mkdir(UPLOADS_DIR, { recursive: true }) } catch {}
}

async function readDB() {
  const raw = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}

async function writeDB(data: unknown) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

// GET /api/cms?section=achievements
export async function GET(req: NextRequest) {
  try {
    const section = req.nextUrl.searchParams.get('section')
    const db = await readDB()
    if (section) {
      return NextResponse.json({ data: db[section] ?? null })
    }
    return NextResponse.json({ data: db })
  } catch {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 })
  }
}

// ── Auth helper ───────────────────────────────────────────────────────────────
function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('x-cms-token') || ''
  const validUser = process.env.ADMIN_USERNAME || ''
  const validPass = process.env.ADMIN_PASSWORD || ''
  if (!validUser || !validPass) return false
  const expected = Buffer.from(`${validUser}:${validPass}`).toString('base64')
  return auth === expected
}

// POST /api/cms  body: { section, action, payload, id? }
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const contentType = req.headers.get('content-type') || ''

    // ── Handle certificate image upload ──────────────────────────────────────
    if (contentType.includes('multipart/form-data')) {
      await ensureUploadsDir()
      const formData = await req.formData()
      const file     = formData.get('file') as File | null
      const certId   = formData.get('certId') as string | null
      const itemId   = formData.get('itemId') as string | null
      const section  = (formData.get('section') as string | null) || 'certifications'

      const id = certId || itemId
      if (!file || !id) {
        return NextResponse.json({ error: 'Missing file or id' }, { status: 400 })
      }

      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const allowed = ['jpg', 'jpeg', 'png', 'pdf', 'webp']
      if (!allowed.includes(ext)) {
        return NextResponse.json({ error: 'File type not allowed' }, { status: 400 })
      }

      // Volunteer files go to /public/volunteer/, certs to /public/certificates/
      const subDir = section === 'volunteer' ? 'volunteer' : 'certificates'
      const dir = path.join(process.cwd(), 'public', subDir)
      try { await fs.mkdir(dir, { recursive: true }) } catch {}

      const filename = `${id}.${ext}`
      const filepath = path.join(dir, filename)
      const buffer = Buffer.from(await file.arrayBuffer())
      await fs.writeFile(filepath, buffer)

      // Update the DB record with the image path
      const publicPath = `/${subDir}/${filename}`
      const db = await readDB()
      if (Array.isArray(db[section])) {
        db[section] = db[section].map((item: { id: string }) =>
          item.id === id ? { ...item, image: publicPath } : item
        )
        await writeDB(db)
      }

      return NextResponse.json({ success: true, path: publicPath })
    }

    // ── Standard JSON mutations ───────────────────────────────────────────────
    const body = await req.json()
    const { section, action, payload, id } = body
    const db = await readDB()

    if (!section || !action) {
      return NextResponse.json({ error: 'Missing section or action' }, { status: 400 })
    }

    if (action === 'add') {
      if (!Array.isArray(db[section])) {
        return NextResponse.json({ error: 'Section is not an array' }, { status: 400 })
      }
      const newItem = { id: `${section}-${Date.now()}`, ...payload }
      db[section].push(newItem)
    }

    if (action === 'update') {
      if (Array.isArray(db[section])) {
        db[section] = db[section].map((item: { id: string }) =>
          item.id === id ? { ...item, ...payload } : item
        )
      } else if (typeof db[section] === 'object') {
        db[section] = { ...db[section], ...payload }
      }
    }

    if (action === 'delete') {
      if (!Array.isArray(db[section])) {
        return NextResponse.json({ error: 'Section is not an array' }, { status: 400 })
      }
      // Also remove the certificate image file if it exists
      if (section === 'certifications') {
        const item = db[section].find((i: { id: string; image?: string }) => i.id === id)
        if (item?.image) {
          try {
            await fs.unlink(path.join(process.cwd(), 'public', item.image))
          } catch {}
        }
      }
      db[section] = db[section].filter((item: { id: string }) => item.id !== id)
    }

    if (action === 'reorder') {
      db[section] = payload
    }

    await writeDB(db)
    return NextResponse.json({ success: true, data: db[section] })
  } catch {
    return NextResponse.json({ error: 'Failed to write database' }, { status: 500 })
  }
}
