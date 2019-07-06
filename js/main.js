const getCardContaier = () => {
    const card = $('<div>', {class: 'card'});
    const cardImage = $('<img>', {class: 'card-img-top'});
    const cardBody = $('<div>', {class: 'card-body'});
    const cardTitle = $('<h5>', {class: 'card-title'});
    cardBody.append(cardTitle);
    // $('body').append(card, [cardImage, cardBody]);
    card.append(cardImage);
    card.append(cardBody);
    return card;
}

$('#index-form').on('submit', function(e){
    e.preventDefault();
    const id = 'a695cc1d';
    const key = '26f6e53414787742b18d4ffe0a73982e';
    const inputData = $('.index-form__input').val();
    fetch(`https://api.edamam.com/api/food-database/parser?ingr=${inputData}&app_id=${id}&app_key=${key}`)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        const responseArray = response.hints;
        $.each(responseArray, function(index,val){
            const path = val.food;
            // console.log(path);
            if(path.image && path.label){
                const card = getCardContaier();
                //insert card data
                $('.card-group').append(card);
            }
        })
    })
});