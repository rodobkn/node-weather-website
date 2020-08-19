console.log('Client side javascript file is loaded!');

//We are fetching the data of one specific website. The data will arrive in another type that object, so we need to do some stuff
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     //now, we are parsing the data to a javaScript object. So the "data" will be jS object.
//     response.json().then((data) => {
//         console.log(data);
//     })
// });



//We are selecting a specific html flag of the current html page. # is for the id.
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//We added a listener in order to pay attention when a person submit the form.
//e = event
weatherForm.addEventListener('submit', (e) => {
    //Here we are preventing the default behaviour of the browser. That is reload the page inmediately after submit the form
    e.preventDefault()

    const location = search.value

    //Here we are setting up a content in the html flag selected
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                console.log(data.error)
            } else{
                messageOne.textContent = "Location: " + data.location
                messageTwo.textContent = data.description + ". It is currently " + data.temperature + " celsius degrees. There is a " + data.rainProbability + "% chance of rain" 
                console.log(data.location);
                console.log(data.description);
                console.log(data.temperature);
                console.log(data.rainProbability);
            }
        })
    })

})