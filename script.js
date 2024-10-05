function procesarDatos() {
    const dataType = document.getElementById("dataType").value;
    const dataInput = document.getElementById("dataInput").value;

    let data;
    if (dataType === "numerico") {
        data = dataInput.split(",").map(Number);
        data.sort((a, b) => a - b);
    } else {
        data = dataInput.split(",").map(item => item.trim());
        data.sort();
    }

    const numColumnas = 10; // Fijar el número de columnas en 10
    const numDatos = data.length;
    const numFilas = Math.ceil(numDatos / numColumnas); // Calcular el número de filas basado en los datos

    const sortedTableBody = document.getElementById("sortedTable").querySelector("tbody");
    sortedTableBody.innerHTML = ""; // Limpiar tabla anterior

    let filaActual = null;

    for (let i = 0; i < numDatos; i++) {
        if (i % numColumnas === 0) {
            // Solo crear una nueva fila si hay datos restantes
            filaActual = document.createElement("tr");
            sortedTableBody.appendChild(filaActual);
        }

        const cell = document.createElement("td");
        cell.textContent = data[i];
        filaActual.appendChild(cell);
    }

    // Calcular estadísticas
    const min = Math.min(...data);
    const max = Math.max(...data);
    const rango = max - min;
    const numIntervalos = Math.ceil(1 + 3.32 * Math.log10(numDatos));
    const amplitudClase = Math.ceil(rango / numIntervalos);

    document.getElementById("minimo").textContent = min;
    document.getElementById("maximo").textContent = max;
    document.getElementById("rango").textContent = rango;
    document.getElementById("intervalos").textContent = numIntervalos;
    document.getElementById("amplitud").textContent = amplitudClase;

    // Generar tabla de estadísticas
    const statisticsTableBody = document.getElementById("statisticsTable").querySelector("tbody");
    statisticsTableBody.innerHTML = ""; // Limpiar tabla anterior
    let limiteInferior = min;
    let frecuenciaAcumulada = 0;

    for (let i = 0; i < numIntervalos; i++) {
        const limiteSuperior = limiteInferior + amplitudClase;
        const marcoClase = (limiteInferior + limiteSuperior) / 2;
        const frecuenciaAbsoluta = data.filter(d => d >= limiteInferior && d < limiteSuperior).length;
        frecuenciaAcumulada += frecuenciaAbsoluta;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${limiteInferior}</td>
            <td>${limiteSuperior}</td>
            <td>${marcoClase}</td>
            <td>${frecuenciaAbsoluta}</td>
            <td>${frecuenciaAcumulada}</td>
        `;
        statisticsTableBody.appendChild(row);

        limiteInferior = limiteSuperior;
    }
}
