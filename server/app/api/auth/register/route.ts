import { NextResponse } from 'next/server';
import { connectDB } from '@/db/connect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterPayload;
    const { name, email, password } = body;

    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
