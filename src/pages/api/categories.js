import categories from "../../data/categories.json";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(categories);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
