'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react'

export default function VslPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const isLogged = localStorage.getItem('mentoria_logged')
    if (!isLogged) {
      router.push('/')
    }
  }, [router])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setProgress((video.currentTime / video.duration) * 100)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
      setHasStarted(true)
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    video.currentTime = pos * video.duration
  }

  const restart = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = 0
    video.play()
    setIsPlaying(true)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Esconde controles após 3 segundos de inatividade
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const hideControls = () => {
      if (isPlaying) {
        timeout = setTimeout(() => setShowControls(false), 3000)
      }
    }

    hideControls()

    return () => clearTimeout(timeout)
  }, [isPlaying, showControls])

  const handleMouseMove = () => {
    setShowControls(true)
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="bg-pattern opacity-30" />

      <div className="max-w-5xl mx-auto px-5 py-10">
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/membro')}
            className="w-12 h-12 border border-[var(--gold)]/30 rounded-full flex items-center justify-center hover:border-[var(--gold)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--gold)]" />
          </button>
          <div>
            <h1 className="font-display text-xl sm:text-2xl gold-text">Conteúdo Exclusivo</h1>
            <p className="text-[var(--gray)] text-sm">Assista com atenção</p>
          </div>
        </header>

        {/* Video Container */}
        <section className="mb-8">
          <div
            className="relative rounded-2xl overflow-hidden border-2 border-[var(--gold)]/30 bg-black"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            {/* Video wrapper com overflow hidden para cortar a logo */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  // Expande o vídeo um pouco para cortar as bordas
                  margin: '-2%',
                  width: '104%',
                  height: '104%'
                }}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    // Escala o vídeo para esconder as bordas com a logo
                    transform: 'scale(1.08)',
                    transformOrigin: 'center center'
                  }}
                >
                  <source src="/vsl-video.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>

              {/* Overlay gradiente no canto inferior direito para garantir */}
              <div
                className="absolute bottom-0 right-0 w-32 h-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.9) 100%)'
                }}
              />

              {/* Overlay para clicar e pausar/play */}
              <div
                className="absolute inset-0 cursor-pointer z-10"
                onClick={togglePlay}
              />

              {/* Play button central quando pausado */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--gold)] rounded-full flex items-center justify-center shadow-2xl cursor-pointer pointer-events-auto hover:scale-110 transition-transform"
                    onClick={togglePlay}
                  >
                    <Play className="w-10 h-10 sm:w-12 sm:h-12 text-black ml-1" />
                  </div>
                </div>
              )}

              {/* Controles customizados */}
              <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 z-30 transition-opacity duration-300 ${
                  showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* Barra de progresso */}
                <div
                  className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer group"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-[var(--gold)] rounded-full relative transition-all"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--gold)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Botões de controle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-[var(--gold)] transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </button>

                    {/* Restart */}
                    <button
                      onClick={restart}
                      className="text-white hover:text-[var(--gold)] transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>

                    {/* Mute/Unmute */}
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-[var(--gold)] transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-6 h-6" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </button>

                    {/* Tempo */}
                    <span className="text-white/70 text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso anti-screenshot */}
          <div className="mt-4 text-center">
            <p className="text-[var(--gray)] text-xs">
              Conteúdo exclusivo para membros da Mentoria Elite
            </p>
          </div>
        </section>

        {/* Mensagem abaixo do vídeo */}
        <section className="glass p-6 sm:p-8 text-center">
          <h2 className="font-display text-xl sm:text-2xl mb-4">
            Assista o vídeo <span className="gold-text">completo</span>
          </h2>
          <p className="text-[var(--gray)]">
            Este conteúdo foi preparado especialmente para você.
            Assista até o final para absorver todo o conhecimento.
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 mt-8 border-t border-[var(--gold)]/20">
          <p className="text-[var(--gray)] text-sm">
            Mentoria Elite &copy; 2026 - Conteúdo Exclusivo
          </p>
        </footer>
      </div>
    </main>
  )
}
