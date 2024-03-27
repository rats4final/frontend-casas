import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email()
})

export default function Page() {
  const [emailSent, setEmailSent] = useState(false);
  const form = useForm()

  return (
    <div>
      <Input type="email"/>
      <Button type="submit">Reset</Button>
    </div>
  )
}
