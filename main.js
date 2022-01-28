(function(){

("use strict");

const fighter1 = document.querySelector(`.fighter-1`);
const fighter2 = document.querySelector(`.fighter-2`);
const fighter3 = document.querySelector(`.fighter-3`);
const fight = document.querySelector ('.fight');
let fightButton;
let playerNum = 0;
let enemyNum = 0;
let game;
let buttonClick = 0;

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
        this.enemy.hp = this.enemy.hp - this.player.dmg
        console.log(this.enemy.hp)
        return this.enemy.hp
         
    }

    enemyAttack(){
        this.player.hp = this.player.hp - this.enemy.dmg
        console.log(this.player.hp)
        return this.player.hp
        
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


const changeView = (data) => {
    const source = document.getElementById(`in-game-view`).innerHTML;
    const template = Handlebars.compile(source);
    const context = data;
    const html = template(context);
    document.querySelector(`.section-1-container`).innerHTML = html;
    fightButton = document.querySelector('.fight-button');
}

fighter1.addEventListener("click", () => {
    playerNum = 1;
    buttonClick += 1;
    console.log('you clicked a button!')
    game = new Game();
    console.log(game);
    
    changeView(game);
    fightButtonFn();
})

fighter2.addEventListener("click", () => {
    playerNum = 2;
    buttonClick += 1;
    new Game();
    changeView(game);
    fightButtonFn();
})

fighter3.addEventListener("click", () => {
    playerNum = 3;
    buttonClick += 1;
    new Game();
    changeView(game);
    fightButtonFn();
})

const fightButtonFn = () => {
    if (buttonClick === 0) {
        return;
    } else {
        fightButton.addEventListener('click',() => {
            console.log(`i ran`);
        game.playerAttack();
            setTimeout(function(){
                game.enemyAttack()
            }, 2000)
        })
    }
}




})();