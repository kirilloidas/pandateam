export const getCurrentDayInterval = () => {
  const currentDate = new Date();

  const startOfDay = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 0, 0, 0));

  const endOfDay = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 23, 59, 59));

  return {
    startOfDayTimestamp: startOfDay.getTime() / 1000,
    endOfDayTimestamp: endOfDay.getTime() / 1000
  }
}
