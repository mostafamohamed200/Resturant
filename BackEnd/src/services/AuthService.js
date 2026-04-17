import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";

const SECRET_KEY = process.env.JWT_SECRET || "secret123";

export default class AuthService {

  static async register(data) {
    const { name, email, password } = data;

    // validation
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await UserRepository.create({
      name,
      email,
      password: hashed,
      role: "waiter" // تقدر تغيرها بعدين
    });

    return {
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    };
  }

  static async login(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error("Email and password required");
    }

    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Wrong password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return {
      message: "Login successful",
      token,
      user: safeUser
    };
  }
}