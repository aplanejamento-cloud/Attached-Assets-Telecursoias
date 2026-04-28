import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function VideoPage() {
  const [, navigate] = useLocation();
  const { id } = useParams();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [ia, setIa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`/api/video/${id}`)
      .then(res => res.json())
      .then(data => {
        setVideo(data);
        setIa(data.ia);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar vídeo:", err);
        setLoading(false);
      });
  }, [id, user, navigate]);

  if (loading) {
    return <div>Carregando vídeo...</div>;
  }

  if (!video) {
    return <div>Vídeo não encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{video.titulo}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {ia ? `${ia.nome} (${ia.tipo})` : "IA não encontrada"}
      </p>

      <div className="aspect-video max-w-4xl mx-auto mb-6 bg-gray-900 rounded-lg overflow-hidden">
        <iframe
          src={video.url}
          title={video.titulo}
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      <p className="mb-4">{video.descricao}</p>
    </div>
  );
}
