'use client';

import { useState } from 'react';
import * as motion from "framer-motion/client";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // CREDENCIAIS DE ACESSO ÚNICO (WHITELISTING)
    const EMAIL_ADMIN = 'boronipsicologia@gmail.com';
    const SENHA_ADMIN = 'Cintia2026@';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Verifica e-mail e senha exatos, ignorando espaços em branco ou letras maiúsculas no e-mail
        if (email.toLowerCase().trim() === EMAIL_ADMIN && password === SENHA_ADMIN) {
            // Cria o cookie com expiração de 2 horas (7200 segundos) e proteção SameSite
            document.cookie = "cintia_auth_token=autenticada; path=/; max-age=7200; secure; samesite=strict";
            // Redireciona para o painel de gestão com a rota secreta nova
            window.location.href = '/portal-gestao-plc301';
        } else {
            alert('E-mail ou senha incorretos! Acesso restrito e monitorado.');
        }
    };

    const cinematicTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

    return (
        <main className="min-h-screen bg-[#FDFDFD] overflow-hidden flex items-center justify-center px-6 relative">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#d4af37] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#ac831e] opacity-[0.04] blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={cinematicTransition as any}
                className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(212,175,55,0.15)] border border-[#d4af37]/20 text-center relative z-10"
            >
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#ac831e] uppercase mb-4 block">Acesso Restrito</span>
                <h1 className="text-3xl font-bold tracking-tighter text-[#1d1d1f] mb-6">Painel de Controle.</h1>
                <div className="w-12 h-[2px] bg-[#d4af37]/60 mx-auto mb-8"></div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-4 bg-[#fcfcf9] border border-gray-200 rounded-2xl focus:outline-none focus:border-[#d4af37]/60 focus:bg-white transition-all text-[#515154] text-center tracking-widest"
                    />
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-4 bg-[#fcfcf9] border border-gray-200 rounded-2xl focus:outline-none focus:border-[#d4af37]/60 focus:bg-white transition-all text-[#515154] text-center tracking-widest mb-2"
                    />
                    <button
                        type="submit"
                        className="cursor-pointer group relative inline-flex items-center justify-center bg-[#d4af37] text-white w-full py-5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-95 border border-[#ac831e]/20 overflow-hidden"
                    >
                        <span className="relative z-10">Acessar Painel</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                </form>
            </motion.div>
        </main>
    );
}