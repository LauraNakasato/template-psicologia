'use client';

import { useRef, useEffect } from 'react';

export default function CarrosselPresencial({ images }: { images: string[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    // Triplicamos a lista para criar a ilusão de infinito
    const carouselImages = [...images, ...images, ...images];

    useEffect(() => {
        if (scrollRef.current) {
            // Pega a largura do primeiro card + gap de 20px (gap-5) dinamicamente para responsividade
            const cardWidth = scrollRef.current.children[0]?.clientWidth + 20 || 420;
            scrollRef.current.scrollLeft = cardWidth * images.length;
        }
    }, [images]);

    const handleInfiniteScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const cardWidth = scrollRef.current.children[0]?.clientWidth + 20 || 420;
        const totalSetWidth = cardWidth * images.length;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
            scrollRef.current.style.scrollBehavior = 'auto'; // Desliga a animação no pulo invisível
            scrollRef.current.scrollLeft -= totalSetWidth;
            scrollRef.current.style.scrollBehavior = 'smooth'; // Liga novamente
        }
        if (scrollLeft <= 10) {
            scrollRef.current.style.scrollBehavior = 'auto';
            scrollRef.current.scrollLeft += totalSetWidth;
            scrollRef.current.style.scrollBehavior = 'smooth';
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.children[0]?.clientWidth + 20 || 420;
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group w-full">
            {/* SETA ESQUERDA PREMIUM */}
            <button
                onClick={() => scroll('left')}
                className="absolute -left-2 md:-left-8 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center z-30 transition-all duration-500 hover:scale-110 active:scale-95 focus:outline-none opacity-0 group-hover:opacity-100"
                aria-label="Rolar para esquerda"
            >
                <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-[#d4af37] stroke-[1px] fill-none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* SETA DIREITA PREMIUM */}
            <button
                onClick={() => scroll('right')}
                className="absolute -right-2 md:-right-8 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center z-30 transition-all duration-500 hover:scale-110 active:scale-95 focus:outline-none opacity-0 group-hover:opacity-100"
                aria-label="Rolar para direita"
            >
                <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-[#d4af37] stroke-[1px] fill-none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Container removido os gradientes laterais e aplicada a rolagem infinita */}
            <div
                ref={scrollRef}
                onScroll={handleInfiniteScroll}
                className="flex gap-5 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
            >
                {carouselImages.map((src, index) => (
                    <div
                        key={index}
                        className="min-w-[300px] md:min-w-[400px] h-[280px] rounded-[40px] bg-[#fbfbfb] border border-[#d4af37]/10 overflow-hidden transition-all duration-700 hover:border-[#d4af37]/40 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.15)] snap-center relative shrink-0"
                    >
                        <div className="absolute inset-0 bg-gray-100 animate-pulse -z-10"></div>
                        <img
                            src={src.trim()}
                            alt={`Foto do consultório`}
                            className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}