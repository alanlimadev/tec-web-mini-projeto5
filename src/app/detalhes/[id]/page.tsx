'use client';

import { useParams } from 'next/navigation';
import {
  getActivityById,
  addParticipant,
  removeParticipant,
} from '@/app/lib/data';
import { useState } from 'react';
import {
  Calendar,
  User,
  Clipboard as ClipboardText,
  PlusCircle,
  Trash2,
  AlertCircle,
} from 'lucide-react';

export default function DetalhesPage() {
  const { id } = useParams();
  const activity = getActivityById(id as string);
  const [participantName, setParticipantName] = useState('');
  const [localActivity, setLocalActivity] = useState(activity);

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Atividade não encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A atividade solicitada não está mais disponível ou foi removida
          </p>
        </div>
      </div>
    );
  }

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (participantName.trim()) {
      addParticipant(activity.id, participantName.trim());
      setParticipantName('');
      setLocalActivity((prev) => ({
        ...prev!,
        participantes: [...prev!.participantes, participantName.trim()],
      }));
    }
  };

  const handleRemoveParticipant = (index: number) => {
    if (confirm('Remover este participante?')) {
      removeParticipant(activity.id, index);
      setLocalActivity((prev) => ({
        ...prev!,
        participantes: prev!.participantes.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/20 p-6 sm:p-8">
        <header className="mb-6 sm:mb-8 border-b dark:border-gray-700 pb-4 sm:pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ClipboardText className="h-6 w-6 text-blue-500" />
            {activity.nome}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Detalhes completos da atividade acadêmica
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Responsável pela Atividade
                </h2>
              </div>
              <p className="text-gray-900 dark:text-gray-200 pl-8">
                {activity.responsavel}
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Data e Horário
                </h2>
              </div>
              <p className="text-gray-900 dark:text-gray-200 pl-8">
                {new Date(activity.data).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Descrição Completa
              </h2>
            </div>
            <p className="text-gray-900 dark:text-gray-200 pl-8 whitespace-pre-line">
              {activity.descricao || (
                <span className="text-gray-500 italic">
                  Nenhuma descrição fornecida
                </span>
              )}
            </p>
          </div>
        </div>

        <section className="border-t dark:border-gray-700 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <User className="h-5 w-5 text-green-500" />
              Lista de Participantes
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total: {localActivity?.participantes.length || 0}
            </p>
          </div>

          <form
            onSubmit={handleAddParticipant}
            className="mb-6 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Digite o nome completo do participante"
              className="flex-1 px-4 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg
                focus:ring-2 focus:ring-green-500 focus:border-green-500
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 
                text-white text-sm font-medium rounded-lg 
                focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 
                transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Adicionar
            </button>
          </form>

          <ul className="space-y-2">
            {localActivity?.participantes.map((participant, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-4 py-3
                bg-gray-100 dark:bg-gray-700 
                rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 
                transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-900 dark:text-gray-200">
                    {participant}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveParticipant(index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                    p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 
                    transition-colors"
                  title="Remover participante"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>

          {!localActivity?.participantes.length && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <User className="h-12 w-12 mx-auto mb-4 opacity-75" />
              <p>Nenhum participante registrado ainda</p>
              <p className="text-sm mt-1">
                Adicione participantes usando o campo acima
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
