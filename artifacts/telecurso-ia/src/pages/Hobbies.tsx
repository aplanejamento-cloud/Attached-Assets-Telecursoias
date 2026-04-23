import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Hobbies() {
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/hobbies')  // ou URL do backend
      .then(res => res.json())
      .then(data => {
        setHobbies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar hobbies:', err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredHobbies = hobbies.filter(hobby =>
    hobby.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Hobbies</h1>
        <input
          type="text"
          placeholder="Buscar hobby..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/3 h-10 px-3 border rounded-md"
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
          {filteredHobbies.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground">
              Nenhum hobby encontrado.
            </div>
          ) : (
            filteredHobbies.map(hobby => (
              <Card
                key={hobby.id}
                className="hover:border-primary/50 cursor-pointer"
              >
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold">{hobby.nome}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {hobby.descricao}
                  </p>
                  <a
                    href={`/hobby/${hobby.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-4"
                  >
                    Ver cursos de IA
                  </a>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
