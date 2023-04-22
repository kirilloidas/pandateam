export const getCurrentDayInterval = () => {
  const currentDate = new Date();

  const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);

  const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

  return {
    startOfDayTimestamp: startOfDay.getTime() / 1000,
    endOfDayTimestamp: endOfDay.getTime() / 1000
  }
}