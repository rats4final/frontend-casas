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
        toast.success("Sessions Logged Out Succesfully");
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div>
      <h1>Logged In Sessions</h1>
      <div>
        {sessions === null
          ? "Loading"
          : sessions.map((item, index) => (
              <div key={index}>
                <div>
                  <div>{item.ip}</div>
                  <div>{item.agent.browser}</div>
                  <div>{item.lastActive}</div>
                </div>
              </div>
            ))}
        <Button onClick={() => setConfirming(true)}>Log Out All Devices</Button>
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
