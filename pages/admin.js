export default function Admin() {
  async function load() {
    const token = prompt("Admin Token")
    const r = await fetch("/api/admin/notes", {
      headers:{ Authorization:"Bearer "+token }
    })

    if (!r.ok) return alert("Unauthorized")

    const data = await r.json()
    document.body.innerHTML =
      "<pre>"+JSON.stringify(data,null,2)+"</pre>"
  }

  return (
    <div className="admin">
      <h1>Private Notes</h1>
      <button onClick={load}>Load</button>

      <style jsx>{`
        .admin {
          background:#050a14;
          color:#ff0055;
          min-height:100vh;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          font-family:monospace;
        }
        button {
          padding:12px 40px;
          border:1px solid #ff0055;
          background:transparent;
          color:#ff0055;
        }
      `}</style>
    </div>
  )
}
