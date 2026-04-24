import React from "react";

export default function Cadastro() {
  return (
    <div className="min-h-[100dvh] flex flex-col pb-24 md:pb-0 px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cadastro</h1>
      <form className="flex flex-col gap-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Nome
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Digite seu nome"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            E-mail
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="seuemail@exemplo.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Senha
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Digite sua senha"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
