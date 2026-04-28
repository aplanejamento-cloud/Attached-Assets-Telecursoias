import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function IAProfilePage() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const { user } = useAuth();
  const [ia, setIa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`/api/ia/${id}`)
      .then(res => res.json())
      .then(data => {
        setIa(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar perfil de IA:", err);
        setLoading(false);
      });
  }, [id, user, navigate]);

  if (loading) {
    return <div>Carregando perfil de IA...</div>;
  }

  if (!ia) {
    return <div>IA não encontrada.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {ia.nome} ({ia.tipo})
      </h1>

      <p className="mb-4">{ia.descricao}</p>

      <h2 className="text-xl font-semibold mb-4">Vídeos da IA</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ia.videos.map(video => (
          <div key={video.id} className="border rounded-lg p-4 shadow">
            <h3 className="text-lg font-medium mb-2">{video.titulo}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {video.descricao}
            </p>
            <p className="text-xs text-muted-foreground">
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                Ver vídeo
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
