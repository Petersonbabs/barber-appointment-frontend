import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import Spinner from "@/components/common/Spinner";
import {
    AtSign,
    EyeIcon,
    EyeOff,
    KeySquare,
    LockKeyhole,
    LockKeyholeOpen,
    ShieldQuestion,
    ToggleRight,
    TriangleAlert,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toggler from "../common/Toggler";
import GoogleIcon from "@/components/common/GoogleIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { toast } from "sonner";

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  saveAccount: z.boolean(),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { loginUser, loadingAuth, authMessage, authStatus } =
    useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(()=>{
    if(authMessage){
       if(authStatus == 'error'){
        toast.error(authMessage)
        return
       } else if(authStatus == 'success'){
        toast.success(authMessage)
       }
    }
  }, [authMessage])

  // handle submit
  const onSubmit = (data) => {
    loginUser(data );
    
  };

  return (
    <section className="space-y-8">
      <div className="mb-4">
        <h1 className="text-lg sm:text-3xl font-bold text-darkPurple">
          Hi, Welcome Back!
        </h1>
        <p className="text-customGray text-sm">
          Start booking appointments.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-4">
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <Label className="form-label">Email</Label>
          <div>
            <div
              className={`input-container ${
                errors.email && "border-red-400 rounded-t rounded-none border-2"
              }`}
            >
              <AtSign
                className={`input-icon ${errors.email && "text-red-400"}`}
              />
              <Input
                type="email"
                {...register("email")}
                className="border-none"
                placeholder="johndoe@gmail.com"
              />
            </div>
            {errors.email && (
              <p className="error-paragraph">
                <TriangleAlert className="size-4" />
                <span>{errors.email.message}</span>
              </p>
            )}{" "}
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <Label className="form-label">Password</Label>
          <div
            className={`input-container ${
              errors.password &&
              "border-red-400  rounded-t rounded-none border-2"
            }`}
          >
            <KeySquare
              className={`input-icon ${errors.password && "text-red-400"}`}
            />
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="border-none"
              placeholder="6 characters required"
            />
            {showPassword ? (
              <EyeOff
                className="size-6 font-thin input-icon"
                onClick={handleTogglePassword}
              />
            ) : (
              <EyeIcon
                className="size-6 font-thin input-icon"
                onClick={handleTogglePassword}
              />
            )}
          </div>
          {errors.password && (
              <p className="error-paragraph">
                <TriangleAlert className="size-4" />
                <span>{errors.password.message}</span>
              </p>
            )}{" "}
            {/* Show error */}
        </div>

        <div>
          <div className="flex justify-between items-center my-8 flex-wrap gap-4">
            <div className=" items-center gap-2 hidden">
              <Toggler register={register} rounded={"30px"} />
              <span className="form-label">Keep me signed in</span>
            </div>

            {/* forgot password */}
            <div className="flex items-center ">
              <ShieldQuestion className="input-icon fill-slate-500 text-white " />
              <span className="link-text">Forgot password?</span>
            </div>
          </div>

          <button
            className={`transition ease-in-out delay-150 bg-lightPurple hover:-translate-y-1 hover:scale-105 hover:bg-hover duration-300 py-3  rounded-md ${
              loadingAuth ? "text-gray-200" : "text-white"
            } font-bold py- px-4 rounded flex w-full my-8 justify-center items-center gap-2`}
            disabled={loadingAuth}
          >
            {loadingAuth ? (
              <LockKeyholeOpen className="transition-all size-5" />
            ) : (
              <LockKeyhole className="transition-all size-5" />
            )}
            <span className="text-sm uppercase">Login</span>
            {loadingAuth && <Spinner />}
          </button>
        </div>
      </form>

      <div className="hidden items-center gap-1">
        <div className="h-[1px] bg-[#ccc] flex-1 "></div>
        <span className="text-gray-400 text-sm flex-1 min-w-fit">
          Or, log in with your email.
        </span>
        <div className="h-[1px] bg-[#ccc] flex-1"></div>
      </div>

      <div>
        <Button className=" rounded-md border-2 hover:shadow hover:bg-gray-50 flex items-center gap-2 w-full justify-center">
          <GoogleIcon size={6} />
          <span className="form-label">Sign in with Google</span>
        </Button>
      </div>
    </section>
  );
};

export default LoginForm;
