window.addEventListener("load", displayData);

let url = "https://swapi.co/api/people/?format=json";

function displayData () {

  let nameOfCharacters = document.querySelector(".nameOfCharacter_list");
  let name = document.querySelector(".name");
  let birthYear = document.querySelector(".birth_year");
  let gender = document.querySelector(".gender");
  let films = document.querySelector(".films_list");
  let homeworld = document.querySelector(".homeworld");
  let species = document.querySelector(".species");
  let description = document.querySelector(".description");

  description.hidden = true;

  fetch(url)
        .then(  
          function(response) {  
            if (response.status !== 200) {  
              console.log('Looks like there was a problem. Status Code: ' + response.status);  
              return;
            }
            response.json()
            .then(function(data) {  
              showName(data);
            });
          }  
        )  
        .catch(function(err) {  
          console.log('Fetch Error :-S', err);  
        });
        
  function showName(data) {

    // вызов следющей страницы
    let nextPageBtn = document.querySelector(".nextPage");
    nextPageBtn.addEventListener("click", nextPage);
    if (data.next === null) {
      nextPageBtn.hidden = true;
    } else nextPageBtn.hidden = false;

    function nextPage () {
      nameOfCharacters.innerHTML = " ";
      nextPageBtn.removeEventListener("click", nextPage);
      prevPageBtn.removeEventListener("click", prevPage);
      console.log(url);
      url = data.next;
      displayData();
    }

    // вызов предыдущей страницы
    let prevPageBtn = document.querySelector(".prevPage");
    prevPageBtn.addEventListener("click", prevPage);
    if (data.previous === null) {
      prevPageBtn.hidden = true;
    } else prevPageBtn.hidden = false;

    function prevPage () {
      nameOfCharacters.innerHTML = " ";
      prevPageBtn.removeEventListener("click", prevPage);
      nextPageBtn.removeEventListener("click", nextPage);
      url = data.previous;
      displayData();
    } 


    // формирование списка персонажей
    for (i = 0; i < data.results.length; i++) {
      let li = document.createElement("LI")
      let ulNode = nameOfCharacters.appendChild(li);
      ulNode.innerHTML = data.results[i].name;
      ulNode.addEventListener("click", showInfo);
      ulNode.setAttribute("index", i);
    }

    // показать инфо о конкретном персонаже
    function showInfo (e) {
      description.hidden = false;
      let target = e && e.target;

      if (target.tagName === "LI") {
        let index = target.getAttribute("index");
        name.innerHTML = data.results[index].name;
        birthYear.innerHTML = "birth year:   " + data.results[index].birth_year;
        gender.innerHTML = "gender:   " + data.results[index].gender;
        films.innerHTML = " ";

        for (let i = 0; i < data.results[index].films.length; i++) {
          let li = document.createElement("LI");
          let ulNode = films.appendChild(li);
          ulNode.innerHTML = data.results[index].films[i];
        }

        homeworld.innerHTML = "homeworld:   " + data.results[index].homeworld;
        species.innerHTML = "species:   " + data.results[index].species;
        }
      }
  }
}
function deleteBtn () {
  let description = document.querySelector(".description");
  description.hidden = true;
}