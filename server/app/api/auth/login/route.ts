import { NextResponse } from 'next/server';
import { connectDB } from '@/db/connect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

type LoginPayload = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginPayload;
    const { email, password } = body;

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Login successful', userId: user._id, name: user.name },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
