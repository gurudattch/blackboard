export default function PublicBoard() {
  async function submit(e) {
    e.preventDefault()
    const text = e.target.note.value

    await fetch("/api/note", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ text })
    })

    e.target.reset()
    alert("Note dropped.")
  }

  return (
    <div className="board">
      <h1>Leave a Note</h1>
      <form onSubmit={submit}>
        <textarea name="note" placeholder="Write anything..." required />
        <button>Drop</button>
      </form>

      <style jsx>{`
        .board {
          background:#050a14;
          color:#e2e8f0;
          min-height:100vh;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          font-family:monospace;
        }
        textarea {
          width:400px;
          height:120px;
          background:#0f1623;
          color:#00d4ff;
          border:1px solid #1e293b;
          padding:10px;
        }
        button {
          margin-top:10px;
          padding:10px 30px;
          background:transparent;
          color:#00d4ff;
          border:1px solid #00d4ff;
        }
      `}</style>
    </div>
  )
}
