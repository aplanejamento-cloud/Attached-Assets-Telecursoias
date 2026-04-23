import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Projetos() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Projetos</h1>
        <p className="text-muted-foreground">Gestão de seus projetos pessoais e IA.</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold">Exemplo de Projeto</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Projeto de testes de IA para profissões futuras.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
