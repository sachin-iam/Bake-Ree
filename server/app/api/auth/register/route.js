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
    const { name, email, password } = await req.json();
    await (0, connect_1.connectDB)();
    const userExists = await User_1.default.findOne({ email });
    if (userExists) {
        return server_1.NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.default.create({ name, email, password: hashedPassword });
    return server_1.NextResponse.json({ message: 'User created successfully', user });
}
