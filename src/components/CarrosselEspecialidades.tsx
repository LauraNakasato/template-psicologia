'use client';

import { useState, useRef, useEffect } from 'react';

const especialidadesBase = [
    { title: "TDAH", desc: "Estratégias personalizadas para foco, organização e manejo da impulsividade no cotidiano." },
    { title: "Ansiedade", desc: "Abordagem humanizada para ajudar você a atravessar momentos de ansiedade e tensão." },
    { title: "Autismo", desc: "Suporte especializado focado em autonomia e qualidade de vida na neurodivergência." },
    { title: "Luto", desc: "Acolhimento clínico para o processamento de perdas e ressignificação da jornada." },
    { title: "Autoconhecimento", desc: "Desenvolvimento pessoal e compreensão profunda dos seus padrões emocionais." },
    { title: "Depressão", desc: "Apoio terapêutico para resgatar a vitalidade e encontrar novos significados na sua jornada." },
    { title: "Síndrome do Pânico", desc: "Acolhimento e técnicas para lidar com crises e retomar a segurança no dia a dia." },
    { title: "Fobias", desc: "Tratamento especializado para superar medos limitantes e recuperar sua liberdade." },
    { title: "Conflitos Familiares e Amorosos", desc: "Espaço seguro para melhorar a comunicação e construir relações mais saudáveis." },
    { title: "Dificuldade de Interação Social", desc: "Desenvolvimento de habilidades sociais para construir conexões autênticas." },
    { title: "Borderline", desc: "Acompanhamento focado na regulação emocional e na construção de estabilidade." },
    { title: "Baixa Autoestima", desc: "Processo terapêutico para fortalecer o amor-próprio e a autoconfiança." },
    { title: "Transtorno de Personalidade", desc: "Abordagem clínica para promover maior flexibilidade e bem-estar comportamental." }
];

export default function CarrosselComoPossoAjudar() {
    const scrollRef = useRef<HTMLDivElement>(null);
    // Triplicamos a lista para criar a ilusão de infinito
    const especialidades = [...especialidadesBase, ...especialidadesBase, ...especialidadesBase];

    // Faz o carrossel começar no "meio" para permitir scroll para a esquerda logo de cara
    useEffect(() => {
        if (scrollRef.current) {
            const cardWidth = 420;
            scrollRef.current.scrollLeft = cardWidth * especialidadesBase.length;
        }
    }, []);

    const handleInfiniteScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const cardWidth = 420;
        const totalSetWidth = cardWidth * especialidadesBase.length;

        // Se chegou perto do fim (terceiro set), pula de volta para o meio
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollLeft = totalSetWidth;
        }
        // Se chegou perto do início (primeiro set), pula para o meio
        if (scrollLeft <= 10) {
            scrollRef.current.scrollLeft = totalSetWidth;
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -420 : 420;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section id="como-posso-ajudar" className="py-24 relative bg-white overflow-hidden border-t border-gray-100">

            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <p className="text-[10px] font-bold tracking-[0.3em] text-[#ac831e] uppercase mb-4">Atendimento</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f]">Como posso te ajudar</h2>
            </div>

            <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-16 group">

                {/* SETA ESQUERDA PREMIUM */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center z-30 transition-all duration-500 hover:scale-110 active:scale-95 focus:outline-none opacity-0 group-hover:opacity-100"
                    aria-label="Rolar para esquerda"
                >
                    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-[#d4af37] stroke-[1px] fill-none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* SETA DIREITA PREMIUM */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center z-30 transition-all duration-500 hover:scale-110 active:scale-95 focus:outline-none opacity-0 group-hover:opacity-100"
                    aria-label="Rolar para direita"
                >
                    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-[#d4af37] stroke-[1px] fill-none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="relative">
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                    <div
                        ref={scrollRef}
                        onScroll={handleInfiniteScroll}
                        className="flex gap-5 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {especialidades.map((item, index) => (
                            <div
                                key={index}
                                className="min-w-[300px] md:min-w-[400px] h-[280px] p-10 rounded-[40px] bg-[#fbfbfb] border border-gray-50 flex flex-col justify-between transition-all duration-700 hover:border-[#d4af37]/30 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] snap-center"
                            >
                                <div>
                                    <div className="w-10 h-10 border border-[#d4af37]/15 rounded-full flex items-center justify-center mb-8">
                                        <div className="w-1.5 h-1.5 bg-[#d4af37]/70 rounded-full"></div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">{item.title}</h3>
                                    <p className="text-sm text-[#86868b] leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}