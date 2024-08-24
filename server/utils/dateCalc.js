 const getDateRange = (sort, startDate, endDate) => {
    let start, end;
  
    const setStartEnd = (startDate, endDate) => {
      start = startDate ? new Date(startDate) : new Date(0);
      end = endDate ? new Date(endDate) : new Date();
      end.setHours(23, 59, 59, 999); // End of the provided end date
    };
  
    switch (sort) {
      case "day":
        start = new Date();
        start.setHours(0, 0, 0, 0); // Start of today
        end = new Date();
        end.setHours(23, 59, 59, 999); // End of today
        break;
      case "week":
        const currentDate = new Date();
        const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
        start = new Date(currentDate.setDate(firstDayOfWeek));
        start.setHours(0, 0, 0, 0); // Start of the week
        end = new Date();
        end.setHours(23, 59, 59, 999); // End of the current day
        break;
      case "month":
        start = new Date();
        start.setDate(1); // Start of the current month
        start.setHours(0, 0, 0, 0);
        end = new Date(start.getFullYear(), start.getMonth() + 1, 0); // End of the current month
        end.setHours(23, 59, 59, 999);
        break;
      case "year":
        start = new Date();
        start.setMonth(0, 1); // Start of the current year (January 1st)
        start.setHours(0, 0, 0, 0);
        end = new Date(start.getFullYear(), 11, 31); // End of the current year (December 31st)
        end.setHours(23, 59, 59, 999);
        break;
      default:
        setStartEnd(startDate, endDate);
    }
  
    return { start, end };
  };

  export default getDateRange