'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getActivities, removeActivity } from '@/app/lib/data';
import { Activity } from '@/app/types/activity';

export default function ListagemPage() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta atividade?')) {
      removeActivity(id);
      setActivities((prev) => prev.filter((activity) => activity.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 pb-4 border-b dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Atividades Cadastradas
          </h1>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md 
                dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 
                transition-all duration-200 group"
            >
              <div className="flex justify-between items-start gap-4">
                <Link
                  href={`/detalhes/${activity.id}`}
                  className="flex-1 hover:opacity-80 transition-opacity"
                >
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {activity.nome}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Responsável: {activity.responsavel}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {new Date(activity.data).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </Link>

                <button
                  onClick={() => handleDelete(activity.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                    ml-4 opacity-80 group-hover:opacity-100 transition-opacity duration-150"
                  title="Excluir atividade"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
