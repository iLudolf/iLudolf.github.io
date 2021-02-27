$(function(){
    
    
    Dashboard01()
   

  

        'use strict'

    	

        $.plot('#flotChart1', [{
          data: dashData2,
          color: '#00cccc'
        }], {
    			series: {
    				shadowSize: 5,
            lines: {
              show: true,
              lineWidth: 2,
              fill: true,
              fillColor: { colors: [ { opacity: 0.2 }, { opacity: 0.2 } ] }
            }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: false,
            min: 0,
            max: 35
          },
    			xaxis: {
            show: false,
            max: 50
          }
    		});

        $.plot('#flotChart2', [{
          data: dashData2,
          color: '#007bff'
        }], {
    			series: {
    				shadowSize: 10,
            bars: {
              show: true,
              lineWidth: 0,
              fill: 1,
              barWidth: .5
            }
    			},
          grid: {
            borderWidth: 0,
            labelMargin: 0
          },
    			yaxis: {
            show: false,
            min: 0,
            max: 35
          },
    			xaxis: {
            show: false,
            max: 20
          }
    		});


        //-------------------------------------------------------------//


        // Line chart
        $('.peity-line').peity('line');

        // Bar charts
        $('.peity-bar').peity('bar');

        // Bar charts
        $('.peity-donut').peity('donut');

        var ctx5 = document.getElementById('chartBar5').getContext('2d');
        new Chart(ctx5, {
          type: 'bar',
          data: {
            labels: [0,1,2,3,4,5,6,7],
            datasets: [{
              data: [2, 4, 10, 20, 45, 40, 35, 18],
              backgroundColor: '#560bd0'
            }, {
              data: [3, 6, 15, 35, 50, 45, 35, 25],
              backgroundColor: '#cad0e8'
            }]
          },
          options: {
            maintainAspectRatio: false,
            tooltips: {
              enabled: false
            },
            legend: {
              display: false,
                labels: {
                  display: false
                }
            },
            scales: {
              yAxes: [{
                display: false,
                ticks: {
                  beginAtZero:true,
                  fontSize: 11,
                  max: 80
                }
              }],
              xAxes: [{
                barPercentage: 0.6,
                gridLines: {
                  color: 'rgba(0,0,0,0.08)'
                },
                ticks: {
                  beginAtZero:true,
                  fontSize: 11,
                  display: false
                }
              }]
            }
          }
        });

        // Donut Chart
        var datapie = {
          labels: ['Search', 'Email', 'Referral', 'Social', 'Other'],
          datasets: [{
            data: [25,20,30,15,10],
            backgroundColor: ['#6f42c1', '#007bff','#17a2b8','#00cccc','#adb2bd']
          }]
        };

        var optionpie = {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: false,
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        };

        // For a doughnut chart
        var ctxpie= document.getElementById('chartDonut');
        var myPieChart6 = new Chart(ctxpie, {
          type: 'doughnut',
          data: datapie,
          options: optionpie
        });

      });

function Dashboard01(){ 
    
// Conexão com a API 
 fetch('http://iludolf.ddns.net:3000/global',{
    method:'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8' ,
        'X-Access-Token': '5cf9dfd5-3449-485e-b5ae-70a60e997864', 
        'Accept': 'application/json',        
        'mode': 'cors',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/' // solicitações sem credenciais , o valor literal "*" 
               
 }})

 .then(response => {
   return response.json();
   
 })
 
  //Retorno fetch
  .then(data =>{   
    let num = data.length-1;

    // // Pegar data da atualização
    var aux = ""+data[num].Data
    aux.substring()

    let dia, mes, ano, calc; 
    dia =  aux.substring(8,10)
    mes =  aux.substring(5,7)
    ano =  aux.substring(0,4)
   
    // //Atualizar Data
    var att = dia +"/"+ mes+"/"+ano
    document.querySelector("#idAtualizacao").innerHTML ="Atualizado em: "+ att;
    
    //DATA FINAL
    document.querySelector("#idDataFinal").innerHTML = att;
    
      
    //Atualizar Total de Casos
    document.querySelector("#idTotalDeCasos").innerHTML = data[num].TotalConfirmed.substring(0,3)+ ' M';

    //Atualizar Recuperados
    document.querySelector("#idRecuperados").innerHTML = data[num].TotalRecovered.substring(0,2)+ ',' +data[num].TotalRecovered.substring(2,3) + ' M';

    //Atualizar Recuperados
    document.querySelector("#idObitos").innerHTML = data[num].TotalDeaths.substring(0,1) +',' + data[num].TotalDeaths.substring(1,2 )+ ' M' ;

    aux = ""+((data[num].TotalDeaths / data[num].TotalConfirmed) *100 )+""
    calc = aux.substring(0,3)
    // //Atualizar Taxa de Mortalidade
    
    document.querySelector("#TaxadeMortalidade").innerHTML =  calc+"%"; 

    var plot = $.plot('#flotChart', [{
       
        data: flotSampleData3,
        color: '#007bff',
        lines: {
          fillColor: { colors: [{ opacity: 0 }, { opacity: 0.2 }]}
        }
      },{
        data: flotSampleData4,
        color: '#560bd0',
        lines: {
          fillColor: { colors: [{ opacity: 0 }, { opacity: 0.2 }]}
        }
      }], {
              series: {
                  shadowSize: 5,
          lines: {
            show: true,
            lineWidth: 2,
            fill: true
          }
              },
        grid: {
          borderWidth: 0,
          labelMargin: 8
        },
              yaxis: {
          show: true,
                  min: 0,
                  max: 100,
          ticks: [[0,''],[20,'20K'],[40,'40K'],[60,'60K'],[80,'80K']],
          tickColor: '#eee'
              },
              xaxis: {
          show: true,
          color: '#fff',
          ticks: [[10,data[num-5].Data.substring(0,10)],[30,data[num-4].Data.substring(0,10)],[50,data[num-3].Data.substring(0,10)],[70,data[num-2].Data.substring(0,10)],[90,data[num-1].Data.substring(0,10)],[110,data[num].Data.substring(0,10)]],
        }
      });

   }); // fim do fetch
} // Fim da Função



