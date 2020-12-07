document.addEventListener('DOMContentLoaded', (e) => {

    const USERS_URL = 'http://localhost:3000/users'
    const ENTRIES_URL = 'http://localhost:3000/entries'
    let USER
    let TODAY2
  

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
        <img id="snail-animation" src="assets/snail.png" alt="little snail">
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
    }

    function drawFooter(){
        const footer = document.getElementById('footer')
        const editNameBtn = document.createElement('button')

        footer.innerHTML = ''

        editNameBtn.innerText = 'Edit Name'
        editNameBtn.id = 'edit-name'
        editNameBtn.className = 'butt'
        editNameBtn.addEventListener('click', (e) => changeName(e))

        const deleteSelfBtn = document.createElement('button')
        deleteSelfBtn.innerText = 'Delete Self'
        deleteSelfBtn.id = 'delete-self'
        deleteSelfBtn.className = 'butt'
        deleteSelfBtn.addEventListener('click', (e) => deleteSelf(e))

        const closeJournal = document.createElement('button')
        closeJournal.innerText = 'Close Journal'
        closeJournal.id = 'close-journal'
        closeJournal.className = 'butt'
        closeJournal.addEventListener('click', () => enterName())

        footer.append(editNameBtn, deleteSelfBtn, closeJournal)
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
    }

    function changeName(e){

        const nameForm = document.getElementById('name-container')
        const formContainer = document.getElementById('form-container')
        formContainer.innerHTML = ''

        const footer = document.getElementById('footer')
        footer.innerHTML = ''

        const reflectionsContainer = document.getElementById('reflections-container')
        reflectionsContainer.innerHTML = ''

        // nameForm.innerHTML = ''
        // nameForm.removeEventListener('submit', createUser)

        nameForm.innerHTML = 
        `
        <div>
        <img id="snail-animation" src="assets/snail.png" alt="little snail">
            <form>
                <label class="lab">...change name to?</label>
                <input type="text" id="name" name="name">
                <input type="submit" class="butt" id="enter-btn" value="Save">
            </form>
        </div>
        `
        nameForm.addEventListener('submit', (e) => saveName(e))
    }

    function saveName(e){
        // creating new user instead of updating the existing one, and logs in as that new user
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
    }

    // get current date 
    function theDate(){
        let date = document.getElementById('date')
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
        date.innerText = `Today is ${TODAY}`
    }
    theDate() 
     
    // journal entry form
    function drawForm(){

        const greeting = document.getElementById('greeting')
        greeting.innerText = ''
        greeting.innerText = `Hello, ${USER.name}...`
        const formContainer = document.getElementById('form-container')
        const nameForm = document.getElementById('name-container')
        const reflectionsContainer = document.getElementById('reflections-container')

        nameForm.innerHTML = ''
        formContainer.innerHTML = ''

        formContainer.innerHTML = 
        `
        <img id="snail-animation" src="assets/snail.png" alt="little snail" class="animate__animated animate__delay-2s">

        <form id="entry-form">
            <input value=${TODAY2} type="date" name="date" id="date-input" max="${TODAY2}"><br>
            
            <div id="textarea-container">
                <textarea rows="9" cols="25" class="field" type="text" id="feather" name="feather" placeholder="...what is your feather?"></textarea><br>

                <textarea rows="9" cols="25" class="field" type="text" id="stone" name="stone" placeholder="...what is your stone?"></textarea><br>
            </div>

            <input type="submit" class="butt" id="submit-btn" value="Log">
        </form>
        `
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
            let ul = document.getElementById('reflectionsUl')
            let newEntryLi = document.createElement('li')
            newEntryLi.id = entry.id
            newEntryLi.innerText = `${entry.date}`
            ul.prepend(newEntryLi)
            newEntryLi.addEventListener('click', (e) => showEntry(e))
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

        for(entry of USER.entries){
            let entryLi = document.createElement('li')
            entryLi.innerText = `${entry.date}`
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
        
        let formContainer = document.getElementById('form-container')
        let entryId = e.target.id
      
        fetch(ENTRIES_URL + `/${entryId}`)
        .then(res => res.json())
        .then(entry => {
            const entryForm = document.getElementById('entry-form')
            const logBtn = document.getElementById('submit-btn')
            logBtn.hidden = "true"

            entryForm.dataset.entryId = entryId
            entryForm.date.value = entry.date
            entryForm.feather.value = entry.feather
            entryForm.stone.value = entry.stone

            if(!document.getElementById('save-btn')){
                const saveBtn = document.createElement('button')
                saveBtn.id = 'save-btn'
                saveBtn.className = 'butt'
                saveBtn.innerText = 'Save'
                
                const deleteBtn = document.createElement('button')
                deleteBtn.id = 'delete-btn'
                deleteBtn.className = 'butt'
                deleteBtn.innerText = 'Delete'
                
                saveBtn.addEventListener('click', (e) => saveEdit(e))
                deleteBtn.addEventListener('click', (e) => deleteEntry(e))
                
                entryForm.append(saveBtn, deleteBtn)
            }
            
        })
    }

    function saveEdit(e){

        e.preventDefault()
        const entryId = e.target.parentElement.dataset.entryId

        const date = e.target.parentElement.date.value
        const feather = e.target.parentElement.feather.value
        const stone = e.target.parentElement.stone.value
        const saveBtn = document.getElementById('save-btn')
        const deleteBtn = document.getElementById('delete-btn')

        fetch(ENTRIES_URL + `/${entryId}`, {
            method:'PATCH', 
            headers: {
                'Content-Type':'application/json', 
                'Accept':'application/json'
            }, 
            body: JSON.stringify({
                date: date, 
                feather: feather, 
                stone: stone
            })
        })
        .then(res => res.json())
        .then((entry) => {
            let ul = document.getElementById('reflectionsUl')
            let li = document.getElementById(entryId)
            li.innerText = `${entry.date}`
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
        // deletes from the DB, but does not update DOM list properly.
        const entryId = e.target.parentElement.dataset.entryId

        fetch(ENTRIES_URL + `/${entryId}`, {
            method: 'DELETE'
        })
        .then(() => {
            const li = document.getElementById(entryId)
            li.remove()
            const entryForm = document.getElementById('entry-form')
            entryForm.reset()
            const saveBtn = document.getElementById('save-btn')
            saveBtn.className = 'butt'
            const deleteBtn = document.getElementById('delete-btn')
            deleteBtn.className = 'butt'
            saveBtn.remove()
            deleteBtn.remove()
            const logBtn = document.getElementById('submit-btn')
            logBtn.hidden = false             
        })
    }
    function clearForm(){
        const entryForm = document.getElementById('entry-form')
        entryForm.reset()
        const saveBtn = document.getElementById('save-btn')
        saveBtn.remove()
        const deleteBtn = document.getElementById('delete-btn')
        deleteBtn.remove()
        const logBtn = document.getElementById('submit-btn')
        logBtn.hidden = false  
    }


})








