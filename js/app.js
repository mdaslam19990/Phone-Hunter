const loadPhone = async (searchText, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, datalimit)
}


const displayPhone = (data, datalimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = "";

    const noFoundText = document.getElementById("no-found");

    if(data.length == 0){
        noFoundText.classList.remove("d-none")
    }else{
        noFoundText.classList.add("d-none")
    }

    const showAll = document.getElementById("show-all")
    if (datalimit && data.length > 10){
        data = data.slice(0, 10);
        showAll.classList.remove("d-none")
    }else{
        showAll.classList.add("d-none")
    }

    data.forEach(phone => {
        const myDiv = document.createElement('div');
        myDiv.classList.add("col")
        myDiv.innerHTML = `
            <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional
                        content. This content is a little bit longer.</p>
                        <button onclick="searchBtn('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Search Phone</button>
                    </div>
                </div>
        `
        phoneContainer.appendChild(myDiv)
    });
    toggoleSpinner(false)
}

const processField = (datalimit) => {
    toggoleSpinner(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText, datalimit)
}

document.getElementById("search-btn").addEventListener("click", function(){
    processField(10)
})

const toggoleSpinner = (isValue) => {
    const toggole = document.getElementById("spinner");
    if(isValue){
        toggole.classList.remove("d-none");
    }else{
        toggole.classList.add("d-none");
    }
}


document.getElementById("btn-show-all").addEventListener("click", function(){
    processField()
    const searchField = document.getElementById("search-field");
    searchField.value = ""
})

const searchBtn = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    modalBtn(data.data)
}

const modalBtn = (data) => {
    const modal = document.getElementById("phone-details");
    modal.innerHTML = `
        <h2>${data.name}</h2>
        <img class="w-50 h-50" src="${data.image}"/>
        <p>${data.releaseDate ? data.releaseDate : "No Found"}</p>
        <strong>${data.mainFeatures.sensors[0]}</strong>
        <strong>${data.mainFeatures.sensors[1]}</strong>
        <strong>${data.mainFeatures.sensors[2]}</strong>
        <strong>${data.mainFeatures.sensors[3]}</strong>
        <strong>${data.mainFeatures.sensors[4]}</strong>

    `
}

var el = document.getElementById("search-field");
el.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        processField(10)
    }
});

loadPhone("apple")