'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addActivity } from '@/app/lib/data';

export default function CadastroPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    addActivity({
      nome: formData.get('nome') as string,
      responsavel: formData.get('responsavel') as string,
      data: formData.get('data') as string,
      descricao: formData.get('descricao') as string,
    });

    router.push('/listagem');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-900/20 p-8 transition-all">
        <div className="mb-8 border-b dark:border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Cadastrar Nova Atividade
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Campos obrigatórios marcados com*
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Nome da Atividade*
              </label>
              <input
                id="nome"
                name="nome"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 
                placeholder-gray-500 dark:placeholder-gray-400 
                transition-all"
                placeholder="Digite o nome da atividade"
              />
            </div>

            <div>
              <label
                htmlFor="responsavel"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Responsável*
              </label>
              <input
                id="responsavel"
                name="responsavel"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-gray-100 
                placeholder-gray-500 dark:placeholder-gray-400 
                transition-all"
                placeholder="Nome do responsável"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="data"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Data*
            </label>
            <input
              type="date"
              id="data"
              name="data"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              bg-white dark:bg-gray-700 
              text-gray-900 dark:text-gray-100 
              transition-all"
            />
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Descrição*
            </label>
            <textarea
              id="descricao"
              name="descricao"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              bg-white dark:bg-gray-700 
              text-gray-900 dark:text-gray-100 
              placeholder-gray-500 dark:placeholder-gray-400 
              resize-y min-h-[120px] transition-all"
              placeholder="Descreva detalhes da atividade..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.push('/listagem')}
              className="px-6 py-2.5 text-gray-700 dark:text-gray-300 
              bg-white dark:bg-gray-700 
              border border-gray-300 dark:border-gray-600 
              rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 
              transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 
              dark:bg-blue-700 dark:hover:bg-blue-800 
              text-white font-medium rounded-lg 
              focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 
              transition-all"
            >
              Cadastrar Atividade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
