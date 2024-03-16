"use client";

import Disable2FA from "@/components/auth/Disable2FA";
import Enable2FA from "@/components/auth/Enable2FA";
import withAuth from "@/hocs/withAuth";
import api from "@/lib/api";
import { useEffect, useState } from "react";

function Page() {
  const [twoFactorAuthEnable, setTwoFactorAuthEnable] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api()
      .get("/api/me")
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data);
        setTwoFactorAuthEnable(!!response.data.data.has2FA);
      });
  }, []);

  return (
    <main>
      <h1>Account Settings</h1>
      <p>Two Factor Auth is: {twoFactorAuthEnable ? "Enabled" : "Disabled"}</p>
      {twoFactorAuthEnable ? (
        <Disable2FA
          onSuccess={() => {
            setTwoFactorAuthEnable(false);
          }}
        />
      ) : (
        <Enable2FA
          onSuccess={() => {
            setTwoFactorAuthEnable(true);
          }}
        />
      )}
    </main>
  );
}
export default withAuth(Page);
