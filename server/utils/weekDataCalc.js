export const getStartAndEndOfWeek = () => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
    startOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00
  
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6)); // Saturday
    endOfWeek.setHours(23, 59, 59, 999); // Set time to 23:59:59
  
    return { startOfWeek, endOfWeek };
  };