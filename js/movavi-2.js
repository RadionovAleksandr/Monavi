'use strict';

(function() {
    var ListElement = document.querySelector('.goods');
    var fragment = document.createDocumentFragment();
    var basketList = document.querySelector('.basketList');
    var basketfragment = document.createDocumentFragment();
    var basket = [];
    var cardData = [{
            id: 0,
            cardImg: "img/коробка1.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardPrice: "1990 ",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray."
        },
        {
            id: 1,
            cardImg: "img/коробка2.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardPrice: "2590 ",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray."
        },
        {
            id: 2,
            cardImg: "img/коробка3.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardPrice: "1590 ",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray."

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
            catalogElement.querySelector('.goods__button').dataset.id = cardData[i].id;

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
        var id = evt.target.dataset.id;
        getElementBasket(id);
        createBasketItem();
        basketSum(basket); // В планах было написать проверку суммы при удалении элемента корзины
        // saveToStorage(); // Должна сохранять данные в localStorage и подставлять в корзину после проверки, 

        //вешаю слушатель на кнопку закрыть
        var btnClose = document.querySelectorAll('.basket__item-img');
        var basketItem = document.querySelectorAll('.basket__item');

        for (i = 0; i < basketItem.length; i++) {
            btnClose[i].addEventListener('click', onButtonClose);
        };
    };

    //Слушатель на кнопку "В корзину"
    for (var i = 0; i < buttons.length; i++) {
        if (buttons) {
            buttons[i].addEventListener('click', onButtonClick);
        };
    };

    //удаление элемента корзины
    var onButtonClose = function(evt) {
        var btnClose = document.querySelectorAll('.basket__item-img');
        var id = evt.target.dataset.id;
        for (i = 0; i < btnClose.length; i++) {
            if (btnClose[i].dataset.id === id) {
                // удаляю  элемент коллекции , удаляю все элементы корзины и обновляю корзину новой коллекцией
                basket.splice(id, 1);
                createBasketItem();
            }
        }
        for (i = 0; i < basketItem.length; i++) {
            var btnClose = document.querySelectorAll('.basket__item-img');
            btnClose[i].addEventListener('click', onButtonClose);
        };
    }

    //создание массива для корзины
    var getElementBasket = function(i) {
        basket.push(cardData[i]);
    };

    //обновление DOM
    var createBasketItem = function() {
        while (basketList.firstChild) {
            basketList.removeChild(basketList.firstChild)
        };
        for (i = 0; i < basket.length; i++) {
            var cardTemplate = document.querySelector('#basketItem');
            var basketElement = cardTemplate.cloneNode(true);
            basketElement.querySelector('.basket__item-text').textContent = basket[i].cardTitle;
            basketElement.querySelector('.basket__item-price').textContent = basket[i].cardPrice;
            basketElement.querySelector('.basket__item-img').dataset.id = i;
            basketfragment.appendChild(basketElement);
            basketList.appendChild(basketfragment);
        };
    }

    //считаем общую сумму корзины покупок
    function basketSum(array) {
        var basketSum = document.querySelector('.basket__summ-number')
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += -(array[i].cardPrice); //привожу к типу данных number и суммирую по циклу
            basketSum.textContent = sum;
        }
        return (basketSum)
    }

})();