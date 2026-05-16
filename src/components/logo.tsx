import { useState, useEffect } from "react";

export default function BrandLogo() {
    const [animateLoad, setAnimateLoad] = useState(false);

    useEffect(() => {
        // Inicia a animação 100ms após a página carregar
        const startTimer = setTimeout(() => setAnimateLoad(true), 100);
        // Desliga a animação após 1500ms (tempo suficiente para as transições de 1200ms terminarem)
        const endTimer = setTimeout(() => setAnimateLoad(false), 1500);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(endTimer);
        };
    }, []);

    return (
        <div className="group relative flex flex-col items-center justify-center cursor-pointer">

            {/* EFEITO DAS BOLINHAS (Partículas virtuais que voam para cima no hover) - PRESERVADO INTACTO */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
                <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-20 group-hover:-translate-x-5 group-hover:scale-50 transition-all duration-[800ms] ease-out ${animateLoad ? "opacity-100 -translate-y-20 -translate-x-5 scale-50" : ""}`} />
                <div className={`absolute top-1/3 left-1/2 w-3 h-3 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-80 group-hover:-translate-y-24 group-hover:translate-x-2 group-hover:scale-50 transition-all duration-[1000ms] ease-out delay-75 ${animateLoad ? "opacity-80 -translate-y-24 translate-x-2 scale-50" : ""}`} />
                <div className={`absolute top-1/2 right-1/4 w-2 h-2 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-90 group-hover:-translate-y-16 group-hover:translate-x-8 group-hover:scale-50 transition-all duration-[700ms] ease-out delay-150 ${animateLoad ? "opacity-90 -translate-y-16 translate-x-8 scale-50" : ""}`} />
                <div className={`absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-60 group-hover:-translate-y-28 group-hover:-translate-x-10 transition-all duration-[1200ms] ease-out delay-100 ${animateLoad ? "opacity-60 -translate-y-28 -translate-x-10" : ""}`} />
                <div className={`absolute top-1/2 right-1/3 w-2.5 h-2.5 bg-[#d4af37] rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-20 group-hover:translate-x-4 transition-all duration-[900ms] ease-out delay-200 ${animateLoad ? "opacity-100 -translate-y-20 translate-x-4" : ""}`} />
            </div>

            {/* O LOGO PLACEHOLDER (Circulo limpo com texto "SEU LOGO") */}
            <div className={`relative z-10 w-12 h-12 flex items-center justify-center bg-[#fcfcf9] border border-[#d4af37]/40 rounded-full shadow-sm transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-[#d4af37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] ${animateLoad ? "scale-110 -translate-y-1" : ""}`}>
                <span className="text-[7px] font-bold tracking-[0.15em] text-[#ac831e] uppercase text-center leading-[1.3]">
                    Seu<br />Logo
                </span>
            </div>

            {/* AVISO DA ANIMAÇÃO (Aparece de forma suave apenas no hover ou load) */}
            <div className={`absolute -bottom-6 opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100 ${animateLoad ? "opacity-100" : ""}`}>
                <span className="text-[8px] font-medium tracking-widest text-[#86868b] uppercase whitespace-nowrap">
                    Com animação interativa
                </span>
            </div>

        </div>
    );
}