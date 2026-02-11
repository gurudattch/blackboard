import express from "express"

const app = express()

app.use(express.json())

// ================= STORAGE =================
global.notes = global.notes || []

// ================= PUBLIC: ADD NOTE =================
app.post("/api/note", (req, res) => {
  const { text } = req.body

  if (!text || text.length > 2000)
    return res.status(400).json({ error: "invalid note" })

  global.notes.push({
    id: Date.now(),
    text,
    ip: req.headers["x-forwarded-for"] || "unknown",
    ua: req.headers["user-agent"],
    time: new Date().toISOString()
  })

  res.json({ ok: true })
})

// ================= ADMIN: VIEW NOTES =================
app.get("/api/admin/notes", (req, res) => {
  const auth = req.headers.authorization

  if (auth !== `Bearer ${process.env.ADMIN_TOKEN}`)
    return res.status(401).json({ error: "unauthorized" })

  res.json(global.notes)
})

// ================= ADMIN: DELETE NOTE =================
app.delete("/api/admin/note/:id", (req, res) => {
  const auth = req.headers.authorization
  if (auth !== `Bearer ${process.env.ADMIN_TOKEN}`)
    return res.status(401).json({ error: "unauthorized" })

  global.notes = global.notes.filter(
    n => n.id !== Number(req.params.id)
  )

  res.json({ ok: true })
})

// ================= EXPORT =================
export default app
