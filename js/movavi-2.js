(function() {
    var ListElement = document.querySelector('.goods');
    var fragment = document.createDocumentFragment();
    var buttons = document.querySelectorAll('.goods__button');
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
    //функция по клику
    var onButtonClick = function(evt) {
        // debugger
        var id = evt.target.dataset.id;
        for (i = 0; i < buttons.length; i++) {
            if (buttons[i].dataset.id === id) {
                getElementBasket(id);
                createBasketItem();
            }
        }
    };
    //пушу в массив корзины
    var getElementBasket = function(i) {
        basket.push(cardData[i]);
        console.log(basket);
    };

    for (i = 0; i < buttons.length; i++) {
        if (buttons) {
            buttons[i].addEventListener('click', onButtonClick);
        };
    };

    //обновляем дом
    var createBasketItem = function() {

        var cardTemplate = document.querySelector('#basketItem');
        var basketElement = cardTemplate.cloneNode(true);
        basketElement.querySelector('.basket__item-text').textContent = basket[basket.length - 1].cardTitle;
        basketElement.querySelector('.basket__item-price').textContent = basket[basket.length - 1].cardPrice;
        basketfragment.appendChild(basketElement);
        basketList.appendChild(basketfragment);
    };
})();