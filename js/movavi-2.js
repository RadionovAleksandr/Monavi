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
    var createElement = function(tagName, className, text) {
        var element = document.createElement(tagName);
        var classNames = className.split(' ');
        classNames.forEach(function(classNamesItem) {


            element.classList.add(classNamesItem)
        });
        if (text) {
            element.textContent = text;
        }
        return element;
    };

    //ф-ия добавляет элементы в массив "basket" и обновляет его
    var addToCard = function(evt) {
        var id = evt.target.dataset.id;
        basket.push(products[id]); //добавляет элементы в коллекцию корзины "basket"
        console.log(basket);
        console.log(products[id]);
        updatCart(); //обновление корзины

    };

    //ф-ия создает карточки каталога, и навешивает слушатель на кнопку "Вкорзину"
    function createProduct(productsItem) {
        var container = createElement('div', 'goods__item');
        product.appendChild(container);
        var imgWrap = createElement('div', 'goods__img-wrap');
        container.appendChild(imgWrap);
        var img = createElement('img', 'goods__img');
        img.src = productsItem.image;
        imgWrap.appendChild(img);
        var textWrap = createElement('div', 'goods__text-wrap');
        container.appendChild(textWrap);
        var title = createElement('h2', 'goods__title', productsItem.title);
        textWrap.appendChild(title);
        var text = createElement('p', 'goods__text', productsItem.description);
        textWrap.appendChild(text);
        var buttonWrap = createElement('div', 'goods__button-wrap');
        container.appendChild(buttonWrap);
        var priceWrap = createElement('div', 'goods__price-wrap');
        buttonWrap.appendChild(priceWrap);
        var price = createElement('div', 'goods__price', productsItem.price + ' руб.');
        priceWrap.appendChild(price);
        var button = createElement('button', 'goods__button button', 'В корзину!');
        // button.classList.add('button');
        buttonWrap.appendChild(button);
        button.addEventListener('click', addToCard); //Слушатель на кнопку "В корзину"
        basketItem.querySelector('.basket__item-img').dataset.id = products[id];
        basketItem.appendChild(itemPrice);
    };

    //ф-ия вешает слушатель на кнопку "закрыть"
    var onClickRemoveFromBasket = function() {
        var btnClose = document.querySelectorAll('.basket__item-img');
        btnClose.forEach(function(btnCloseItem) {
            if (btnClose) {
                btnCloseItem.addEventListener('click', removeFromBasket);
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
            var basketItem = createElement('div', 'basket__item');
            basketList.appendChild(basketItem);
            var itemImg = createElement('img', 'basket__item-img');
            itemImg.src = 'img/крестик.png';
            itemImg.alt = 'Кнопка закрыть';
            basketItem.appendChild(itemImg);
            var itemText = createElement('div', 'basket__item-text', basket[index].title);
            basketItem.appendChild(itemText);
            var itemPrice = createElement('div', 'basket__item-price', basket[index].price + ' руб.');
            basketItem.appendChild(itemPrice);
            basketItem.querySelector('.basket__item-img').dataset.id = index;
        })
        saveToStorage(); //запишем в localStorage обновленный список 
        onClickRemoveFromBasket(); // вешаю слушатели на обновленные кнопки "Закрыть" элементов корзины
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

    //ф-ия удаляет элемент из коллекции "basket" и отрисовывает обновленную коллекцию в элементы корзины
    var removeFromBasket = function(evt) {
        var btnClose = document.querySelectorAll('.basket__item-img');
        var id = evt.target.dataset.id;
        btnClose.forEach(function(btnCloseItem) {
            if (btnCloseItem.dataset.id === id) {
                basket.splice(id, 1); // удаляю  элемент коллекции
                updatCart();
            }
        })
    };

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

    //  окно alert с покупками
    var onCheckout = function() {
        var basketSum = document.querySelector('.basket__summ-number')
        var productInBasket = basket.map(function(item) {
            return item.title
        })
        var productInBasketStr = productInBasket.join()
        alert('Вы добавили в корзину' + productInBasketStr + 'на сумму ' + basketSum.textContent + ' руб')
    };

    // отрисовываем элементы каталога, проверяем localStorage, если есть элементы отрисовываем в "basket",
    var product = document.querySelector('.goods');
    products.forEach(createProduct);
    getToStorage();
    var checkoutBtn = document.querySelector('.basket__button');
    checkoutBtn.addEventListener('click', onCheckout); // вызов алерт после клика кнопки "оформить заказ"
})();