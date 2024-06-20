"use client";

import BrowserSessions from "@/components/auth/BrowserSessions";
import Disable2FA from "@/components/auth/Disable2FA";
import Enable2FA from "@/components/auth/Enable2FA";
import { ScrollArea } from "@/components/ui/scroll-area";
import PasswordReset from "@/components/user/password-reset";
import ProfileInfo from "@/components/user/profile-info";
import withAuth from "@/hocs/withAuth";
import api from "@/lib/api";
import { useEffect, useState } from "react";

function Page() {
  const [twoFactorAuthEnable, setTwoFactorAuthEnable] = useState(false);
  const [user, setUser] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  useEffect(() => {
    api()
      .get("/api/me")
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data);
        setTwoFactorAuthEnable(!!response.data.data.has2FA);
        if (response.data.data.google_id) {
          setShowTwoFactor(false);
        } else {
          setShowTwoFactor(true);
        }
      });
  }, []);

  return (
    <ScrollArea className="h-full">
      <h1>Ajustes de la Cuenta</h1>
      {showTwoFactor ? (
        <p>
          La autenticacion de dos factores esta : {twoFactorAuthEnable ? "Habilitada" : "Deshabilitada"}
        </p>
      ) : (
        ""
      )}
      {twoFactorAuthEnable && showTwoFactor ? (
        <Disable2FA
          onSuccess={() => {
            setTwoFactorAuthEnable(false);
          }}
        />
      ) : showTwoFactor ? (
        <Enable2FA
          onSuccess={() => {
            setTwoFactorAuthEnable(true);
          }}
        />
      ) : (
        ""
      )}
      <main className="flex flex-wrap justify-center gap-6 p-6">
        <div className="flex-1">
          <ProfileInfo user={user} />
        </div>
        <div className="flex-1">
          <PasswordReset />
        </div>
        <div className="flex-1">
          <BrowserSessions />
        </div>
      </main>
    </ScrollArea>
  );
}
export default withAuth(Page);
