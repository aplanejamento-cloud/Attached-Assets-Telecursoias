import React, { useState } from "react";
import { Link, useNavigate } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { login, loginGoogle, register, loading } = useAuth();
  const navigate = useNavigate();

  const [formMode, setFormMode] = useState<"login" | "cadastro">("login");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [whatsapp, setWhatsApp] = useState("");
  const [email, setEmail] = useState("");
  const [profissao, setProfissao] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/feed");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register({
        nome,
        sobrenome,
        whatsapp,
        email,
        profissao,
        password,
      });
      navigate("/feed");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    setError("");
    // Aqui vai integrar com Google Auth real
    loginGoogle("usuario@email.com", "Nome", "Sobrenome");
    navigate("/feed");
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-6">
        {formMode === "login"
          ? "Entrar no Telecurso IAs"
          : "Cadastrar-se no Telecurso IAs"}
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {formMode === "login" ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">E‑mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setFormMode("cadastro")}
              className="text-primary underline"
            >
              Criar conta
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleCadastro} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="João"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Sobrenome
              </label>
              <Input
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
                placeholder="Silva"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              WhatsApp
            </label>
            <Input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsApp(e.target.value)}
              placeholder="(11) 99999‑9999"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E‑mail</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Profissão
            </label>
            <select
              className="w-full p-2 rounded border bg-background text-foreground"
              value={profissao}
              onChange={(e) => setProfissao(e.target.value)}
            >
              <option value="">Escolha sua profissão</option>
              <option value="pedreiro">Pedreiro</option>
              <option value="medico">Médico</option>
              <option value="engenheiro">Engenheiro</option>
              <option value="programador">Programador</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full">
            Criar conta
          </Button>
          <div className="text-center text-sm">
            <button
              type="button"
              onClick={() => setFormMode("login")}
              className="text-primary underline"
            >
              Já tenho conta
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full"
        >
          Continuar com Google
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Ao usar o Google, você também aceita nossos termos de uso.
        </p>
      </div>
    </div>
  );
}
