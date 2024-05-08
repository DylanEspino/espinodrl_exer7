function ValidateForm() {
    // Get form input values
    var food = document.getElementById("foodname").value;
    var description = document.getElementById("description").value;
    var imglink = document.getElementById("imglink").value;
    var rank = document.getElementById("rank").value;

    // Check if any input is empty or rank is not a number
    if (!food || !description || !imglink ||  isNaN(rank)) {
        console.log("There are some invalid inputs");
        return null;
    }

    console.log("All inputs are valid");
    // Create a FoodObject with the input values
    var FoodObject = {
        "food": food,
        "description": description,
        "imglink": imglink,
        "rank": rank
    };

    return FoodObject;
}

function createFoodCard(FoodObject){
    // Create a new food card div
    var foodCard = document.createElement("div");
    var imgBox = document.createElement("div");
    imgBox.classList.add("imgdiv");
    var foodName = document.createElement("p");
    foodName.innerHTML = "";
    var foodDescription = document.createElement("p");
    var rank = document.createElement("p");
    rank.innerHTML = "RANK: ";
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "DELETE";
    deleteButton.addEventListener("click", function(){
        deleteCard(FoodObjectArray.indexOf(FoodObject));
    });
    foodCard.classList.add("food-card");
    foodName.classList.add("food-name");
    foodCard.append(imgBox,foodName,foodDescription,rank,deleteButton);

    return foodCard;
}

function insertFoodInfo(foodCard, FoodObject){
    // Insert food information into the food card
    var img = document.createElement("img");
    img.classList.add("imgsize");
    img.src = FoodObject["imglink"];
    foodCard.childNodes[0].appendChild(img);
    foodCard.childNodes[1].innerHTML += FoodObject["food"];
    foodCard.childNodes[2].innerHTML = FoodObject["description"];
    foodCard.childNodes[3].innerHTML += FoodObject["rank"];
}

function deleteCard(index){
    // Delete a card from the array and re-render the cards
    FoodObjectArray.splice(index, 1);
    renderFoodCards(); 
}

function renderFoodCards() {
    var cardContainer = document.getElementById("card-container");

    // Clear the existing cards
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }

    // Create a new card container
    var foodCardsDiv = document.createElement("div");
    foodCardsDiv.classList.add("card-container");
    cardContainer.appendChild(foodCardsDiv);

    // Render food cards
    for (let a = 0; a < FoodObjectArray.length; a++) {
        const foodCard = createFoodCard(FoodObjectArray[a]);
        insertFoodInfo(foodCard, FoodObjectArray[a]);
        foodCardsDiv.appendChild(foodCard);
    }
}

function submitForm(event){ 
    event.preventDefault(); 
    console.log(document.getElementById("foodname").value);
    var foodCard = ValidateForm();
    if(foodCard !== null){
        FoodObjectArray.push(foodCard);
    }
    FoodObjectArray.sort((a, b) => a.rank - b.rank);
    renderFoodCards();
    form.reset();
}

const form = document.getElementById("form-field");
var FoodObjectArray = []; 
form.addEventListener("submit", submitForm);
