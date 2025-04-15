import { useState } from "react";
import { Button } from "./components/ui/button";

export default function BryteApp() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: 20 }}>
      <h1>BryteApp</h1>
      <p>Du har trykket {count} ganger</p>
      <Button onClick={() => setCount(count + 1)}>Trykk meg</Button>
    </div>
  );
}
