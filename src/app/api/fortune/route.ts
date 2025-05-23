
import { NextResponse } from 'next/server';
import { fortunes } from '@/lib/fortunes';

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
