import api from "@/lib/api";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import ConfirmPasswordModal from "./ConfirmPasswordModal";
import { toast } from "sonner";

type Session = {
  isCurrentDevice: string;
  ip: string;
  agent: {
    browser: string;
    platform: string;
  };
  lastActive: string;
};

function BrowserSessions() {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [password, setPassword] = useState("");

  function getSessions() {
    api()
      .get("/api/user/sessions")
      .then((response) => {
        setSessions(response.data);
      });
  }

  function logOutAll() {
    api()
      .post("/api/user/sessions/purge", { password })
      .then(() => {
        setConfirming(false);
        getSessions();
        toast.success("Sesiones cerradas correctamente");
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Lista de Sesiones Actuales</h1>
      <div className="space-y-4">
        {sessions === null ? (
          <div className="text-center">Loading...</div>
        ) : (
          sessions.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div className="text-gray-600">{item.ip}</div>
                <div className="text-gray-600">{item.agent.browser}</div>
                <div className="text-gray-500 text-sm">{item.lastActive}</div>
              </div>
            </div>
          ))
        )}
        <Button onClick={() => setConfirming(true)} >
          Cerrar Sesion en otros dispositivos
        </Button>
        {confirming ? (
          <ConfirmPasswordModal
            confirming={true}
            setConfirming={setConfirming}
            onConfirm={() => logOutAll()}
            password={password}
            setPassword={setPassword}
          />
        ) : null}
      </div>
    </div>
  );
}

export default BrowserSessions;
