export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end()

  global.notes = global.notes || []

  const { text } = req.body
  if (!text || text.length > 2000)
    return res.status(400).json({ error: "invalid" })

  global.notes.push({
    id: Date.now(),
    text,
    ip: req.headers["x-forwarded-for"] || "unknown",
    ua: req.headers["user-agent"],
    time: new Date().toISOString()
  })

  res.json({ ok:true })
}
