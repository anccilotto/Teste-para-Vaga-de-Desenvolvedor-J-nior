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

    // Validar datas
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const base = new Date(baseDate);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime()) || isNaN(base.getTime())) {
      throw new Error("Data inválida fornecida.");
    }

    // 1. Diferença entre duas datas (em dias)
    const diffTime = Math.abs(d2 - d1);
    result.daysBetween = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // 2. Adicionar dias a uma data
    const addedDate = new Date(base);
    addedDate.setDate(addedDate.getDate() + parseInt(daysToAdd));
    result.newDate = addedDate.toISOString();

    // 3. Converter para outro fuso horário
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

    // 4. Formatar data
    if (typeof format === "string") {
      result.formattedDate = base.toLocaleDateString(format);
    }

    return result;
  } catch (error) {
    return { error: error.message };
  }
}
