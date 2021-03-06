const weatherForm = document.querySelector('form');
const search = document.querySelector('input');



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById('result').innerHTML = data.error
        }else{
            document.getElementById('result').innerHTML = 
             `Weather forecast for ${data.location} is ${data.forecast}`
        }
    });
});
})