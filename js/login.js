function logar(){

    const nomeDeUsuario = document.querySelector('#idSignIn').value;
    // const nomeDeUsuario = document.getElementById("#idSignIn").value;
    alert('ID:' + nomeDeUsuario)
    
    
    fetch(`https://api.github.com/users/${nomeDeUsuario}`,{
    method:'GET',
    headers: {
        'Access-Control-Allow-Origin': '*', // solicitações sem credenciais , o valor literal "*" 
        'Access-Control-Allow-Headers': 'user-agent, uthorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, Accept-Encoding, X-GitHub-OTP, X-Requested-With',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',        
        'mode': 'cors',
        
 }})

 .then(response => {
   return response.json();
   
 })
 
  //Retorno fetch
  .then(data =>{   
    
    console.log(data)

        
    //Atualizar Total de Casos
    

   

   
      
   }); // fim do fetch
}