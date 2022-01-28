(function(){

("use strict");

const exampleButton = document.querySelector(`.example`);
const exampleButton2 = document.querySelector(`.example2`);
const exampleButton3 = document.querySelector(`.example3`);
let playerNum = 0;
let enemyNum = 0;
let game;

const Game = class {
    constructor(player, enemy) {
       this.player = player;
       this.enemy = enemy;
       this.playerCreate();
       this.enemyCreate();
    }
    
    playerCreate() {
        
        switch (playerNum) {
            case 1:
                this.player = new Player({name:`player1`, hp: 20, dmg: 5});
                break;
            case 2:
                this.player = new Player({name:`player2`, hp: 30, dmg: 2});
                break;
            case 3:
                this.player = new Player({name:`player3`, hp: 13, dmg: 8});
                break;
        }
    }

    enemyCreate() {

        const randomNumGen = (max=4, min=1) => {
            enemyNum = Math.floor(Math.random() * (max - min) + min);
            console.log(enemyNum);
        }
        randomNumGen();

        switch (enemyNum) {
            case 1:
                this.enemy = new Enemy({name:`enemy1`, hp: 20, dmg: 5});
                break;
            case 2:
                this.enemy = new Enemy({name: `enemy2`, hp: 30, dmg: 2});
                break;
            case 3:
                this.enemy = new Enemy({name: `enemy3`, hp: 13, dmg: 8});
                break;
        }
    }
}

const Player = class {
    constructor({name, hp, dmg}) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
    }
}  

const Enemy = class {
    constructor({name, hp, dmg}) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
    }
}  

exampleButton.addEventListener("click", () => {
    playerNum = 1;
    console.log('you clicked a button!')
    game = new Game();
    console.log(game);
})

exampleButton2.addEventListener("click", () => {
    playerNum = 2;
    new Game();
})

exampleButton3.addEventListener("click", () => {
    playerNum = 3;
    new Game();
})


})();