import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BarberShopImg from "/happy-barber-giving-haircut-handsome-happy-male-client-professional-barbershop_220770-14869.jpg";
import Video from "/barbing.mp4";
import { TypographyH2 } from "@/components/ui/headingTwo";
import { Label } from "@/components/ui/label";
import "./auth.css";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { useToast} from "@/hooks/use-toast";
import {toast} from 'sonner'

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), // Use Zod schema for validation
  });
  // const { toast } = useToast();
  useEffect(()=>{
    toast.error('This is a messageThis is a message', {position: 'top-right', invert: true})
  }, [])

  

  const {registerUser, accessToken, loadingAuth, authMessage} = useAuthContext()

  // Mock login handler
  const onSubmit = (data) => {
    registerUser({name: 'test test', ...data  })
    toast.info('login...')
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen items-center ">

      <video
        src={Video}
        controls={false}
        autoPlay
        muted
        loop
        className="background-vid w-full left-0"
      ></video>
      <div className="w-full sm:w-2/4  m-auto bg-gradient-to-tr">
        <div className="w-[80%] m-auto">
          <TypographyH2 text={"Hey there..."} />
          <p className="text-dark-700">Login to book an apointment</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex-1 space-y-4"
          >
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <Label className="mb-2 sm:text-lg shad-input-label">Email</Label>
              <Input
                type="email"
                {...register("email")}
                className="w-full text-input bg-gray-900"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}{" "}
            </div>

            {/* Password Field */}
            <div>
            <Label className="mb-2 sm:text-lg shad-input-label">Password</Label>
              <Input
                type="password"
                {...register("password")}
                className="w-full text-input bg-gray-900"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}{" "}
              {/* Show error */}
            </div>

  
            <button className={`transition ease-in-out delay-150 bg-[#201A59] hover:-translate-y-1 hover:scale-110 hover:bg-[#120e35] duration-300 ${loadingAuth ? 'text-gray-600' : 'text-white'} font-bold py-2 px-4 rounded flex w-full my-8 justify-center items-center gap-4`}  disabled={loadingAuth}>
              Login
              {
                loadingAuth && <Spinner />
              }
            </button>
          </form>
          <p className="copyright py-12">© 2024 PerfectHaircuts</p>
        </div>
      </div>
      <div className="w-full hidden sm:block sm:w-2/4 h-full">
        <img
          src={BarberShopImg}
          alt="Barber shop"
          className="h-full object-cover contrast-more: "
        />
      </div>
    </div>
  );
};

export default Login;
