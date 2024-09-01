"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { GlowingButton } from "@/components/ui/glowingButton";

interface FormProps {
  credentials: {
    username: string;
    password: string;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  loading: boolean;
  error: string;
}

const Form: React.FC<FormProps> = ({
  credentials,
  onChange,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      method="POST"
      className="space-y-4 h-fit w-[100%]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }} // Adiciona um delay na animação do formulário
    >
      <motion.div
        className="grid gap-2"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Label htmlFor="username">Usuário:</Label>
        <Input
          type="username"
          id="username"
          name="username"
          value={credentials.username}
          onChange={onChange}
          required
          className="py-5 2xl:p-6 md:text-base  lg:text-lg  2xl:text-xl bg-card"
        />
      </motion.div>
      <motion.div
        className="grid gap-2"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <Label htmlFor="password">Senha:</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
          required
          className="py-5 2xl:p-6 md:text-base  lg:text-lg  2xl:text-xl bg-card"
        />
      </motion.div>{" "}
      <GlowingButton
        onClick={onSubmit} // Garante que o botão envie o formulário
        disabled={loading} // Desabilita o botão durante o carregamento
        loading={loading} // Passa o estado de carregamento para exibir o texto correto
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      ></motion.div>
    </motion.form>
  );
};

export default Form;
