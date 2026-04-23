import React, { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListIaMissions,
  useUpdateMissionStatus,
  useGetIaProfile,
  getListIaMissionsQueryKey,
  getGetIaProfileQueryKey,
  getGetOverviewStatsQueryKey,
  getGetRecentActivityQueryKey,
  getGetIaProgressQueryKey,
  Mission
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle2, Circle, PlayCircle, Trophy, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function MissionsPage() {
  const [, params] = useRoute("/missions/:iaId");
  const iaId = params?.iaId || "";
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: loadingProfile } = useGetIaProfile(iaId, {
    query: { enabled: !!iaId, queryKey: getGetIaProfileQueryKey(iaId) }
  });

  const { data: missions, isLoading: loadingMissions } = useListIaMissions({ iaId }, {
    query: { enabled: !!iaId, queryKey: getListIaMissionsQueryKey({ iaId }) }
  });

  const updateStatus = useUpdateMissionStatus({
    mutation: {
      onSuccess: () => {
        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: getListIaMissionsQueryKey({ iaId }) });
        queryClient.invalidateQueries({ queryKey: getGetIaProgressQueryKey(iaId) });
        queryClient.invalidateQueries({ queryKey: getGetOverviewStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetRecentActivityQueryKey() });
      },
      onError: () => {
        toast({
          title: "Erro",
          description: "Não foi possível atualizar o status da missão.",
          variant: "destructive"
        });
      }
    }
  });

  const handleStatusChange = (mission: Mission, newStatus: "in_progress" | "done") => {
    updateStatus.mutate({
      id: mission.id,
      data: { status: newStatus }
    });

    if (newStatus === "done") {
      toast({
        title: "Missão Concluída!",
        description: `Você ganhou +${mission.rewardPoints} pontos.`,
        className: "bg-green-50 border-green-200 text-green-900"
      });
    } else {
      toast({
        title: "Missão Iniciada",
        description: "Mãos à obra!",
      });
    }
  };

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loadingProfile || loadingMissions) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-32 w-full rounded-2xl" />
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-64 w-full rounded-xl" />)}
      </div>
    );
  }

  if (!profile) return <div className="text-center py-20">IA não encontrada.</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Link href={`/ia/${profile.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar para o perfil
      </Link>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-10 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-20 h-20 rounded-2xl bg-muted overflow-hidden shrink-0">
          <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Trilha: {profile.name}</h1>
          <p className="text-muted-foreground max-w-xl">Complete as missões na ordem para dominar esta IA. Copie os prompts ou códigos, teste na ferramenta oficial e marque como concluído.</p>
        </div>
      </div>

      <div className="space-y-8">
        <AnimatePresence>
          {missions?.sort((a, b) => a.order - b.order).map((mission, index) => {
            const isTodo = mission.status === "todo";
            const isInProgress = mission.status === "in_progress";
            const isDone = mission.status === "done";
            const isLocked = index > 0 && missions[index - 1].status !== "done" && !isDone && !isInProgress;

            return (
              <motion.div 
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden transition-all duration-500 ${
                  isDone ? 'bg-secondary/5 border-secondary/20' : 
                  isInProgress ? 'border-primary shadow-md' : 
                  isLocked ? 'opacity-60 grayscale-[0.5] pointer-events-none' : ''
                }`}>
                  
                  {isDone && (
                    <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground px-4 py-1 rounded-bl-xl font-bold text-sm flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Concluído
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                        isDone ? 'bg-secondary text-secondary-foreground' :
                        isInProgress ? 'bg-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {mission.order}
                      </div>
                      <div className="flex-1 pr-24">
                        <CardTitle className="text-xl mb-2">{mission.title}</CardTitle>
                        <p className="text-muted-foreground text-sm leading-relaxed">{mission.description}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Requisitos */}
                    <div className="bg-muted/30 rounded-xl p-4">
                      <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-muted-foreground">Requisitos</h4>
                      <ul className="space-y-2">
                        {mission.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prompts / Código */}
                    <div className="relative group">
                      <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Material de Apoio
                      </div>
                      <div className="bg-[#1E1E2E] text-[#CDD6F4] p-5 rounded-xl text-sm font-mono whitespace-pre-wrap border border-gray-800 overflow-x-auto relative">
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleCopy(mission.content, mission.id)}
                        >
                          {copiedId === mission.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                        {mission.content}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="bg-muted/10 border-t p-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-yellow-600 font-bold text-sm bg-yellow-500/10 px-3 py-1.5 rounded-full">
                      <Trophy className="w-4 h-4" />
                      +{mission.rewardPoints} pts
                    </div>
                    
                    <div className="flex gap-3">
                      {isTodo && !isLocked && (
                        <Button 
                          onClick={() => handleStatusChange(mission, "in_progress")}
                          className="font-bold bg-primary hover:bg-primary/90"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" /> Iniciar Missão
                        </Button>
                      )}
                      
                      {isInProgress && (
                        <Button 
                          onClick={() => handleStatusChange(mission, "done")}
                          className="font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Marcar como Concluída
                        </Button>
                      )}
                      
                      {isLocked && (
                        <Button variant="outline" disabled>
                          Bloqueado
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {missions?.length === 0 && (
          <div className="p-12 text-center bg-muted/30 rounded-xl border border-dashed">
            <p className="text-muted-foreground">Nenhuma missão disponível para esta IA.</p>
          </div>
        )}
      </div>
    </div>
  );
}
