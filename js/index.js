document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(json => listBooks(json))

})
const list = document.getElementById("list")
const showPanel = document.getElementById("show-panel")
const myUser = {"id":1, "username":"pouros"}


    function listBooks(json){
        json.forEach(book=> {
            
            const li = document.createElement("li")
            li.innerText = book.title
            const btn = document.createElement("button")
            btn.id = book.id
            btn.innerText = "like"
            list.appendChild(li)
            li.appendChild(btn)

            btn.addEventListener("click", (e) => getUpdateLikes(e))
                li.addEventListener("click", () => showinfo(book, li))
            })

        
    }

    function showinfo(book, li){

        const desc = document.createElement("p")
        desc.innerText = book.description
        const img = document.createElement("img")
        img.src = book.img_url
        

        showPanel.appendChild(desc)
        showPanel.appendChild(img)

        const users = []
     
        book.users.forEach(obj => users.push(obj.username))
        const usersList = document.createElement("p")
        usersList.innerText = users.toString()
        usersList.id = "users-list"
        showPanel.appendChild(usersList)

    }


    function getUpdateLikes(e){
        const id = e.target.id

        fetch(`http://localhost:3000/books/${id}`)
        .then(resp => resp.json())
        .then(json => updateLikes(json.users,id))
        
    }

    function updateLikes(usersAr,id){
       
         usersAr.push(myUser)
        
        

        const configurationObject = {method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
            
              body: JSON.stringify({"users": usersAr})
            }

        fetch(`http://localhost:3000/books/${id}`,configurationObject)

        const usersList = document.getElementById("users-list")
        usersList.innerText+= `,${myUser.username}`
    }


    // http://localhost:3000/books/:id