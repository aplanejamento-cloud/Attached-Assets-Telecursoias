import React from "react";
import { Input } from "@/components/ui/input";

export default function Profissoes() {
  return (
    <div className="min-h-[100dvh] flex flex-col pb-24 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold">Profissões</h1>
        <Input
          type="text"
          placeholder="Buscar profissão..."
          className="max-w-xs"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          "Engenheiro de IA",
          "Desenvolvedor de Softwares",
          "Designer de IAs",
          "Especialista em Dados",
          "Consultor de IA",
          "Especialista em Segurança Cibernética",
          "Analista de Big Data",
          "Desenvolvedor de Machine Learning",
          "Produtores de Conteúdo com IA",
          "CEO de IA",
        ].map((profissao) => (
          <div
            key={profissao}
            className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <h3 className="text-lg font-medium mb-1">{profissao}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {profissao === "Engenheiro de IA"
                ? "Desenvolve e mantém agentes de IA como o que você está usando."
                : profissao === "Desenvolvedor de Softwares"
                ? "Cria sistemas para diversas áreas com IA integrada."
                : "Descubra mais sobre esta profissão com promotores de IA."}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="i-heroicons-fire-solid h-4 w-4 text-primary" />
              Recomendado
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
