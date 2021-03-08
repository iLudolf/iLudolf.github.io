$(function(){
      
  Dashboard01();
  Dashboard02();
  Dashboard03();
  Dashboard04();
  Dashboard05();
  tableCountries();
  spinner();
        //-------------------------------------------------------------//

        // Line chart
        $('.peity-line').peity('line');

        // Bar charts
        $('.peity-bar').peity('bar');

        // Bar charts
        $('.peity-donut').peity('donut'); 
     


        
      });

function Dashboard01(){ 
    
// Conexão com a API 
 fetch('https://iludolf.ddns.net:3000/global',{
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
    const num = data.length-1;
   
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
    document.querySelector("#idTotalDeCasos").innerHTML = abreviarNum(data[num].TotalConfirmed);

    //Atualizar Recuperados
    document.querySelector("#idRecuperados").innerHTML = abreviarNum(data[num].TotalRecovered);

    //Atualizar Recuperados
    document.querySelector("#idObitos").innerHTML =  abreviarNum(data[num].TotalDeaths);

    aux = ""+((data[num].TotalDeaths / data[num].TotalConfirmed) *100 )+""
    
    
    // //Atualizar Taxa de Mortalidade
    
    document.querySelector("#TaxadeMortalidade").innerHTML = abreviarNum(aux)+"%"; 

     // Dashboard 01 

     //Base de dados        
     var dashData0 = []; //dados total de casos confirmados
     var dashData1 = []; //dados total de registros por data   
     var dashData01 = [] //Novos Casos
     
     //Preencher base de dados
     for(indice in data){
      dashData0.push(data[indice].TotalConfirmed)
      dashData01.push(data[indice].NewConfirmed)
      dashData1.push(data[indice].Data.substring(0,10))   

           } 

  
       
  /** AREA CHART **/
  var ctx3 = document.getElementById('flotChart0').getContext('2d');
  var ctx9 = document.getElementById('flotChart0');

  var gradient1 = ctx3.createLinearGradient(0, 350, 0, 0);
  gradient1.addColorStop(0, 'rgba(241,0,117,0)');
  gradient1.addColorStop(1, 'rgba(241,0,117,.5)');

  
  var gradient2 = ctx3.createLinearGradient(0, 280, 0, 0);
  gradient2.addColorStop(0, 'rgba(0,123,255,0)');
  gradient2.addColorStop(1, 'rgba(0,123,255,.3)');

  new Chart(ctx9, {
    type: 'line',
    data: {
      labels: dashData1,
     
      datasets: [{
        label: 'Casos Confirmados',
        data: dashData0,
        borderColor: '#512E5F',
        borderWidth: 1,
        backgroundColor: gradient1,
            
      },{        
        label: 'Novos Casos',
        data: dashData01,
        borderColor: '#007bff',
        borderWidth: 1,
        backgroundColor: gradient2,
           }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
          position: "bottom",
          display: true,
          labels: {            
            display: true,
                      }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:false,
            fontSize: 10,             
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero:false,
            fontSize: 10,
            display: false

          }
        }]
      }
    }
  });// fim Dashboard  
      
    }); // fim do fetch 


 

  } // Fim da Função

function Dashboard02() {

  // Conexão com a API 
fetch('https://iludolf.ddns.net:3000/global',{
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
    
  const num = data.length-1;
    
 





   //Calcular taxa de crescimento de casos
   var calcularPorcentAtual =  ""+(((data[num].TotalConfirmed - data[num-1].TotalConfirmed)/data[num-1].TotalConfirmed)*100); 
   var calcularPorcentAnterior = ""+(((data[num-1].TotalConfirmed - data[num-2].TotalConfirmed)/data[num-2].TotalConfirmed)*100); 
   

   if(data[num].TotalConfirmed > data[num-1].TotalConfirmed){
     // Se Numero de casos for maior que a dia anterior
     document.querySelector("#porcentAtual").innerHTML =  abreviarNum(data[num].TotalConfirmed)+'<i id="icoPorcentAtual" class="icon ion-md-trending-up tx-success"></i><small>'+abreviarNum(calcularPorcentAtual)+'%</small>';

   }if( data[num].TotalConfirmed < data[num-1].TotalConfirmed){
     //Se Numero de casos for menor que a dia anterior
     document.querySelector("#porcentAtual").innerHTML =  abreviarNum(data[num].TotalConfirmed)+' M<i id="icoPorcentAtual" class="icon ion-md-trending-down tx-danger"></i> <small>'+abreviarNum(calcularPorcentAtual)+'%</small>';
   
     
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

      }); // fim do fetch 
  }

function Dashboard03() {

  // Conexão com a API 
 fetch('https://iludolf.ddns.net:3000/global',{
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
 
  const num = data.length-1;
                  
      //Base de dados        
       var dashData3 = [];          
     
       //Preencher base de dados
       for(indice in data){
         dashData3.push([data[indice].ID,data[indice].NewConfirmed])
           
        } 
 
       //Calcular taxa de NOVOS  casos
       var calcularPorcentAtualNew =  ""+(((data[num].NewConfirmed - data[num-1].NewConfirmed)/data[num-1].NewConfirmed)*100); 
      
     
 
       if(data[num].NewConfirmed > data[num-1].NewConfirmed){
         // console.log("Numero de casos é maior" )
         document.querySelector("#totaldeCasos").innerHTML = data[num].NewConfirmed.substring(0,3)+" mil" +'<i id="icoPorcentAtual" class="icon ion-md-trending-up tx-success"></i> <small>'+calcularPorcentAtualNew.substring(0,2)+'%</small>';
 
       }if(data[num].NewConfirmed < data[num-1].NewConfirmed){
         // console.log("Numero de casos é menor" )
         document.querySelector("#totaldeCasos").innerHTML =  data[num].NewConfirmed.substring(0,3)+" mil" +'<i id="icoPorcentAtual" class="icon ion-md-trending-down tx-danger"></i> <small>'+calcularPorcentAtualNew.substring(0,2)+'%</small>';
                
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
           min: 10,
           max: 411833
         },
         xaxis: {
           show: false,
           max: num
         }
       
       }); //Fim do Dashboard 03     
   
  }); // fim do fetch 

  }  

function Dashboard04() {

  // Conexão com a API 
 fetch('https://iludolf.ddns.net:3000/global',{
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
  const num = data.length-1;     
    // Dashboard 04 

  //Base de dados        
  var totalCData03 = []; //dados total de casos confirmados
  var newCData03 = []; //dados total de registros por data   
  var dData03 = [] //Novos Casos
  
  var valor= data[num].NewConfirmed.length;
  console.log()
  //Preencher base de dados
  for(indice in data){   
    newCData03.push(parseInt(data[indice].NewConfirmed))
    dData03.push(data[indice].Data.substring(0,10))   

        } 



var ctx3 = document.getElementById('chartBar5').getContext('2d');

  var gradient = ctx3.createLinearGradient(0, 0, 0, 250);
  gradient.addColorStop(0, '#560bd0');
  gradient.addColorStop(1, '#00cccc');

  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: dData03,      
      datasets: [{
        label: 'Novos Casos',
        data: newCData03,
        backgroundColor: gradient
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
            display: false,
            beginAtZero:true,
            fontSize: 10,
               }
        }],
        xAxes: [{
          barPercentage: 0.6,
          ticks: {
            display: false,
            beginAtZero:true,
            fontSize: 11
            
          }
        }]
      }
    }
  });
      
 
      
     
  document.querySelector("#novosCasos").innerHTML = calcularPorcentAtualNew.substring(0,2)+'%';
    
    
    //Fim Dashboard 
  }); // fim do fetch 

  }  

function Dashboard05() {
 
       //TABELA - PAIS
       var dataAtual = new Date();
       var dia = dataAtual.getDate();
       var mes = (dataAtual.getMonth() + 1);
       var ano = dataAtual.getFullYear();
      //  var horas = dataAtual.getHours();
      //  var minutos = dataAtual.getMinutes();
 
 
      
      

    const url = `https://iludolf.ddns.net:3000/countries/${dataAtualFormatada()}`; 
       
    fetch(url,{
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
 
    var dadosPais ="";
    var color = ['bg-purple','bg-primary','bg-info', 'bg-teal', 'bg-gray'];
    var dashdata =[];

    for(var i = 0; i <= 4; i++){
      dashdata.push(data[i].Country); 

      dadosPais += '<div class="az-traffic-detail-item">'+
      '<div>'+
      '<span>'+data[i].Country+'</span>'+
      '<span>'+abreviarNum(data[i].TotalConfirmed)+'<span></span></span>'+
      '</div>'+
      '<div class="progress">'+
     '<div class="progress-bar '+color[i]+' wd-25p"  style="width: '+abreviarNum(data[i].TotalConfirmed).toString(0,3)+'%"  role="progressbar" aria-valuenow="'+data[i].TotalConfirmed+'" aria-valuemin="0" aria-valuemax="115619777"></div>'+
     '</div>'+
     '</div>';
    
    }
    console.log(dashdata);
    document.querySelector("#teste").innerHTML = dadosPais;
    
    // Donut Chart
    var datapie = {
      labels: dashdata,
      //  [data[0].Country, data[1].Country, data[2].Country, data[3].Country, data[4].Country],
      datasets: [{
        data: [data[0].TotalConfirmed, data[1].TotalConfirmed, data[2].TotalConfirmed, data[3].TotalConfirmed,data[4].TotalConfirmed],
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




     }); // fim do fetch 

  }  

function tableCountries() {
  
  
         

       const url = `https://iludolf.ddns.net:3000/countries/${dataAtualFormatada()}`; 
    
       fetch(url,{
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
    
      const num = data.length-1;
     console.log(data[num].Country);
      var paises = "";
       

      for (key in data) {         
       
        paises += '<tr>'+
       '<td><i class="flag-icon flag-icon-'+data[key].CountryCode.toLowerCase()+' flag-icon-squared"></i></td>'+
       '<td><strong>'+data[key].Country+'</strong></td>'+
       '<td><strong>'+abreviarNum(data[key].TotalConfirmed)+'</strong></td>'+
       '<td>'+abreviarNum(data[key].TotalRecovered)+'</td>'+
       '<td>'+abreviarNum(data[key].TotalDeaths)+'</td>'+
     '</tr>';

     
      }


      document.querySelector("#idPais").innerHTML = paises;
         
     }); // fim do fetch 

  }    



function spinner() {    

    document.getElementById("loading").style.display = "none";
    document.getElementById("conteudo").style.display = "inline";


  // let test = document.querySelector("#body").innerHTML = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';
  
}

//Abrevie um número milhares (1k) e milhões (1m)
function intlFormat(num)
{
  return new Intl.NumberFormat().format(Math.round(num*10)/10);
}
function abreviarNum(num)
{
  if(num >= 1000000)
    return intlFormat(num/1000000)+' M ';
  if(num >= 1000)
    return intlFormat(num/1000)+' mil';
  return intlFormat(num);
}

function calcularPorcent(params1, params2) {
  console.log(params1, params2)
  return ((((params1-params2)/params2)*100)*100)
}

function dataAtualFormatada(){
  var data = new Date(),
      dia  = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0'+dia : dia,
      mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0'+mes : mes,
      anoF = data.getFullYear();
  return anoF+"-"+mesF+"-"+diaF;
}