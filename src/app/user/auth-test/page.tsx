"use client"
import TwoFaLogin from "@/components/auth/TwoFALogin";

export default function Page(){
    return(
        <TwoFaLogin onFail onVerify/>
    )
}