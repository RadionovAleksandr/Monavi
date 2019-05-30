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
            cardPrice: 1990,
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray."
        },
        {
            id: 1,
            cardImg: "img/коробка2.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardPrice: 2590,
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray."
        },
        {
            id: 2,
            cardImg: "img/коробка3.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardPrice: 1590,
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray."
        }
    ];

    //Ф-ия  отрисовывает элементы корзины ссылаясь на элементы коллекции "basket"
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

    //ф-ия получает из localStorage данные
    var getToStorage = function() {
        var returnBasket = JSON.parse(localStorage.getItem("products")) //спарсим его обратно объект
        console.log(returnBasket);
        if (returnBasket) {
            basket = returnBasket;
            createBasketItem()
            basketSum(basket)
        } else {
            console.log('LocalStorage пустой');
        }
    }

    var saveToStorage = function() {
        var serialBasket = JSON.stringify(basket); //сериализуем 
        localStorage.setItem("products", serialBasket); //запишем в хранилище по ключу "products"
    }

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

    // Предварительно проерив localStorage создаю карточки каталога
    if (ListElement) {
        getToStorage();
        createCard(cardData.length);
    };

    //ф-ия отрисовки обновленных элементов в коллекции "basket" и навешивание слушателя на обновленные элементы basket."закрыть"
    var onButtonClick = function(evt) {
        var id = evt.target.dataset.id;
        basket.push(cardData[id]); //добавляет элементы в коллекцию корзины "basket"
        createBasketItem();
        saveToStorage(); //запишем в localStorage обновленный список 
        basketSum(basket); //обновляем общую сумму
        for (i = 0; i < basketItem.length; i++) {
            var btnClose = document.querySelectorAll('.basket__item-img');
            btnClose[i].addEventListener('click', onButtonClose);
        };
    };

    //Слушатель на кнопку "В корзину"
    var buttons = document.querySelectorAll('.goods__button');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons) {
            buttons[i].addEventListener('click', onButtonClick);
        };
    };

    //ф-ия удаляет элемент из коллекции "basket" и отрисовывает обновленную коллекцию в элементы корзины
    var onButtonClose = function(evt) {
        var btnClose = document.querySelectorAll('.basket__item-img');
        var id = evt.target.dataset.id;
        for (i = 0; i < btnClose.length; i++) {
            if (btnClose[i].dataset.id === id) {
                basket.splice(id, 1); // удаляю  элемент коллекции
                saveToStorage(); //запишем в localStorage обновленный список 
                getToStorage();
                createBasketItem();
                basketSum(basket);
            }
        }
        //вешаю слушатель на обновленные элементы коллекции basket."закрыть"
        onlistenerClose()
    }

    //ф-ия вешает слушатель на кнопку "закрыть"
    var onlistenerClose = function() {
        var btnClose = document.querySelectorAll('.basket__item-img');

        for (i = 0; i < btnClose.length; i++) {
            if (btnClose) {
                btnClose[i].addEventListener('click', onButtonClose);
            }
        };
    }

    onlistenerClose() //вешаю слушатель на элементы коллекции basket."закрыть"

    // ф-ия считает общую сумму корзины покупок
    function basketSum(array) {
        var basketSum = document.querySelector('.basket__summ-number')
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += array[i].cardPrice;
        }
        basketSum.textContent = sum;
        return (basketSum)
    }
})();