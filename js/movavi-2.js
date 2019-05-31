'use strict';

(function() {
    var basket = []; //масив отображаемый в корзине
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

    // ф-ия создает элементы для вставки в DOM
    var makeElement = function(tagName, className, text) {
        var element = document.createElement(tagName);
        element.classList.add(className);
        if (text) {
            element.textContent = text;
        }
        return element;
    };

    //ф-ия отрисовывает обновленные элементы из массива "basket" и навешивание слушателя на обновленные элементы basket."закрыть"
    var addToCard = function(evt) {
        var id = evt.target.dataset.id;
        basket.push(cardData[id]); //добавляет элементы в коллекцию корзины "basket"
        updatCart(); //обновление корзины
    };

    //ф-ия создает карточки каталога, и навешивает слушатель на кнопку "Вкорзину"
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
        button.addEventListener('click', addToCard); //Слушатель на кнопку "В корзину"
        cardContainer.querySelector('.goods__button').dataset.id = index; // задаем индекс элементу
    });

    //ф-ия вешает слушатель на кнопку "закрыть"
    var onlistenerClose = function() {
        var btnClose = document.querySelectorAll('.basket__item-img');
        btnClose.forEach(function(btnCloseItem) {
            if (btnClose) {
                btnCloseItem.addEventListener('click', onButtonClose);
            }
        })
    };

    //Ф-ия обновляет состояние корзины и отрисовывает элементы корзины ссылаясь на элементы обновленного массива "basket"
    var updatCart = function() {
        var basketList = document.querySelector('.basketList');
        while (basketList.firstChild) {
            basketList.removeChild(basketList.firstChild)
        }
        basket.forEach(function(basketItem, index) {
            console.log(basketItem.cardTitle);
            console.log(basket[index].cardTitle); // Есть вопрос для изучения
            console.log(index);
            var basketItem = makeElement('div', 'basket__item');
            basketList.appendChild(basketItem);
            var itemImg = makeElement('img', 'basket__item-img');
            itemImg.src = 'img/крестик.png';
            itemImg.alt = 'Кнопка закрыть';
            // itemImg.addEventListener('click', onButtonClose);
            basketItem.appendChild(itemImg);
            var itemText = makeElement('div', 'basket__item-text', basket[index].cardTitle);
            basketItem.appendChild(itemText);
            var itemPrice = makeElement('div', 'basket__item-price', basket[index].cardPrice);
            basketItem.appendChild(itemPrice);
            basketItem.querySelector('.basket__item-img').dataset.id = index;
        })
        saveToStorage(); //запишем в localStorage обновленный список 
        onlistenerClose(); // вешаю слушатели на обновленные кнопки "Закрыть" элементов корзины
        basketSum(basket); //обновляем общую сумму
    };

    //ф-ия сохраняет в localStorage данные
    var saveToStorage = function() {
        var serialBasket = JSON.stringify(basket); //сериализуем 
        localStorage.setItem("products", serialBasket); //запишем в хранилище по ключу "products"
    };

    //ф-ия получает из localStorage данные
    var getToStorage = function() {
        var returnBasket = JSON.parse(localStorage.getItem("products")) //спарсим его обратно объект
        if (returnBasket) {
            basket = returnBasket;
            updatCart()
        } else {
            console.log('LocalStorage пустой');
        }
    };

    //  проверяем localStorage, если есть элементы отрисовываем в "basket"
    getToStorage();

    //ф-ия удаляет элемент из коллекции "basket" и отрисовывает обновленную коллекцию в элементы корзины
    var onButtonClose = function(evt) {
        var btnClose = document.querySelectorAll('.basket__item-img');
        var id = evt.target.dataset.id;
        btnClose.forEach(function(btnCloseItem) {
            if (btnCloseItem.dataset.id === id) {
                basket.splice(id, 1); // удаляю  элемент коллекции
                updatCart();
            }
        })
    };

    onlistenerClose() //вешаю слушатель на элементы коллекции basket."закрыть"

    // ф-ия считает общую сумму корзины покупок
    function basketSum(array) {
        var basketSum = document.querySelector('.basket__summ-number')
        var sum = 0;
        array.forEach(function(arrayItem) {
            sum += arrayItem.cardPrice;
        })
        basketSum.textContent = sum;
        return (basketSum)
    };
})();