import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import api from "@/lib/api";

type ConfirmPasswordProps = {
    confirming: boolean
    setConfirming: Dispatch<SetStateAction<boolean>>
    onFail: () => void
    onSuccess: () => void
    sendPasswordToParent: (password: string) => void
}

export default function ConfirmPassword({
  confirming,
  setConfirming,
  onFail,
  onSuccess,
  sendPasswordToParent,
}: ConfirmPasswordProps) {
  const [password, setPassword] = useState("");

  function confirm() {
    api().post('/api/user/confirm-password', {password}).then(() => {
        onSuccess()
        sendPasswordToParent(password);
    }).catch((error) => {
        console.log(error)
        onFail();
    })
  }

  return (
    <Dialog open={confirming} onOpenChange={setConfirming}>
      <DialogContent>
        <DialogHeader></DialogHeader>
        <div>
          <Input
            type="password"
            name="password"
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setConfirming(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={confirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
