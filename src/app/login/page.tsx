"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { useRef, useState } from "react"

export default function Page() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    function passwordVisibilityToggler() {
        if (passwordInput.current) {
            passwordInput.current.type = isPasswordVisible ? "text" : "password";
            setIsPasswordVisible(!isPasswordVisible)
         }
    }

    return (
        <main className="flex items-center justify-center min-h-screen">
            <Card>
                <CardHeader className="flex items-center justify-center">
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action="" className="flex flex-col gap-2">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Email"/>
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="flex items-center justify-around">
                                <Input type={isPasswordVisible ? "text" : "password"} id="password" placeholder="Password" ref={passwordInput}/>
                                <EyeOpenIcon onClick={passwordVisibilityToggler} className="w-10 h-5"/>
                            </div>
                        </div>
                        <Button>Login</Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}