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
import ConfirmPasswordModal from "./ConfirmPasswordModal";

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
}: ConfirmPasswordProps) {
  const [password, setPassword] = useState("");

  function confirm() {
    api().post('/api/user/confirm-password', {password}).then(() => {
        onSuccess()
    }).catch((error) => {
        console.log(error)
        onFail();
    })
  }

  return (
    <ConfirmPasswordModal
      setConfirming={setConfirming}
      confirming={confirming}
      password={password}
      setPassword={setPassword}
      onConfirm={confirm}
    />
  );
}
