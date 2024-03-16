import { useState } from "react";
import { Button } from "../ui/button";
import ConfirmPassword from "./ConfirmPassword";
import api from "@/lib/api";

type Disable2FAProps = {
    onSuccess: () => void
}

export default function Disable2FA({onSuccess}:Disable2FAProps){
    const [confirming, setConfirming] = useState(false);

    function disable(){
        api().delete('/api/user/two-factor-authentication').then(() => {
            onSuccess()
        }).catch((error) => {
            if (error.response.status === 423) {
                setConfirming(true);
            }
        })
    }

    return(
        <>
            <Button onClick={disable}>Disable</Button>
            {confirming ? (
                <ConfirmPassword
                    confirming={true}
                    setConfirming={setConfirming}
                    onFail={() => {
                        alert('Failed to confirm password')
                    }}
                    onSuccess={disable}
                />
            ): null}
        </>
    )
}