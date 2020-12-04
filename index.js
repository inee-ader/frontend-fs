document.addEventListener('DOMContentLoaded', (e) => {

    const USERS_URL = 'http://localhost:3000/users'
    const ENTRIES_URL = 'http://localhost:3000/entries'
    let USER

    function enterName(){
        const nameForm = document.getElementById('name-form')
        nameForm.innerHTML = 
        `
        <div>
            <form>
                <label>...your name?</label>
                <input type="text" id="name" name="name">
                <input type="submit" id="enter-btn" value="Enter">
            </form>
        </div>
        `
        nameForm.addEventListener('submit', (e) => createUser(e))
    }
    enterName()

    // fetch user
    function createUser(e){
        e.preventDefault()
        const name = e.target.name.value
        
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
        editNameBtn.addEventListener('click', (e) => changeName(e))

        const deleteSelfBtn = document.createElement('button')
        deleteSelfBtn.innerText = 'Delete Self'
        deleteSelfBtn.id = 'delete-self'
        deleteSelfBtn.addEventListener('click', (e) => deleteSelf(e))

        footer.append(editNameBtn, deleteSelfBtn)
    }

    function deleteSelf(e){
        const nameForm = document.getElementById('name-form')
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
        const nameForm = document.getElementById('name-form')
        const formContainer = document.getElementById('form-container')
        formContainer.innerHTML = ''

        const footer = document.getElementById('footer')
        footer.innerHTML = ''

        const reflectionsContainer = document.getElementById('reflections-container')
        reflectionsContainer.innerHTML = ''

        nameForm.innerHTML = 
        `
        <div>
            <form>
                <label>...change name to?</label>
                <input type="text" id="name" name="name">
                <input type="submit" id="enter-btn" value="Save">
            </form>
        </div>
        `
        nameForm.addEventListener('submit', (e) => saveName(e))
    }

    function saveName(e){

        // creating new user instead of updating the existing one, and logs in as that new user
        const name = e.target.name.value
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
        .then()
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
        TODAY = `${mm}/${dd}/${yyyy}`
        date.innerText = `Today is ${TODAY}`
    }
    theDate() 
     
    // journal entry form
    function drawForm(){

        const formContainer = document.getElementById('form-container')
        const nameForm = document.getElementById('name-form')
        const reflectionsContainer = document.getElementById('reflections-container')

        nameForm.innerHTML = ''
        formContainer.innerHTML = ''

        formContainer.innerHTML = 
        `
        <form id="entry-form">
            <input type="date" name="date">
            <label>...what is your feather?</label>
            <textarea type="text" id="feather" name="feather" placeholder="What brought you joy?"></textarea>
            <label>...what is your stone?</label>
            <textarea type="text" id="stone" name="stone" placeholder="What was the hard part?"></textarea>
            <input type="submit" id="submit-btn" value="Log">
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
            newEntryLi.innerText = entry.date
            ul.prepend(newEntryLi)
            newEntryLi.addEventListener('click', (e) => showEntry(e))
        })
    }

    function drawEntriesList(){
        
        const reflectionsContainer = document.getElementById('reflections-container')
        
        reflectionsContainer.innerHTML - ''
        reflectionsContainer.innerHTML = 
        `
        <h3>Past Reflections</h3>
        `
        const ul = document.createElement('ul')
        ul.id = 'reflectionsUl'

        for(entry of USER.entries){
            let entryLi = document.createElement('li')
            entryLi.innerText = entry.date
            entryLi.id = entry.id
            
            ul.prepend(entryLi)
            entryLi.addEventListener('click', (e) => showEntry(e))
        }
        reflectionsContainer.append(ul)
    }

    function showEntry(e){
        
        let formContainer = document.getElementById('form-container')
    
        let entryId = e.target.id

        console.log(entryId)

        fetch(ENTRIES_URL + `/${entryId}`)
        .then(res => res.json())
        .then(entry => {
            const entryForm = document.getElementById('entry-form')
            const logBtn = document.getElementById('submit-btn')
            logBtn.hidden = "true"

            entryForm.date.value = entry.date
            entryForm.feather.value = entry.feather
            entryForm.stone.value = entry.stone

            if(!document.getElementById('save-btn')){
                const saveBtn = document.createElement('button')
                saveBtn.id = 'save-btn'
                saveBtn.innerText = 'Save'
                saveBtn.addEventListener('click', (e) => saveEdit(e, entryId))
    
                const deleteBtn = document.createElement('button')
                deleteBtn.id = 'delete-btn'
                deleteBtn.innerText = 'Delete'
                deleteBtn.addEventListener('click', (e) => deleteEntry(e, entryId))
    
                entryForm.append(saveBtn, deleteBtn)
            }
        })
    }

    function saveEdit(e, entryId){

        // not updating on the DOM list
        console.log(entryId)
        e.preventDefault()

        const date = e.target.parentElement.date.value
        const feather = e.target.parentElement.feather.value
        const stone = e.target.parentElement.stone.value

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
            li.innerText = entry.date
        })
    }
    
    function deleteEntry(e, entryId){

        // deletes from the DB, but does not update DOM properly.\

        e.preventDefault()
        fetch(ENTRIES_URL + `/${entryId}`, {
            method: 'DELETE'
        })
        .then(drawForm())
    }


})








