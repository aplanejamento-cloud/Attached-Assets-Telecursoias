import React from "react";
import { useRoute, Link } from "wouter";
import { 
  useGetIaVideo,
  useListIaVideos,
  getGetIaVideoQueryKey,
  getListIaVideosQueryKey
} from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Eye, Play } from "lucide-react";

export default function VideoPage() {
  const [, params] = useRoute("/video/:videoId");
  const videoId = params?.videoId || "";

  const { data: video, isLoading: loadingVideo } = useGetIaVideo(videoId, {
    query: { enabled: !!videoId, queryKey: getGetIaVideoQueryKey(videoId) }
  });

  const iaId = video?.iaId || "";
  
  const { data: relatedVideos, isLoading: loadingRelated } = useListIaVideos({ iaId }, {
    query: { enabled: !!iaId, queryKey: getListIaVideosQueryKey({ iaId }) }
  });

  if (loadingVideo) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Skeleton className="aspect-video w-full rounded-2xl" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!video) {
    return <div className="text-center py-20">Vídeo não encontrado.</div>;
  }

  const otherVideos = relatedVideos?.filter(v => v.id !== video.id) || [];

  return (
    <div className="max-w-6xl mx-auto">
      <Link href={`/ia/${video.iaId}`} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar para {video.iaName}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content - Video & Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden bg-black aspect-video border shadow-lg">
            <video 
              src={video.videoUrl} 
              poster={video.thumbnailUrl}
              controls 
              className="w-full h-full object-contain"
              autoPlay
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Link href={`/ia/${video.iaId}`}>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent cursor-pointer">
                  {video.iaName}
                </Badge>
              </Link>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold">{video.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-4 border-b">
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {video.views.toLocaleString()} visualizações</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(video.publishedAt).toLocaleDateString()}</span>
            </div>

            <div className="pt-2">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {video.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar - Related Videos */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg px-1">Mais vídeos de {video.iaName}</h3>
          
          {loadingRelated ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {otherVideos.map(v => (
                <Link key={v.id} href={`/video/${v.id}`}>
                  <Card className="group cursor-pointer hover:bg-muted/50 border-transparent shadow-none transition-colors">
                    <CardContent className="p-2 flex gap-3">
                      <div className="w-32 aspect-video rounded-md bg-muted overflow-hidden relative shrink-0">
                        <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded font-medium">
                          {Math.floor(v.durationSeconds / 60)}:{(v.durationSeconds % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="font-bold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">{v.title}</h4>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {otherVideos.length === 0 && (
                <p className="text-sm text-muted-foreground italic px-1">Nenhum outro vídeo disponível.</p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
