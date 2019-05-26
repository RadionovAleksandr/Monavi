// создаю элемент каталога, вставляюв разметку
(function() {
    var cardData = [{
            cardImg: "img/коробка1.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.",
            cardPrice: "1990 руб"
        },
        {
            cardImg: "img/коробка2.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.",
            cardPrice: "2590 руб"
        },
        {
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
})();


//создаю элемент корзины при клике на кнопку "в корзину"
(function() {
    var buttons = document.querySelectorAll('.goods__button')
    var basketList = document.querySelector('.basketList');
    var basketfragment = document.createDocumentFragment();

    var cardBasket = [{
            cardTitle: "Пакет видеопрограмм",
            cardPrice: "1990 руб"
        },
        {
            cardTitle: "Пакет видеопрограмм",
            cardPrice: "2590 руб"
        },
        {
            cardTitle: "Пакет видеопрограмм",
            cardPrice: "1590 руб"
        }
    ];

    var onButtonClick = function(evt) {
        var id = evt.target.dataset.id;
        for (i = 0; i < buttons.length; i++) {
            if (buttons[i].dataset.id === id) {
                createBasketItem(id);
                getElementBasket();
            }
        }
    };

    var getElementBasket = function() {
        window.btnClose = document.querySelectorAll('.basket__item-img');
        console.log(BtnClose.length);
    };

    var createBasketItem = function(i) {
        var cardTemplate = document.querySelector('#basketItem')
        var basketElement = cardTemplate.cloneNode(true);
        basketElement.querySelector('.basket__item-text').textContent = cardBasket[i].cardTitle;
        basketElement.querySelector('.basket__item-price').textContent = cardBasket[i].cardPrice;
        basketfragment.appendChild(basketElement);
        basketList.appendChild(basketfragment);
    }

    for (i = 0; i < buttons.length; i++) {
        if (buttons) {
            buttons[i].addEventListener('click', onButtonClick);
        };
    };
})();

//вешаю слушатель на кнопку закрыть
(function() {
    // BtnClose = document.querySelectorAll('.basket__item-img');

    console.log(window.btnClose);

    for (i = 0; i < btnClose.length; i++) {
        window.btnClose[i].addEventListener('click', function() {
            console.log('close');
        });
    };
})();


var summPrice = document.getElementsByClassName('basket__item-price');
console.log(summPrice);

var summPrice1 = document.querySelectorAll('basket__item-price');
console.log(summPrice1);

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