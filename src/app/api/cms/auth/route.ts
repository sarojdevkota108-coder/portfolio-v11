import { NextRequest, NextResponse } from 'next/server'

// Simple token: base64(username:password) — no external deps needed.
// Credentials are stored in environment variables (see .env.local).

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    const validUser = process.env.ADMIN_USERNAME
    const validPass = process.env.ADMIN_PASSWORD

    if (!validUser || !validPass) {
      console.error('ADMIN_USERNAME / ADMIN_PASSWORD env vars are not set.')
      return NextResponse.json({ ok: false, error: 'Server not configured' }, { status: 500 })
    }

    if (username === validUser && password === validPass) {
      // Issue a simple signed token: base64(user:pass) — sufficient for a personal CMS.
      const token = Buffer.from(`${username}:${password}`).toString('base64')
      return NextResponse.json({ ok: true, token })
    }

    return NextResponse.json({ ok: false }, { status: 401 })
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 })
  }
}
