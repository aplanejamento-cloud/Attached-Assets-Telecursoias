import React, { useEffect, useState } from 'react';
import { useNavigate } from 'wouter';  // ou useNavigate do react-router, se você usar
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Profissoes() {
  const [profissoes, setProfissoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/profissoes')  // ou URL do servidor Backend
      .then(res => res.json())
      .then(data => {
        setProfissoes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar profissões:', err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProfissoes = profissoes.filter(profissao =>
    profissao.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Profissões</h1>
        <Input
          type="text"
          placeholder="Buscar profissão..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/3 h-10"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfissoes.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground">
              Nenhuma profissão encontrada.
            </div>
          ) : (
            filteredProfissoes.map(profissao => (
              <Card
                key={profissao.id}
                className="hover:border-primary/50 cursor-pointer hover-elevate"
              >
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{profissao.nome}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {profissao.descricao}
                  </p>
                  <Link
                    to={`/profissao/${profissao.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-4"
                  >
                    Ver cursos de IA
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
