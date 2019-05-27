'use strict';

(function() {
    var ListElement = document.querySelector('.goods');
    var fragment = document.createDocumentFragment();
    var basketList = document.querySelector('.basketList');
    var basketfragment = document.createDocumentFragment();
    var basket = [];
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

    //ф-ия создания карточек каталога
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

    //создаю карточки каталога
    if (ListElement) {
        createCard(cardData.length);
    };

    var buttons = document.querySelectorAll('.goods__button');

    //ф-ия отрисовки и удаления элемента в корзине
    var onButtonClick = function(evt) {
        // debugger
        var id = evt.target.dataset.id;
        getElementBasket(id);
        createBasketItem();

        //вешаю слушатель на кнопку закрыть
        var btnClose = document.querySelectorAll('.basket__item-img');
        var basketItem = document.querySelectorAll('.basket__item');
        console.log(btnClose);
        console.log(basketItem);
        for (i = 0; i < basketItem.length; i++) {
            btnClose[i].addEventListener('click', onButtonClose);
        };
    };

    for (var i = 0; i < buttons.length; i++) {
        if (buttons) {
            buttons[i].addEventListener('click', onButtonClick);
        };
    };

    //удаление элемента корзины
    var onButtonClose = function() {
        console.log('close по' + i + 'элементу');
        // удаляю  элемент коллекции , удаляю все элементы корзины и обновляю корзину новой коллекцией
        console.log(basket);
        basket.splice(i - 2, 1);
        console.log(basket);
        createBasketItem();

    }

    //удаление элемента корзины
    var getElementBasket = function(i) {
        basket.push(cardData[i]);
        console.log(basket);
    };

    //обновление DOM
    var createBasketItem = function() {
        while (basketList.firstChild) {
            basketList.removeChild(basketList.firstChild)
        };
        console.log('функция добавления корзины');
        for (i = 0; i < basket.length; i++) {
            var cardTemplate = document.querySelector('#basketItem');
            var basketElement = cardTemplate.cloneNode(true);
            basketElement.querySelector('.basket__item-text').textContent = basket[i].cardTitle;
            basketElement.querySelector('.basket__item-price').textContent = basket[i].cardPrice;
            basketfragment.appendChild(basketElement);
            basketList.appendChild(basketfragment);
        };
    }
})();