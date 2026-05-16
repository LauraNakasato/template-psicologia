'use server';

import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';
import { revalidatePath } from 'next/cache'; // <-- 1. IMPORTAÇÃO DO REVALIDATE AQUI

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ConteudoSchema = z.array(
    z.object({
        id: z.number(),
        valor: z.string().min(1, "O conteúdo não pode estar vazio").max(5000, "Texto muito longo")
    })
);

export async function salvarEdicoes(conteudoEditado: any) {
    try {
        const dadosValidados = ConteudoSchema.parse(conteudoEditado);

        // UUID da Cíntia para o log de 'updated_by'
        const CINTIA_UUID = '54ebbaab-5e4d-477c-bdf0-6625a8efcfce';

        const promises = dadosValidados.map(async (item) => {
            const valorLimpo = DOMPurify.sanitize(item.valor);

            const { error } = await supabaseAdmin
                .from('site_content')
                .update({
                    valor: valorLimpo,
                    updated_by: CINTIA_UUID // Registra quem fez a alteração
                })
                .eq('id', item.id);

            if (error) throw error;
        });

        await Promise.all(promises);

        // <-- 2. DESTRÓI O CACHE AQUI -->
        // Isso avisa o Next.js: "A página '/' mudou, jogue a versão velha fora!"
        revalidatePath('/');

        return { sucesso: true };
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return { sucesso: false, erro: "Dados inválidos: " + error.issues[0].message };
        }
        return { sucesso: false, erro: error.message };
    }
}