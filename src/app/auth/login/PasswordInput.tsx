import { Input } from "@/components/ui/input";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { forwardRef, InputHTMLAttributes, useState } from "react";

const PasswordInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <Input
        {...props}
        ref={ref}
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Password"
        name="password"
        id="password"
      />
      <EyeOpenIcon
        onClick={() => {
          setIsPasswordVisible((prevState) => !prevState);
        }}
        className="h-5 w-10"
      />
    </>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
