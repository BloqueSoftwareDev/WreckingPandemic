let myChart = null;

function getUsers() {
    let response = fetch('http://localhost:5000/api/gamedata')
        .then(response => response.json()).then(data => {

            let data_nivel1_intentos = 0;
            let data_nivel1_tiempo = 0;
            let data_nivel2_intentos = 0;
            let data_nivel2_tiempo = 0;
            let data_nivel3_intentos = 0;
            let data_nivel3_tiempo = 0;
            let data_nivel1_counter = 0;
            let data_nivel2_counter = 0;
            let data_nivel3_counter = 0;

            for (i = 0; i < data.length; i++) {
                if (data[i].Level == 1) {
                    data_nivel1_tiempo += parseInt(data[i].Tiempo);
                    data_nivel1_intentos += parseInt(data[i].IntentosFallidos);   
                    data_nivel1_counter++;
                }

                if (data[i].Level == 2) {
                    data_nivel2_tiempo += parseInt(data[i].Tiempo);
                    data_nivel2_intentos += parseInt(data[i].IntentosFallidos);   
                    data_nivel2_counter++;                 
                }

                if (data[i].Level == 3) {
                    data_nivel3_tiempo += parseInt(data[i].Tiempo);
                    data_nivel3_intentos += parseInt(data[i].IntentosFallidos); 
                    data_nivel3_counter++;                   
                }
            }

            console.log("Intentos fallidos: " + data_nivel1_intentos);

            let dataObj = {
                labels: ['Intentos fallidos', 'Tiempo'],
    
    
                datasets: [{
                    label: 'Nivel 1',
                    data: [data_nivel1_intentos/data_nivel1_counter, data_nivel1_tiempo/data_nivel1_counter],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
    
                {
                    label: 'Nivel 2',
                    data: [data_nivel2_intentos/data_nivel2_counter, data_nivel2_tiempo/data_nivel2_counter],
                    backgroundColor: 'rgba(184, 242, 48, 0.5)',
                    borderColor: 'rgba(184, 242, 48, 1)',
                    borderWidth: 1
                },
    
                {
                    label: 'Nivel 3',
                    data: [data_nivel3_intentos/data_nivel3_counter, data_nivel3_tiempo/data_nivel3_counter],
                    backgroundColor: 'rgba(13, 163, 148, 0.5)',
                    borderColor: 'rgba(13, 163, 148, 1)',
                    borderWidth: 1
                }]
            };

            myChart.data = dataObj;
            myChart.update();





        })

}


function main()
{
    var ctx = document.getElementById('Chart');
    myChart = new Chart(ctx, {
        type: 'bar',
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}