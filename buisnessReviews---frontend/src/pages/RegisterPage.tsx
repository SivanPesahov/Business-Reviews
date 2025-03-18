import { motion } from "framer-motion";
import { useContext, useEffect, useRef } from "react";


import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

import { CircleFadingPlus, User, Mail, Lock, UserPlus } from "lucide-react";
import api from "../services/api.service"; // Import your API service

import { LogIn } from "lucide-react";
import { useAuth } from "../components/AuthProvider";



function RegisterPage() {
  const { register, loggedInUser } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const eMailRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();


  useEffect(() => {
    if (loggedInUser) {
      navigate("/businesses", { replace: true });
    } else {
      console.log("Error registering");
      console.log(
        "Registration failed, please check your details and try again"
      );
    }
  }, [loggedInUser]);

  async function handleRegister(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const userData = {
      username: usernameRef.current!.value,
      password: passwordRef.current!.value,
      firstName: firstNameRef.current!.value,
      lastName: lastNameRef.current!.value,
      email: eMailRef.current!.value,
    };

    try {
      await register(userData);
      console.log("aaa" + loggedInUser);
    } catch (err: any) {
      console.log("TypeError");
      console.log("Something went wrong... please try again");

      console.log(err.name);
    }
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center"
    >
      <Card className="max-w-md mx-auto p-8 shadow-2xl rounded-lg bg-white dark:bg-gray-800">
        <CardHeader className="mb-6">
          <CardTitle className="flex justify-between items-center text-2xl font-semibold text-blue-900 dark:text-blue-300">
            <span>Register</span>
            <CircleFadingPlus
              size={24}
              className="text-blue-500 dark:text-blue-400"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleRegister}>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <User size={20} className="text-gray-500 dark:text-gray-400" />
              <Input 
                ref={usernameRef}
                placeholder="Enter username..."
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <Mail size={20} className="text-gray-500 dark:text-gray-400" />
              <Input
                ref={eMailRef}
                placeholder="Enter email..."
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"
            
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <Lock size={20} className="text-gray-500 dark:text-gray-400" />
              <Input
                ref={passwordRef}
                placeholder="Enter password..."  
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <UserPlus
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <Input
                ref={firstNameRef}
                placeholder="Enter first name..." 
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"

              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md p-2 dark:border-gray-700">
              <UserPlus
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
              <Input
                ref={lastNameRef}
                placeholder="Enter last name..."
                className="flex-1 p-3 bg-transparent border-none dark:bg-gray-700 dark:text-white"
              />
            </div>
            <Button
              type="submit"
              className="py-3 mt-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            >

              Register
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center mt-6">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              className="underline font-bold text-blue-600 dark:text-blue-400"
              to="/auth/login"
            >

              Login
            </Link>
          </p>
        </CardFooter>
      </Card>

    </motion.div>


  );
}

export default RegisterPage;
