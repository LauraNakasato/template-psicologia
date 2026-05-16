'use client';

import { useState } from 'react';
import Logo from './logo';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Link do WhatsApp neutro/genérico
    const whatsappUrl = "https://wa.me/5511999999999?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20agendamento%20de%20consultas.%20Vim%20pelo%20seu%20site.";

    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-24 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 flex items-center justify-between px-6 md:px-12 shadow-sm">

                {/* BOTÃO DO MENU À ESQUERDA */}
                <div className="flex-1 flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="group flex items-center gap-3 text-[#1d1d1f] focus:outline-none"
                    >
                        <div className="flex flex-col gap-1.5">
                            <span className="w-6 h-0.5 bg-[#1d1d1f] transition-all group-hover:bg-[#d4af37]"></span>
                            <span className="w-6 h-0.5 bg-[#1d1d1f] transition-all group-hover:bg-[#d4af37]"></span>
                        </div>
                        <span className="hidden md:block font-medium text-sm text-[#86868b] group-hover:text-[#d4af37] transition-colors">MENU</span>
                    </button>
                </div>

                {/* LOGO CENTRALIZADO */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <a href="#" className="block">
                        <Logo />
                    </a>
                </div>

                {/* ESPAÇO À DIREITA */}
                <div className="flex flex-1 items-center justify-end">
                </div>
            </nav>

            {/* OVERLAY */}
            <div
                className={`fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* MENU LATERAL (Sidebar) */}
            <div className={`fixed top-0 left-0 w-[85%] max-w-sm h-full bg-white z-[70] p-8 md:p-10 flex flex-col shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="self-end text-[#86868b] hover:text-[#d4af37] transition-colors"
                >
                    <span className="text-4xl font-light">×</span>
                </button>

                <div className="flex flex-col gap-8 mt-8">
                    <div className="flex flex-col gap-5">
                        <p className="text-[11px] font-bold tracking-[0.2em] text-[#ac831e]">NAVEGAÇÃO</p>
                        <div className="flex flex-col gap-5 font-medium text-xl md:text-2xl text-[#1d1d1f]">
                            <a href="#hero" className="hover:translate-x-2 transition-transform duration-300" onClick={() => setIsMenuOpen(false)}>Início</a>
                            <a href="#especialidades" className="hover:translate-x-2 transition-transform duration-300" onClick={() => setIsMenuOpen(false)}>Como posso te ajudar</a>
                            <a href="#presencial" className="hover:translate-x-2 transition-transform duration-300" onClick={() => setIsMenuOpen(false)}>Terapia Presencial</a>
                            <a href="#online" className="hover:translate-x-2 transition-transform duration-300" onClick={() => setIsMenuOpen(false)}>Terapia Online</a>
                            <a href="#avaliacoes" className="hover:translate-x-2 transition-transform duration-300" onClick={() => setIsMenuOpen(false)}>Avaliações</a>
                            <a href="#sobre" className="hover:translate-x-2 transition-transform duration-300" onClick={() => setIsMenuOpen(false)}>Sobre Mim</a>
                            <a href="#localizacao" className="hover:translate-x-2 transition-transform duration-300" onClick={() => setIsMenuOpen(false)}>Localização</a>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100"></div>

                    <div className="flex flex-col gap-5">
                        <p className="text-[11px] font-bold tracking-[0.2em] text-[#ac831e]">CONSULTA</p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#1d1d1f] text-white px-6 py-4 md:py-5 rounded-2xl text-center text-lg font-bold hover:bg-[#d4af37] transition-all shadow-lg active:scale-95"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Agendar Sessão
                        </a>
                    </div>
                </div>

                {/* RODAPÉ DO MENU NEUTRO */}
                <div className="mt-auto pt-10">
                    <p className="text-xs text-[#86868b]">Dr(a). Nome Sobrenome — Psicologia Clínica</p>
                </div>
            </div>
        </>
    );
}