import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import api from "@/lib/api";

type TwoFALoginProps = {
  onVerify: () => void
  onFail: () => void
}

type TwoFAData = {
  recovery_code?: string
  code?: string
}

export default function TwoFaLogin({ onVerify, onFail }: TwoFALoginProps) {
  const [code, setCode] = useState("");
  const [recoveryCode, setRecoveryCode] = useState('');
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);

  function verify(){
    const data = {} as TwoFAData;

    if(useRecoveryCode){
      data.recovery_code = recoveryCode
    }else{
      data.code = code
    }

    //api two factor
    api().post('/api/two-factor-challenge', data).then(() => {
      onVerify()
    }).catch((error) => {
      console.log(error)
      onFail()
    })
  }

  return (
    <div>
      <span>{`Ingrese el ${useRecoveryCode ? "Alterno" : ""} Codigo`}</span>
      {useRecoveryCode ? (
        <Input type="text" value={recoveryCode} onInput={(e) => setRecoveryCode((e.target as HTMLInputElement).value)} />
      ) : (
        <InputOTP
          value={code}
          onChange={(code) => setCode(code)}
          maxLength={6}
          render={({ slots }) => (
            <>
              <InputOTPGroup>
                {slots.slice(0, 3).map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}{" "}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {slots.slice(3).map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}
              </InputOTPGroup>
            </>
          )}
        />
      )}
      <Label htmlFor="recovery-code-checkbox">Codigo Alterno</Label>
      <Checkbox
        id="recovery-code-checkbox"
        onCheckedChange={() => {
          setUseRecoveryCode(!useRecoveryCode);
        }}
      />
      <Button onClick={verify} >Verificar</Button>
    </div>
  );
}
