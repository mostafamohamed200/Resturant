import AuthService from "../services/AuthService.js";

export default class AuthController {


  static async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

}