document.addEventListener("DOMContentLoaded", showBook);

const ulBookNames = document.getElementById('list')

const divBookDetails = document.getElementById('show-panel')

const thumbnail = document.createElement('img')

const description = document.createElement('p')

const ulLikers = document.createElement('ul');

const likerBtn = document.createElement('button');

const liker = document.createElement('li')


//shows book name and details on clicking name
function showBook(){
fetch('http://localhost:3000/books')
.then(resp => resp.json())
.then(data => {
    data.forEach(book =>{

        const bookName = document.createElement('li')
        bookName.innerText = book.title
        bookName.style.color = 'blue'
        bookName.style.textDecoration = 'underline'
        bookName.style.cursor = 'pointer'

        ulBookNames.appendChild(bookName)

        bookName.addEventListener('click', showBookDetails)


//show book details on clicking book name
     function showBookDetails(){
            ulLikers.innerHTML = ''
            thumbnail.src = book.img_url
            divBookDetails.appendChild(thumbnail)

            description.innerText = book.description
            divBookDetails.appendChild(description)
            console.log(book.users)

//shows each user who likes a book
                function eachUserLiker(){
            book.users.forEach(like => {

            const liker = document.createElement('li')
            liker.innerText = like.username

            ulLikers.appendChild(liker)
            })
        }

        eachUserLiker();

            divBookDetails.appendChild(ulLikers)

            likerBtn.innerText = "LIKE"
            
            divBookDetails.appendChild(likerBtn)


            likerBtn.addEventListener('click', adduserLike)
        

            //add a username when like button is clicked 
        function adduserLike(){
                fetch(`http://localhost:3000/books/${book.id}`,{
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json",
                    Accept : "application/json"   
                },
                body : JSON.stringify({
                    users : [...book.users,{
                        id : 1,
                        username : "pouros"
                    }]
                })
                })

                liker.innerText = `pouros`
    
                ulLikers.appendChild(liker)
            }
        }



})
})
}