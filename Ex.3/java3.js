function handleDateOperations(params) {
  try {
    const {
      startDate,
      endDate,
      baseDate,
      daysToAdd,
      timeZone,
      format
    } = params;

    const result = {
      daysBetween: 0,
      newDate: '',
      convertedTimeZone: '',
      formattedDate: ''
    };

    
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const base = new Date(baseDate);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime()) || isNaN(base.getTime())) {
      throw new Error("Data inválida fornecida.");
    }

    
    const diffTime = Math.abs(d2 - d1);
    result.daysBetween = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    
    const addedDate = new Date(base);
    addedDate.setDate(addedDate.getDate() + parseInt(daysToAdd));
    result.newDate = addedDate.toISOString();

    
    if (typeof timeZone === "string") {
      const options = {
        timeZone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      };
      result.convertedTimeZone = base.toLocaleString('en-US', options);
    }

    
    if (typeof format === "string") {
      result.formattedDate = base.toLocaleDateString(format);
    }

    return result;
  } catch (error) {
    return { error: error.message };
  }
}
