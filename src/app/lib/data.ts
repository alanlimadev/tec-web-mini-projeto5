import { Activity, ActivityForm } from '@/app/types/activity';

const LOCAL_STORAGE_KEY = 'activities';

function getActivitiesFromStorage(): Activity[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveActivitiesToStorage(activities: Activity[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(activities));
  }
}

export const addActivity = (activity: ActivityForm) => {
  const activities = getActivitiesFromStorage();
  const newActivity = {
    ...activity,
    id: Date.now().toString(),
    participantes: [],
  };
  const updatedActivities = [...activities, newActivity];
  saveActivitiesToStorage(updatedActivities);
  return newActivity;
};

export const getActivities = () => getActivitiesFromStorage();
console.log(getActivitiesFromStorage());

export const getActivityById = (id: string) =>
  getActivitiesFromStorage().find((activity) => activity.id === id);

export const addParticipant = (id: string, nome: string) => {
  const activities = getActivitiesFromStorage();
  const activityIndex = activities.findIndex((a) => a.id === id);

  if (activityIndex > -1) {
    const updatedActivity = {
      ...activities[activityIndex],
      participantes: [...activities[activityIndex].participantes, nome],
    };
    const updatedActivities = [...activities];
    updatedActivities[activityIndex] = updatedActivity;
    saveActivitiesToStorage(updatedActivities);
  }
};

export const removeActivity = (id: string) => {
  const activities = getActivitiesFromStorage();
  const updatedActivities = activities.filter((activity) => activity.id !== id);
  saveActivitiesToStorage(updatedActivities);
};

export const removeParticipant = (id: string, index: number) => {
  const activities = getActivitiesFromStorage();
  const activityIndex = activities.findIndex((a) => a.id === id);

  if (activityIndex > -1) {
    const updatedParticipants = [...activities[activityIndex].participantes];
    updatedParticipants.splice(index, 1);

    const updatedActivity = {
      ...activities[activityIndex],
      participantes: updatedParticipants,
    };

    const updatedActivities = [...activities];
    updatedActivities[activityIndex] = updatedActivity;
    saveActivitiesToStorage(updatedActivities);
  }
};
