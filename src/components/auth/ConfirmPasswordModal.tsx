import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type ConfirmPasswordModalProps = {
  setConfirming: Dispatch<SetStateAction<boolean>>;
  confirming: boolean;
  password: string;
  setPassword: (inputElement:string) => void;
  onConfirm: () => void;
};

function ConfirmPasswordModal({
  confirming,
  setPassword,
  password,
  setConfirming,
  onConfirm,
}: ConfirmPasswordModalProps) {
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
          <Button onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmPasswordModal;
