export default function handler(req, res) {
    console.log("Request Method:", req.method); // Log the HTTP method
    if (req.method === "GET") {
      try {
        const products = [
          { id: 1, name: "Chair", price: 500 },
          { id: 2, name: "Table", price: 1000 },
        ];
        console.log("Returning products:", products); // Log the response
        res.status(200).json(products);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      console.log("Invalid Method:", req.method);
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} not allowed`);
    }
  }
  