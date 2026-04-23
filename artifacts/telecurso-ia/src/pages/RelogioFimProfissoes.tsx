import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function RelogioFimProfissoes() {
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutos em segundos
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setTimeRemaining(300);
    setIsActive(false);
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <Card className="border-2 border-primary">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold">Relógio Fim Profissões</h1>
          <p className="text-muted-foreground mt-2">
            Cronometre o tempo das suas atividades de profissão.
          </p>

          <div className="mt-6 text-center">
            <div className="text-4xl font-bold">
              {minutes < 10 ? '0' + minutes : minutes}:
              {seconds < 10 ? '0' + seconds : seconds}
            </div>

            <div className="flex gap-4 justify-center mt-6">
              {!isActive ? (
                <button
                  onClick={handleStart}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Iniciar
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
                >
                  Pausar
                </button>
              )}
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/90"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4 mt-8">
        <a
          href="/profissoes"
          className="text-primary hover:underline"
        >
          Voltar para Profissões
        </a>
      </div>
    </div>
  );
}
