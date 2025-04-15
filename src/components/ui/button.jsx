export function Button({ children, ...props }) {
  return <button {...props} style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px' }}>{children}</button>;
}
