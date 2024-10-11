"use strict";
///import {Howl, Howler} from 'howler';
/// <reference types="howler" />
const body = document.body;
body.addEventListener("keydown", function (ev) {
    if (ev.code == "ArrowLeft") {
        статусДвижения.лево = true;
    }
    if (ev.code == "ArrowRight") {
        статусДвижения.право = true;
    }
    if (ev.code == "ArrowUp") {
        статусДвижения.вверх = true;
    }
    if (ev.code == "ArrowDown") {
        статусДвижения.вниз = true;
    }
    //console.log(статусДвижения);
}, false);
const gameField = document.getElementById("gameField");
const размерУровня = { ширина: 4, высота: 4 };
const игровыеДанные = [
    ['д', 'д', 'д', 'д'],
    ['д', 'д', 'д', 'д'],
    ['д', 'д', 'д', 'д'],
    ['д', 'д', 'д', 'д'],
];
let текущаяПозиция = { x: 0, y: 0 };
let пустойСтатусДвижения = {
    лево: false,
    право: false,
    вверх: false,
    вниз: false,
};
let статусДвижения = Object.assign({}, пустойСтатусДвижения);
let звук = new Howl({
    // https://freesound.org/people/jop9798/sounds/142000/
    src: ['./assets/142000__jop9798__steps-on-a-wooden-floor.wav'],
    sprite: {
        шаги: [0, 1147, false /* looping */],
    },
    volume: 1.0
});
let шаги = звук.play('шаги');
звук.pause(шаги);
setInterval(function () {
    //звук.pause(шаги)
    if (статусДвижения.вниз) {
        if (текущаяПозиция.y < размерУровня.высота - 1) {
            очиститьТекущуюПозицию();
            текущаяПозиция.y += 1;
            нарисоватьТекущуюПозицию();
            шаги = звук.play(шаги);
        }
    }
    if (статусДвижения.вверх) {
        if (текущаяПозиция.y > 0) {
            очиститьТекущуюПозицию();
            текущаяПозиция.y -= 1;
            нарисоватьТекущуюПозицию();
            шаги = звук.play(шаги);
        }
    }
    if (статусДвижения.право) {
        if (текущаяПозиция.x < размерУровня.ширина - 1) {
            очиститьТекущуюПозицию();
            текущаяПозиция.x += 1;
            нарисоватьТекущуюПозицию();
            шаги = звук.play(шаги);
        }
    }
    if (статусДвижения.лево) {
        if (текущаяПозиция.x > 0) {
            очиститьТекущуюПозицию();
            текущаяПозиция.x -= 1;
            нарисоватьТекущуюПозицию();
            шаги = звук.play(шаги);
        }
    }
    статусДвижения = Object.assign({}, пустойСтатусДвижения);
}, 100);
игровыеДанные.forEach(строкаИгровыхДанных => {
    const tr = document.createElement("tr");
    строкаИгровыхДанных.forEach(ячейкаИгровыхДанных => {
        const td = document.createElement("td");
        td.innerHTML = ячейкаИгровыхДанных;
        tr.appendChild(td);
    });
    gameField.appendChild(tr);
});
нарисоватьТекущуюПозицию();
function очиститьТекущуюПозицию() {
    const td = gameField.getElementsByTagName("tr")[текущаяПозиция.y].getElementsByTagName("td")[текущаяПозиция.x];
    td.classList.remove("active");
}
function нарисоватьТекущуюПозицию() {
    const td = gameField.getElementsByTagName("tr")[текущаяПозиция.y].getElementsByTagName("td")[текущаяПозиция.x];
    td.classList.add("active");
}
