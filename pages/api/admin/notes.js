export default function handler(req, res) {
  if (req.headers.authorization !==
      `Bearer ${process.env.ADMIN_TOKEN}`)
    return res.status(401).json({ error:"unauthorized" })

  res.json(global.notes || [])
}
