(function(){

("use strict");

HEAD
const exampleButton = document.querySelector(`.example`);
const exampleButton2 = document.querySelector(`.example2`);
const exampleButton3 = document.querySelector(`.example3`);

const fighter1 = document.querySelector(`.fighter-1`);
const fighter2 = document.querySelector(`.fighter-2`);
const fighter3 = document.querySelector(`.fighter-3`);
const fight = document.querySelector ('.fight')
e8ecb4d (added dmg)
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

    playerAttack(){
        let enemyRemainingHealth = null

        enemyRemainingHealth = this.enemy.hp - this.player.dmg

        console.log(enemyRemainingHealth)
        return enemyRemainingHealth; 
    }

    enemyAttack(){
        let playerRemainingHealth = null

        playerRemainingHealth = this.player.hp - this.enemy.dmg
        console.log(playerRemainingHealth)
        return playerRemainingHealth;
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

fighter1.addEventListener("click", () => {
    playerNum = 1;
    console.log('you clicked a button!')
    game = new Game();
    console.log(game);
})

fighter2.addEventListener("click", () => {
    playerNum = 2;
    new Game();
})

fighter3.addEventListener("click", () => {
    playerNum = 3;
    new Game();
})

fight.addEventListener('click',() => {
game.playerAttack();
    setTimeout(function(){
        game.enemyAttack()
    }, 1000)
})


})();