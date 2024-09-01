import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Make the request to the external API for authentication
    const response = await axios.post(
      `${process.env.AUTH_URL}/token`,
      null,
      {
        params: {
          grant_type: 'password',
          username: username,
          password: password,
        },
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const token = response.data.access_token;

    // Return the token as a JSON response
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error during authentication:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}
