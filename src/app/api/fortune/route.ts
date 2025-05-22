import { NextResponse } from 'next/server';
import { fortunes } from '@/lib/fortunes';

export async function GET() {
  if (fortunes.length === 0) {
    return NextResponse.json({ error: 'No fortunes available' }, { status: 500 });
  }
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const randomFortune = fortunes[randomIndex];
  return NextResponse.json({ fortune: randomFortune });
}
