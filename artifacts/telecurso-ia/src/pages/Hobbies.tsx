import React from "react";

export default function Hobbies() {
  return (
    <div className="min-h-[100dvh] flex flex-col pb-24 md:pb-0 px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Seus Hobbies</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          "Programar com IA",
          "Assistir tutoriais",
          "Fazer projetos pessoais",
          "Jogar videogames",
          "Ler livros de ficção",
          "Praticar esportes",
          "Fotografia",
          "Música",
          "Cozinhar",
        ].map((hobbie) => (
          <div
            key={hobbie}
            className="border rounded-lg p-4 bg-card hover:bg-muted/50 transition-colors"
          >
            <h3 className="text-lg font-medium mb-1">{hobbie}</h3>
            <p className="text-sm text-muted-foreground">
              Esse hobbie combina com você e pode abrir portas para carreiras futuras.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
