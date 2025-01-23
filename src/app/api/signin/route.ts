import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    if (!username) {
      throw new Error('Username is required');
    }
    const apiUrl = process.env.EXTERNAL_API_URL;
    const apiResponse = await fetch(`${apiUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!apiResponse.ok) {
      throw new Error(`External API error: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
