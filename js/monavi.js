//создаю элемент каталога, вставляюв разметку
(function() {
    var cardData = [
        card1 = {
            cardImg: "img/коробка1.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.",
            cardPrice: "1990 руб."
        },
        card2 = {
            cardImg: "img/коробка1.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.",
            cardPrice: "1990 руб."
        },
        card3 = {
            cardImg: "img/коробка1.jpg",
            cardTitle: "Пакет видеопрограмм",
            cardText: "Пакет лучших программ для работы с видео! Редактируйте на монтажном столе. Конвертируйте в любые форматы. Создавайте слайд-шоу. Нарезайте видео. Захватывайте видео с экрана, камер и ТВ-тюнера. Записывайте DVD и диски Blu-ray.",
            cardPrice: "1990 руб."
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
            catalogElement.querySelector('.goods__button').classList.add('data-id="' + i + '"');
            fragment.appendChild(catalogElement);
        }
        ListElement.appendChild(fragment);
    }
    if (ListElement) {
        createCard(cardData.length);
    };
})();