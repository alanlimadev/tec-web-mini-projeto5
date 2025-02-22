'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addActivity } from '@/app/lib/data';
import { AlertCircle, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

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
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
  });

  const onSubmit = async (data: ActivityFormData) => {
    try {
      addActivity({
        ...data,
        data: new Date(data.data).toISOString(),
      });

      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success(
        <div className="flex items-center gap-2">
          <span>Atividade registrada com sucesso!</span>
        </div>,
        {
          duration: 4000,
          position: 'top-right',
          className:
            'dark:bg-gray-800 dark:text-gray-100 border dark:border-gray-700',
        }
      );

      reset();
      router.push('/listagem');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span>Erro ao cadastrar atividade</span>
        </div>,
        {
          className:
            'dark:bg-gray-800 dark:text-gray-100 border dark:border-gray-700',
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <Toaster />

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-900/20 p-4 sm:p-6 lg:p-8 transition-all">
        <header className="mb-4 sm:mb-6 space-y-1 sm:space-y-2 border-b dark:border-gray-700 pb-4 sm:pb-6">
          <button
            onClick={() => router.push('/listagem')}
            className="mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Voltar para atividades
          </button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Nova Atividade Acadêmica
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Registre novas atividades para o campus UFC Sobral
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="nome"
                className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
              >
                Nome da Atividade*
              </label>
              <div className="relative">
                <input
                  id="nome"
                  {...register('nome')}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                    errors.nome
                      ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700'
                  } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Ex: Workshop de Inovação"
                />
                {errors.nome && (
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.nome && (
                <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-start gap-1">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5" />
                  <span className="flex-1">{errors.nome.message}</span>
                </p>
              )}
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <label
                htmlFor="responsavel"
                className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
              >
                Responsável*
              </label>
              <div className="relative">
                <input
                  id="responsavel"
                  {...register('responsavel')}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                    errors.responsavel
                      ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700'
                  } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Ex: Coordenação de Extensão"
                />
                {errors.responsavel && (
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.responsavel && (
                <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-start gap-1">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5" />
                  <span className="flex-1">{errors.responsavel.message}</span>
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="data"
                className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
              >
                Data e Horário*
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="data"
                  {...register('data')}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                    errors.data
                      ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700'
                  } text-gray-900 dark:text-gray-100`}
                />
                {errors.data && (
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.data && (
                <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-start gap-1">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5" />
                  <span className="flex-1">{errors.data.message}</span>
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="descricao"
                className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2"
              >
                Descrição Detalhada*
              </label>
              <div className="relative">
                <textarea
                  id="descricao"
                  {...register('descricao')}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                    errors.descricao
                      ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 bg-white dark:bg-gray-700'
                  } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-y min-h-[100px] sm:min-h-[120px]`}
                  placeholder="Descreva objetivos, programação e informações relevantes..."
                />
                {errors.descricao && (
                  <div className="absolute top-3 right-3 pointer-events-none">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.descricao && (
                <p className="mt-2 text-xs sm:text-sm text-red-600 dark:text-red-400 flex items-start gap-1">
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5" />
                  <span className="flex-1">{errors.descricao.message}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4 sm:pt-6 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={() => router.push('/listagem')}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-1 sm:gap-2"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Cancelar</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all flex items-center justify-center gap-1 sm:gap-2 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Cadastrando...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Confirmar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
