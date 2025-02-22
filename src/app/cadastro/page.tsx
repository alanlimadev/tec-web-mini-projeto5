'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addActivity } from '@/app/lib/data';
import { CircleAlert } from 'lucide-react';

const activitySchema = z.object({
  nome: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  responsavel: z
    .string()
    .min(3, 'O responsável deve ter pelo menos 3 caracteres')
    .max(100, 'O responsável deve ter no máximo 100 caracteres'),
  data: z
    .string()
    .refine((val) => new Date(val) > new Date(), 'A data deve ser futura'),
  descricao: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres')
    .max(500, 'A descrição deve ter no máximo 500 caracteres'),
});

type ActivityFormData = z.infer<typeof activitySchema>;

export default function CadastroPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
  });

  const onSubmit = (data: ActivityFormData) => {
    addActivity({
      ...data,
      data: new Date(data.data).toISOString(),
    });
    reset();
    router.push('/listagem');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-900/20 p-8 transition-all">
        <header className="mb-8 space-y-2 border-b dark:border-gray-700 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Registrar Nova Atividade Acadêmica
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Preencha os campos obrigatórios (*) para cadastrar novas atividades
            no sistema
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nome da Atividade*
              </label>
              <div className="relative">
                <input
                  id="nome"
                  {...register('nome')}
                  className={`w-full px-4 py-3 border rounded-lg 
                    focus:ring-2 focus:border-transparent 
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-gray-100 
                    placeholder-gray-500 dark:placeholder-gray-400 
                    transition-all ${
                      errors.nome
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    }`}
                  placeholder="Ex: Semana da Engenharia de Computação de Sobral"
                />
                {errors.nome && (
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <CircleAlert className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.nome && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="responsavel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Responsável*
              </label>
              <div className="relative">
                <input
                  id="responsavel"
                  {...register('responsavel')}
                  className={`w-full px-4 py-3 border rounded-lg 
                    focus:ring-2 focus:border-transparent 
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-gray-100 
                    placeholder-gray-500 dark:placeholder-gray-400 
                    transition-all ${
                      errors.responsavel
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    }`}
                  placeholder="Ex: Prof. Thiago Iachiley"
                />
                {errors.responsavel && (
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <CircleAlert className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.responsavel && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.responsavel.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="data"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Data e Horário*
            </label>
            <div className="relative">
              <input
                type="date"
                id="data"
                {...register('data')}
                className={`w-full px-4 py-3 border rounded-lg 
                  focus:ring-2 focus:border-transparent 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100 
                  transition-all ${
                    errors.data
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  }`}
              />
              {errors.data && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <CircleAlert className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.data && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.data.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Descrição Detalhada*
            </label>
            <div className="relative">
              <textarea
                id="descricao"
                {...register('descricao')}
                className={`w-full px-4 py-3 border rounded-lg 
                  focus:ring-2 focus:border-transparent 
                  bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100 
                  placeholder-gray-500 dark:placeholder-gray-400 
                  resize-y min-h-[120px] transition-all ${
                    errors.descricao
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  }`}
                placeholder="Descreva objetivos, público-alvo e detalhes importantes..."
              />
              {errors.descricao && (
                <div className="absolute top-3 right-3">
                  <CircleAlert className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>
            {errors.descricao && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.descricao.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={() => router.push('/listagem')}
              className="px-6 py-2.5 text-gray-700 dark:text-gray-300 
                bg-white dark:bg-gray-700 
                border border-gray-300 dark:border-gray-600 
                rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 
                transition-colors"
            >
              Voltar para Listagem
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
                dark:bg-blue-700 dark:hover:bg-blue-800 
                text-white font-medium rounded-lg 
                focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 
                transition-all"
            >
              Registrar Atividade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
