import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
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
    api().post('/api/user/two-factor-authentication').then(() => {

        api().get('/api/user/two-factor-qr-code').then(({data}) => {
            setQrCode(data.svg)
        })

        api().get('/api/user/two-factor-recovery-codes').then(({data}) => {
            setRecoveryCodes(data)
        })

        setConfirming(false);
        setTwoFAEnabled(true);
    }).catch((error) => {
        if(error.response.status === 423){
            setConfirming(true);
        }
    })
  }

  return (
    <>
      <Button onClick={enable}>Enable</Button>
      <Dialog open={twoFAEnabled}>
        <DialogContent>
          <DialogHeader></DialogHeader>
          <div>
            <div>
              {qrCode && <span dangerouslySetInnerHTML={{ __html: qrCode }} />}
            </div>
            <div>
              <p>Recovery Codes</p>
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
              Close
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
