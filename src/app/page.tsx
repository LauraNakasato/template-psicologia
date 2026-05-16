export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Navbar from '@/components/Navbar';
import CarrosselEspecialidades from '@/components/CarrosselEspecialidades';
import ReviewCard from '@/components/ReviewCard';
import { supabase } from '@/lib/supabase';
import * as motion from "framer-motion/client";

export default async function Home() {
  // --- CÓDIGO ORIGINAL PRESERVADO (COMENTADO PARA NÃO PUXAR DADOS DA CINTIA) ---
  // const { data: content } = await supabase.from('site_content').select('chave, valor');
  // const getVal = (key: string) => content?.find(item => item.chave === key)?.valor || '';

  // --- LÓGICA NEUTRA DO TEMPLATE ---
  // Retorna vazio para forçar o uso dos textos e imagens de fallback abaixo
  const getVal = (key: string) => '';

  const googleReviewsUrl = "#";

  const cinematicTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

  // --- LÓGICA DINÂMICA DO WHATSAPP ---
  const whatsappNumeroRaw = getVal('whatsapp_numero') || '5511999999999';
  const whatsappMensagemRaw = getVal('whatsapp_mensagem') || 'Olá! Conheci seu trabalho pelo site e gostaria de saber mais sobre o seu atendimento.';
  const whatsappNumeroLimpo = whatsappNumeroRaw.replace(/\D/g, ''); // Remove espaços, parênteses e traços
  const whatsappUrl = `https://wa.me/${whatsappNumeroLimpo}?text=${encodeURIComponent(whatsappMensagemRaw)}`;
  // -----------------------------------

  const enderecoTexto = getVal('endereco_texto') || 'Rua Exemplo, 123 - Bairro - Cidade, UF';
  const mapaEmbedUrl = getVal('mapa_embed_url') || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975000000003!2d-46.6564947!3d-23.561414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1715540000000!5m2!1spt-BR!2sbr';

  // --- LÓGICA DINÂMICA DE CONTATO E REDES ---
  const emailContato = getVal('email_contato') || 'contato@psicologoexemplo.com.br';
  const instagramLink = getVal('instagram_link') || 'https://instagram.com/seu.usuario';
  // ------------------------------------------

  let avaliacoes = [
    { id: 1, nome: "Letícia S.", texto: "A terapia tem me ajudado a enxergar as coisas com muito mais clareza. O ambiente é super acolhedor e seguro.", estrelas: 5 },
    { id: 2, nome: "Rafael M.", texto: "Profissional excelente! A terapia online tem sido um divisor de águas na minha rotina corrida.", estrelas: 5 },
    { id: 3, nome: "Camila F.", texto: "Me senti confortável desde a primeira sessão. Uma escuta verdadeiramente ativa e humana. Recomendo muito!", estrelas: 5 },
    { id: 4, nome: "João P.", texto: "Recomendo muito. O espaço presencial é lindo e a abordagem é muito pontual e empática.", estrelas: 5 },
    { id: 5, nome: "Mariana V.", texto: "Comecei há alguns meses e já sinto uma evolução imensa no meu autoconhecimento. Profissional nota 1000!", estrelas: 5 }
  ];

  const avaliacoesRaw = getVal('avaliacoes_pacientes');
  if (avaliacoesRaw) {
    try {
      avaliacoes = JSON.parse(avaliacoesRaw);
    } catch (error) {
      console.error("Erro no formato do JSON no Supabase. Usando avaliações de segurança.", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#FDFDFD] overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        .group-marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <Navbar />

      {/* 1. HERO SECTION */}
      <section id="hero" className="pt-40 pb-24 px-6 relative overflow-hidden flex items-center min-h-[90vh]">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#d4af37] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#ac831e] opacity-[0.04] blur-[120px] rounded-full pointer-events-none"></div>

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[800px] h-[600px] bg-[radial-gradient(circle,_rgba(212,175,55,0.15)_0%,_rgba(255,255,255,0)_70%)] opacity-90 animate-pulse duration-[10s]"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={cinematicTransition as any}
            className="w-full md:w-1/2 flex justify-center md:justify-start"
          >
            {/* PLACEHOLDER DE IMAGEM DA HERO SECTION */}
            <div className="relative w-72 h-72 md:w-[480px] md:h-[600px] rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)] bg-[#fbfbfb] border border-dashed border-[#d4af37]/40 flex flex-col items-center justify-center p-8 text-center group transition-all duration-500 hover:bg-white hover:border-[#d4af37]/80">
              <svg className="w-12 h-12 text-[#d4af37]/40 mb-4 group-hover:text-[#d4af37] group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <h3 className="text-[#1d1d1f] font-bold text-lg mb-2">Sua Foto Principal</h3>
              <p className="text-xs text-[#515154] font-light leading-relaxed max-w-[250px]">
                Este espaço é reservado para uma foto sua de alta qualidade, de preferência em um ambiente claro e profissional, transmitindo acolhimento e confiança.
              </p>
            </div>
          </motion.div>

          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#ac831e] uppercase mb-6 block">Psicologia Clínica | CRP 00/000000</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={cinematicTransition as any}
              className="text-5xl md:text-8xl font-bold tracking-tighter text-[#1d1d1f] mb-8 leading-[1.02] whitespace-pre-wrap"
            >
              {getVal('hero_title') || (
                <>
                  Equilíbrio mental <br /> para uma vida <span className="text-[#d4af37] italic font-serif relative">
                    plena
                    <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#d4af37]/30 rounded-full"></span>
                  </span>.
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-xl text-[#515154] mb-16 font-light leading-relaxed max-w-lg"
            >
              {getVal('hero_subtitle') || 'Abordagem humanizada para ajudar você a atravessar momentos de ansiedade, luto e autoconhecimento.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center md:justify-start"
            >
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="group relative inline-flex items-center justify-center bg-[#d4af37] text-white px-14 py-5 rounded-full text-sm font-bold tracking-widest uppercase transition-shadow duration-500 shadow-lg hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.4)] border border-[#ac831e]/20 overflow-hidden"
              >
                <span className="relative z-10">{getVal('hero_cta') || 'Agendar Consulta'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO ESPECIALIDADES */}
      <motion.div
        id="especialidades"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <CarrosselEspecialidades />
      </motion.div>

      {/* 3. SEÇÃO TERAPIA PRESENCIAL */}
      <section id="presencial" className="pt-12 pb-24 md:pt-16 md:pb-32 bg-white border-t border-gray-50 overflow-hidden relative">
        <div className="w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 px-6 flex flex-col items-center"
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-[#ac831e] uppercase mb-4">Terapia Presencial</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1d1d1f] mb-6">
              O Consultório.
            </h3>
            <div className="w-12 h-[2px] bg-[#d4af37]/60 mb-6"></div>

            <p className="text-lg text-[#515154] font-light leading-relaxed max-w-lg mx-auto whitespace-pre-wrap">
              {getVal('presencial_description') || 'Um espaço seguro, acolhedor e pensado em cada detalhe para proporcionar o máximo de conforto e tranquilidade durante o seu processo terapêutico no consultório.'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[1600px] mx-auto px-6 md:px-16"
          >
            {/* PLACEHOLDER DO CARROSSEL DE IMAGENS DO CONSULTÓRIO */}
            <div className="w-full h-[300px] md:h-[500px] rounded-[2rem] bg-[#fcfcf9] border-2 border-dashed border-[#d4af37]/30 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 hover:bg-white hover:border-[#d4af37]/60 group cursor-default">
              <div className="flex gap-2 mb-4">
                <svg className="w-10 h-10 text-[#d4af37]/40 group-hover:text-[#d4af37] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <svg className="w-10 h-10 text-[#d4af37]/30 group-hover:text-[#d4af37]/80 transition-colors duration-500 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-[#1d1d1f] font-bold text-xl mb-2">Fotos do Seu Consultório</h3>
              <p className="text-sm text-[#515154] font-light max-w-md mx-auto">
                Neste espaço, exibiremos uma galeria interativa e elegante com as fotos do seu ambiente de atendimento presencial. Você poderá nos enviar várias imagens para destacar os detalhes do consultório.
              </p>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 4. SEÇÃO DIFERENCIAIS DA TERAPIA ONLINE */}
      <section id="online" className="pt-12 pb-24 md:pt-16 md:pb-32 bg-[#fcfcf9] border-t border-[#d4af37]/10 px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16 flex flex-col items-center"
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-[#ac831e] uppercase mb-4">Terapia Online</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1d1d1f] mb-6">
              Diferenciais do formato.
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-10 rounded-[2rem] bg-white border-t-2 border-t-[#d4af37] border-x border-b border-gray-100 shadow-[0_10px_40px_-15px_rgba(212,175,55,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.2)] transition-shadow duration-500 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#fbfbfb] border border-[#d4af37]/30 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 stroke-[#d4af37] stroke-[1.5px] fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-[#1d1d1f] mb-3">Sigilo Absoluto</h4>
              <p className="text-[#515154] font-light leading-relaxed">
                Criptografia e plataformas seguras.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-10 rounded-[2rem] bg-white border-t-2 border-t-[#d4af37] border-x border-b border-gray-100 shadow-[0_10px_40px_-15px_rgba(212,175,55,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.2)] transition-shadow duration-500 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#fbfbfb] border border-[#d4af37]/30 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 stroke-[#d4af37] stroke-[1.5px] fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-[#1d1d1f] mb-3">Flexibilidade</h4>
              <p className="text-[#515154] font-light leading-relaxed">
                Atendimento global por videochamada.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-10 rounded-[2rem] bg-white border-t-2 border-t-[#d4af37] border-x border-b border-gray-100 shadow-[0_10px_40px_-15px_rgba(212,175,55,0.08)] hover:shadow-[0_20px_50px_-15px_rgba(212,175,55,0.2)] transition-shadow duration-500 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#fbfbfb] border border-[#d4af37]/30 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 stroke-[#d4af37] stroke-[1.5px] fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-[#1d1d1f] mb-3">Conforto</h4>
              <p className="text-[#515154] font-light leading-relaxed">
                Sem deslocamentos, no seu ambiente.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO: PROVA SOCIAL (AVALIAÇÕES) */}
      <section id="avaliacoes" className="pt-16 pb-24 md:pt-24 md:pb-32 bg-white border-t border-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-[#ac831e] uppercase mb-4">Experiências</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1d1d1f] mb-6">
              O que dizem os pacientes.
            </h3>
            <div className="w-12 h-[2px] bg-[#d4af37]/60 mx-auto mb-6"></div>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden group-marquee">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-marquee pt-4 pb-12 items-start">
            {[...avaliacoes, ...avaliacoes].map((av, index) => (
              <ReviewCard key={`${av.id}-${index}`} av={av} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mt-8"
        >
          <motion.a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group relative inline-flex items-center gap-3 bg-white text-[#1d1d1f] px-8 py-4 rounded-full text-sm font-bold uppercase transition-colors duration-300 hover:bg-[#fbfbfb] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-200 hover:border-[#d4af37]/40"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Ver mais avaliações no Google
          </motion.a>
        </motion.div>
      </section>

      {/* 6. SEÇÃO SOBRE MIM */}
      <section id="sobre" className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white border-t border-gray-50 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={cinematicTransition as any}
            className="w-full md:w-1/2 flex justify-center md:justify-end relative"
          >
            <div className="absolute w-72 h-72 md:w-[450px] md:h-[550px] rounded-[2rem] border-2 border-[#d4af37]/30 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 -z-10"></div>

            {/* PLACEHOLDER DE IMAGEM DA SEÇÃO SOBRE MIM */}
            <div className="relative w-72 h-72 md:w-[450px] md:h-[550px] rounded-[2rem] bg-[#fbfbfb] border border-dashed border-[#d4af37]/40 shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)] flex flex-col items-center justify-center p-8 text-center group transition-all duration-500 hover:bg-white hover:border-[#d4af37]/80">
              <svg className="w-12 h-12 text-[#d4af37]/40 mb-4 group-hover:text-[#d4af37] group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="text-[#1d1d1f] font-bold text-lg mb-2">Sua Foto de Perfil</h3>
              <p className="text-xs text-[#515154] font-light leading-relaxed max-w-[250px]">
                Aqui colocaremos uma foto que mostre seu lado mais humano e acessível. Essa imagem ficará ao lado da sua trajetória profissional, conectando os pacientes à sua história.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-[#ac831e] uppercase mb-4">Sobre Mim</h2>

            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1d1d1f] mb-6 leading-[1.1]">
              {getVal('about_title') || 'Compromisso com o seu bem-estar.'}
            </h3>

            <div className="w-16 h-[2px] bg-[#d4af37]/60 mb-8"></div>

            <p className="text-lg text-[#515154] font-light leading-relaxed max-w-lg whitespace-pre-wrap">
              {getVal('about_description') || 'Olá, sou psicóloga clínica dedicada a proporcionar um espaço de escuta ativa e acolhimento. Meu trabalho é focado em ajudar meus pacientes a encontrarem ferramentas internas para lidar com seus desafios diários, promovendo autonomia e saúde mental.\n\nAcredito que o processo terapêutico é uma jornada única de autodescoberta.'}
            </p>

          </motion.div>
        </div>
      </section>

      {/* 7. SEÇÃO ONDE NOS ENCONTRAR */}
      <section id="localizacao" className="pt-16 pb-24 md:pt-24 md:pb-32 bg-[#fcfcf9] border-t border-[#d4af37]/10 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">

          {/* Textos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h2 className="text-[10px] font-bold tracking-[0.3em] text-[#ac831e] uppercase mb-4">Localização</h2>

            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1d1d1f] mb-6 leading-[1.1]">
              Onde nos <br /> encontrar?
            </h3>

            <div className="w-12 h-[2px] bg-[#d4af37]/60 mb-8"></div>

            <p className="text-sm font-bold text-[#1d1d1f] uppercase tracking-widest mb-2">Endereço Comercial:</p>
            <p className="text-lg text-[#515154] font-light leading-relaxed">
              {enderecoTexto}
            </p>
          </motion.div>

          {/* Mapa do Google (Iframe) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-2/3 h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)] border-4 border-white relative"
          >
            <div className="absolute inset-0 bg-gray-100 animate-pulse -z-10"></div>
            <iframe
              src={mapaEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full z-10"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="contato" className="bg-white pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">

          {/* Logo / Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-2xl font-bold tracking-tighter text-[#1d1d1f] mb-2">Dr(a). Nome Sobrenome</span>
            <span className="text-xs font-bold tracking-[0.2em] text-[#ac831e] uppercase mb-4">Psicologia Clínica | CRP 00/000000</span>
            <p className="text-sm text-[#515154] max-w-xs leading-relaxed">
              Acolhimento e escuta ativa para o seu processo de autodescoberta e bem-estar.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#1d1d1f] uppercase mb-6">Links Rápidos</h4>
            <nav className="flex flex-col gap-4 text-sm text-[#515154] items-center md:items-start">
              <a href="#especialidades" className="hover:text-[#d4af37] hover:translate-x-1 transition-all">Como posso te ajudar</a>
              <a href="#presencial" className="hover:text-[#d4af37] hover:translate-x-1 transition-all">Terapia Presencial</a>
              <a href="#online" className="hover:text-[#d4af37] hover:translate-x-1 transition-all">Terapia Online</a>
              <a href="#avaliacoes" className="hover:text-[#d4af37] hover:translate-x-1 transition-all">Avaliações</a>
              <a href="#sobre" className="hover:text-[#d4af37] hover:translate-x-1 transition-all">Sobre Mim</a>
            </nav>
          </div>

          {/* Contato e Redes */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#1d1d1f] uppercase mb-6">Contato</h4>

            <div className="flex gap-4 mb-6">
              {/* WhatsApp Icon */}
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#fbfbfb] border border-gray-100 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-all text-[#515154] shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
              </motion.a>
              {/* Instagram Icon (Dynamic) */}
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href={instagramLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#fbfbfb] border border-gray-100 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-all text-[#515154] shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </motion.a>
            </div>

            {/* LINK DE E-MAIL (COPIAR PARA ÁREA DE TRANSFERÊNCIA) */}
            <div className="relative flex flex-col items-center md:items-start">
              <button
                id="copy-email-btn"
                className="text-sm font-medium text-[#515154] hover:text-[#d4af37] transition-colors cursor-pointer"
                title="Copiar e-mail"
              >
                {emailContato}
              </button>
              <span id="copy-email-msg" className="text-xs text-[#d4af37] font-medium absolute -bottom-5 opacity-0 transition-opacity duration-300 pointer-events-none">
                E-mail copiado!
              </span>
              <script dangerouslySetInnerHTML={{
                __html: `
                  document.getElementById('copy-email-btn').addEventListener('click', function(e) {
                    e.preventDefault();
                    navigator.clipboard.writeText('${emailContato}').then(function() {
                      var msg = document.getElementById('copy-email-msg');
                      msg.style.opacity = '1';
                      setTimeout(function() { msg.style.opacity = '0'; }, 2000);
                    });
                  });
                `
              }} />
            </div>

          </div>
        </div>

        {/* Linha de Copyright Centralizada */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 flex justify-center">
          <p className="text-xs text-[#86868b] text-center">
            © 2026 Nome do(a) Profissional. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </main>
  );
}