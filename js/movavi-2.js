'use strict';

(function() {
    var basket = []; //масив отображаемый в корзине
    var products = [{
            id: 0,
            image: "img/коробка1.jpg",
            title: "Пакет видеопрограмм",
            price: 1890,
            description: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray."
        },
        {
            id: 1,
            image: "img/коробка2.jpg",
            title: "Фотостудия Movavi",
            price: 990,
            description: "Полный набор инструментов для легкой фотообработки. Настраивайте параметры изображения вручную и улучшайте качество автоматически, добавляйте крутые фильтры и надписи. Обрезайте, отражайте и поворачивайте кадр, изменяйте размер фото. Удаляйте с фото лишние объекты и заменяйте скучные фоны. Обрабатывайте папки с фото в пакетном режиме, создавайте слайд-шоу с музыкой и переходами."
        },
        {
            id: 2,
            image: "img/коробка3.jpg",
            title: "Movavi Фоторедактор",
            price: 490,
            description: "Улучшайте качество фото автоматически и вручную. Настраивайте резкость, контраст и цветность. Удаляйте с фотографий объекты, случайно попавшие в кадр. Заменяйте фон изображения. Добавляйте надписи. Выделяйте элементы при помощи удобных инструментов – кисти, волшебной палочки или лассо. Используйте штамп, чтобы устранять мелкие дефекты изображений."
        },
        {
            id: 3,
            image: "img/коробка4.jpg",
            title: "Movavi пакетный Фоторедактор",
            price: 490,
            description: "Обрабатывайте любое количество фотографий одним нажатием кнопки – уменьшайте целые фотоальбомы, переименовывайте файлы, конвертируйте формат и улучшайте качество изображений в пакетном режиме. Теперь вам не придется сохранять каждый файл по отдельности: просто примените изменения ко всем фото сразу и экспортируйте их с новыми настройками!"
        },
        {
            id: 4,
            image: "img/коробка5.jpg",
            title: "Захват видео с экрана",
            price: 1490,
            description: "Записывайте все, что происходит на экране вашего монитора: видеочаты, работу в программах и интернет-браузерах и многое другое. Сохраняйте скринкасты в любые популярные форматы и для мобильных устройств."
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

    //ф-ия добавляет элементы в массив "basket" и обновляет его
    var addToCard = function(evt) {
        var id = evt.target.dataset.id;
        basket.push(products[id]); //добавляет элементы в коллекцию корзины "basket"
        updatCart(); //обновление корзины
    };

    //ф-ия создает карточки каталога, и навешивает слушатель на кнопку "Вкорзину"
    function addToProduct(productsItem, index) {
        var product = document.querySelector('.goods');
        var container = makeElement('div', 'goods__item');
        product.appendChild(container);
        var imgWrap = makeElement('div', 'goods__img-wrap');
        container.appendChild(imgWrap);
        var img = makeElement('img', 'goods__img');
        img.src = productsItem.image;
        imgWrap.appendChild(img);
        var textWrap = makeElement('div', 'goods__text-wrap');
        container.appendChild(textWrap);
        var title = makeElement('h2', 'goods__title', productsItem.title);
        textWrap.appendChild(title);
        var text = makeElement('p', 'goods__text', productsItem.description);
        textWrap.appendChild(text);
        var buttonWrap = makeElement('div', 'goods__button-wrap');
        container.appendChild(buttonWrap);
        var priceWrap = makeElement('div', 'goods__price-wrap');
        buttonWrap.appendChild(priceWrap);
        var price = makeElement('div', 'goods__price', productsItem.price + ' руб.');
        priceWrap.appendChild(price);
        var button = makeElement('button', 'goods__button', 'В корзину!');
        button.classList.add('button');
        buttonWrap.appendChild(button);
        button.addEventListener('click', addToCard); //Слушатель на кнопку "В корзину"
        container.querySelector('.goods__button').dataset.id = index; // задаем индекс элементу
    };

    //ф-ия вешает слушатель на кнопку "закрыть"
    var onlistenerClose = function() {
        var btnClose = document.querySelectorAll('.basket__item-img');
        btnClose.forEach(function(btnCloseItem) {
            if (btnClose) {
                btnCloseItem.addEventListener('click', removeToCard);
            }
        })
    };

    //Ф-ия обновляет состояние корзины и отрисовывает элементы корзины ссылаясь на элементы обновленного массива "basket"
    var updatCart = function() {
        var basketList = document.querySelector('.basket__list');
        while (basketList.firstChild) {
            basketList.removeChild(basketList.firstChild)
        }
        basket.forEach(function(basketItem, index) {
            var basketItem = makeElement('div', 'basket__item');
            basketList.appendChild(basketItem);
            var itemImg = makeElement('img', 'basket__item-img');
            itemImg.src = 'img/крестик.png';
            itemImg.alt = 'Кнопка закрыть';
            basketItem.appendChild(itemImg);
            var itemText = makeElement('div', 'basket__item-text', basket[index].title);
            basketItem.appendChild(itemText);
            var itemPrice = makeElement('div', 'basket__item-price', basket[index].price + ' руб.');
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
        }
    };

    // отрисовываем элементы каталога, проверяем localStorage, если есть элементы отрисовываем в "basket",
    products.forEach(addToProduct);
    getToStorage();

    //ф-ия удаляет элемент из коллекции "basket" и отрисовывает обновленную коллекцию в элементы корзины
    var removeToCard = function(evt) {
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
            sum += arrayItem.price;
        })
        basketSum.textContent = sum;
        return (basketSum)
    };


    // доработать алерт, окно алерт

    var onCheckout = function() {
        var basketSum = document.querySelector('.basket__summ-number')
        var titlePrduct = document.querySelectorAll('.basket__item-text');

        alert('Вы добавили в корзину ' +
            titlePrduct.forEach(function(title) {
                title.textContent
            }) +
            ' на сумму ' + basketSum.textContent);
    };
    var checkoutBtn = document.querySelector('.basket__button');
    checkoutBtn.addEventListener('click', onCheckout); // вызов алерт после клика кнопки "оформить заказ"
})();