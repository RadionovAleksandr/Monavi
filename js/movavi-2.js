'use strict';

(function() {
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
        var basketList = document.querySelector('.basketList');
        while (basketList.firstChild) {
            basketList.removeChild(basketList.firstChild)
        };
        basket.forEach(function(basketItem, index) {
            // for (i = 0; i < basket.length; i++) {
            var basketItem = makeElement('div', 'basket__item');
            basketList.appendChild(basketItem);
            var itemImg = makeElement('img', 'basket__item-img');
            itemImg.src = 'img/крестик.png';
            itemImg.alt = 'Кнопка закрыть';
            basketItem.appendChild(itemImg);
            var itemText = makeElement('div', 'basket__item-text', basket[index].cardTitle);
            basketItem.appendChild(itemText);
            var itemPrice = makeElement('div', 'basket__item-price', basket[index].cardPrice);
            basketItem.appendChild(itemPrice);
            basketItem.querySelector('.basket__item-img').dataset.id = index;
        })
    }

    //ф-ия получает из localStorage данные
    var getToStorage = function() {
        var returnBasket = JSON.parse(localStorage.getItem("products")) //спарсим его обратно объект
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



    // ф-ия создает элементы для вставки в DOM
    var makeElement = function(tagName, className, text) {
        var element = document.createElement(tagName);
        element.classList.add(className);
        if (text) {
            element.textContent = text;
        }
        return element;
    };

    // Предварительно проверив localStorage создаю карточки каталога
    getToStorage();
    //ф-ия создания карточек каталога
    cardData.forEach(function(cardDataItem, index) {
        var ListElement = document.querySelector('.goods');
        var cardContainer = makeElement('div', 'goods__item');
        ListElement.appendChild(cardContainer);
        var imgWrap = makeElement('div', 'goods__img-wrap');
        cardContainer.appendChild(imgWrap);
        var img = makeElement('img', 'goods__img');
        img.src = cardDataItem.cardImg;
        imgWrap.appendChild(img);
        var textWrap = makeElement('div', 'goods__text-wrap');
        cardContainer.appendChild(textWrap);
        var title = makeElement('h3', 'goods__title', cardDataItem.cardTitle);
        textWrap.appendChild(title);
        var text = makeElement('p', 'goods__text', cardDataItem.cardText);
        textWrap.appendChild(text);
        var buttonWrap = makeElement('div', 'goods__button-wrap');
        cardContainer.appendChild(buttonWrap);
        var priceWrap = makeElement('div', 'goods__price-wrap');
        buttonWrap.appendChild(priceWrap);
        var price = makeElement('div', 'goods__price', cardDataItem.cardPrice);
        priceWrap.appendChild(price);
        var button = makeElement('button', 'goods__button', 'В корзину!');
        button.classList.add('button');
        buttonWrap.appendChild(button);
        cardContainer.querySelector('.goods__button').dataset.id = index;
    });


    //ф-ия отрисовки обновленных элементов в коллекции "basket" и навешивание слушателя на обновленные элементы basket."закрыть"
    var onButtonClick = function(evt) {
        var id = evt.target.dataset.id;
        basket.push(cardData[id]); //добавляет элементы в коллекцию корзины "basket"
        createBasketItem();
        saveToStorage(); //запишем в localStorage обновленный список 
        basketSum(basket); //обновляем общую сумму
        onlistenerClose();

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