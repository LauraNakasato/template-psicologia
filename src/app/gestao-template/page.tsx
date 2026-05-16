'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import * as motion from "framer-motion/client";

// DADOS FICTÍCIOS PARA O TEMPLATE (Desconectado do Supabase)
const dadosNeutrosFicticios = [
    { id: 1, chave: 'hero_image_url', valor: '/placeholder-perfil.jpg' },
    { id: 2, chave: 'hero_title', valor: 'Equilíbrio mental \n para uma vida plena.' },
    { id: 3, chave: 'hero_subtitle', valor: 'Abordagem humanizada para ajudar você a atravessar momentos de ansiedade, luto e autoconhecimento.' },
    { id: 4, chave: 'presencial_description', valor: 'Um espaço seguro, acolhedor e pensado em cada detalhe para proporcionar o máximo de conforto.' },
    { id: 5, chave: 'presencial_images', valor: '/placeholder1.jpg,/placeholder2.jpg' },
    { id: 6, chave: 'avaliacoes_pacientes', valor: JSON.stringify([{ nome: "João P.", texto: "Profissional excelente! A terapia online tem sido um divisor de águas.", estrelas: 5 }]) },
    { id: 7, chave: 'about_image_url', valor: '/placeholder-perfil.jpg' },
    { id: 8, chave: 'about_title', valor: 'Compromisso com o seu bem-estar.' },
    { id: 9, chave: 'about_description', valor: 'Olá, sou psicólogo(a) clínico(a) dedicado(a) a proporcionar um espaço de escuta ativa e acolhimento.' },
    { id: 10, chave: 'endereco_texto', valor: 'Rua Exemplo, 123 - Bairro - Cidade, UF' },
    { id: 11, chave: 'mapa_embed_url', valor: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975000000003!2d-46.6564947!3d-23.561414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1715540000000!5m2!1spt-BR!2sbr' },
    { id: 12, chave: 'email_contato', valor: 'contato@exemplo.com.br' },
    { id: 13, chave: 'whatsapp_numero', valor: '5511999999999' },
    { id: 14, chave: 'whatsapp_mensagem', valor: 'Olá! Vim pelo site.' },
    { id: 15, chave: 'instagram_link', valor: 'https://instagram.com/seu.usuario' }
];

export default function PortalGestaoTemplatePage() {
    // 1. LOGIN DESATIVADO - Inicia sempre como verdadeiro
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // 2. CONTEÚDO AGORA VEM DOS DADOS FICTÍCIOS
    const [conteudo, setConteudo] = useState<{ id: number, chave: string, valor: string }[]>(dadosNeutrosFicticios);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadingImageId, setUploadingImageId] = useState<number | null>(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    const [lastSaved, setLastSaved] = useState<string>('');

    // CORREÇÃO: Começa em 0 e atualiza sequencialmente (+1) para evitar Hydration Error
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const now = new Date();
        setLastSaved(`${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`);
    }, []);

    // Atualiza o estado apenas na tela (Não salva no banco de dados)
    const handleChange = (id: number, novoValor: string) => {
        setConteudo(prev => prev.map(item => item.id === id ? { ...item, valor: novoValor } : item));
    };

    // ============================================================================
    // SIMULAÇÃO DE UPLOAD DE IMAGEM PARA DEMONSTRAÇÃO
    // ============================================================================
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: number, chave: string) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingImageId(id);
        setMessage({ text: 'Simulando envio de imagem...', type: 'success' });

        // Simula o delay de um upload real
        setTimeout(() => {
            setMessage({ text: 'No ambiente real, a imagem seria salva no servidor.', type: 'success' });
            setUploadingImageId(null);
            e.target.value = '';
            setTimeout(() => setMessage({ text: '', type: '' }), 4000);
        }, 1500);
    };

    // ============================================================================
    // SIMULAÇÃO DE SALVAR
    // ============================================================================
    const handleSave = useCallback(async () => {
        if (saving || conteudo.length === 0) return;

        setSaving(true);
        setMessage({ text: '', type: '' });

        // Simula o tempo de salvamento
        setTimeout(() => {
            const now = new Date();
            setLastSaved(`${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`);

            setMessage({ text: 'Modo de demonstração: Edições visuais aplicadas localmente!', type: 'success' });

            // CORREÇÃO: Incrementa o contador em vez de usar Date.now()
            setRefreshKey(prev => prev + 1);

            setSaving(false);

            setTimeout(() => setMessage({ text: '', type: '' }), 4000);
        }, 800);

    }, [conteudo, saving]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
                e.preventDefault();
                handleSave();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSave]);

    // ============================================================================
    // ESTRUTURA E ORDEM DA SEÇÕES
    // ============================================================================
    const secoesDaPagina = [
        { idHtml: "hero", tituloSecao: "1. PRINCIPAL", chaves: ['hero_image_url', 'hero_title', 'hero_subtitle'] },
        { idHtml: "presencial", tituloSecao: "2. TERAPIA PRESENCIAL", chaves: ['presencial_description', 'presencial_images'] },
        { idHtml: "avaliacoes", tituloSecao: "3. AVALIAÇÕES", chaves: ['avaliacoes_pacientes'] },
        { idHtml: "sobre", tituloSecao: "4. SOBRE MIM", chaves: ['about_image_url', 'about_title', 'about_description'] },
        { idHtml: "localizacao", tituloSecao: "5. LOCALIZAÇÃO", chaves: ['endereco_texto', 'mapa_embed_url'] },
        { idHtml: "contato", tituloSecao: "6. REDES SOCIAIS", chaves: ['whatsapp_numero', 'whatsapp_mensagem', 'email_contato', 'instagram_link'] }
    ];

    const dicionarioCampos: Record<string, { titulo: string, descricao: string }> = {
        'hero_image_url': { titulo: 'HERO IMAGE', descricao: 'A foto grande de fundo que aparece lá no topo do site.' },
        'hero_title': { titulo: 'HERO TITLE', descricao: 'A frase grande de destaque no topo.' },
        'hero_subtitle': { titulo: 'HERO SUBTITLE', descricao: 'O texto menor logo abaixo da frase grande.' },
        'presencial_description': { titulo: 'PRESENCIAL DESCRIPTION', descricao: 'A explicação detalhada de como funciona a sua consulta.' },
        'presencial_images': { titulo: 'PRESENCIAL IMAGES', descricao: 'Fotos do consultório.' },
        'avaliacoes_pacientes': { titulo: 'DEPOIMENTOS', descricao: 'Adicione, edite ou exclua os depoimentos.' },
        'about_image_url': { titulo: 'ABOUT IMAGE', descricao: 'A sua foto de perfil na seção Sobre Mim.' },
        'about_title': { titulo: 'ABOUT TITLE', descricao: 'O título principal da sua apresentação.' },
        'about_description': { titulo: 'ABOUT DESCRIPTION', descricao: 'O texto onde você conta sua história.' },
        'endereco_texto': { titulo: 'ENDEREÇO', descricao: 'O endereço escrito por extenso.' },
        'mapa_embed_url': { titulo: 'MAPA DO GOOGLE', descricao: 'Código ou link do Google Maps.' },
        'email_contato': { titulo: 'E-MAIL', descricao: 'O endereço de contato.' },
        'whatsapp_numero': { titulo: 'WHATSAPP', descricao: 'Apenas números (Ex: 5511999999999).' },
        'whatsapp_mensagem': { titulo: 'MENSAGEM AUTOMÁTICA', descricao: 'Texto que já vem escrito no WhatsApp.' },
        'instagram_link': { titulo: 'INSTAGRAM', descricao: 'Link do seu perfil.' },
    };

    const scrollToIframeSection = useCallback((idHtml: string) => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            try {
                const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
                const element = iframeDoc.getElementById(idHtml);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } catch (error) { }
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idHtml = entry.target.getAttribute('data-idhtml');
                        if (idHtml) scrollToIframeSection(idHtml);
                    }
                });
            },
            { rootMargin: "-20% 0px -50% 0px", threshold: 0 }
        );

        sectionRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
        return () => observer.disconnect();
    }, [conteudo, scrollToIframeSection]);

    // ---------------------------------------------------------
    // TELA DO PAINEL DE CONTROLE (Sem restrição de Login)
    // ---------------------------------------------------------
    return (
        <div className="h-screen w-full bg-[#fcfcf9] flex overflow-hidden">

            {/* LADO ESQUERDO: PREVIEW DO SITE */}
            <section className="flex-1 h-full bg-gray-50 relative hidden md:block">
                <div className="absolute top-0 left-0 w-full px-6 py-3 bg-[#1d1d1f] text-white flex justify-between items-center z-10 text-xs font-bold tracking-widest uppercase shadow-md">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Modo Demonstração Interativa
                    </div>
                    <span className="text-gray-400">seusite.com.br</span>
                </div>

                <div className="w-full h-full pt-[40px]">
                    <iframe
                        key={refreshKey}
                        ref={iframeRef}
                        src={`/?refresh=${refreshKey}`}
                        className="w-full h-full border-none bg-white shadow-inner scroll-smooth pointer-events-auto"
                        title="Preview do Site"
                    />
                </div>
            </section>

            {/* LADO DIREITO: PAINEL DE EDIÇÃO */}
            <aside className="w-full md:w-[450px] lg:w-[500px] h-full flex flex-col border-l border-gray-200 bg-white shadow-2xl z-20 relative shrink-0">

                <header className="px-8 py-6 border-b border-gray-100 bg-white/95 backdrop-blur-md sticky top-0 z-10 flex flex-col gap-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tighter text-[#1d1d1f]">Edição do Site</h1>
                            <p className="text-[10px] font-bold tracking-[0.3em] text-[#ac831e] uppercase mt-1">Sua Marca Aqui</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`group relative inline-flex items-center justify-center w-full py-4 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-500 overflow-hidden border ${saving
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-[#1d1d1f] text-white border-black hover:bg-[#d4af37] hover:border-[#ac831e]/20 hover:shadow-[0_15px_30px_-10px_rgba(212,175,55,0.4)] active:scale-[0.98]'
                            }`}
                    >
                        <span className="relative z-10">{saving ? 'Processando...' : 'Aplicar Mudanças no Visor (Ctrl+S)'}</span>
                        {!saving && <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>}
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">

                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`sticky top-0 mb-6 px-6 py-3 rounded-lg shadow-sm text-xs font-bold tracking-wide border text-center z-50 ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                                }`}>
                            {message.text}
                        </motion.div>
                    )}

                    <div className="flex flex-col gap-10 pb-10">
                        <p className="text-xs text-[#515154] leading-relaxed bg-[#fcfcf9] p-4 rounded-xl border border-gray-100 shadow-sm">
                            Este é um ambiente de demonstração. <br /><br />
                            Altere os textos abaixo e clique no botão preto acima para ver a interatividade em tempo real. Os dados não serão salvos definitivamente no modo teste.
                        </p>

                        {/* RENDERIZANDO POR SEÇÕES EXATAS */}
                        {secoesDaPagina.map((secao, secIndex) => {
                            const itensDaSecao = secao.chaves.map(chaveSecao =>
                                conteudo.find(c => c.chave === chaveSecao)
                            ).filter(item => item !== undefined);

                            if (itensDaSecao.length === 0) return null;

                            return (
                                <div
                                    key={secIndex}
                                    className="flex flex-col gap-6 mb-4"
                                    ref={(el) => { sectionRefs.current[secIndex] = el; }}
                                    data-idhtml={secao.idHtml}
                                >
                                    <div className="border-b-2 border-[#d4af37]/30 pb-2">
                                        <h2 className="text-sm font-black tracking-widest text-[#d4af37] uppercase">
                                            {secao.tituloSecao}
                                        </h2>
                                    </div>

                                    {itensDaSecao.map((item, index) => {
                                        const infoCampo = dicionarioCampos[item!.chave] || {
                                            titulo: item!.chave.replace(/_/g, ' ').toUpperCase(),
                                            descricao: 'Altere este texto e veja a mudança no site ao lado.'
                                        };

                                        const isTextArea = item!.valor.length > 80 ||
                                            ['mapa_embed_url', 'whatsapp_mensagem', 'about_description', 'presencial_description'].includes(item!.chave);

                                        const isImageField = item!.chave.includes('image_url') || item!.chave.includes('images');

                                        return (
                                            <motion.div
                                                key={item!.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                                className="flex flex-col gap-2 group"
                                            >
                                                <div className="flex flex-col mb-2">
                                                    <label className="text-[13px] font-bold tracking-wide text-[#1d1d1f] flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[#d4af37] ml-1"></span>
                                                        {infoCampo.titulo}
                                                    </label>
                                                    <span className="text-[11px] text-gray-500 mt-1 ml-4 leading-relaxed">
                                                        {infoCampo.descricao}
                                                    </span>
                                                </div>

                                                {/* RENDERIZAÇÃO ESPECIAL PARA DEPOIMENTOS */}
                                                {item!.chave === 'avaliacoes_pacientes' ? (() => {
                                                    let avaliacoes = [];
                                                    try {
                                                        avaliacoes = JSON.parse(item!.valor || '[]');
                                                        if (!Array.isArray(avaliacoes)) avaliacoes = [];
                                                    } catch (e) {
                                                        avaliacoes = [];
                                                    }

                                                    return (
                                                        <div className="flex flex-col gap-4 ml-4 w-[calc(100%-1rem)]">
                                                            {avaliacoes.map((av: any, idx: number) => (
                                                                <div key={idx} className="p-4 bg-[#fcfcf9] border border-gray-200 rounded-xl focus-within:border-[#d4af37] focus-within:shadow-[0_4px_20px_-10px_rgba(212,175,55,0.3)] transition-all flex flex-col gap-3 relative group/dep">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const newArr = [...avaliacoes];
                                                                            newArr.splice(idx, 1);
                                                                            handleChange(item!.id, JSON.stringify(newArr));
                                                                        }}
                                                                        className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors opacity-0 group-hover/dep:opacity-100"
                                                                    >
                                                                        Excluir
                                                                    </button>

                                                                    <div className="flex gap-3 mt-2">
                                                                        <div className="flex-1">
                                                                            <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1 block">Nome do Paciente</label>
                                                                            <input type="text" placeholder="Nome" value={av.nome || ''} onChange={(e) => {
                                                                                const newArr = [...avaliacoes];
                                                                                newArr[idx] = { ...newArr[idx], nome: e.target.value };
                                                                                handleChange(item!.id, JSON.stringify(newArr));
                                                                            }} className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-[#1d1d1f] text-sm transition-all" />
                                                                        </div>
                                                                        <div className="w-28">
                                                                            <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1 block">Estrelas</label>
                                                                            <select value={av.estrelas || 5} onChange={(e) => {
                                                                                const newArr = [...avaliacoes];
                                                                                newArr[idx] = { ...newArr[idx], estrelas: Number(e.target.value) };
                                                                                handleChange(item!.id, JSON.stringify(newArr));
                                                                            }} className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-[#1d1d1f] text-sm transition-all">
                                                                                <option value={5}>5 Estrelas</option>
                                                                                <option value={4}>4 Estrelas</option>
                                                                                <option value={3}>3 Estrelas</option>
                                                                                <option value={2}>2 Estrelas</option>
                                                                                <option value={1}>1 Estrela</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1 block">Texto do Depoimento</label>
                                                                        <textarea placeholder="O que o paciente disse..." value={av.texto || ''} onChange={(e) => {
                                                                            const newArr = [...avaliacoes];
                                                                            newArr[idx] = { ...newArr[idx], texto: e.target.value };
                                                                            handleChange(item!.id, JSON.stringify(newArr));
                                                                        }} className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#d4af37] text-[#515154] text-sm min-h-[80px] resize-y custom-scrollbar transition-all" />
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newArr = [...avaliacoes, { nome: '', estrelas: 5, texto: '' }];
                                                                    handleChange(item!.id, JSON.stringify(newArr));
                                                                }}
                                                                className="p-4 border-2 border-dashed border-[#d4af37]/40 bg-[#d4af37]/5 hover:bg-[#d4af37]/10 text-[#ac831e] rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                                Adicionar Novo Depoimento
                                                            </button>
                                                        </div>
                                                    );
                                                })()

                                                    /* RENDERIZAÇÃO ESPECIAL PARA CAMPOS DE IMAGEM */
                                                    : isImageField ? (
                                                        <div className="flex flex-col gap-4 ml-4 w-[calc(100%-1rem)]">

                                                            <input
                                                                type="file"
                                                                id={`file-upload-${item!.id}`}
                                                                className="hidden"
                                                                accept="image/*"
                                                                multiple={item!.chave === 'presencial_images'}
                                                                onChange={(e) => handleImageUpload(e, item!.id, item!.chave)}
                                                            />

                                                            <label
                                                                htmlFor={`file-upload-${item!.id}`}
                                                                className={`cursor-pointer inline-flex items-center justify-center gap-2 bg-[#fcfcf9] border-2 border-dashed ${uploadingImageId === item!.id ? 'border-gray-400 text-gray-400' : 'border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10'} px-6 py-5 rounded-xl transition-colors font-bold text-xs uppercase tracking-widest text-center shadow-sm`}
                                                            >
                                                                {uploadingImageId === item!.id ? (
                                                                    <>
                                                                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                                                        Simulando Upload...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                                                        Testar botão de Imagem
                                                                    </>
                                                                )}
                                                            </label>
                                                        </div>
                                                    ) : isTextArea ? (
                                                        <textarea
                                                            value={item!.valor}
                                                            onChange={(e) => handleChange(item!.id, e.target.value)}
                                                            onFocus={() => scrollToIframeSection(secao.idHtml)}
                                                            className="w-full p-4 bg-[#fcfcf9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#d4af37] focus:bg-white focus:shadow-[0_4px_20px_-10px_rgba(212,175,55,0.3)] transition-all text-[#515154] text-sm leading-relaxed min-h-[120px] resize-y custom-scrollbar group-hover:border-gray-300 ml-4 w-[calc(100%-1rem)]"
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            value={item!.valor}
                                                            onChange={(e) => handleChange(item!.id, e.target.value)}
                                                            onFocus={() => scrollToIframeSection(secao.idHtml)}
                                                            className="w-full p-4 bg-[#fcfcf9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#d4af37] focus:bg-white focus:shadow-[0_4px_20px_-10px_rgba(212,175,55,0.3)] transition-all text-[#1d1d1f] text-sm font-medium group-hover:border-gray-300 ml-4 w-[calc(100%-1rem)]"
                                                        />
                                                    )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            );
                        })}

                        {/* LOG DE ALTERAÇÕES */}
                        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center justify-center gap-2 pb-4">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#ac831e] uppercase flex items-center gap-2">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Status da Sessão
                            </span>
                            <p className="text-xs text-gray-500 text-center font-medium">
                                Sessão iniciada em {lastSaved} (Modo Convidado)
                            </p>
                        </div>

                    </div>
                </div>
            </aside>

        </div>
    );
}