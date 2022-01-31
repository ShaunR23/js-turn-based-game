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
let playerCritNum = 0;
let enemyCritNum = 0;
let playerCrit = false;
let enemyCrit = false;

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
                this.player = new Player({name:`Warrior`, hp: 20, maxhp: 20, dmg: 5, crit: 15});
                break;
            case 2:
                this.player = new Player({name:`Bastion`, hp: 40, maxhp: 30, dmg: 2, crit: 5});
                break;
            case 3:
                this.player = new Player({name:`Rogue`, hp: 13, maxhp: 13, dmg: 6, crit: 35});
                break;
        }
    }

    enemyCreate() {

        const randomNumGen = (max=4, min=1) => {
            enemyNum = Math.floor(Math.random() * (max - min) + min);
        }
        randomNumGen();

        switch (enemyNum) {
            case 1:
                this.enemy = new Enemy({name:`Dark Knight`, hp: 20, maxhp: 20, dmg: 5, crit: 15});
                break;
            case 2:
                this.enemy = new Enemy({name: `Glutton`, hp: 40, maxhp: 30, dmg: 2, crit: 5});
                break;
            case 3:
                this.enemy = new Enemy({name: `Nightstalker`, hp: 13, maxhp: 13, dmg: 6, crit: 35});
                break;
        }
    }

    playerAttack(){

        game.playerCritChance();

        this.enemy.hp = this.enemy.hp - this.player.dmg;

        if(playerCrit === true) {
            statusText.textContent = `${this.player.name} attacked, dealing ${this.player.dmg} dmg (CRIT!) to ${this.enemy.name}!`;
        } else {
            statusText.textContent = `${this.player.name} attacked, dealing ${this.player.dmg} dmg to ${this.enemy.name}!`;
        }

        //hp bar math//

        let enemyHpBarCurrent = enemyHpBar.getBoundingClientRect();

        let enemyPercentHpCalc = (this.player.dmg / this.enemy.maxhp);
        enemyPercentHp = enemyPercentHpCalc;
        enemyHpBar.textContent = `${this.enemy.hp}`;
        enemyHpBarCalc = enemyHpBarCurrent.width * enemyPercentHp; 

        if (this.enemy.hp <= 0) {
            enemyHpBar.style.width = `1rem`;
        } else {
            enemyHpBar.style.width = `${enemyHpBarCurrent.width - enemyHpBarCalc}px`;
        }

        //hp bar math//

        if (playerCrit === true) {
            this.player.dmg /= 2;
            playerCrit = false;
        }

        game.endGame();

        fight.setAttribute("disabled", "disabled");

        if(endGameCounter === 1) {
            return;
        }

        return this.enemy.hp;
         
    }

    enemyAttack(){

        game.enemyCritChance();

        this.player.hp = this.player.hp - this.enemy.dmg;
        
        if(enemyCrit === true) {
            statusText.textContent = `${this.enemy.name} strikes back, dealing ${this.enemy.dmg} dmg (CRIT!) to ${this.player.name}!`;
        } else {
            statusText.textContent = `${this.enemy.name} strikes back, dealing ${this.enemy.dmg} dmg to ${this.player.name}!`;
        }

        //hp bar math//

        let playerHpBarCurrent = playerHpBar.getBoundingClientRect();
        
        let playerPercentHpCalc = (this.enemy.dmg / this.player.maxhp);
        playerPercentHp = playerPercentHpCalc
        console.log(`playerPercentHp = ${playerPercentHp}`)
        playerHpBar.textContent = `${this.player.hp}`;
        playerHpBarCalc = playerHpBarCurrent.width * playerPercentHp; 

        if (this.player.hp <= 0) {
            playerHpBar.style.width = `1rem`;
        } else {
            playerHpBar.style.width = `${playerHpBarCurrent.width - playerHpBarCalc}px`;
        }

        //hp bar math//

        if (enemyCrit === true) {
            this.enemy.dmg /= 2;
            enemyCrit = false;
        }

        game.endGame();

        if(endGameCounter === 1) {
            return;
        } else {
            setTimeout(() => {
                enable();
                statusText.textContent = `Waiting for attack...`;
            }, 3000);
        }

        return this.player.hp;
        
    }

    endGame(){
        
        if(this.player.hp <= 0) {
            endGameCounter = 1;
            setTimeout(() => {
                statusText.textContent = `${this.enemy.name} has slain ${this.player.name}!`;
            }, 3000);
            
            setTimeout(function(){
                reset();
            }, 10000);
        } 

        if(this.enemy.hp <= 0) {
            endGameCounter = 1;
            setTimeout(() => {
                statusText.textContent = `${this.player.name} has slain ${this.enemy.name}!`;
            }, 3000);
            
            setTimeout(function(){
                reset();
            }, 10000);
        }

    }

    playerCritChance(){
        const critNumGen = (max=101, min=1) => {
            playerCritNum = Math.floor(Math.random() * (max - min) + min);
        } 
        critNumGen();

        console.log(playerCritNum);

        if (playerCritNum <= this.player.crit) {
            playerCrit = true;
            this.player.dmg *= 2;
        } else {
            return;
        }
    }

    enemyCritChance(){
        const critNumGen2 = (max=101, min=1) => {
            enemyCritNum = Math.floor(Math.random() * (max - min) + min);
        }
        critNumGen2();

        console.log(enemyCritNum);

        if (enemyCritNum <= this.enemy.crit) {
            enemyCrit = true;
            this.enemy.dmg *= 2;
        } else {
            return;
        }
    }


}

const Player = class {
    constructor({name, hp, maxhp, dmg, crit}) {
        this.name = name;
        this.hp = hp;
        this.maxhp = maxhp;
        this.dmg = dmg;
        this.crit = crit
    }
}  

const Enemy = class {
    constructor({name, hp, maxhp, dmg, crit}) {
        this.name = name;
        this.hp = hp;
        this.maxhp = maxhp;
        this.dmg = dmg;
        this.crit = crit
    }
}  


const enable = () => {
    fight.removeAttribute("disabled");
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