// Данные о странах для карты мира
const countriesData = {
    sweden: {
        name: "🇸🇪 Швеция",
        description: "Перерабатывает 99% отходов. Им не хватает мусора, поэтому они покупают его у других стран и используют для производства электричества и тепла."
    },
    japan: {
        name: "🇯🇵 Япония",
        description: "В городе Камикацу отходы разделяют на 45 категорий — даже крышки от бутылок сортируют отдельно. Перед сдачей мусор обязательно моют, иначе его не примут."
    },
    germany: {
        name: "🇩🇪 Германия",
        description: "Сортировка здесь — обязательное правило, а за ошибку можно получить штраф до 100 евро. У многих домов есть «мусорные дворики» с десятками разных контейнеров."
    },
    netherlands: {
        name: "🇳🇱 Нидерланды",
        description: "Популярны магазины без упаковки — люди приносят свои баночки и сумки, чтобы не использовать пластик. Это стало модой: многие подростки ходят за покупками с многоразовыми контейнерами."
    },
    canada: {
        name: "🇨🇦 Канада",
        description: "Органические отходы здесь превращают в компост и используют в парках и школьных садах. Во многих школах проводят соревнования — кто соберёт больше органики."
    },
    usa: {
        name: "🇺🇸 США",
        description: "Есть компании, которые делают одежду из пластиковых бутылок. На одну толстовку уходит примерно 20 бутылок, которые могли бы оказаться в океане."
    }
};

// Правильные ответы для теста
const correctAnswers = {
    q1: 'b',
    q2: 'a',
    q3: 'a',
    q4: 'c',
    q5: 'b',
    q6: 'b',
    q7: 'a'
};

// Функция для показа информации о стране
function showCountryInfo(country) {
    const modal = document.getElementById('countryModal');
    const countryName = modal.querySelector('.country-name');
    const countryDescription = modal.querySelector('.country-description');
    
    countryName.textContent = countriesData[country].name;
    countryDescription.textContent = countriesData[country].description;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
}

// Функция для скрытия модального окна
function hideCountryInfo() {
    const modal = document.getElementById('countryModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
}

// Функция для случайного факта
function showRandomFact() {
    const countries = Object.keys(countriesData);
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    showCountryInfo(randomCountry);
}

// Функция для прокрутки наверх
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}



// Функция для проверки ответов теста
function checkQuizAnswers() {
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    
    // Сначала показываем все объяснения и подсвечиваем ответы
    Object.keys(correctAnswers).forEach(questionId => {
        const questionElement = document.querySelector(`[data-question="${questionId.replace('q', '')}"]`);
        const explanation = questionElement.querySelector('.explanation');
        const options = questionElement.querySelectorAll('.quiz-option');
        
        // Показываем объяснение
        explanation.classList.remove('hidden');
        
        // Подсвечиваем правильные и неправильные ответы
        options.forEach(option => {
            const input = option.querySelector('input');
            if (input.value === correctAnswers[questionId]) {
                option.classList.add('show-result', 'correct');
            } else if (input.checked) {
                option.classList.add('show-result');
            }
        });
        
        // Подсчитываем баллы
        const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === correctAnswers[questionId]) {
            score++;
        }
    });
    
    // Показываем результаты
    showQuizResults(score, totalQuestions);
}

// Функция для показа результатов теста
function showQuizResults(score, total) {
    const resultsElement = document.querySelector('.quiz-results');
    const scoreNumber = resultsElement.querySelector('.score-number');
    const resultMessage = resultsElement.querySelector('.result-message');
    const resultAdvice = resultsElement.querySelector('.result-advice');
    
    scoreNumber.textContent = score;
    
    // Определяем сообщение в зависимости от результата
    if (score === total) {
        resultMessage.innerHTML = '♻ <strong>Экогерой!</strong> — Ты сортируешь мусор как профессионал!';
        resultAdvice.textContent = 'Продолжай в том же духе и делись знаниями с друзьями!';
    } else if (score >= 4) {
        resultMessage.innerHTML = '🌱 <strong>Начинающий защитник природы</strong> — Знаешь основы, но есть куда расти.';
        resultAdvice.textContent = 'Изучи больше о сортировке и попробуй пройти тест ещё раз!';
    } else {
        resultMessage.innerHTML = '🗑 <strong>Нужен апгрейд</strong> — Пора подтянуть знания о сортировке.';
        resultAdvice.textContent = 'Внимательно изучи все разделы сайта и попробуй снова!';
    }
    
    resultsElement.classList.remove('hidden');
    resultsElement.scrollIntoView({ behavior: 'smooth' });
}

// Функция для сброса теста
function resetQuiz() {
    // Снимаем все отметки
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
    });
    
    // Скрываем все объяснения
    document.querySelectorAll('.explanation').forEach(explanation => {
        explanation.classList.add('hidden');
    });
    
    // Убираем подсветку ответов
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('show-result', 'correct');
    });
    
    // Скрываем результаты
    document.querySelector('.quiz-results').classList.add('hidden');
}

// Функция для плавной прокрутки к секциям
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Функция для анимации появления элементов при прокрутке
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate__fadeInUp[data-delay]');
    
    elements.forEach(element => {
        const delay = element.getAttribute('data-delay');
        element.style.animationDelay = delay;
    });
}

// Функция для добавления эффекта параллакса
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Функция для анимации навигационных кнопок
function animateNavButtons() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach((button, index) => {
        button.style.animationDelay = `${index * 0.1}s`;
    });
}

// Функция для добавления эффекта свечения к кнопкам
function addGlowEffect() {
    const buttons = document.querySelectorAll('.nav-btn, .check-answers-btn, .reset-quiz-btn, .random-fact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.boxShadow = '';
        });
    });
}

// Функция для анимации карточек при наведении
function addCardAnimations() {
    const cards = document.querySelectorAll('.threat-card, .waste-card, .container-card, .quiz-question, .action-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Функция для анимации иконок
function addIconAnimations() {
    const icons = document.querySelectorAll('.title-icon, .btn-icon, .threat-icon, .waste-icon, .container-icon, .action-icon');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'wiggle 0.5s ease-in-out';
        });
        
        icon.addEventListener('animationend', () => {
            icon.style.animation = '';
        });
    });
}

// Функция для добавления звуковых эффектов (опционально)
function addSoundEffects() {
    const interactiveElements = document.querySelectorAll('.nav-btn, .country-marker, .quiz-option, .check-answers-btn, .reset-quiz-btn, .random-fact-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            // Здесь можно добавить звуковые эффекты
            // Например, воспроизведение короткого звука
        });
    });
}

// Функция для добавления эффекта печатающегося текста
function addTypewriterEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typewriter = setInterval(() => {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(typewriter);
            }
        }, 50);
    }
}

// Функция для добавления эффекта счета для результатов теста
function animateScore(score, total) {
    const scoreElement = document.querySelector('.score-number');
    let currentScore = 0;
    
    const interval = setInterval(() => {
        currentScore++;
        scoreElement.textContent = currentScore;
        
        if (currentScore >= score) {
            clearInterval(interval);
        }
    }, 100);
}

// Функция для добавления эффекта пульсации для маркеров на карте
function addPulseEffect() {
    const markers = document.querySelectorAll('.country-marker');
    
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            marker.style.animation = 'pulse 0.5s infinite';
        });
        
        marker.addEventListener('mouseleave', () => {
            marker.style.animation = '';
        });
    });
}

// Функция для добавления эффекта волны для кнопок
function addWaveEffect() {
    const buttons = document.querySelectorAll('.nav-btn, .check-answers-btn, .reset-quiz-btn, .random-fact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики событий для карты мира
    document.querySelectorAll('.country-marker').forEach(marker => {
        marker.addEventListener('click', () => {
            const country = marker.getAttribute('data-country');
            showCountryInfo(country);
        });
    });
    
    // Добавляем обработчик для кнопки случайного факта
    const randomFactBtn = document.querySelector('.random-fact-btn');
    if (randomFactBtn) {
        randomFactBtn.addEventListener('click', showRandomFact);
    }
    
    // Добавляем обработчик для закрытия модального окна
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', hideCountryInfo);
    }
    
    // Закрытие модального окна при клике вне его
    const modal = document.getElementById('countryModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideCountryInfo();
            }
        });
    }
    
    // Добавляем обработчики для теста
    const checkAnswersBtn = document.querySelector('.check-answers-btn');
    const resetQuizBtn = document.querySelector('.reset-quiz-btn');
    
    if (checkAnswersBtn) {
        checkAnswersBtn.addEventListener('click', checkQuizAnswers);
    }
    
    if (resetQuizBtn) {
        resetQuizBtn.addEventListener('click', resetQuiz);
    }
    
    // Добавляем обработчики для навигационных кнопок
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    // Инициализируем все анимации и эффекты
    animateOnScroll();
    addParallaxEffect();
    animateNavButtons();
    addGlowEffect();
    addCardAnimations();
    addIconAnimations();
    addSoundEffects();
    addPulseEffect();
    addWaveEffect();
    
    // Добавляем эффект печатающегося текста для заголовка
    setTimeout(addTypewriterEffect, 1000);
    
    // Добавляем обработчик для анимации результатов теста
    const checkAnswersBtn2 = document.querySelector('.check-answers-btn');
    if (checkAnswersBtn2) {
        checkAnswersBtn2.addEventListener('click', () => {
            setTimeout(() => {
                const scoreElement = document.querySelector('.score-number');
                if (scoreElement) {
                    const score = parseInt(scoreElement.textContent);
                    animateScore(score, 7);
                }
            }, 500);
        });
    }
    
    // Добавляем обработчик для клавиши Escape для закрытия модального окна
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideCountryInfo();
        }
    });
    

    
    // Добавляем эффект загрузки страницы
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Добавляем CSS для эффекта волны
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }
    
    body {
        opacity: 0;
    }
`;
document.head.appendChild(style); 

// Функция для плавной прокрутки к секциям
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// В обработчике событий DOMContentLoaded добавьте:
document.querySelectorAll('.back-to-top-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('href');
        smoothScrollTo(targetId);
    });
});