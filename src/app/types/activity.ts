export type Activity = {
  id: string;
  nome: string;
  responsavel: string;
  data: string;
  descricao: string;
  participantes: string[];
};

export type ActivityForm = Omit<Activity, 'id' | 'participantes'>;
