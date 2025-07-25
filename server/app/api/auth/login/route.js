"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const connect_1 = require("@/db/connect");
const User_1 = __importDefault(require("@/models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function POST(req) {
    const { email, password } = await req.json();
    await (0, connect_1.connectDB)();
    const user = await User_1.default.findOne({ email });
    if (!user) {
        return server_1.NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return server_1.NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    return server_1.NextResponse.json({ message: 'Login successful', userId: user._id });
}
