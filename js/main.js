

// $('#index-form').on('submit', function(e){
//     e.preventDefault();
//     $('.card-deck').html('');
//     const id = 'a695cc1d';
//     const key = '26f6e53414787742b18d4ffe0a73982e';
//     const inputData = $('.index-form__input').val();
//     fetch(`https://api.edamam.com/api/food-database/parser?ingr=${inputData}&app_id=${id}&app_key=${key}`)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(response){
//         const responseArray = response.hints;
//         $.each(responseArray, function(index,val){
//             const path = val.food;
//             // console.log(path);
//             if(path.image && path.label){
//                 const card = getCardContaier(path.image, path.label);
//                 //insert card data
//                 $('.card-deck').append(card);
//             }
//         })
//     })
// });


const createCard = (meal) => {
    const card = $('<div>', { class:'card-wrapper' });
    const content = `
        <div class="cards__item">
            <img src="${meal.mealThumb}" alt=""
                class="cards__image">
            <div class="cards__description">
                <span class="cards__name">${meal.mealName} (${meal.mealArea})</span>
                <div class="cards__profit">
                    <span class="cards__calories">255 calories</span>
                    <span class="cards__ingredients">16 ingredients</span>
                </div>
                <a href="${meal.mealLink}" class="cards__link"></a>
                <span class="cards__watch">watch cooking</span>
            </div>
        </div>`
    card.html(content);
    return card;
}

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
        const meal = {
            mealArea: val.strArea,
            mealName: val.strCategory,
            mealLink: val.strYoutube,
            mealThumb: val.strMealThumb
        }
        const card = createCard(meal);
        $('.cards').append(card);
       })
       
      
    })
});

