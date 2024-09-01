"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation"; // Updated for Next.js 13+ navigation
import axios from "axios";
import RodoTimber from "./RodoTimber";
import RodoApp from "./RodoApp";
import LoginFooter from "./LoginFooter";
import Form from "./Form";
import Image from "next/image";
import pic from "./login.png";
import { motion } from "framer-motion";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // For navigation

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sending the request to your server-side API route for authentication
      const response = await axios.post("/api/login", credentials, {
        headers: { "Content-Type": "application/json" },
      });

      const token = response.data.token;
      const username = credentials.username;

      // Save the token in cookies and the username and token in localStorage
      Cookies.set("token", token, { expires: 1 }); // Save the token in cookies (expires in 1 day)
      localStorage.setItem("username", username); // Save the username in localStorage
      localStorage.setItem("token", token); // Save the token in localStorage

      // Redirect the user to the protected page
      router.push("/inicio");
    } catch (err) {
      setError("O Login falhou, verifique seu login ou senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="absolute flex items-center justify-center min-h-screen max-w-screen max-h-screen overflow-hidden">
      <motion.div
        className="z-30 max-w-[55%] border shadow-2xl shadow-blue-950 bg-black/40 backdrop-blur-2xl flex flex-col lg:flex-row space-between rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full lg:w-1/2 xl:w-2/3 2xl:w-3/5 flex flex-col justify-between items-center p-6 lg:p-10 2xl:p-14">
          <CardHeader>
            <RodoTimber />
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center space-y-3 w-full xl:w-3/4 2xl:space-y-10">
            <CardTitle>
              <RodoApp />
            </CardTitle>
            <CardDescription className="text-center w-full xl:text-xl 2xl:text-2xl">
              Bem vindo ao RodoApp. Acesse utilizando seu login do Protheus:
            </CardDescription>
            <Form
              onSubmit={onSubmit}
              credentials={credentials}
              onChange={onChange}
              loading={loading}
              error={error}
            />
          </CardContent>
          <CardFooter>
            <LoginFooter />
          </CardFooter>
        </div>
        <motion.div
          className="w-full lg:w-2/3 rounded-xl hidden lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.2 }}
        >
          <Image
            src={pic}
            alt="Avião"
            className="bg-cover w-full h-full max-h-100%"
          />
        </motion.div>
      </motion.div>

      <ShootingStars />
      <StarsBackground />

    </header>
  );
};

export default LoginPage;
