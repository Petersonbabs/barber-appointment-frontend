import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BarberShopImg from "/happy-barber-giving-haircut-handsome-happy-male-client-professional-barbershop_220770-14869.jpg";
import { TypographyH2 } from "@/components/ui/headingTwo";
import { Label } from "@/components/ui/label";
import "./auth.css";

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), // Use Zod schema for validation
  });

  // Mock login handler
  const onSubmit = (data) => {
    console.log("Login Successful:", data);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen items-center">
      <div className="w-full sm:w-2/4  m-auto">
        <div className="w-[80%] m-auto">
          <TypographyH2 text={"Hey there..."} />
          <p className="text-dark-700">Login to book an apointment</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 border flex-1 space-y-12">
            {/* Email Field */}
            <div>
              <Label className="mb-2 sm:text-lg shad-input-label">Email</Label>
              <input type="email" {...register("email")} className="w-full text-input  border-0" />
              {errors.email && <p>{errors.email.message}</p>} {/* Show error */}
            </div>

            {/* Password Field */}
            <div>
              <label>Password</label>
              <input
                type="password"
                {...register("password")} // Register input with react-hook-form
              />
              {errors.password && <p>{errors.password.message}</p>}{" "}
              {/* Show error */}
            </div>

            {/* Submit Button */}
            <button type="submit">Login</button>
          </form>
          <p className="copyright py-12">© 2024 PerfectHaircuts</p>
        </div>
      </div>
      <div className="w-full hidden sm:block sm:w-2/4 h-full">
        <img
          src={BarberShopImg}
          alt="Barber shop"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginForm;
