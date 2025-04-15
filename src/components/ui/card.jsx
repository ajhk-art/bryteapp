export function Card({ children }) {
  return <div className="rounded shadow p-4 bg-white">{children}</div>
}

export function CardContent({ children }) {
  return <div>{children}</div>
}