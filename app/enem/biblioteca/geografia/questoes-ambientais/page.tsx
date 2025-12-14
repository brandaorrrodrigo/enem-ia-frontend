'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, CheckCircle2, Brain, Target } from 'lucide-react'
import { MicroQuiz } from '@/components/MicroQuiz'

export default function QuestoesAmbientaisPage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setScrollProgress(progress)

      // Mostrar quiz quando rolar 80% da página
      if (progress > 80 && !showQuiz) {
        setShowQuiz(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showQuiz])

  const questoes = []

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 text-white">
      {/* Barra de progresso */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/enem/biblioteca"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Voltar para Biblioteca</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <BookOpen className="w-4 h-4" />
              <span>{Math.round(scrollProgress)}% concluído</span>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Título */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Questões ambientais
          </h1>
          <div className="flex items-center gap-2 text-white/60">
            <Target className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">Biblioteca ENEM PRO</span>
          </div>
        </div>

        {/* Visão Geral */}
        <section className="mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-#059669/20 rounded-lg">
                <BookOpen className="w-6 h-6 text-#059669" style={{ color: '#059669' }} />
              </div>
              <h2 className="text-2xl font-bold">Visão Geral</h2>
            </div>
            <p className="text-white/80 leading-relaxed text-lg">
              
            </p>
          </div>
        </section>

        {/* Tópicos-Chave */}
        <section className="mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold">Tópicos-Chave</h2>
            </div>
            <ul className="space-y-3">
              
            </ul>
          </div>
        </section>

        {/* Explicação */}
        <section className="mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Explicação Detalhada</h2>
            <p className="text-white/80 leading-relaxed text-lg">
              
            </p>
          </div>
        </section>

        {/* Exemplo ENEM */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold">Exemplo ENEM</h2>
            </div>
            <p className="text-white/90 leading-relaxed text-lg">
              
            </p>
          </div>
        </section>

        {/* Questões de Fixação */}
        {questoes.length > 0 && (
          <section className="mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Questões de Fixação</h2>
              </div>
              <div className="space-y-6">
                {questoes.map((q, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-6">
                    <p className="font-semibold mb-4 text-lg">{idx + 1}. {q.enunciado}</p>
                    <div className="space-y-2">
                      {q.alternativas.map((alt, altIdx) => (
                        <div key={altIdx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                          <span className="font-medium text-#059669" style={{ color: '#059669' }}>
                            {String.fromCharCode(65 + altIdx)})
                          </span>
                          <span className="text-white/80">{alt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mapa Mental */}
        

        {/* Resumo */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Resumo</h2>
            <p className="text-white/90 leading-relaxed text-lg">
              
            </p>
          </div>
        </section>

        {/* MicroQuiz */}
        {showQuiz && (
          <section className="mb-12">
            <MicroQuiz
              moduloSlug="geografia_questoes-ambientais"
              questoes={questoes}
            />
          </section>
        )}
      </main>
    </div>
  )
}
