'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getActivities, removeActivity } from '@/app/lib/data';
import { Activity } from '@/app/types/activity';
import { ArrowDown, Trash2, Calendar, User, ClipboardList } from 'lucide-react';

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

  const handleExportCSV = () => {
    const csvHeader = [
      'Nome',
      'Responsável',
      'Data',
      'Descrição',
      'Participantes',
    ].join(',');

    const csvBody = activities
      .map((activity) => {
        const date = new Date(activity.data).toLocaleDateString('pt-BR');
        const participants = activity.participantes.join('; ');
        return [
          `"${activity.nome}"`,
          `"${activity.responsavel}"`,
          `"${date}"`,
          `"${activity.descricao.replace(/"/g, '""')}"`,
          `"${participants}"`,
        ].join(',');
      })
      .join('\n');

    const csv = `${csvHeader}\n${csvBody}`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'atividades-ufc-sobral.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 pb-4 border-b dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Gestão de Atividades Acadêmicas
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Controle e acompanhamento de eventos do campus
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="w-full sm:w-auto px-4 py-2 bg-green-500 hover:bg-green-600 
              text-white text-sm rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <ArrowDown className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {activities.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <div className="max-w-md mx-auto space-y-4 text-gray-500 dark:text-gray-400">
                <ClipboardList className="h-12 w-12 mx-auto opacity-75" />
                <p className="text-lg font-medium">
                  Nenhuma atividade registrada
                </p>
                <p className="text-sm">
                  Comece cadastrando novas atividades para aparecerem aqui
                </p>
              </div>
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 sm:p-5 bg-white dark:bg-gray-800 rounded-lg shadow-xs hover:shadow-sm 
                  dark:shadow-gray-900/10 border border-gray-150 dark:border-gray-700 
                  transition-all duration-200 group"
              >
                <div className="flex justify-between items-start gap-3">
                  <Link
                    href={`/detalhes/${activity.id}`}
                    className="flex-1 hover:opacity-80 transition-opacity space-y-2"
                  >
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {activity.nome}
                    </h2>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <User className="h-4 w-4 opacity-75" />
                        <span>{activity.responsavel}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-500">
                        <Calendar className="h-4 w-4 opacity-75" />
                        <span>
                          {new Date(activity.data).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 
                      rounded-lg transition-colors duration-200"
                    title="Excluir atividade"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
