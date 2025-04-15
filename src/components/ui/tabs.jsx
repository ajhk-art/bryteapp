export function Tabs({ children }) { return <div>{children}</div>; }
export function TabsList({ children }) { return <div className="flex gap-2 mb-2">{children}</div>; }
export function TabsTrigger({ value, children }) { return <button>{children}</button>; }
export function TabsContent({ value, children }) { return <div>{children}</div>; }