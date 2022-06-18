
// зададим счетчик баллов при попадании по квадрату +1
let score = 0

// проверка начала игры, что бы останавливать игру, когда таймер закончился
let isGameStarted = false


let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')


// [1] НАЧАЛО ИГРЫ ПРИ НАЖАТИИ КНОПКИ
$start.addEventListener('click', startGame)

// задатчик INPUT нового времени
$gameTime.addEventListener('input', setGameTime)


function startGame() {
    // игра началась
    isGameStarted = true
    // обнулим ОЧКИ
    score = 0
    // установим время сного
    setGameTime()

    // ! чтоби нельзя было увеличивать время прямо во время игры => ЗАБЛОЧИМ INPUT
    $gameTime.setAttribute('disabled', 'true')


    // при нажатии кнопки => кнопка должнаа исчезнуть, добавим класс hide, где кнопка скрыта
    hide($start)


    // покрасить в белое игровое поле
    $game.style.backgroundColor = '#fff'


    // зададим интервал игры (функция которая будет выполнятся, интервал повторения)
    let interval = setInterval(function () {
        let time = +$time.textContent

        // зададим условие на ОКОНЧАНИЕ игры
        if (time <= 0) {
            // остановим ИНТЕРВАЛ, а то он будет дальше продолжать считать
            clearInterval(interval)
            // end game
            endGame()
        } else {
            // метод toFixed(1) округляет до 1 знака после запятой
            $time.textContent = (time - 0.1).toFixed(1) // уже в секундах
        }
    }, 100) // 100 в милисикундах


    // при старте игры будем вызывать функцию renderBox()
    renderBox()
}

// создадим функцию для создания рандомных квадратов
function renderBox() {
    // генераци случайного РАЗМЕРА квадрата
    let boxSize = getRandom(30, 100)

    // вычислим размер нашего поля учитывая РАЗМЕР КВАДРАТА
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize

    // что бы при повторной генерации квадрата, удалялся старый
    $game.innerHTML = ''

    // будем создавать div
    let box = document.createElement('div')
    // теперь зададим стили
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    // box.style.backgroundColor = '#000'
    box.style.backgroundColor = randomColor(0, 255)
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.style.boxShadow = '0 0 16px rgb(14, 35, 224)'
    box.style.borderRadius = '8px'
    // добавим атрибут для box, для определения что по нему клинкнули
    box.setAttribute('data-box', 'true')

    // теперь поместим наш div => в div.game используем [ .insertAdjacentElement(position, element) ]
    $game.insertAdjacentElement('afterbegin', box)
}


// [2] ДОБАВИМ СЧЕТЧИК КЛИКОВ
$game.addEventListener('click', handleBoxClick)

function handleBoxClick(event) {
    // проверим - ЗАПУЩЕНА ЛИ ИГРА
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        // после нажатия по квадрату, ЗАНОГО генерируем новый квадрат
        renderBox()
        // после нажатия по квадрату, увеличивается СКОК
        score++
    }

}


// [3] ФУНКЦИЯ ДЛЯ СЛУЧАЙНОГО ИЗМЕНЕНИЯ РАЗМЕРА КВАДРАТА
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}


// [4] ДОБАВЛЯЕМ ФУНКЦИЮ ОКОНЧАНИЯ ИГРЫ
function endGame() {
    // игра закончилась
    isGameStarted = false

    // вернум кнопку START после окончания игры
    show($start)
    // вернем старый цвест фона после окончания игры
    $game.style.backgroundColor = 'rgb(181, 187, 190, 0.5)'
    // уберем квадрат
    $game.innerHTML = ''
    // вызовем функции присваивания очков
    endGameScore()
    // скроем start-header и покажем result-header
    hide($timeHeader)
    show($resultHeader)

    // вернем input что бы можно было вновь задавать время
    $gameTime.removeAttribute('disabled')
}


// [5] ДОБАВИМ ФУНКЦИЮ ДОБАВЛЕНИЯ ОЧКОВ
function endGameScore() {
    $result.textContent = score
}


// [6] УСТАНОВИМ ФУНКЦИЮ КОТОРАЯ УСТАНАВЛИВАЕТ ВРЕМЯ
function setGameTime() {
    let time = +$gameTime.value
    if (time <= 60 && time >= 3) {
        $time.textContent = time.toFixed(1)
    } else if (time > 60) {
        $time.textContent = 60
    } else {
        $time.textContent = 3
    }
    // выведем time-header и спрячем result.header
    show($timeHeader)
    hide($resultHeader)
}


// __________________________________________________________________________________
// ОПТИМИЗАЦИЯ

function show($ell) {
    $ell.classList.remove('hide')
}

function hide($ell) {
    $ell.classList.add('hide')
}


// [7] СЛУЧАЙНАЯ ГЕНЕРАЦИЯ ЦВЕТА КУБИКА
function randomColor(min, max) {
    r = Math.floor(Math.random() * (max - min) + min)
    g = Math.floor(Math.random() * (max - min) + min)
    b = Math.floor(Math.random() * (max - min) + min)
    return `rgb(${r}, ${g}, ${b})`
}




























