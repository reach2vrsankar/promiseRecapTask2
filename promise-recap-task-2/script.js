// https://the-one-api.dev/documentation
function home(){
    document.getElementById("home").style.display ="";
    document.getElementById("books_block").style.display ="none";
    document.getElementById("movie").style.display ="none";
    document.getElementById("character").style.display ="none";
}
function book(){
    document.getElementById("home").style.display ="none";
    document.getElementById("books_block").style.display ="";
    document.getElementById("movie").style.display ="none";
    document.getElementById("book_chapter_list").innerHTML ="";
    document.getElementById("character").style.display ="none";
    getBooks();
}
function movie(){
    document.getElementById("home").style.display ="none";
    document.getElementById("books_block").style.display ="none";
    document.getElementById("movie").style.display ="";
    document.getElementById("movie_Quote_list").innerHTML ="";
    document.getElementById("character").style.display ="none";
    getMovies();
}
function character(){
    document.getElementById("home").style.display ="none";
    document.getElementById("books_block").style.display ="none";
    document.getElementById("movie").style.display ="none";
    document.getElementById("character").style.display ="";
    getCharacter();
}


async function getBooks(){
    try{
        const result = await fetch(`https://the-one-api.dev/v2/book`,
        {
            method: "GET",
        }
        );
        const data = await result.json();
        var book_list = document.querySelector('#book_list');
        let output = "";
        data.docs.forEach(obj => {
            output += `
            <div class="col-lg-4 mt-3" id=${obj._id} onclick="getBookChapter(this.id)">
                  <div class="card" style="width: 18rem;height:5rem;">
                      <div class="card-body">
                          <h5 class="card-title">${obj.name}</h5>
                       </div>
                  </div>
              </div>
            `;  
            book_list.innerHTML = output;
        });
    } catch (error) {
        console.log(error);
      }
}
async function getBookChapter(book_id){  
    var book_chapter_list = document.querySelector("#book_chapter_list");
    let output = "";
    try{
        const result = await fetch(`https://the-one-api.dev/v2/book/${book_id}/chapter`,
        {
            method: "GET",
        }
        );
        const data = await result.json();
        data.docs.forEach(obj => {
            output += `
                <li class="list-group-item">${obj.chapterName}</li>
            `;
        });
        book_chapter_list.innerHTML = `<li class="h2 list-group-item text-center text-danger">${data.docs[0].bookName}</li>`+output;
        
    } catch (error) {
        console.log(error);
    }
}
async function getMovies(){
    const token = "kALt4KGRAWaBCVs67cGv";
    var movie_list = document.querySelector("#movie_list");
    try{
        const result = await fetch(`https://the-one-api.dev/v2/movie`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " +token},
        }
        );
        const data = await result.json();
        let output = "";
        data.docs.forEach(obj => {
            output += `
            <div class="col-lg-4 mt-3" id=${obj._id} onclick="getMovieQuotes(this.id)">
                  <div class="card" style="width: 18rem;height:5rem;">
                      <div class="card-body">
                          <h5 class="card-title">${obj.name}</h5>
                       </div>
                  </div>
              </div>
            `;  
            movie_list.innerHTML = output;
        });
    } catch (error) {
        console.log(error);
      }
}
async function getMovieQuotes(movie_id){  
    var movie_Quote_list = document.querySelector("#movie_Quote_list");
    let output = "";
    console.log(movie_id);
    try{
        const result = await fetch(`https://the-one-api.dev/v2/movie/${movie_id}/quote`,
        {
            method: "GET",
        }
        );
        const data = await result.json();
        console.log("quotes");
        console.log(data);
        data.docs.forEach(obj => {
            output += `
                <li class="list-group-item">${obj.chapterName}</li>
            `;
        });
        movie_Quote_list.innerHTML = `<li class="h2 list-group-item text-center text-danger">Movie Quotes</li>`+output;
        
    } catch (error) {
        console.log(error);
    }
}

async function getCharacter(){
    const token = "kALt4KGRAWaBCVs67cGv";
    var character_list = document.querySelector("#character_list");
    try{
        const result = await fetch(`https://the-one-api.dev/v2/character`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " +token},
        }
        );
        const data = await result.json();
        console.log("Character:")
        console.log(data)
        let output = "";
        data.docs.forEach(obj => {
           output += `
            <div class="col-lg-4 mt-3" id=${obj._id} onclick="getMovieQuotes(this.id)">
                  <div class="card" style="width: 18rem;height:15rem;">
                      <div class="card-body">
                          <h5 class="card-title">${obj.name}</h5>
                          <p><b>Birth: </b>${obj.birth}</p>
                          <p><b>Death: </b>${obj.death}</p>
                          <a class="nav-link" href="${obj.wikiUrl}">Go For details</a>
                       </div>
                  </div>
              </div>
            `;  
            character_list.innerHTML = output;
        });
        
    } catch (error) {
        console.log(error);
      }
}

