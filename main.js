(function(){

("use strict");

const fighter1 = document.querySelector(`.fighter-1`);
const fighter2 = document.querySelector(`.fighter-2`);
const fighter3 = document.querySelector(`.fighter-3`);
const home = document.querySelector(`.section-1-container`);
const inGame = document.querySelector(`.section-1-container-2`);

let fight;
let fightButton;
let statusText;
let playerNum = 0;
let enemyNum = 0;
let game;
let buttonClick = 0;
let enemyPercentHp = 0;
let enemyHpBarCalc = 0;
let playerHpBarCalc = 0;
let playerPercentHp = 0;
let endGameCounter = 0;

inGame.hidden = true;

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
                this.player = new Player({name:`Warrior`, hp: 20, dmg: 5});
                break;
            case 2:
                this.player = new Player({name:`Bastion`, hp: 30, dmg: 2});
                break;
            case 3:
                this.player = new Player({name:`Rogue`, hp: 13, dmg: 8});
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
                this.enemy = new Enemy({name:`Dark Knight`, hp: 20, dmg: 5});
                break;
            case 2:
                this.enemy = new Enemy({name: `Glutton`, hp: 30, dmg: 2});
                break;
            case 3:
                this.enemy = new Enemy({name: `Nightstalker`, hp: 13, dmg: 8});
                break;
        }
    }

    playerAttack(){
        this.enemy.hp = this.enemy.hp - this.player.dmg;
        console.log(this.enemy.hp);
        statusText.textContent = `${this.player.name} attacked, dealing ${this.player.dmg} dmg to ${this.enemy.name}!`;
       
        enemyPercentHp = (this.player.dmg / this.enemy.hp);

        console.log(this.enemy.hp);
        enemyHpBar.textContent = `${this.enemy.hp}`;
        enemyHpBarCalc = 24.5 * enemyPercentHp; 
        
        if (this.enemy.hp <= 0) {
            enemyHpBar.style.width = `1rem`;
        } else {
            enemyHpBar.style.width = `${24.5 - enemyHpBarCalc}rem`;
        }

        game.endGame();

        fight.setAttribute("disabled", "disabled");
        if(endGameCounter === 1) {
            return;
        } else {
            setTimeout(function(){
                enable();
            }, 6000);
        }

        return this.enemy.hp;
         
    }

    enemyAttack(){
        this.player.hp = this.player.hp - this.enemy.dmg;
        statusText.textContent = `${this.enemy.name} strikes back, dealing ${this.enemy.dmg} dmg to ${this.player.name}!`;
        
        playerPercentHp = this.enemy.dmg / this.player.hp;
        playerHpBar.textContent = `${this.player.hp}`;
        playerHpBarCalc = 24.5 * playerPercentHp; 

        if (this.player.hp <= 0) {
            playerHpBar.style.width = `1rem`;
        } else {
            playerHpBar.style.width = `${24.5 - playerHpBarCalc}rem`;
        }

        game.endGame();

        console.log(this.player.hp);
        
        return this.player.hp;
        
    }

    endGame(){
        
        if(this.player.hp <= 0) {
            endGameCounter = 1;
            statusText.textContent = `${this.enemy.name} has slain ${this.player.name}!`;
            setTimeout(function(){
                reset();
            }, 12000)
        } 

        if(this.enemy.hp <= 0) {
            endGameCounter = 1;
            statusText.textContent = `${this.player.name} has slain ${this.enemy.name}!`;
            setTimeout(function(){
                reset();
            }, 12000)
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


const enable = () => {
    fight.removeAttribute("disabled");
    statusText.textContent = `Waiting for attack...`
}

const changeView = (data) => {
    home.hidden = true;
    inGame.hidden = false;
    const source = document.getElementById(`in-game-view`).innerHTML;
    const template = Handlebars.compile(source);
    const context = data;
    const html = template(context);
    document.querySelector(`.section-1-container-2`).innerHTML = html;
    fightButton = document.querySelector('.fight-button');
    fight = document.querySelector('.fight');
    statusText = document.querySelector(`.status-text`);
    playerHpBar = document.querySelector(`.player-hp-bar`);
    enemyHpBar = document.querySelector(`.enemy-hp-bar`);
}

const reset = () => {

        playerNum = 0;
        enemyNum = 0;
        buttonClick = 0;
        enemyPercentHp = 0;
        enemyHpBarCalc = 0;
        playerHpBarCalc = 0;
        playerPercentHp = 0;
        endGameCounter = 0;

        inGame.hidden = true;
        home.hidden = false;
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
    game = new Game();
    changeView(game);
    fightButtonFn();
})

fighter3.addEventListener("click", () => {
    playerNum = 3;
    buttonClick += 1;
    game = new Game();
    changeView(game);
    fightButtonFn();
})

const fightButtonFn = () => {
    if (endGameCounter === 1) {
        return;
    } else {
        fightButton.addEventListener('click',() => {
            game.playerAttack();
            if(endGameCounter === 1) {
                console.log(`end!`);
                return;
            } else {
                setTimeout(function(){
                game.enemyAttack();
            }, 3000);
            }
            
        })
    }
}




})();