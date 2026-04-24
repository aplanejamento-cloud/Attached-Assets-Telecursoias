import React from "react";
import { Link, useLocation } from "wouter";
import {
  Search,
  Compass,
  BookOpen,
  Flame,
  User,
  Target,
  MapPin,
  Lightbulb,
  Puzzle,
  Film,
  ChartBar,
  Lock,
  Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const isLoginPage = location === "/login" || location === "/";

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link
            href="/feed"
            className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight"
          >
            <Flame className="w-6 h-6" />
            <span>Telecurso IAs</span>
          </Link>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar missões ou IAs..."
                className="w-full pl-10 bg-muted/50 border-transparent focus-visible:bg-background transition-all"
              />
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href="/feed"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === "/feed" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Feed
            </Link>
            <Link
              href="/profissoes"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === "/profissoes" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Profissões
            </Link>
            <Link
              href="/hobbies"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === "/hobbies" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Hobbies
            </Link>
            <Link
              href="/projetos"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === "/projetos" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Projetos
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full border-t bg-card flex justify-around p-3 pb-safe z-50">
        <Link
          href="/feed"
          className={`flex flex-col items-center gap-1 ${
            location === "/feed" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium">Descobrir</span>
        </Link>
        <Link
          href="/profissoes"
          className={`flex flex-col items-center gap-1 ${
            location === "/profissoes" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Target className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profissões</span>
        </Link>
        <Link
          href="/hobbies"
          className={`flex flex-col items-center gap-1 ${
            location === "/hobbies" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Lightbulb className="w-5 h-5" />
          <span className="text-[10px] font-medium">Hobbies</span>
        </Link>
        <Link
          href="/projetos"
          className={`flex flex-col items-center gap-1 ${
            location === "/projetos" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Puzzle className="w-5 h-5" />
          <span className="text-[10px] font-medium">Projetos</span>
        </Link>
        <Link
          href="/relogio-fim-profissoes"
          className={`flex flex-col items-center gap-1 ${
            location === "/relogio-fim-profissoes" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-medium">Relógio</span>
        </Link>
        <Link
          href="/cryptos"
          className={`flex flex-col items-center gap-1 ${
            location === "/cryptos" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <ChartBar className="w-5 h-5" />
          <span className="text-[10px] font-medium">Cryptos</span>
        </Link>
        <Link
          href="/cadastro"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <Lock className="w-5 h-5" />
          <span className="text-[10px] font-medium">Cadastro</span>
        </Link>
      </nav>
    </div>
  );
}
