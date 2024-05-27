
let mainSection = document.getElementById("data-list-wrapper");
let cardList = document.getElementById("cardList");
// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");



// fetch data from server_________________
let prodata = []
fetch("https://frontendsideadityagotafode.onrender.com/pitches")
    .then((res) => res.json())
    .then((json) => {
        onecardData(json)
        prodata = json
    })
    .catch((err) => console.log(err));

function onecardData(data) {
    let store = data.map((data) => cardlist(data.title, data.id, data.image, data.price, data.description, data.founder, data.category));
    cardList.innerHTML = store.join("");
}
function cardlist(title, id, image, price, description, founder, category) {
    let onecard = `
    <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}
    &founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&description=${encodeURIComponent(description)}">        
        <div class="card" data-id=${id}>
        <div class="card-img">
        <img class="card-img-img" src=${image} alt="">
        </div>
        <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <p class="card-founder">${founder}</p>
        <p class="card-category">${category}</p>
        <p class="card-price">$${price}</p>
        <a href="#" data-id=${id} class="card-link">Edit</a>
        <button class="card-button" data-id=${id}>Delete</button>
        </div>
        </div>
    </a>
    `;
    return onecard;
}

//Add Pitch Data________---------
pitchCreateBtn.addEventListener("click", () => {
    let addpitch = {
        title: pitchTitleInput.value,
        image: pitchImageInput.value,
        category: pitchCategoryInput.value,
        founder: pitchfounderInput.value,
        price: pitchPriceInput.value
    }
    fetch("https://frontendsideadityagotafode.onrender.com/pitches", { // Correct URL
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Correct capitalization
        },
        body: JSON.stringify(addpitch),
    })
        .then((res) => res.json())
        .then((json) => {
            prodata.push(json); // Update prodata with the new pitch
            onecardData(prodata); // Refresh the card list with updated data
            alert("Added Successfully");
            window.location.reload();
        })
        .catch((err) => console.log(err));
})

// DELETE PART=======>>>>>>>>.
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-button")) {
        e.preventDefault();
        delpitches(e.target.dataset.id);
    } else if (e.target.classList.contains("card-link")) {
        e.preventDefault();
        let id = e.target.dataset.id
        populateForm(id)
    }
});
function delpitches(id) {
    fetch(`https://frontendsideadityagotafode.onrender.com/pitches/${id}`, {
        method: "DELETE"
    })
        .then(res => { res.json() })
        .then(json => {
            console.log(json)
            alert("Deleted....")
            window.location.reload();
        })
        .catch((err) => { console.log(err) })
}

//filter part
filterFood.addEventListener("click", () => {
    console.log(prodata);
    let filterdata = prodata.filter((el) => el.category === "Food")
    onecardData(filterdata)
})
filterElectronics.addEventListener("click", () => {
    console.log(prodata);
    let filterdata = prodata.filter((el) => el.category === "Electronics")
    onecardData(filterdata)
})
filterPersonalCare.addEventListener("click", () => {
    console.log(prodata);
    let filterdata = prodata.filter((el) => el.category === "Personal Care")
    onecardData(filterdata)
})

//sort part
sortAtoZBtn.addEventListener("click", () => {
    let sortAtoZData = prodata.sort((a, b) => a.price - b.price)
    onecardData(sortAtoZData)
})
sortZtoABtn.addEventListener("click", () => {
    let sortZtoAData = prodata.sort((a, b) => b.price - a.price)
    onecardData(sortZtoAData)
})

//  update all fields
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-link")) {
        let id = e.target.dataset.id;
        populateForm(id)
    }
})
function populateForm(id) {
    fetch(`https://frontendsideadityagotafode.onrender.com/pitches/${id}`)
        .then((res) => res.json())
        .then((data) => {
            updatePitchIdInput.value = data.id;
            updatePitchTitleInput.value = data.title;
            updatePitchImageInput.value = data.image;
            updatePitchfounderInput.value = data.founder;
            updatePitchCategoryInput.value = data.category;
            updatePitchPriceInput.value = data.price;
            updatePricePitchId.value = data.id;

        })
        .catch((err) => console.log(err))
}
updatePitchBtn.addEventListener("click", () => {
    let updatedData = {
        title: updatePitchTitleInput.value,
        id: updatePitchIdInput.value,
        image: updatePitchImageInput.value,
        founder: updatePitchfounderInput.value,
        category: updatePitchCategoryInput.value,
        price: updatePitchPriceInput.value
    }
    fetch(`https://frontendsideadityagotafode.onrender.com/pitches/${updatedData.id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/data"
        },
        body: JSON.stringify(updatedData)
    }).then((res) => res.json())
        .then((data) => {
            alert("Updated Successfully....")
            window.location.reload();
        }).catch((err) => console.log(err))
})
updatePricePitchPriceButton.addEventListener("click", () => {
    let updateprice = {
        id: updatePricePitchId.value,
        price: updatePricePitchPrice.value
    }
    fetch(`https://frontendsideadityagotafode.onrender.com/pitches/${updateprice.id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/data"
        },
        body: JSON.stringify(updateprice)
    }).then((res) => res.json())
        .then((data) => {
            alert("Price Updated Successfully....")
            window.location.reload();
        }).catch((err) => console.log(err))
})
// Search functionality
searchByButton.addEventListener("click", () => {
    if (searchBySelect.value === "" || searchByInput.value === "") {
        alert("Please input valid information!!!......")
    } else {
        let searchSelect = searchBySelect.value.toLowerCase();
        let searchInput = searchByInput.value.toLowerCase().trim();
        let searched = prodata.filter((el) => {

            if (searchBySelect && searchByInput) {
                if (searchSelect === "title") {
                    return el.title.toLowerCase().includes(searchInput)
                } else if (searchSelect === "founder") {
                    return el.founder.toLowerCase().includes(searchInput)
                }
                return false;
            }
        })
        if (searched.length === 0) {
            onecardData(prodata)
            alert("not found")
        }else{

            onecardData(searched)
        }
    }
    // searchBySelect.
    // searchByInput
})