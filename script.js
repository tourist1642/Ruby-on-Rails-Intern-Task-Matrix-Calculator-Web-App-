function createMatrixInput(rows, cols, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
  
    for (let i = 0; i < rows; i++) {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('matrix-row');
  
      for (let j = 0; j < cols; j++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `(${i + 1},${j + 1})`;
        rowDiv.appendChild(input);
      }
  
      container.appendChild(rowDiv);
    }
  }
  
  function multiplyMatrices() {
    const matrix1Rows = parseInt(document.getElementById('matrix1Rows').value);
    const matrix1Cols = parseInt(document.getElementById('matrix1Cols').value);
    const matrix2Rows = parseInt(document.getElementById('matrix2Rows').value);
    const matrix2Cols = parseInt(document.getElementById('matrix2Cols').value);
  
    if (matrix1Cols !== matrix2Rows) {
      document.getElementById('resultMessage').innerText = 'Matrix multiplication not possible';
      document.getElementById('resultMatrix').innerHTML = '';
      document.querySelector('.result-section').style.display = 'block';
      return;
    }
  
    const matrix1Values = getMatrixValues(matrix1Rows, matrix1Cols, 'matrix1Values');
    const matrix2Values = getMatrixValues(matrix2Rows, matrix2Cols, 'matrix2Values');
  
    const resultMatrix = performMatrixMultiplication(matrix1Values, matrix2Values);
  
    displayResult(resultMatrix);
  }
  
  function getMatrixValues(rows, cols, containerId) {
    const container = document.getElementById(containerId);
    const inputs = container.querySelectorAll('input');
    const values = [];
  
    let index = 0;
    for (let i = 0; i < rows; i++) {
      values[i] = [];
      for (let j = 0; j < cols; j++) {
        values[i][j] = parseFloat(inputs[index].value);
        index++;
      }
    }
  
    return values;
  }
  
  function performMatrixMultiplication(matrix1, matrix2) {
    const resultMatrix = [];
    for (let i = 0; i < matrix1.length; i++) {
      resultMatrix[i] = [];
      for (let j = 0; j < matrix2[0].length; j++) {
        resultMatrix[i][j] = 0;
        for (let k = 0; k < matrix1[0].length; k++) {
          resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
        }
      }
    }
    return resultMatrix;
  }
  
  function displayResult(resultMatrix) {
    const resultMessage = document.getElementById('resultMessage');
    const resultTable = document.getElementById('resultMatrix');
    resultTable.innerHTML = '';
    resultMessage.innerText = 'Result:';
    document.querySelector('.result-section').style.display = 'block';
  
    for (let i = 0; i < resultMatrix.length; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j < resultMatrix[i].length; j++) {
        const cell = document.createElement('td');
        cell.textContent = resultMatrix[i][j];
        row.appendChild(cell);
      }
      resultTable.appendChild(row);
    }
  }
  
  document.getElementById('matrix1Rows').addEventListener('change', function () {
    const rows = parseInt(this.value);
    const cols = parseInt(document.getElementById('matrix1Cols').value);
    createMatrixInput(rows, cols, 'matrix1Values');
  });
  
  document.getElementById('matrix1Cols').addEventListener('change', function () {
    const rows = parseInt(document.getElementById('matrix1Rows').value);
    const cols = parseInt(this.value);
    createMatrixInput(rows, cols, 'matrix1Values');
  });
  
  document.getElementById('matrix2Rows').addEventListener('change', function () {
    const rows = parseInt(this.value);
    const cols = parseInt(document.getElementById('matrix2Cols').value);
    createMatrixInput(rows, cols, 'matrix2Values');
  });
  
  document.getElementById('matrix2Cols').addEventListener('change', function () {
    const rows = parseInt(document.getElementById('matrix2Rows').value);
    const cols = parseInt(this.value);
    createMatrixInput(rows, cols, 'matrix2Values');
  });
  