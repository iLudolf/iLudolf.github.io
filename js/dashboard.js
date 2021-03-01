$(function(){
    
    
  Dashboard01GlobalTotaldeCasos()
   

  


    	

        


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

function Dashboard01GlobalTotaldeCasos(){ 
    
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
    var num = data.length-1;

 
    // // Pegar data da atualização
    var aux = ""+data[num].Data
    aux.substring()

    var dia, mes, ano, calc; 
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

     
    

    // Dashboard 01 
      var ctx1 = document.getElementById('flotChart0');
      new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: [data[num-5].Data.substring(0,10), data[num-4].Data.substring(0,10), data[num-3].Data.substring(0,10), data[num-2].Data.substring(0,10), data[num-1].Data.substring(0,10), data[num].Data.substring(0,10)],
          datasets: [{
            label: '#Caos Confirmados',          
            data: [data[num-5].TotalConfirmed, data[num-4].TotalConfirmed, data[num-3].TotalConfirmed, data[num-2].TotalConfirmed, data[num-1].TotalConfirmed, data[num].TotalConfirmed],
            backgroundColor: '#560bd0'
          }]
        },
        
        options: {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            display: false,
              labels: {
                display: false
              }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true,
                fontSize: 0,
                max: 152993202,
              }
            }],
            xAxes: [{
              barPercentage: 0.6,
              ticks: {
                beginAtZero:true,
                fontSize: 11
              }
            }]
          }
        }
      }); // fim Dashboard 01 
  
      // Dashboard 02 

      //Calcular taxa de crescimento de casos
      var calcularPorcentAtual =  ""+(((data[num-1].TotalConfirmed - data[num].TotalConfirmed)/data[num-1].TotalConfirmed)*100); 
      var calcularPorcentAnterior = ""+(((data[num-1].TotalConfirmed - data[num-2].TotalConfirmed)/data[num-2].TotalConfirmed)*100); 
      var calctest =  calcularPorcentAnterior.substring(0,4) - calcularPorcentAtual.substring(0,4)+"";

    

      if( calcularPorcentAtual > calcularPorcentAnterior){
        // console.log("Numero de casos é maior" )
        document.querySelector("#porcentAtual").innerHTML = calcularPorcentAtual.substring(1,4)+"%" +'<i id="icoPorcentAtual" class="icon ion-md-trending-up tx-success"></i> <small>'+calctest.substring(0,4)+'%</small>';

      }if( calcularPorcentAtual < calcularPorcentAnterior){
        // console.log("Numero de casos é menor" )
        document.querySelector("#porcentAtual").innerHTML = calcularPorcentAtual.substring(1,4)+"%" +'<i id="icoPorcentAtual" class="icon ion-md-trending-down tx-danger"></i> <small>'+calctest.substring(0,4)+'%</small>';
      
        
      }
    
       //Base de dados        
       var dashData2 = [];
          
     
      //Preencher base de dados
      for(indice in data){
        dashData2.push([data[indice].ID,data[indice].TotalConfirmed])
          
       } 
        
      // console.table(dashData2)
      
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
          max: data[num].TotalConfirmed,
        },
        xaxis: {
          show: false,
          max: data.length,
        }
      }); // fim do Dashboard 02 

      //Dashboard 03 
       
      
       //Base de dados        
       var dashData3 = [];
          
     
      //Preencher base de dados
      for(indice in data){
        dashData3.push([data[indice].ID,data[indice].NewConfirmed])
          
       } 


       //Calcular taxa de NOVOS  casos
      var calcularPorcentAtual =  ""+(((data[num-1].NewConfirmed - data[num].NewConfirmed)/data[num-1].NewConfirmed)*100); 
      var calcularPorcentAnterior = ""+(((data[num-1].NewConfirmed - data[num-2].NewConfirmed)/data[num-2].NewConfirmed)*100); 
      var calctest =  calcularPorcentAnterior.substring(0,4) - calcularPorcentAtual.substring(0,4)+"";

    console.log("Passado: " +data[num-1].NewConfirmed)
    console.log("Presente: " +data[num].NewConfirmed)

      if( calcularPorcentAtual > calcularPorcentAnterior){
        // console.log("Numero de casos é maior" )
        document.querySelector("#totaldeCasos").innerHTML = calcularPorcentAtual.substring(0,4)+"%" +'<i id="icoPorcentAtual" class="icon ion-md-trending-up tx-success"></i> <small>'+calctest.substring(0,4)+'%</small>';

      }if( calcularPorcentAtual < calcularPorcentAnterior){
        // console.log("Numero de casos é menor" )
        document.querySelector("#totaldeCasos").innerHTML = calcularPorcentAtual.substring(0,4)+"%" +'<i id="icoPorcentAtual" class="icon ion-md-trending-down tx-danger"></i> <small>'+calctest.substring(0,4)+'%</small>';
               
      }
        
           
      
      $.plot('#flotChart2', [{
        data: dashData3,
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
          min: 100,
          max: data[num].NewConfirmed
        },
        xaxis: {
          show: false,
          max: 10
        }
      });

    

   }); // fim do fetch
} // Fim da Função



