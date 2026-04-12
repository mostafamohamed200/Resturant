import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";

const SECRET_KEY = "secret123";

export default class AuthService {

  static async register(data) {
    const { name, email, password, role } = data;

    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    await UserRepository.create({
      name,
      email,
      password: hashed,
      role
    });

    return { message: "User created" };
  }

  static async login(data) {
    const { email, password } = data;

    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Wrong password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    return { token, user };
  }

}