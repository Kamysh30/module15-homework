function uploadChat(){
    const info = document.querySelector('.info');
    const output = document.querySelector('.output');
    const input = document.querySelector('input');
    const btn = document.querySelector('.btn');
    const geoBtn =document.querySelector('.btn-geo');

    const websocket = new WebSocket('wss://echo.websocket.org/');

    websocket.onopen = () =>{
        info.innerText = "Соединение установленно";
    }

    websocket.onmessage = (evt) =>{
        chatMessage(evt.data, true);
    }

    websocket.onerror = () => {
        info.innerText = "Ошибка соединения";
    }
    function chatMessage(message, IsAccepted){
        let messageHtml = `<div class = ${IsAccepted ? "accepted" : "send"}>${message}</div>`;
        output.innerHTML += messageHtml;
    }
    
    
    
    function location (position){
    let link=`https://www.openstreetmap.org/#map=11/${position.coords.latitude}/${position.coords.longitude}`
   let geo=`<a href="${link}">Гео-локация</a>`
   chatMessage (geo,false)
   
  }
  function error (){
    info.innerHTML="Информация о местоположении недоступна"
  }
    
    btn.addEventListener("click", ()=>{
        if(!input.value) return;
        websocket.send(input.value)
        chatMessage(input.value, false);
        input.value = "";
    })
    geoBtn.addEventListener("click",()=>{
        if ("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(location,error)
            }else{
              info.innerHTML="Браузер не поддерживает геолокацию"}
    })
      
}
document.addEventListener("DOMContentLoaded", uploadChat);