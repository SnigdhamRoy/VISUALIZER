let pyodideReady = false;

async function loadPyodideAndPackages() {
  window.pyodide = await loadPyodide();
  pyodideReady = true;
}

loadPyodideAndPackages();

async function runPythonSort() {
  if (!pyodideReady) {
    alert("Pyodide is still loading. Please wait.");
    return;
  }

  const input = document.getElementById("inputArray").value;
  const array = input.split(',').map(Number).filter(n => !isNaN(n));
  const pyCode = `
import time

def bubble_sort(arr):
    states = []
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
            states.append(arr[:])
    return states

bubble_sort(${JSON.stringify(array)})
  `;
  let result = await pyodide.runPythonAsync(pyCode);
  animate(result.toJs());
}

function animate(states) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  let i = 0;

  function drawState() {
    if (i >= states.length) return;
    const arr = states[i];
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / arr.length;
    const maxVal = Math.max(...arr);

    for (let j = 0; j < arr.length; j++) {
      const barHeight = (arr[j] / maxVal) * height;
      ctx.fillStyle = '#007bff';
      ctx.fillRect(j * barWidth, height - barHeight, barWidth - 2, barHeight);
    }

    i++;
    setTimeout(drawState, 100);
  }

  drawState();
}
