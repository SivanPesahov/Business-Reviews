
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";



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
import { SendHorizontal } from "lucide-react";
import { useAuth } from "../components/AuthProvider";
import api from "../services/api.service";
import axios from "axios";
import { Send } from "lucide-react";

// Define the User interface with all necessary fields
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

// Define the LoginResponse interface
interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username?: string;
  };
}

function LoginPage() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const userData = {
      username: userNameRef.current!.value,
      password: passwordRef.current!.value,
    };


    try {
      await login(userData);
      navigate("/businesses", { replace: true });
    } catch (err) {
      console.log("TypeError");
      console.log(err);
    }
  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center"
    >
      <Card className="max-w-md mx-auto p-8 shadow-lg rounded-lg bg-white dark:bg-gray-800">
        <CardHeader className="mb-6">
          <CardTitle className="flex justify-between items-center text-2xl font-semibold text-blue-900 dark:text-blue-300">
            <span>Login</span> <Send />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-lg font-medium">
                Username:
              </Label>
              <Input
                ref={userNameRef}
                
                placeholder="Enter username..."
          
                className="p-3 border rounded-md dark:bg-gray-700 dark:text-white"
                
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-lg font-medium">
                Password:
              </Label>
              <Input
               ref={passwordRef}
                placeholder="Enter password..."
              
               
                className="p-3 border rounded-md dark:bg-gray-700 dark:text-white"

              />
            </div>
            <Button
              type="submit"
              className="py-3 mt-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              className="underline font-semibold text-blue-600 dark:text-blue-400"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>

  );
}

export default LoginPage;
