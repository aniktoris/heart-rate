import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    if (!username) {
      throw new Error('Name is required');
    }
    return NextResponse.json({ username });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.error();
  }
}
