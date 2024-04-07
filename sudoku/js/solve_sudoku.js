// Solve Sudoku

function countInArray(array, what) {
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] === what) {
      count++;
    }
  }
  return count;
}

let printSudoku = function (tabla) {
  let linea = 0;
  for (let i of tabla) {
    if (linea % 3 == 0 && linea != 0) {
      process.stdout.write("\n---------------------");
    }
    linea++;
    for (let j = 0; j < i.length; j++) {
      if (j % 9 == 0) console.log("");
      if (j % 3 == 0 && j != 0) process.stdout.write(`${"|"} `);

      process.stdout.write(`${i[j]} `);
    }
  }
  console.log("");
};

let isItPossible_row = function (elementPos, sudoku) {
  // Row --> Es posible que este en esta fila?
  if (Array.isArray(elementPos)) {
    var positionRow = elementPos[0];
    var positionCol = elementPos[1];
    var element = sudoku[positionRow][positionCol];
  } else {
    console.log("Debe passar un array con dos numeros [fila][columna].");
    return;
  }
  let arrayRow = sudoku[positionRow];
  // Contamos el numero de veces que aparece el numero en la fila
  let appearanceElement = countInArray(arrayRow, element);
  // Si el elemento ya se encuentra no puede estar ahí
  if (appearanceElement > 1) {
    return false;
  }
  return true;
};
let isItPossible_col = function (elementPos, sudoku) {
  // Column --> Es posible que este en esta columna?
  if (Array.isArray(elementPos)) {
    var positionRow = elementPos[0];
    var positionCol = elementPos[1];
    var element = sudoku[positionRow][positionCol];
  } else {
    console.log("Debe passar un array con dos numeros [fila][columna].");
    return;
  }
  let arrayCol = [];
  for (let i = 0; i < sudoku.length; i++) {
    arrayCol.push(sudoku[i][positionCol]);
  }
  // Contamos el numero de veces que aparece el numero en la columna
  let appearanceElement = countInArray(arrayCol, element);
  // Si el elemento ya se encuentra no puede estar ahí
  if (appearanceElement > 1) {
    return false;
  }
  return true;
};
let isItPossible_quadrant = function (elementPos, sudoku) {
  // Quadrant --> Es posible que este en el cuadrante?
  if (Array.isArray(elementPos)) {
    var positionRow = elementPos[0];
    var positionCol = elementPos[1];
    var element = sudoku[positionRow][positionCol];
  } else {
    console.log("Debe passar un array con dos numeros [fila][columna].");
    return;
  }
  let arrayQuadrant = [];
  // Primera fila
  if (positionRow == 0 || positionRow == 1 || positionRow == 2) {
    // Cuadrante 1
    if (positionCol == 0 || positionCol == 1 || positionCol == 2) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          arrayQuadrant.push(sudoku[i][j]);
        }
      }
      // Cuadrante 2
    } else if (positionCol == 3 || positionCol == 4 || positionCol == 5) {
      for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 6; j++) {
          arrayQuadrant.push(sudoku[i][j]);
        }
      }
      // Cuadrante 3
    } else {
      for (let i = 0; i < 3; i++) {
        for (let j = 6; j < 9; j++) {
          arrayQuadrant.push(sudoku[i][j]);
        }
      }
    }
  }
  // Segunda fila
  if (positionRow == 3 || positionRow == 4 || positionRow == 5) {
    // Cuadrante 4
    if (positionCol == 0 || positionCol == 1 || positionCol == 2) {
      for (let i = 3; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
          arrayQuadrant.push(sudoku[i][j]);
        }
      }
      // Cuadrante 5
    } else if (positionCol == 3 || positionCol == 4 || positionCol == 5) {
      for (let i = 3; i < 6; i++) {
        for (let j = 3; j < 6; j++) {
          arrayQuadrant.push(sudoku[i][j]);
        }
      }
      // Cuadrante 6
    } else {
      for (let i = 3; i < 6; i++) {
        for (let j = 6; j < 9; j++) {
          arrayQuadrant.push(sudoku[i][j]);
        }
      }
    }
  }
  // tercera fila
  if (positionRow == 6 || positionRow == 7 || positionRow == 8) {
    // Cuadrante 7
    if (positionCol == 0 || positionCol == 1 || positionCol == 2) {
      for (let i = 6; i < 9; i++) {
        for (let j = 0; j < 3; j++) {
          arrayQuadrant.push(sudoku[i][j]);
        }
      }
      // Cuadrante 8
    } else if (positionCol == 3 || positionCol == 4 || positionCol == 5) {
      for (let i = 6; i < 9; i++) {
        for (let j = 3; j < 6; j++) {
          arrayQuadrant.push(sudoku[i][j]);
        }
      }
      // Cuadrante 9
    } else {
      for (let i = 6; i < 9; i++) {
        for (let j = 6; j < 9; j++) {
          arrayQuadrant.push(sudoku[i][j]);
        }
      }
    }
  }
  // Contamos el numero de veces que aparece el numero en el cuadrante
  let appearanceElement = countInArray(arrayQuadrant, element);
  // Si el elemento ya se encuentra no puede estar ahí
  if (appearanceElement > 1) {
    return false;
  }
  return true;
};

function isItPossible(elementPos, sudoku) {
  if (
    isItPossible_row(elementPos, sudoku) == true &&
    isItPossible_col(elementPos, sudoku) == true &&
    isItPossible_quadrant(elementPos, sudoku) == true
  ) {
    return true;
  } else {
    return false;
  }
}

// Devuelve el siguiente numero disponible con su fila y col, devuelve undefined si no hay numero posible
let giveValuesUntil9 = function (currentNumber, row, col, sudoku) {
  if (currentNumber < 10) {
    sudoku[row][col] = currentNumber;
    if (isItPossible([row, col], sudoku) == true) {
      // Guardamos la posicion del elemento y su valor como un array de longitud 3 dentro de un array
      let array = [row, col, currentNumber];
      // Salimos del bucle porque el numero puede ser correcto
      return array;
    }
    // Devuelve el valor actual con fila y columna
    return giveValuesUntil9(currentNumber + 1, row, col, sudoku);

  } else {
    // Si el currentNumber es 9 y no puede estar ahí
    sudoku[row][col] = 0;
    return undefined;
  }
};

function resolveSudoku(sudoku) {
  printSudoku(sudoku);
  var emptyCells = [];
  let newPreviousNumber = 1;
  // Recorremos array
  for (let row = 0; row < sudoku.length; row++) {
    for (let col = 0; col < sudoku[row].length; col++) {
      let element = sudoku[row][col];
      // Solo buscamos/tocamos los elementos vacíos(que tengan 0)
      if (element === 0) {
        let a = giveValuesUntil9(newPreviousNumber, row, col, sudoku);
        if (a == undefined) {
          // En este while tiramos hacia atras hasta que quepa algún número en algúna casilla
          while (a == undefined) {
            // Si no puede estar ahí tenemos que volver atras
            let previousElement = emptyCells[emptyCells.length - 1];
            // Buscamos el numero posible del elemento anterior
            a = giveValuesUntil9(
              previousElement[2] + 1,
              previousElement[0],
              previousElement[1],
              sudoku
            );
            // Si elemento anterior no cabe otro numero tampoco, tenemos que retroceder más
            if (a == undefined) emptyCells.pop();
          }
        }
        // Comprobamos si ya hay registro de esa celda
        let previousElement = emptyCells[emptyCells.length - 1];
        // Si no esta lo metemos a las lista de las celdas vacias
        if (
          emptyCells.length == 0 ||
          !(previousElement[0] == a[0] && previousElement[1] == a[1])
        ) {
          emptyCells.push(a);
        } else {
          previousElement[2] = a[2];
          row = previousElement[0];
          col = previousElement[1] - 1;
        }
        // console.log(emptyCells);
        // printSudoku(sudoku);
      }
    }
  }
  console.log("\n");
  console.log("El resultado final es: ");
  printSudoku(sudoku)
  console.log(sudoku);
  
  return sudoku;
}

let sudoku1 = [
  [4, 0, 3, 0, 2, 0, 0, 7, 1],
  [2, 6, 0, 0, 5, 0, 0, 4, 9],
  [9, 0, 8, 4, 0, 0, 0, 5, 6],

  [0, 4, 2, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 9, 1, 5],
  [1, 0, 9, 5, 0, 0, 0, 0, 7],

  [3, 8, 0, 2, 0, 9, 7, 0, 0],
  [0, 2, 1, 0, 3, 0, 5, 0, 8],
  [7, 9, 0, 0, 0, 0, 0, 0, 0],
];

let sudoku2 = [
  [0, 7, 0, 0, 9, 2, 0, 1, 0],
  [4, 0, 0, 8, 0, 5, 0, 6, 3],
  [5, 0, 1, 0, 0, 0, 0, 0, 8],
  [8, 3, 0, 9, 4, 0, 0, 0, 7],
  [0, 9, 0, 0, 0, 3, 2, 0, 0],
  [7, 0, 5, 1, 2, 0, 3, 0, 0],
  [9, 0, 0, 3, 0, 0, 6, 7, 2],
  [2, 0, 7, 4, 0, 9, 0, 0, 0],
  [6, 0, 0, 0, 0, 7, 5, 4, 0],
];

// Main
//printSudoku(sudoku);
//console.log("El resultado final es ", isItPossible([0, 1], sudoku));
//var sudokuResuelto = resolveSudoku(sudoku);
//console.log(sudokuResuelto);

var sudokuResuelto2 = resolveSudoku(sudoku2);


// console.log(sudokuResuelto2);
