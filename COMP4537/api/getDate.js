export default function handler(req, res) {
    if (req.method === 'GET') {
      const { name } = req.query;
      res.status(200).json({ message: `Hello, ${name || 'Guest'}!` });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  