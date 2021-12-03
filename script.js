const base_url = "https://api.shrtco.de/v2/shorten?url="

const search = document.querySelector('#search')
const form = document.querySelector('form')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('ok')
    console.log(search.value)
    let inputValue = search.value
    
    getURLDetails(inputValue)
    
})

async function getURLDetails (inputValue) {
    const response = await fetch(base_url + inputValue)
    const result = await response.json()
    console.log(result)
    console.log('ok')
    if(result.ok === true) {
        
    }
}


