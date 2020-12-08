
document.addEventListener('DOMContentLoaded', (e) => {

    const USERS_URL = 'http://localhost:3000/users'
    const ENTRIES_URL = 'http://localhost:3000/entries'
    let USER
    let TODAY
    let TODAY2

    // entry page
    function enterName(){
        const greeting = document.getElementById('greeting')
        const nameContainer = document.getElementById('name-container')
        const formContainer = document.getElementById('form-container')
        const reflectionsContainer = document.getElementById('reflections-container')
        const footer = document.getElementById('footer')
        footer.innerHTML = ''
        formContainer.innerHTML = ''
        greeting.innerText = ''
        reflectionsContainer.innerHTML = ''
        nameContainer.innerHTML = 
        `
        <div>
        <img id="snail-pic" src="assets/snail.png" alt="little snail">
            <form id="name-form">
                <label class="lab">...your name?</label>
                <input type="text" id="name" name="name">
                <input type="submit" class="butt" id="enter-btn" value="Enter">
            </form>
        </div>
        `
        const nameForm = document.getElementById('name-form')
        nameForm.addEventListener('submit', (e) => createUser(e))
    }
    enterName()

    // fetch user
    function createUser(e){
        e.preventDefault()
        const name = e.target.name.value

        console.log(`created ${name}`)

        fetch(USERS_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
            name: name
            })
        })
        .then(res => res.json())
        .then(userObj => {
            USER = userObj
            drawForm()
        })
        // .then((err) => errorPosting(err))
    }

    function drawFooter(){
        const footer = document.getElementById('footer')
        const editNameBtn = document.createElement('button')
        const featherP = document.createElement('p')
        featherP.className = 'foot'
        const stoneP = document.createElement('p')
        stoneP.className = 'foot'

        featherP.innerText = 'The FEATHER is a pleasant, delightful, or enjoyable part of your day...'
        stoneP.innerText = 'The STONE is a difficult, uncomfortable, or inconvenient part of your day...'

        footer.innerHTML = ''

        editNameBtn.innerText = 'Edit Name'
        editNameBtn.id = 'edit-name'
        editNameBtn.className = 'butt'
        editNameBtn.addEventListener('click', (e) => changeName(e))

        const closeJournal = document.createElement('button')
        closeJournal.innerText = 'Close Journal'
        closeJournal.id = 'close-journal'
        closeJournal.className = 'butt'
        closeJournal.addEventListener('click', () => enterName())

        footer.append(editNameBtn, closeJournal, featherP, stoneP)
    }

    function deleteSelf(e){

        const nameForm = document.getElementById('name-container')
        const formContainer = document.getElementById('form-container')
        const reflectionsContainer = document.getElementById('reflections-container')
        const footer = document.getElementById('footer')

        nameForm.innerHTML = ''
        formContainer.innerHTML = ''
        reflectionsContainer.innerHTML = ''
        footer.innerHTML = ''

        fetch(USERS_URL + `/${USER.id}`, {
            method: 'DELETE'
        })
        .then(enterName())
        // .catch((err) => errorPosting(err))
    }

    function changeName(e){

        const nameForm = document.getElementById('name-container')
        const formContainer = document.getElementById('form-container')
        formContainer.innerHTML = ''

        const footer = document.getElementById('footer')
        footer.innerHTML = ''

        const reflectionsContainer = document.getElementById('reflections-container')
        reflectionsContainer.innerHTML = ''

        nameForm.innerHTML = 
        `
        <div>
        <img id="snail-animation" src="assets/snail.png" alt="little snail">
            <form>
                <label class="lab">...change name to?</label>
                <input type="text" id="name" name="name">
                <input type="submit" class="butt" id="enter-btn" value="Save">
            </form>
            <div id="delete-btn-div">
                <button id="delete-self" class="butt">Delete Self</button>
            </div>
        </div>
        `
        const deleteSelfBtn = document.getElementById('delete-self')
        deleteSelfBtn.addEventListener('click', (e) => deleteSelf(e))

        nameForm.addEventListener('submit', (e) => saveName(e))
    }

    function saveName(e){
      
        e.preventDefault()
        const name = e.target.name.value
        console.log(USER.id)
        fetch(USERS_URL + `/${USER.id}`, {
            method: 'PATCH',  
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
            name: name
            })
        })
        .then(res => res.json())
        .then(userObj => {
            USER.name = name
            drawForm()
        })
        // .catch((err) => errorPosting(err))
    }

    // get current date 
    function theDate(){
        TODAY = new Date()
        let dd = TODAY.getDate()
        let mm = TODAY.getMonth()+1 
        const yyyy = TODAY.getFullYear()
            if(dd<10){
                dd=`0${dd}`
            }if(mm<10){
                mm=`0${mm}`
            } 
        TODAY = `${mm}.${dd}.${yyyy}`
        TODAY2 = `${yyyy}-${mm}-${dd}`
    }
    theDate()

    // journal entry form
    function drawForm(){

        const greeting = document.getElementById('greeting')
        greeting.innerText = ''
        greeting.innerText = `Hello, ${USER.name}...`

        const nameForm = document.getElementById('name-container')
        nameForm.innerHTML = ''
        
        const formContainer = document.getElementById('form-container')
        formContainer.innerHTML = ''
        formContainer.innerHTML = 
        `
        <img id="snail-animation" src="assets/snail.png" alt="little snail" class="animate__animated animate__delay-2s">

        <p id="date"></p>
        <form id="entry-form">
            <input value=${TODAY2} type="date" name="date" id="date-input" max="${TODAY2}"><br>
            
            <div id="textarea-container">
                <textarea rows="8" cols="25" class="field" type="text" id="feather" name="feather" placeholder="...what is your FEATHER?"></textarea><br>

                <textarea rows="8" cols="25" class="field" type="text" id="stone" name="stone" placeholder="...what is your STONE?"></textarea><br>
                <div id="save-delete-div">
                    <div id="save-div"></div>
                    <div id="delete-div"></div>
                </div>
            </div>
                <input type="submit" class="butt" id="submit-btn" value="Log">
        </form>
        `
        const dateP = document.getElementById('date')
        dateP.innerText = `Today is ${TODAY}`

        const entryForm = document.getElementById('entry-form')

        entryForm.addEventListener('submit', (e) => postEntry(e))
        drawEntriesList()
        drawFooter()
    }

    function postEntry(e){
        e.preventDefault()
        date = e.target.date.value
        feather = e.target.feather.value
        stone = e.target.stone.value
        
        console.log(date, feather, stone)

        fetch(ENTRIES_URL, {
            
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept':'application/json'
            }, 
            body: JSON.stringify({
                date: date, 
                feather: feather, 
                stone: stone,
                user_id: USER.id
            })
        })
        .then(res => res.json())
        .then((entry) => {
            USER.entries.push(entry)
            drawEntriesList()
        })
        const entryForm = document.getElementById('entry-form')
        entryForm.reset()
    }

    function drawEntriesList(){
        
        const reflectionsContainer = document.getElementById('reflections-container')
        
        reflectionsContainer.innerHTML = ''
        reflectionsContainer.innerHTML = 
        `
        <div id="btn-div">
            <button id="clear-form-btn" class="butt">Clear Form</button>
        </div>
        <h3 id="past-reflections">Past Reflections</h3>
        `
        const ul = document.createElement('ul')
        ul.id = 'reflectionsUl'

        const sortedEntries = USER.entries.sort((a, b) => {
            if(a.date < b.date){
                return -1
            }
            if(a.date < b.date){
                return 1
            }
            return 0
        })
        for(entry of sortedEntries){
            
            let drawDate = entry.date.split('-')
            let newDate = `${drawDate[1]}.${drawDate[2]}.${drawDate[0]}`
            
            let entryLi = document.createElement('li')
            entryLi.innerText = newDate
            entryLi.id = entry.id
            entryLi.className = 'li'
            
            ul.prepend(entryLi)
            entryLi.addEventListener('click', (e) => showEntry(e))
        }
        reflectionsContainer.append(ul)
        const clearFormBtn = document.getElementById('clear-form-btn')
        clearFormBtn.addEventListener('click', () => clearForm())
        
    }

    function showEntry(e){
        
        let entryId = e.target.id
        console.log(entryId)
        
        const dateInput = document.getElementById('date-input')
        dateInput.disabled = true

        fetch(ENTRIES_URL + `/${entryId}`)
        .then(res => res.json())
        .then(entry => {
            const entryForm = document.getElementById('entry-form')
            const logBtn = document.getElementById('submit-btn')
            logBtn.hidden = 'true'
            const saveDiv = document.getElementById('save-div')
            const deleteDiv = document.getElementById('delete-div')
            const saveDeleteDiv = document.getElementById('save-delete-div')

            entryForm.date.value = entry.date
            entryForm.feather.value = entry.feather
            entryForm.stone.value = entry.stone

            if(!document.getElementById('save-btn')){
                
                const saveBtn = document.createElement('button')
                saveBtn.id = 'save-btn'
                saveBtn.setAttribute('name', entryId)
                saveBtn.className = 'butt'
                saveBtn.innerText = 'Save'
                
                const deleteBtn = document.createElement('button')
                deleteBtn.id = 'delete-btn'
                deleteBtn.setAttribute('name', entryId)
                deleteBtn.className = 'butt'
                deleteBtn.innerText = 'Delete'
                
                saveBtn.addEventListener('click', saveEdit)
                deleteBtn.addEventListener('click', deleteEntry)
              
                saveDiv.appendChild(saveBtn)
                deleteDiv.appendChild(deleteBtn)
                saveDeleteDiv.append(saveDiv, deleteDiv)
                entryForm.append(saveDeleteDiv)
            }
        })
    }

    function saveEdit(e){

        e.preventDefault()
        const entryId = parseInt(e.target.name)
        const feather = e.target.parentElement.parentElement.parentElement.feather.value
        const stone = e.target.parentElement.parentElement.parentElement.stone.value
        const saveBtn = document.getElementById('save-btn')
        const deleteBtn = document.getElementById('delete-btn')

        fetch(ENTRIES_URL + `/${entryId}`, {
            method:'PATCH', 
            headers: {
                'Content-Type':'application/json', 
                'Accept':'application/json'
            }, 
            body: JSON.stringify({
                feather: feather, 
                stone: stone
            })
        })
        .then(res => res.json())
        .then((entry) => {
            let ul = document.getElementById('reflectionsUl')
            let li = document.getElementById(entryId)
        })

        const entryForm = document.getElementById('entry-form')
        entryForm.reset()
        saveBtn.remove()
        deleteBtn.remove()
        const logBtn = document.getElementById('submit-btn')
        logBtn.hidden = false
    }

    function deleteEntry(e){
        e.preventDefault()
        
        const entryId = parseInt(e.target.name)

        fetch(ENTRIES_URL + `/${entryId}`, {
            method: 'DELETE'
        })
        .then(() => {

            console.log(`${entryId} has been deleted!`)
            const li = document.getElementById(entryId)
            li.remove()
            const entryForm = document.getElementById('entry-form')
            entryForm.reset()

            const saveBtn = document.getElementById('save-btn')
            saveBtn.className = 'butt'
            saveBtn.removeEventListener('click', saveEdit)

            const deleteBtn = document.getElementById('delete-btn')
            deleteBtn.className = 'butt'
            deleteBtn.removeEventListener('click', deleteEntry)
            
            saveBtn.remove()
            deleteBtn.remove()

            const logBtn = document.getElementById('submit-btn')
            logBtn.hidden = false 

            const dateInput = document.getElementById('date-input')
            dateInput.disabled = false

            console.log(USER.entries)
            const toDelete = USER.entries.find(entry=>entry.id==entryId)
            USER.entries.splice(USER.entries.indexOf(toDelete), 1)

        })
    }

    function clearForm(){

        const dateInput = document.getElementById('date-input')
        dateInput.disabled = false

        const entryForm = document.getElementById('entry-form')
        entryForm.reset()
        const saveBtn = document.getElementById('save-btn')
        if(saveBtn){
            saveBtn.remove()
        }
        const deleteBtn = document.getElementById('delete-btn')
        if(deleteBtn){
            deleteBtn.remove()
        }
        const logBtn = document.getElementById('submit-btn')
        logBtn.hidden = false  
    }

})


