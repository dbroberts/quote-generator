
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

//Get Quote from API
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere2.herokuapp.com/'
    const apiUrl = 'https://officeapi.dev/api/quotes/random';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if (data.data.character.firstname === '') {
            authorText.innerText = "Unknown"
        } else {
            authorText.innerText = authorText.innerText = data.data.character.firstname;
        }
        // Reduce font size for long quotes
        if (data.data.content.length > 150) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.data.content;
    } catch (error) {
        //getQuote();
        console.log('whoops, no quote', error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);

// On load
getQuote();
