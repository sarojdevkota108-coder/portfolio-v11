import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL      = process.env.SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!

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

    const newMessage = {
      id:          `msg-${Date.now()}`,
      name:        name.trim(),
      email:       email.trim(),
      subject:     subject?.trim() || '',
      message:     message.trim(),
      received_at: new Date().toISOString(),
      read:        false,
      starred:     false,
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer':        'return=minimal',
      },
      body: JSON.stringify(newMessage),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Supabase insert error:', err)
      return NextResponse.json(
        { error: 'Unable to save your message. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}