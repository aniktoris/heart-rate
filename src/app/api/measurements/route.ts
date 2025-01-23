import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const apiUrl = process.env.EXTERNAL_API_URL;
    const res = await fetch(
      `${apiUrl}/measurements?username=${username}`,
    );
    if (!res.ok) {
      console.error('API response error:', res.status, res.statusText);
      throw new Error('Failed to fetch heart rate');
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.error();
  }
}
