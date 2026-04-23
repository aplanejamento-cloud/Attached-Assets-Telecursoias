import React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/feed");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="flex-1 bg-primary text-primary-foreground p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-secondary) 0%, transparent 60%)' }} />
        
        <div className="relative z-10 flex items-center gap-2">
          <Flame className="w-8 h-8 text-secondary" />
          <h1 className="text-2xl font-bold tracking-tight">Telecurso IAs</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 my-16 md:my-0"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Sua jornada <br/><span className="text-secondary">AI-First</span> <br/>começa aqui.
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-md">
            Descubra agentes de IA, assista tutoriais e complete missões práticas para dominar as ferramentas do futuro.
          </p>
        </motion.div>

        <div className="relative z-10 flex items-center gap-4 text-sm font-medium text-primary-foreground/60">
          <Sparkles className="w-5 h-5" />
          <span>Aprenda na prática. Domine os agentes.</span>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 bg-background flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-3xl font-bold tracking-tight text-foreground">Bem-vindo(a)</h3>
            <p className="text-muted-foreground">Pronto para evoluir suas habilidades?</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input 
                type="text" 
                placeholder="Qual o seu nome?" 
                className="h-12 bg-muted/50 border-transparent focus-visible:bg-background text-lg"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Iniciar Jornada
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Apenas digite um nome para testar a experiência.
          </p>
        </div>
      </div>
    </div>
  );
}
