function processMatrix(matrix) {
  const sumRows = [];
  const sumColumns = [];
  let diagonalPrincipal = 0;
  let diagonalSecundaria = 0;

  const rowCount = matrix.length;
  const colCount = matrix[0]?.length || 0;

  
  for (let i = 0; i < rowCount; i++) {
    let rowSum = 0;
    for (let j = 0; j < matrix[i].length; j++) {
      rowSum += matrix[i][j];
    }
    sumRows.push(rowSum);
  }

  
  for (let j = 0; j < colCount; j++) {
    let colSum = 0;
    for (let i = 0; i < rowCount; i++) {
      
      if (j < matrix[i].length) {
        colSum += matrix[i][j];
      }
    }
    sumColumns.push(colSum);
  }

   
  if (rowCount === colCount) {
    for (let i = 0; i < rowCount; i++) {
      diagonalPrincipal += matrix[i][i];
      diagonalSecundaria += matrix[i][rowCount - 1 - i];
    }
  }

  return {
    sumRows,
    sumColumns,
    diagonalPrincipal,
    diagonalSecundaria
  };
}
