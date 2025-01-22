import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');
    const res = await fetch(
      `https://nowatch-fullstack-test-assignment.vercel.app/api/measurements?username=${username}`,
      { next: { revalidate: 10 } },
    );
    if (!res.ok) {
      throw new Error('Failed to fetch heart rate');
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.error();
  }
}
