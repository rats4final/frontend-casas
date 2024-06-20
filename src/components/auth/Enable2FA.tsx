import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ConfirmPassword from "./ConfirmPassword";
import api from "@/lib/api";

type Enable2FAProps = {
  onSuccess: () => void;
};

export default function Enable2FA({ onSuccess }: Enable2FAProps) {
  const [confirming, setConfirming] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState([]);

  function enable() {
    api()
      .post("/api/user/two-factor-authentication")
      .then(() => {
        api()
          .get("/api/user/two-factor-qr-code")
          .then(({ data }) => {
            setQrCode(data.svg);
          });

        api()
          .get("/api/user/two-factor-recovery-codes")
          .then(({ data }) => {
            setRecoveryCodes(data);
          });

        setConfirming(false);
        setTwoFAEnabled(true);
      })
      .catch((error) => {
        if (error.response.status === 423) {
          setConfirming(true);
        }
      });
  }

  return (
    <>
      <Button onClick={enable}>Habilitar</Button>
      <Dialog open={twoFAEnabled} onOpenChange={setTwoFAEnabled}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Datos de la Autentificacion en Dos Factores</DialogTitle>
            <DialogDescription>
              Usa estos codigos para recuperar acceso si pierder tu celular o no puedes 
              acceder a los codigos OTP. Guarda estos codigos en un lugar seguro
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-evenly">
            <div>
              {qrCode && <span dangerouslySetInnerHTML={{ __html: qrCode }} />}
            </div>
            <div>
              <p>Codigos de Recuperacion</p>
              <div>
                {recoveryCodes.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setTwoFAEnabled(false);
                onSuccess();
              }}
            >
              Confirmar Habilitacion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {confirming ? (
        <ConfirmPassword
          confirming={true}
          setConfirming={setConfirming}
          onSuccess={enable}
          onFail={() => {
            alert("Failed to confirm password");
          }}
        />
      ) : null}
    </>
  );
}
