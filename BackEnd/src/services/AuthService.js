import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";




export default class AuthService {

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
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}