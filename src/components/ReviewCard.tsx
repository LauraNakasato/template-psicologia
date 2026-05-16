'use client';

import { useState } from 'react';

export default function ReviewCard({ av }: { av: { id: number, nome: string, texto: string, estrelas: number } }) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Limite de caracteres antes de cortar o texto
    const MAX_LENGTH = 160;
    const isLong = av.texto.length > MAX_LENGTH;
    const displayText = isExpanded || !isLong ? av.texto : av.texto.substring(0, MAX_LENGTH).trim() + '...';

    return (
        <div className="w-[320px] md:w-[400px] h-fit shrink-0 mx-4 p-8 rounded-[2rem] bg-[#fcfcf9] border border-[#d4af37]/20 shadow-[0_15px_40px_-15px_rgba(212,175,55,0.1)] transition-transform duration-300 hover:-translate-y-2 relative flex flex-col">
            {/* Ícone de Aspas Dourado */}
            <div className="absolute top-6 right-6 opacity-20 pointer-events-none">
                <svg className="w-10 h-10 fill-[#d4af37]" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>

            {/* Estrelas */}
            <div className="flex gap-1 mb-4">
                {[...Array(av.estrelas)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-[#d4af37]" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>

            {/* Texto e Botão Ler Mais */}
            <div className="mb-6 flex-grow">
                <p className="text-[#515154] font-light leading-relaxed italic transition-all duration-300">
                    "{displayText}"
                </p>
                {isLong && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-3 text-xs font-bold text-[#ac831e] uppercase tracking-wider hover:underline focus:outline-none"
                    >
                        {isExpanded ? 'Ler menos' : 'Ler mais'}
                    </button>
                )}
            </div>

            {/* Info do Paciente */}
            <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center font-bold text-[#ac831e] shrink-0">
                    {av.nome.charAt(0)}
                </div>
                <h4 className="font-bold text-[#1d1d1f]">{av.nome}</h4>
            </div>
        </div>
    );
}