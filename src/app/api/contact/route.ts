import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'Saroj.devkota666@gmail.com'

export async function POST(request: NextRequest) {
  try {
    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json({ error: 'Email sender is not configured.' }, { status: 500 })
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `Portfolio Contact <${EMAIL_USER}>`,
      to: CONTACT_EMAIL,
      subject: `New portfolio message from ${name}${subject ? ` — ${subject}` : ''}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\n${message}`,
      html: `
        <h2>New Portfolio Contact</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Unable to send your message right now.' }, { status: 500 })
  }
}
