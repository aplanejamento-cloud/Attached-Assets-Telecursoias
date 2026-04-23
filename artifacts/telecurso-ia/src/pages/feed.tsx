import React, { useState } from "react";
import { Link } from "wouter";
import { 
  useGetOverviewStats, 
  useGetRecentActivity, 
  useListIaProfiles,
  getGetOverviewStatsQueryKey,
  getGetRecentActivityQueryKey,
  getListIaProfilesQueryKey
} from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Flame, Target, PlayCircle, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FeedPage() {
  const { data: stats, isLoading: loadingStats } = useGetOverviewStats({
    query: { queryKey: getGetOverviewStatsQueryKey() }
  });
  
  const { data: activities, isLoading: loadingActivity } = useGetRecentActivity({
    query: { queryKey: getGetRecentActivityQueryKey() }
  });

  const { data: ias, isLoading: loadingIas } = useListIaProfiles(undefined, {
    query: { queryKey: getListIaProfilesQueryKey() }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* Stats Header */}
      <section>
        <h1 className="text-2xl font-bold mb-6">Seu Progresso</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            icon={<Trophy className="w-5 h-5 text-yellow-500" />} 
            label="Pontos" 
            value={stats?.totalPoints} 
            loading={loadingStats} 
          />
          <StatCard 
            icon={<Flame className="w-5 h-5 text-orange-500" />} 
            label="Ofensiva" 
            value={stats ? `${stats.streakDays} dias` : undefined} 
            loading={loadingStats} 
          />
          <StatCard 
            icon={<Target className="w-5 h-5 text-green-500" />} 
            label="Missões" 
            value={stats ? `${stats.completedMissions}/${stats.totalMissions}` : undefined} 
            loading={loadingStats} 
          />
          <StatCard 
            icon={<Star className="w-5 h-5 text-primary" />} 
            label="IAs Descobertas" 
            value={stats?.totalIas} 
            loading={loadingStats} 
          />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed - IA Profiles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Feed de IAs</h2>
            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer">Todos</Badge>
              <Badge variant="outline" className="cursor-pointer">Iniciante</Badge>
              <Badge variant="outline" className="cursor-pointer">Avançado</Badge>
            </div>
          </div>

          {loadingIas ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 w-full rounded-xl" />)}
            </div>
          ) : (
            <div className="grid gap-4">
              {ias?.map((ia, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={ia.id}
                >
                  <Link href={`/ia/${ia.id}`}>
                    <Card className="group cursor-pointer hover:border-primary/50 transition-all hover-elevate">
                      <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                        <div className="w-24 h-24 rounded-2xl bg-muted overflow-hidden shrink-0">
                          <img src={ia.avatarUrl} alt={ia.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{ia.name}</h3>
                            <Badge variant={ia.difficulty === 'advanced' ? 'destructive' : ia.difficulty === 'intermediate' ? 'default' : 'secondary'}>
                              {ia.difficulty}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground font-medium">{ia.tagline}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{ia.description}</p>
                          
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><PlayCircle className="w-4 h-4"/> {ia.videoCount} Vídeos</span>
                            <span className="flex items-center gap-1"><Target className="w-4 h-4"/> {ia.missionCount} Missões</span>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center justify-center bg-primary/10 rounded-full w-10 h-10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
              {ias?.length === 0 && (
                <div className="p-12 text-center bg-muted/30 rounded-xl border border-dashed">
                  <p className="text-muted-foreground">Nenhuma IA encontrada.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Atividade Recente</h2>
          <Card className="bg-card/50 border-none shadow-none">
            <CardContent className="p-0">
              {loadingActivity ? (
                <div className="space-y-4 p-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {activities?.slice(0, 8).map((activity) => (
                    <div key={activity.id} className="p-4 flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-muted overflow-hidden shrink-0 mt-1">
                        <img src={activity.iaAvatarUrl} alt={activity.iaName} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-bold">{activity.action === 'completed' ? 'Concluiu' : 'Iniciou'}</span> a missão
                        </p>
                        <p className="text-sm font-medium text-foreground">{activity.missionTitle}</p>
                        <p className="text-xs text-muted-foreground">em {activity.iaName} • {new Date(activity.at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                  {activities?.length === 0 && (
                    <div className="p-6 text-center">
                      <p className="text-sm text-muted-foreground">Sua jornada começa agora. Explore as IAs ao lado!</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, loading }: { icon: React.ReactNode, label: string, value: React.ReactNode, loading: boolean }) {
  return (
    <Card className="overflow-hidden bg-card/50">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-background shadow-sm flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          {loading ? (
            <Skeleton className="h-6 w-16 mt-1" />
          ) : (
            <p className="text-xl font-bold">{value}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
