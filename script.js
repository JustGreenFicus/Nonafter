// --- ПЕРЕМЕННЫЕ СОСТОЯНИЯ ---
let currentGallery = [];    // Список картинок текущего товара
let currentModalIndex = 0;  // Индекс картинки в модальном окне

// --- 1. ФУНКЦИЯ ДЛЯ СЛАЙДЕРА В КАРТОЧКЕ ---
function moveSlide(button, step) {
    const slider = button.closest('.slider');
    const images = slider.querySelectorAll('.slides img');
    let currentIndex = parseInt(slider.getAttribute('data-current')) || 0;

    // Убираем активный класс с текущей картинки
    images[currentIndex].classList.remove('active');
    
    // Считаем новый индекс (с поддержкой бесконечного листания)
    currentIndex = (currentIndex + step + images.length) % images.length;

    // Добавляем активный класс новой картинке
    images[currentIndex].classList.add('active');
    slider.setAttribute('data-current', currentIndex);
}

// --- 2. ФУНКЦИЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА ---
function openModal(element) {
    const modal = document.getElementById('modal-overlay');
    const fullImg = document.getElementById('full-image');
    const caption = document.getElementById('modal-caption');

    // Находим родительскую карточку
    const card = element.closest('.t-card');
    const title = card.querySelector('h3').innerText;
    
    // Собираем все картинки из слайдера этой карточки
    const images = card.querySelectorAll('.slides img');
    currentGallery = Array.from(images).map(img => img.src);
    
    // Берем индекс текущей картинки из атрибута слайдера
    currentModalIndex = parseInt(element.getAttribute('data-current')) || 0;

    // Устанавливаем контент
    fullImg.src = currentGallery[currentModalIndex];
    caption.innerText = title;
    
    // Показываем окно
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Запрет скролла страницы
}

// --- 3. ЛИСТАНИЕ ВНУТРИ МОДАЛКИ ---
function moveModalSlide(direction) {
    if (currentGallery.length === 0) return;

    currentModalIndex = (currentModalIndex + direction + currentGallery.length) % currentGallery.length;
    document.getElementById('full-image').src = currentGallery[currentModalIndex];
}

// --- 4. ФУНКЦИЯ ЗАКРЫТИЯ ОКНА ---
function closeModal(event) {
    const modal = document.getElementById('modal-overlay');
    // Закрываем, если нажали на фон или на крестик
    if (event.target === modal || event.target.classList.contains('close-btn')) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Возвращаем скролл
    }
}

// --- 5. УПРАВЛЕНИЕ С КЛАВИАТУРЫ ---
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal-overlay');
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') moveModalSlide(-1);
        if (e.key === 'ArrowRight') moveModalSlide(1);
        if (e.key === 'Escape') {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
});
