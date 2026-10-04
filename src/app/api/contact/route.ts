import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // In a production environment with environment variables (e.g. RESEND_API_KEY or SENDGRID_API_KEY),
    // you can send an actual email here.
    // For now, we validate and return a success response with logging.
    console.log('[Contact Form Message Received]:', {
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Your message has been received! Rohan will reply shortly.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'An error occurred while submitting your message.' },
      { status: 500 }
    );
  }
}
