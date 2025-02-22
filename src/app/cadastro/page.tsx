'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addActivity, getActivityById, updateActivity } from '@/app/lib/data';
import {
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Loader2,
  PencilLine,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const createActivitySchema = z.object({
  id: z.string().optional(),
  nome: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  responsavel: z
    .string()
    .min(3, 'O responsável deve ter pelo menos 3 caracteres')
    .max(100, 'O responsável deve ter no máximo 100 caracteres'),
  data: z.string().refine((val) => {
    const selectedDate = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, 'A data deve ser igual ou posterior a hoje'),
  descricao: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres')
    .max(500, 'A descrição deve ter no máximo 500 caracteres'),
});

type ActivityFormData = z.infer<typeof createActivitySchema>;

function CadastroContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditing = !!id;
  const activity = isEditing ? getActivityById(id) : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ActivityFormData>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      id: activity?.id || '',
      nome: activity?.nome || '',
      responsavel: activity?.responsavel || '',
      data: activity?.data
        ? new Date(activity.data).toISOString().split('T')[0]
        : '',
      descricao: activity?.descricao || '',
    },
  });

  useEffect(() => {
    if (isEditing && activity) {
      setValue('id', activity.id);
      setValue('nome', activity.nome);
      setValue('responsavel', activity.responsavel);
      setValue('data', new Date(activity.data).toISOString().split('T')[0]);
      setValue('descricao', activity.descricao);
    }
  }, [isEditing, activity, setValue]);

  const onSubmit = async (data: ActivityFormData) => {
    try {
      const activityData = {
        nome: data.nome,
        responsavel: data.responsavel,
        data: new Date(data.data).toISOString(),
        descricao: data.descricao,
      };

      if (isEditing && data.id) {
        updateActivity(data.id, activityData);
        toast.success('Atividade atualizada com sucesso!', {
          icon: <CheckCircle2 className="text-green-500" />,
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 4000,
          position: 'top-right',
        });
      } else {
        addActivity(activityData);
        toast.success('Atividade criada com sucesso!', {
          icon: <CheckCircle2 className="text-green-500" />,
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 4000,
          position: 'top-right',
        });
      }

      router.push('/listagem');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} atividade`, {
        icon: <AlertCircle className="text-red-500" />,
        className: 'dark:bg-gray-800 dark:text-white',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-4 px-4 sm:py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-900/20 p-4 sm:p-6 lg:p-8 transition-all">
        <header className="mb-4 sm:mb-6 space-y-1 sm:space-y-2 border-b dark:border-gray-700 pb-4 sm:pb-6">
          <button
            onClick={() => router.push('/listagem')}
            className="mb-2 sm:mb-4 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Voltar para atividades
          </button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            {isEditing ? (
              <>
                <PencilLine className="h-6 w-6 text-blue-500" />
                Editar Atividade
              </>
            ) : (
              'Nova Atividade Acadêmica'
            )}
          </h1>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isEditing && <input type="hidden" {...register('id')} />}
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
                  placeholder="Ex: Semana da Engenharia de Computação de Sobral"
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
                  placeholder="Ex: Prof. Thiago Iachiley"
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
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              {isEditing ? 'Salvar Alterações' : 'Criar Atividade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Carregando formulário...
        </div>
      }
    >
      <CadastroContent />
    </Suspense>
  );
}
