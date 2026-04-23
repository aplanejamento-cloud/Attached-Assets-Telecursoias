import React from "react";
import { useRoute, Link } from "wouter";
import { 
  useGetIaProfile,
  useListIaVideos,
  useGetIaProgress,
  getGetIaProfileQueryKey,
  getListIaVideosQueryKey,
  getGetIaProgressQueryKey
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Target, Users, BookOpen, Clock } from "lucide-react";

export default function IaProfilePage() {
  const [, params] = useRoute("/ia/:iaId");
  const iaId = params?.iaId || "";

  const { data: profile, isLoading: loadingProfile } = useGetIaProfile(iaId, {
    query: { enabled: !!iaId, queryKey: getGetIaProfileQueryKey(iaId) }
  });

  const { data: videos, isLoading: loadingVideos } = useListIaVideos({ iaId }, {
    query: { enabled: !!iaId, queryKey: getListIaVideosQueryKey({ iaId }) }
  });

  const { data: progress, isLoading: loadingProgress } = useGetIaProgress(iaId, {
    query: { enabled: !!iaId, queryKey: getGetIaProgressQueryKey(iaId) }
  });

  if (loadingProfile) {
    return <div className="space-y-8"><Skeleton className="h-64 w-full rounded-2xl" /></div>;
  }

  if (!profile) {
    return <div className="text-center py-20">IA não encontrada.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-card border shadow-sm">
        {profile.coverUrl && (
          <div className="absolute inset-0 h-48">
            <img src={profile.coverUrl} alt="Cover" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          </div>
        )}
        
        <div className="relative pt-24 px-6 md:px-12 pb-12 flex flex-col md:flex-row gap-8 items-center md:items-end text-center md:text-left">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-muted border-4 border-card shadow-lg overflow-hidden shrink-0 z-10">
            <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-transparent">{profile.category}</Badge>
              <Badge variant={profile.difficulty === 'advanced' ? 'destructive' : profile.difficulty === 'intermediate' ? 'default' : 'secondary'}>
                {profile.difficulty}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{profile.name}</h1>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl">{profile.tagline}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4 text-sm font-medium">
              <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> {profile.followerCount.toLocaleString()} Seguidores</div>
              <div className="flex items-center gap-2"><Play className="w-4 h-4 text-primary" /> {profile.videoCount} Vídeos</div>
              <div className="flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> {profile.missionCount} Missões</div>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-4 shrink-0">
            <Link href={`/missions/${profile.id}`}>
              <Button size="lg" className="w-full text-lg h-14 font-bold shadow-lg hover-elevate">
                <BookOpen className="w-5 h-5 mr-2" />
                Aprender a usar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Progress & Details */}
        <div className="space-y-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Seu Progresso
              </h3>
              
              {loadingProgress ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{progress?.done || 0} de {progress?.total || 0} missões</span>
                    <span className="text-primary">{progress?.percentComplete || 0}%</span>
                  </div>
                  <Progress value={progress?.percentComplete || 0} className="h-3 bg-primary/20" />
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    {progress?.earnedPoints || 0} pontos ganhos
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Sobre {profile.name}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {profile.description}
            </p>
          </div>
        </div>

        {/* Right Column - Videos */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Play className="w-6 h-6 text-primary" /> Vídeos Tutoriais
            </h2>
          </div>

          {loadingVideos ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {videos?.map(video => (
                <Link key={video.id} href={`/video/${video.id}`}>
                  <Card className="group cursor-pointer hover:border-primary/50 transition-all h-full overflow-hidden hover-elevate">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                          <Play className="w-5 h-5 text-white fill-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-medium">
                        {Math.floor(video.durationSeconds / 60)}:{(video.durationSeconds % 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold line-clamp-2 mb-1 group-hover:text-primary transition-colors">{video.title}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(video.publishedAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {videos?.length === 0 && (
                <div className="col-span-2 p-12 text-center bg-muted/30 rounded-xl border border-dashed">
                  <p className="text-muted-foreground">Nenhum vídeo disponível ainda.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
