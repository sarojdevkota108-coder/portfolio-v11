import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'portfolio.json')

async function readDB() {
  const raw = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(raw)
}

async function writeDB(data: unknown) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Build the new message object
    const newMessage = {
      id: `msg-${Date.now()}`,
      name:      name.trim(),
      email:     email.trim(),
      subject:   subject?.trim() || '',
      message:   message.trim(),
      receivedAt: new Date().toISOString(),
      read:    false,
      starred: false,
    }

    // Append to portfolio.json under the "messages" key
    const db = await readDB()
    if (!Array.isArray(db.messages)) {
      db.messages = []
    }
    db.messages.unshift(newMessage) // newest first

    await writeDB(db)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Unable to save your message. Please try again.' },
      { status: 500 }
    )
  }
}
