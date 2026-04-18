import TableService from "../services/TableService.js";

export default class TableController {

  static async getTables(req, res) {
    try {
      const result = await TableService.getTables();
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async createTable(req, res) {
    try {
      const result = await TableService.createTable(req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateTable(req, res) {
    try {
      const { id } = req.params;
      const result = await TableService.updateTable(id, req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const result = await TableService.updateStatus(id, status);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}