"use client";

import Disable2FA from "@/components/auth/Disable2FA";
import Enable2FA from "@/components/auth/Enable2FA";
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
    <main>
      <h1>Account Settings</h1>
      {showTwoFactor ? (
        <p>
          Two Factor Auth is: {twoFactorAuthEnable ? "Enabled" : "Disabled"}
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

    <ProfileInfo user={user}/>
    <hr />
    <PasswordReset/>
    </main>
  );
}
export default withAuth(Page);
