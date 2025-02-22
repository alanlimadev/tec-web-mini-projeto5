'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  getActivityById,
  addParticipant,
  removeParticipant,
} from '@/app/lib/data';
import { useState } from 'react';

export default function DetalhesPage() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const activity = getActivityById(id as string);
  const [participantName, setParticipantName] = useState('');

  const [localActivity, setLocalActivity] = useState(activity);

  if (!activity) {
    return <div>Atividade não encontrada</div>;
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/20 p-8">
        <div className="mb-8 border-b dark:border-gray-700 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {activity.nome}
          </h1>
        </div>

        <div className="space-y-4 mb-8 text-gray-600 dark:text-gray-400">
          <div>
            <strong className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Responsável
            </strong>
            <p>{activity.responsavel}</p>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data
            </strong>
            <p>
              {new Date(activity.data).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          <div>
            <strong className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </strong>
            <p className="whitespace-pre-line">{activity.descricao}</p>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Participantes
          </h2>

          <form onSubmit={handleAddParticipant} className="mb-6 flex gap-2">
            <input
              type="text"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Nome do participante"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
                focus:ring-2 focus:ring-green-500 focus:border-green-500
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 
                text-white font-medium rounded-lg 
                focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 
                transition-all"
            >
              Adicionar
            </button>
          </form>

          <ul className="space-y-2">
            {localActivity &&
              localActivity.participantes.map((participant, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-3
                  bg-gray-100 dark:bg-gray-700 
                  rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 
                  transition-colors"
                >
                  <span className="text-gray-900 dark:text-gray-200">
                    {participant}
                  </span>
                  <button
                    onClick={() => handleRemoveParticipant(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 
                    p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 
                    transition-colors"
                    title="Remover participante"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
