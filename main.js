(function(){

("use strict");

const exampleButton = document.querySelector(`.example`)
let playerNum = 0;
let game;

const Game = class {
    constructor(player, enemy) {
       this.player = player;
       this.enemy = enemy;
       this.playerCreate();
    }
    
    playerCreate() {
        console.log('firing player create');
        
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

        const randomNumGen = () => {
            
        } 

        switch (enemyNum) {
            case 1:
                this.enemy = new Enemy({name:`enemy1`, hp: 21, dmg: 5});
                break;
            case 2:
                this.enemy = new Enemy({name: `enemy2`, hp: 21, dmg: 5});
                break;
            case 3:
                this.enemy = new Enemy({name: `enemy3`, hp: 21, dmg: 5});
                break;
        }
    }
}

const Player = class {
    constructor(name, hp, dmg) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
    }
}  

const Enemy = class {
    constructor(name, hp, dmg) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
    }
}  

exampleButton.addEventListener("click", () => {
    playerNum = 1;
    console.log('you clicked a button!')
    game = new Game();
    console.log('here', console.dir(game));
})

// exampleButton.addEventListener("click", () => {
//     playerNum = 2;
//     new Game();
// })

// exampleButton.addEventListener("click", () => {
//     playerNum = 3;
//     new Game();
// })










})();