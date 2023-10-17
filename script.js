
// async function getQuotes0(){
//     const orignal = await fetch('https://type.fit/api/quotes');
//     const data = await orignal.json();
//     return data;
// }
// getQuotes0()
// .then(dta=>console.log(dta))



const quote = document.getElementById('quote');
const author = document.getElementById('author');
const xButton = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote');
const start = document.getElementById('start');
let listOfQuotes = [];


function getQuotes(){
    newQuoteBtn.style.display = 'none'
    xButton.style.display = 'none'
    // Show the loading element while fetching data
    loading.style.display = 'block';

    return new Promise((resolve, reject) => {
        const randomQuoteAPI = 'https://type.fit/api/quotes';

        fetch(randomQuoteAPI)
            .then((response)=>{
                // Check if the response status indicates success (status 200).
                // console.log(response.status === 200)
                if (response.status === 200){
                    response.json().then(response=>resolve(response));
                } else {
                     // If the response status is not 200, reject the promise with a specific error message.
                    reject('Error: Something went wrong with the API response')
                }
            })
            .catch((err)=> {
                // If the response status is not 200, reject the promise with a specific error message.
                reject(`Something went wrong with the fetch function => ${err}`)
            })

    })
    .finally(()=>{
        newQuoteBtn.style.display = 'block'
        xButton.style.display = 'block'
        // Hide the loading element when the promise is settled
        loading.style.display = 'none';
    })
   
}
getQuotes()
.then((dta)=>{
    listOfQuotes = dta;
    displayRandomQuote()
})
.catch(err=>console.log(err))

function getRandomNumber(){
    // Generate a random number between 0 (inclusive) and 17 (exclusive).
    return Math.floor(Math.random()*16)
}

function displayRandomQuote(){
    let randomQuote = listOfQuotes[getRandomNumber()];
    quote.innerHTML = randomQuote.text;
    author.innerHTML = randomQuote.author;
}

function tweetThis(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(tweetUrl, '_blank');
}

xButton.addEventListener('click', ()=>{
    tweetThis()
})

newQuoteBtn.addEventListener('click', ()=>{
    displayRandomQuote()
})



