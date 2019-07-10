const createCard = (meal) => {
    const card = $('<div>', { class:'card-wrapper' });
    const content = `
        <div class="cards__item" data-id="${meal.mealId}">
            <img src="${meal.mealThumb}" alt=""
                class="cards__image">
            <div class="cards__description">
                <span class="cards__name">${meal.mealName} (${meal.mealArea})</span>
                <div class="cards__profit">
                    <span class="cards__calories">255 calories</span>
                    <span class="cards__ingredients">${meal.mealIngredients} ingredients</span>
                </div>
                <a href="${meal.mealLink}" class="cards__link"></a>
                <span class="cards__watch">watch cooking</span>
            </div>
            <button class="cards__button">read more</button>
        </div>`
    card.html(content);
    return card;
}

function showModal(){
    const mealId = $(this).closest('.cards__item').attr('data-id');
    // console.log(ingredientsArray);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(response => {
        const mealObj = response.meals[0];
        const mealThumb = mealObj.strMealThumb;
        const ingredientsKeys = [];
        const ingredientsValues = [];
        const ingredients = {};
        for(let key in mealObj){
            if(mealObj.hasOwnProperty(key)){
                if(key.includes('strIngredient')){
                    if(mealObj[key] != "") {
                        ingredientsKeys.push(mealObj[key]);
                    }
                }
            }
        }
        for(let key in mealObj){
            if(mealObj.hasOwnProperty(key)){
                if(key.includes('strMeasure')){
                    if(mealObj[key] != "") {
                        ingredientsValues.push(mealObj[key]);
                    }
                }
            }
        }
        ingredientsKeys.forEach((item, index) => ingredients[item] = ingredientsValues[index]);
        console.log(ingredients);
        $('.modal__header').text(`${mealObj.strCategory} (${mealObj.strArea})`);
        $('.modal__instruction').text(`${mealObj.strInstructions}`);
        $('.modal__ingredients').html('');
        for(let key in ingredients){
            $('.modal__ingredients').append(`<li class="modal__ingredients-item">${key} - ${ingredients[key]}</li>`);
        }
        // $('.modal__ingredients').text(ingredients);
        $('.modal__image').attr('src', mealThumb);
        $('.modal__contact').attr('href', mealObj.strYoutube);
        $('.modal').css('display', 'flex');
        // console.log();
    })
};

$('.index-form').on('submit', function(e){
    e.preventDefault();
    $('.cards').html('');
    const inputData = $('.index-form__input').val();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
       console.log(response.meals);
       const responseObj = response.meals;
       $.each(responseObj, function(index,val){
            const ingredientsArray = [];

            for(let key in val){
                if(val.hasOwnProperty(key)){
                    if(key.includes('strIngredient')){
                        if(val[key] != "") {
                            ingredientsArray.push(val[key]);
                        }
                    }
                }
            }

            const meal = {
                mealArea: val.strArea,
                mealName: val.strCategory,
                mealLink: val.strYoutube,
                mealThumb: val.strMealThumb,
                mealIngredients: ingredientsArray.length,
                mealId: val.idMeal,
            }

            const card = createCard(meal);
            $('.cards').append(card);

            // $('.cards__button').on('click', showModal.bind(null, ingredientsArray));
       })
    //    const btns = document.querySelectorAll('.cards__button');
    //    [...btns].forEach(item => {
    //         item.addEventListener('click', showModal.bind(null, ingredientsArray))
    //    })
    $('.cards__button').on('click', showModal);
    })
});

//close gallery modal
$('.modal__close').on('click', function(){
    $('.modal').fadeOut();
});