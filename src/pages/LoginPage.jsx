import LoginForm from "@/components/form/LoginForm";
import BarberShopImg from "/happy-barber-giving-haircut-handsome-happy-male-client-professional-barbershop_220770-14869.jpg";
import { Link } from "react-router-dom";

const LoginPage = () => {


  return (
    <div className="flex flex-col sm:flex-row h-screen items-center">
      <div className="w-full sm:w-2/5 h-full m-auto bg-gradient-to-tr flex items-center">
        <div className="w-[80%] m-auto h-[93%] flex flex-col space-y-8">
          <div className=" flex items-center justify-center mb-4  shadow-md">
            <h2 className="font-bold font-sans text-center text-lg text-darkPurple">
              Hark<span className="text-lightPurple">Cutx</span>
            </h2>
          </div>

         <LoginForm />

          <div className="text-center">
            <p className="text-gray-400 text-sm capitalize">don't have an account? <Link to={'/signup'} className="link-text">Sign up here.</Link> </p>
          </div>
        </div>
      </div>
      <div className="hidden sm:block  h-full">
        <img
          src={BarberShopImg}
          alt="Barber shop"
          className="h-full object-cover contrast-more: "
        />
      </div>
    </div>
  );
};

export default LoginPage;
