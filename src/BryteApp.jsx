import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const defaultUsers = [
  { name: "Emma", role: "utøver" },
  { name: "Jonas", role: "trener" },
  { name: "Linn", role: "utøver" }
];

export default function BryteApp() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [note, setNote] = useState("");
  const [plan, setPlan] = useState("");
  const [log, setLog] = useState("");
  const [logHistory, setLogHistory] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("bryteUsers") || "null");
    setUsers(storedUsers || defaultUsers);

    const storedLogs = JSON.parse(localStorage.getItem("logHistory") || "[]");
    setLogHistory(storedLogs);
  }, []);

  useEffect(() => {
    localStorage.setItem("logHistory", JSON.stringify(logHistory));
  }, [logHistory]);

  useEffect(() => {
    localStorage.setItem("bryteUsers", JSON.stringify(users));
  }, [users]);

  const handleLogin = (selectedRole) => {
    setUser("Demo Bruker");
    setRole(selectedRole);
  };

  const handleSavePlan = () => {
    toast.success("Treningsplan lagret!");
  };

  const handleSaveLog = () => {
    if (log.trim() === "") return;
    const entry = { date: new Date().toLocaleDateString(), content: log };
    const updated = [entry, ...logHistory];
    setLogHistory(updated);
    setLog("");
    toast.success("Økt loggført!");
  };

  const handleSaveNote = () => {
    toast("Notat lagret");
  };

  const updateUserRole = (index, newRole) => {
    const updated = [...users];
    updated[index].role = newRole;
    setUsers(updated);
    toast.success(`${updated[index].name} sin rolle er nå ${newRole}`);
  };

  const filteredLogs = logHistory.filter((entry) =>
    entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTabsForRole = () => {
    return (
      <Tabs defaultValue="planer" className="w-full max-w-2xl">
        <TabsList>
          <TabsTrigger value="planer">Treningsplaner</TabsTrigger>
          <TabsTrigger value="logg">Loggføring</TabsTrigger>
          <TabsTrigger value="notater">Notater</TabsTrigger>
          {(role === "utøver" || role === "trener") && <TabsTrigger value="historikk">Historikk</TabsTrigger>}
          {role === "administrator" && <TabsTrigger value="brukere">Brukere</TabsTrigger>}
        </TabsList>

        <TabsContent value="planer">
          <h2 className="text-xl font-semibold mb-2">Lag treningsplan</h2>
          <Textarea
            placeholder="Skriv inn treningsplan her..."
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          />
          <Button className="mt-2" onClick={handleSavePlan}>Lagre plan</Button>
        </TabsContent>

        <TabsContent value="logg">
          <h2 className="text-xl font-semibold mb-2">Loggfør økt</h2>
          <Textarea
            placeholder="Beskriv økta du har gjennomført..."
            value={log}
            onChange={(e) => setLog(e.target.value)}
          />
          <Button className="mt-2" onClick={handleSaveLog}>Lagre logg</Button>
        </TabsContent>

        <TabsContent value="notater">
          <h2 className="text-xl font-semibold mb-2">Notater</h2>
          <Textarea
            placeholder="Skriv notater her..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button className="mt-2" onClick={handleSaveNote}>Lagre notat</Button>
        </TabsContent>

        <TabsContent value="historikk">
          <h2 className="text-xl font-semibold mb-2">Tidligere økter</h2>
          <Input
            placeholder="Søk i loggførte økter..."
            className="mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredLogs.length === 0 ? (
            <p>Ingen økter funnet.</p>
          ) : (
            <ul className="space-y-2">
              {filteredLogs.map((entry, i) => (
                <li key={i} className="border rounded p-2">
                  <p className="text-sm text-muted-foreground">{entry.date}</p>
                  <p>{entry.content}</p>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="brukere">
          <h2 className="text-xl font-semibold mb-4">Administrer brukere</h2>
          <div className="space-y-4">
            {users.map((u, i) => (
              <div key={i} className="flex items-center justify-between border rounded p-2">
                <span className="font-medium">{u.name}</span>
                <Select value={u.role} onValueChange={(value) => updateUserRole(i, value)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Velg rolle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrator">Administrator</SelectItem>
                    <SelectItem value="trener">Trener</SelectItem>
                    <SelectItem value="utøver">Utøver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">BryteApp</h1>
      {!user ? (
        <Card className="max-w-md">
          <CardContent className="space-y-4 p-4">
            <p className="text-lg font-semibold">Logg inn som:</p>
            <div className="flex flex-col gap-2">
              <Button onClick={() => handleLogin("administrator")}>Administrator</Button>
              <Button onClick={() => handleLogin("trener")}>Trener</Button>
              <Button onClick={() => handleLogin("utøver")}>Utøver</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div>
            <p className="text-lg">Velkommen, <span className="font-semibold">{user}</span>!</p>
            <p>Du er logget inn som <span className="font-bold">{role}</span>.</p>
          </div>
          {renderTabsForRole()}
        </div>
      )}
    </div>
  );
}