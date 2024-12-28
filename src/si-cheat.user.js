// ==UserScript==
// @name         Si-Cheat
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Cheats for SiGame!
// @author       Diramix
// @match        https://sigame.vladimirkhil.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vladimirkhil.com
// @grant        none
// ==/UserScript==

// Добавляем стили через CSS
const style = document.createElement('style');
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Berlin+Sans+FB:wght@700&display=swap');

  .SiCheat_Main {
    position: fixed;
    top: 50px;
    left: 50px;
    width: 200px;
    height: 50px;
    background-color: #333;
    color: #fff;
    padding: 10px;
    border: 1px solid #000;
    z-index: 99999;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 23px;
    font-weight: 500;
    background: linear-gradient(
      130deg,
      #c10374 0%,
      #c35ee6 100%
    );
    font-family: 'Berlin Sans FB', sans-serif;
  }

  .SiCheat_Menu {
    position: absolute;
    top: 60px;
    left: 0;
    width: 200px;
    background-color: #222;
    color: #fff;
    padding: 10px;
    border: 1px solid #000;
    display: none;
    flex-direction: column;
    gap: 10px;
    border-radius: 8px;
  }

  .SiCheat_Menu * {
    font-size: 17px;
    font-weight: 300;
  }

  .SiCheat_AutoAnswerButton {
    width: 100%;
    padding: 10px;
    background-color: #444;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .SiCheat_AutoAnswerButton.active {
    background-color: #4a4;
  }

  .SiCheat_Version {
    position: absolute;
    bottom: 3px;
    right: 5px;
    font-size: 12px;
    color: #fff;
  }
`;
document.head.appendChild(style);

// Создаем главное окно
const SiCheat_Main = document.createElement('div');
SiCheat_Main.classList.add('SiCheat_Main');
SiCheat_Main.textContent = 'Si-Cheat';
document.body.appendChild(SiCheat_Main);

// Добавляем версию
const SiCheat_Version = document.createElement('div');
SiCheat_Version.classList.add('SiCheat_Version');
SiCheat_Version.textContent = 'v1.0.0';
SiCheat_Main.appendChild(SiCheat_Version);

// Создаем меню
const SiCheat_Menu = document.createElement('div');
SiCheat_Menu.classList.add('SiCheat_Menu');
SiCheat_Main.appendChild(SiCheat_Menu);

// Добавляем кнопку Auto Answer
const SiCheat_AutoAnswerButton = document.createElement('button');
SiCheat_AutoAnswerButton.classList.add('SiCheat_AutoAnswerButton');
SiCheat_AutoAnswerButton.textContent = 'Auto Answer';
SiCheat_Menu.appendChild(SiCheat_AutoAnswerButton);

// Переключение отображения меню
let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let preventClick = false;

SiCheat_Main.addEventListener('mousedown', (e) => {
  if (e.target === SiCheat_Main) {
    isDragging = true;
    preventClick = false;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.addEventListener('mousemove', onMouseMove);
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
  }
});

function onMouseMove(e) {
  preventClick = true;
  SiCheat_Main.style.left = `${e.clientX - offsetX}px`;
  SiCheat_Main.style.top = `${e.clientY - offsetY}px`;
}

SiCheat_Main.addEventListener('click', (e) => {
  if (!preventClick && e.target === SiCheat_Main) {
    SiCheat_Menu.style.display = SiCheat_Menu.style.display === 'none' ? 'flex' : 'none';
  }
});

// Логика Auto Answer
let autoAnswerInterval = null;

SiCheat_AutoAnswerButton.addEventListener('click', () => {
  const isActive = SiCheat_AutoAnswerButton.classList.contains('active');
  if (isActive) {
    SiCheat_AutoAnswerButton.classList.remove('active');
    clearInterval(autoAnswerInterval);
  } else {
    SiCheat_AutoAnswerButton.classList.add('active');
    autoAnswerInterval = setInterval(() => {
      const tableElements = document.querySelectorAll('#table > div.tableContent > div > div.rightBorder');
      if (tableElements.length > 0) {
        const button = document.querySelector('.playerButton.mainAction.active');
        if (button) button.click();
      }
    }, 50);
  }
});