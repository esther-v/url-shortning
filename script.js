const base_url = "https://api.shrtco.de/v2/shorten?url="

const search = document.querySelector('#search')
const form = document.querySelector('form')
const divLinks = document.querySelector('#links')
const linkBar = document.querySelector('.link-bar')
const error = document.querySelector('.error')


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
        error.style.display = 'none'
        search.value = ''
        //create the div with the result short link
        let resultLink = document.createElement('div')
        divLinks.append(resultLink)
        //create the paragraphs and button inside the div result 
        let longLink = document.createElement('p')
        let shortLink = document.createElement('a')
        let copyBtn = document.createElement('button')
        resultLink.append(longLink, shortLink, copyBtn)
        //display the result
        longLink.textContent = inputValue.slice(0,53) + "..."
        shortLink.textContent = result.result.short_link
        copyBtn.textContent = "Copy"
        //style the elements
        resultLink.style.backgroundColor = 'white'
        resultLink.style.display = 'flex'
        resultLink.style.justifyContent = 'space-between'
        resultLink.style.marginBottom = '10px'
        resultLink.style.padding = '0.5rem'

        shortLink.style.textDecoration = 'none'
        shortLink.style.color = 'hsl(180, 66%, 49%)'
        shortLink.style.cursor = 'pointer'

        copyBtn.style.padding = '0.3rem 0.5rem'
        copyBtn.style.backgroundColor = 'hsl(180, 66%, 49%)'
        copyBtn.style.color = 'white'
        copyBtn.style.border = 'none'
        copyBtn.style.borderRadius = '3px'

       

        copyBtn.addEventListener('click', () => {
            let copyText = document.createElement('textarea')
            let textToCopy = shortLink.innerText
            copyText.value = textToCopy

            document.body.appendChild(copyText)
            copyText.select()
            document.execCommand('copy')
            copyText.remove()

            copyBtn.textContent = 'Copied!'
            copyBtn.style.backgroundColor = 'hsl(257, 27%, 26%)'
        })

    }

    else if(result.ok === false) {
        console.log('error')
        error.style.display = 'block'
        error.style.fontSize = '12px'
        error.style.color = 'hsl(0, 87%, 67%)'
    }
}
