
import { NextResponse, type NextRequest } from 'next/server';
import { fortunes, addFortune } from '@/lib/fortunes';

export async function GET() {
  if (fortunes.length === 0) {
    return NextResponse.json({ fortunes: [] }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  }
 return NextResponse.json({ fortunes: fortunes }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newFortune = body.fortune;

    if (typeof newFortune === 'string' && newFortune.trim() !== '') {
      addFortune(newFortune.trim());
      return NextResponse.json({ message: 'Fortune added successfully', fortune: newFortune.trim() }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'Invalid fortune message provided' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error adding fortune:', error);
    return NextResponse.json({ error: 'Failed to add fortune' }, { status: 500 });
  }
}
