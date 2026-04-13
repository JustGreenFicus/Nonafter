function moveSlide(button, step) {
    const slider = button.closest('.slider');
    const images = slider.querySelectorAll('.slides img');
    let currentIndex = parseInt(slider.getAttribute('data-current'));

    images[currentIndex].classList.remove('active');
    currentIndex += step;

    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;

    images[currentIndex].classList.add('active');
    slider.setAttribute('data-current', currentIndex);
}
let currentGallery = []; // Список путей к картинкам текущего товара
let currentModalIndex = 0; // Индекс картинки в модальном окне

// Функция для обычного слайдера в карточке (уже была у вас)
function moveSlide(button, direction) {
    const slider = button.closest('.slider');
    const images = slider.querySelectorAll('.slides img');
    let currentIndex = parseInt(slider.getAttribute('data-current'));

    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + direction + images.length) % images.length;
    images[currentIndex].classList.add('active');
    slider.setAttribute('data-current', currentIndex);
}

// Открытие модального окна
function openModal(sliderElement) {
    const images = sliderElement.querySelectorAll('.slides img');
    const title = sliderElement.parentElement.querySelector('h3').innerText;
    
    // Собираем все ссылки на картинки этого товара
    currentGallery = Array.from(images).map(img => img.src);
    // Берем текущий индекс из атрибута слайдера
    currentModalIndex = parseInt(sliderElement.getAttribute('data-current'));

    const modal = document.getElementById('modal-overlay');
    modal.style.display = 'flex';
    
    updateModalContent(title);
}

// Обновление контента в модалке
function updateModalContent(title) {
    document.getElementById('full-image').src = currentGallery[currentModalIndex];
    if (title) document.getElementById('modal-caption').innerText = title;
}

// Листание внутри модалки
function moveModalSlide(direction) {
    currentModalIndex = (currentModalIndex + direction + currentGallery.length) % currentGallery.length;
    document.getElementById('full-image').src = currentGallery[currentModalIndex];
}

// Закрытие модалки
function closeModal(event) {
    // Закрываем, если кликнули на крестик или на темный фон
    if (event.target.id === 'modal-overlay' || event.target.className === 'close-btn') {
        document.getElementById('modal-overlay').style.display = 'none';
    }
}

// Добавим управление с клавиатуры (стрелочки и Esc)
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal-overlay');
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') moveModalSlide(-1);
        if (e.key === 'ArrowRight') moveModalSlide(1);
        if (e.key === 'Escape') modal.style.display = 'none';
    }
});
// Функция открытия окна
function openModal(element) {
    const modal = document.getElementById('modal-overlay');
    const fullImg = document.getElementById('full-image');
    const caption = document.getElementById('modal-caption');

    // Если нажали на слайдер, берем активную картинку, если просто на фото — берем само фото
    const imgSrc = element.tagName === 'IMG' ? element.src : element.querySelector('img.active').src;
    
    modal.style.display = "flex";
    fullImg.src = imgSrc;
    
    // Если у картинки есть alt или рядом есть заголовок h3, можно вывести его как подпись
    caption.innerText = element.alt || "Просмотр изображения";
}

// Функция закрытия окна
function closeModal(event) {
    const modal = document.getElementById('modal-overlay');
    // Закрываем, если нажали на фон или на крестик
    if (event.target === modal || event.target.className === 'close-btn') {
        modal.style.display = "none";
    }
}
