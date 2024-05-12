document.addEventListener("DOMContentLoaded", function() {
    // Definir la variable questions como global
    let questions;

    // Definir otras variables globales necesarias
    let currentQuestionIndex = 0;
    let score = 0;

    // Función para cargar las preguntas desde el archivo JSON
    function loadQuestions(callback) {
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open('GET', 'questions.json', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                questions = JSON.parse(xhr.responseText);
                if (callback) {
                    callback();
                }
            }
        };
        xhr.send(null);
    }

    // Función para mostrar la pregunta actual
    function showQuestion(question) {
        questionElement.innerText = question.question;
        optionsElement.innerHTML = '';
        question.options.forEach(option => {
            const li = document.createElement('li');
            li.innerText = option.text;
            li.addEventListener('click', () => selectOption(option.correct));
            optionsElement.appendChild(li);
        });
    }

    // Función para manejar la selección de una opción
    function selectOption(correct) {
        if (correct) {
            score++;
            resultElement.innerText = '¡Respuesta correcta!';
        } else {
            resultElement.innerText = 'Respuesta incorrecta.';
        }
        nextButton.style.display = 'block';
    }

    // Función para mostrar la siguiente pregunta
    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
            nextButton.style.display = 'none';
            resultElement.innerText = '';
        } else {
            showResults();
        }
    }

    // Función para mostrar los resultados finales
    function showResults() {
        questionContainer.innerHTML = `<h2>¡Fin del Concurso!</h2>
                                       <p>Obtuviste ${score} puntos de ${questions.length} preguntas.</p>`;
    }

    // Obtener referencias a elementos del DOM
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-btn');
    const resultElement = document.getElementById('result');

    // Manejar el click en el botón de siguiente pregunta
    nextButton.addEventListener('click', showNextQuestion);

    // Iniciar el juego cargando las preguntas
    loadQuestions(function () {
        showQuestion(questions[currentQuestionIndex]);
    });

    // Obtener referencias a elementos del DOM de la ruleta
    const rouletteNumberElement = document.getElementById('roulette-number');
    const roulette = document.getElementById('roulette');
    const spinButton = document.getElementById('spin-btn');

    // Función para girar la ruleta y mostrar un número aleatorio
    function spinRoulette() {
        // Desactivar el botón mientras gira la ruleta
        spinButton.disabled = true;

        // Número aleatorio del 1 al 4
        const randomNumber = Math.floor(Math.random() * 4) + 1;

        // Calcular la rotación de la ruleta
        const rotation = 360 * 3 + (randomNumber - 1) * 90;

        // Aplicar la animación de giro
        roulette.style.animation = 'spin 3s cubic-bezier(0.57, 0.2, 0.74, 0.96) forwards';
        roulette.style.transform = `rotate(${rotation}deg)`;

        // Mostrar el número seleccionado después de que termine la animación
        setTimeout(() => {
            rouletteNumberElement.textContent = randomNumber;
            // Activar el botón nuevamente al finalizar el giro
            spinButton.disabled = false;
        }, 3000); // Duración de la animación (en milisegundos)
    }

    // Manejar el click en el botón de girar ruleta
    spinButton.addEventListener('click', spinRoulette);
});
