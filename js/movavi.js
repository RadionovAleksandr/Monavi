// создаю элемент каталога, вставляюв разметку
(function() {
    var cardData = [
        card1 = {
            cardImg: "img/коробка1.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.",
            cardPrice: "1990 руб"
        },
        card2 = {
            cardImg: "img/коробка2.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.",
            cardPrice: "2590 руб"
        },
        card3 = {
            cardImg: "img/коробка3.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.",
            cardPrice: "1590 руб"
        }
    ];

    var ListElement = document.querySelector('.goods');
    var fragment = document.createDocumentFragment();

    var createCard = function(create) {
        var cardTemplate = document.querySelector('#card')

        for (var i = 0; i < create; i++) {
            var catalogElement = cardTemplate.cloneNode(true);
            catalogElement.querySelector('.goods__img').srcset = cardData[i].cardImg;
            catalogElement.querySelector('.goods__title').textContent = cardData[i].cardTitle;
            catalogElement.querySelector('.goods__text').textContent = cardData[i].cardText;
            catalogElement.querySelector('.goods__price').textContent = cardData[i].cardPrice;
            catalogElement.querySelector('.goods__button').dataset.id = i;

            fragment.appendChild(catalogElement);
        }
        ListElement.appendChild(fragment);
    }
    if (ListElement) {
        createCard(cardData.length);
    };

    var buttons = document.querySelectorAll('.goods__button')
    console.log(buttons)

    var onButtonClick = function(evt) {
        var id = evt.target.dataset.id;
        for (i = 0; i < buttons.length; i++) {

            if (buttons[i].dataset.id === id) {
                createBasketItem(id);
            }
        }
    };


    var basketList = document.querySelector('.basketList');
    var basketfragment = document.createDocumentFragment();

    var createBasketItem = function(i) {
        var cardTemplate = document.querySelector('#basketItem')
        var basketElement = cardTemplate.cloneNode(true);

        basketElement.querySelector('.basket__item-text').textContent = cardData[i].cardTitle;
        basketElement.querySelector('.basket__item-price').textContent = cardData[i].cardPrice;

        basketfragment.appendChild(basketElement);
        basketList.appendChild(basketfragment);
    }

    for (i = 0; i < buttons.length; i++) {
        if (buttons) {
            buttons[i].addEventListener('click', onButtonClick);
        };
    };

    var BtnClose = document.getElementsByClassName('basket__item-img');

    console.log(BtnClose);

    for (i = 0; i < BtnClose.length; i++) {
        if (BtnClose) {
            BtnClose[i].addEventListener('click', function() {
                console.log('close')
            });
        };
    };

})();

// var summPrice = document.getElementsByClassName('basket__item-price');
//     console.log(summPrice);

//     var onButtonClose = function(i) {
//         var basketItem = document.getElementsByClassName('basket__item');
//         console.log('поймал клик не крестике');
//         basketList.removeChild(basketItem)
//     };

//     var BtnClose = document.getElementsByClassName('basket__item-img');
//     console.log(BtnClose.length);

//     for (i = 0; i < BtnClose.length; i++) {
//         BtnClose[i].addEventListener('click', onButtonClose(i));
//     };