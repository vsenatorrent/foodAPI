const getCardContaier = (imgPath, titleContent) => {
    const getElem = (selector, classname) => {
        return $(`<${selector}>`, {class: classname })
    };
    // const card = $('<div>', {class: 'card'});
    const card = getElem('div', 'card my-2');
    // const cardImage = $('<img>', {class: 'card-img-top'});
    const cardItem = getElem('div', 'card-item');
    const cardImage = getElem('img', 'card-img-top').attr('src', imgPath);
    // const cardBody = $('<div>', {class: 'card-body'});
    const cardBody = getElem('div', 'card-body');
    // const cardTitle = $('<h5>', {class: 'card-title'});
    const cardTitle = getElem('h5', 'card-title').text
    (titleContent);
    cardBody.append(cardTitle);
    // $('body').append(card, [cardImage, cardBody]);
    card.append(cardImage);
    card.append(cardBody);
    cardItem.append(card);
    return cardItem;
}

$('#index-form').on('submit', function(e){
    e.preventDefault();
    $('.card-deck').html('');
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
                const card = getCardContaier(path.image, path.label);
                //insert card data
                $('.card-deck').append(card);
            }
        })
    })
});