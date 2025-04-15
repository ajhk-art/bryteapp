import { useState, useEffect } from "react";

export default function BryteApp() {
  const [plan, setPlan] = useState("");
  const [logg, setLogg] = useState("");
  const [historikk, setHistorikk] = useState([]);

  useEffect(() => {
    const lagretHistorikk = JSON.parse(localStorage.getItem("loggHistorikk") || "[]");
    setHistorikk(lagretHistorikk);
  }, []);

  const lagrePlan = () => {
    alert("Treningsplan lagret!");
  };

  const lagreLogg = () => {
    if (!logg.trim()) return;
    const nyLogg = { dato: new Date().toLocaleString(), tekst: logg };
    const oppdatert = [nyLogg, ...historikk];
    setHistorikk(oppdatert);
    localStorage.setItem("loggHistorikk", JSON.stringify(oppdatert));
    setLogg("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>BryteApp</h1>

      <div style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 20 }}>📋 Treningsplan</h2>
        <textarea
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="Skriv inn treningsplan..."
          rows={6}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <button onClick={lagrePlan} style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 6 }}>
          Lagre plan
        </button>
      </div>

      <div style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 20 }}>📝 Loggføring</h2>
        <textarea
          value={logg}
          onChange={(e) => setLogg(e.target.value)}
          placeholder="Beskriv treningsøkta..."
          rows={4}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
        <button onClick={lagreLogg} style={{ padding: "10px 20px", background: "#059669", color: "#fff", border: "none", borderRadius: 6 }}>
          Lagre logg
        </button>
      </div>

      <div>
        <h2 style={{ fontSize: 20 }}>📆 Tidligere økter</h2>
        {historikk.length === 0 ? (
          <p>Ingen loggførte økter enda.</p>
        ) : (
          <ul style={{ paddingLeft: 0 }}>
            {historikk.map((item, idx) => (
              <li key={idx} style={{ marginBottom: 12, listStyle: "none", border: "1px solid #ddd", padding: 10, borderRadius: 4 }}>
                <strong>{item.dato}</strong>
                <p>{item.tekst}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
