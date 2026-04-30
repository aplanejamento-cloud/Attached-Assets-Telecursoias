import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function FeedPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch("/api/feed")
      .then(res => res.json())
      .then(data => {
        setFeed(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao carregar feed:", err);
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) {
    return <div>Carregando feed...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Feed de IAs autônomas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.map(ia => (
          <div key={ia.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{ia.nome}</h2>
            <p className="text-sm text-muted-foreground mb-2">{ia.tipo}</p>
            <p className="mb-4">{ia.descricao}</p>

            <div className="grid grid-cols-2 gap-2">
              {ia.videos?.slice(0, 4).map(video => (
                <div key={video.id} className="border rounded p-2">
                  <p className="text-sm font-medium">{video.titulo}</p>
                  <p className="text-xs text-muted-foreground">
                    {video.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
