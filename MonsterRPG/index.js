let xp = 0;

let button1  = document.querySelector("#button1");
let button2  = document.querySelector("#button2");
let button3  = document.querySelector("#button3");

let healthText  = document.querySelector("#healthText");
let goldText = document.querySelector("#goldText");
let xpText = document.querySelector("#xpText");
let text = document.querySelector("#text");

let gold = 50;
let health = 100;
let currentItem = 0;

let monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];
    
let monsterStats = document.querySelector("#monsterStats");
let monsterName = document.querySelector("#monsterName");
let monsterHealth =  document.querySelector("#monsterHealth");
let monsterHealt;

let fighting;

let weapon = ["🪵"];
const weapons = [{name:"🪵",power:10},
{name:"🗡️",power:30},
{name:"🏹",power:50},
{name:"🔫",power:70}];

//!Initializing buttons
button1.onclick = Store;
button2.onclick = goCave;
button3.onclick = Fightdragon;

let locations = [{name:"Store",
      button_text :["Buy Health 10 🪙","Buy Weapon 30 🪙","Go to Town Square 🏭"],
      button_functions:[Buyhealth,BuyWeapon,TownSquare],
      text:"You have entered into the Store 🏭"
    },
    {
      name:"TownSquare",
    button_text :["Go to store","Go to cave","Fight dragon"],
    button_functions:[Store,goCave,Fightdragon],
    text:"You have entered into the Town Square 🏪"
  },
  {
		name: "cave",
		button_text: ["Fight slime", "Fight fanged beast", "Go to town square"],
	  button_functions: [fightSlime, fightBeast, TownSquare],
		text: "You enter the cave. You see some monsters."
	},
  {
		name: "fight",
		button_text: ["Attack", "Dodge", "Run"],
	  button_functions: [attack, dodge, TownSquare],
		text: "You are fighting a monster."
	},
  {
		name: "kill monster",
		button_text: ["Go to town square", "Go to town square", "Easter Eggs"],
		button_functions: [TownSquare, TownSquare,easter_eggs],
		text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
	},
  {
		name: "lose",
	button_text: ["REPLAY?", "REPLAY?", "REPLAY?"],
		button_functions: [restart, restart, restart],
		text: "You die. ☠️"
	},
  {
		name: "win",
		button_text: ["REPLAY?", "REPLAY?", "REPLAY?"],
	button_functions: [restart, restart,restart ],
		text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
      name: "easter egg",
      button_text: ["2", "8", "Go to town square?"],
      button_functions: [pickTwo, pickEight, TownSquare],
      text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
  ];

    function update(locations_number)
{
  
  button1.innerText  = locations[locations_number].button_text[0];
  button2.innerText  = locations[locations_number].button_text[1];
  button3.innerText  = locations[locations_number].button_text[2];


  button1.onclick = locations[locations_number].button_functions[0];
  button2.onclick = locations[locations_number].button_functions[1];
  button3.onclick = locations[locations_number].button_functions[2];

  text.innerText = locations[locations_number].text;
}
//!TownSquare
function Store()
{
update(0);
}
function goCave()
{
update(2);
}
function Fightdragon()
{
  console.log("aunty");
}
//!end

//! Store
function Buyhealth()
{
  if(gold>=10)
  {
    gold= gold-10;
    health = health +10;

goldText.innerText = gold;
healthText.innerText = health;
text.innerText = "You 🪙 are buying health!"
  }
  else{
    text.innerText = "You don't have enough 🪙 to buy health!"
  }

}
function BuyWeapon()
{

  if (currentItem < weapons.length - 1) {
  if(gold>=30)
  {
    currentItem++;
    gold= gold-30;
    weapon.push(weapons[currentItem].name);

goldText.innerText = gold;
text.innerText = 'You have added "'+weapons[currentItem].name + 
'" to your inventory. Your inventory now has ['+ weapon+ ']';
  }
  else{
    text.innerText = "You don't have enough 🪙 to buy Weapons!"
  }
}
else{
  text.innerText = "You already have the most powerful weapon!";
  button2.innerText = "Sell weapon for 15 gold";
button2.onclick = sellWeapon;
}
}
//!sell weapon
function sellWeapon()
{
  if (weapon.length > 1) 
  {
		gold += 15;
		goldText.innerText = gold;
 let store_popped_weapon =  weapon.pop();
 currentItem--;
 text.innerText = "You sold "+ store_popped_weapon+"."
 text.innerText += "Your inventory currently has ["+weapon+"]."
}

else
{
  text.innerText = "You can't sell your only weapon!";
}
}
//!selling weapon end

function TownSquare()
{
  update(1);
  monsterStats.style.display = "none";
}
//!end

//! Go to cave click Function
function fightSlime() {
	fighting = 0;
	goFight();
}

function fightBeast() {
	fighting = 1;
	goFight();    
}

function Fightdragon() {
	fighting = 2;
	goFight();
}

function goFight() {
    update(3);
    monsterHealt = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
	monsterHealth.innerText = monsterHealt;
}
//!end

//! attack, dodge of monsters
function attack()
{
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText =  text.innerText + " You attack it with your " + weapon[currentItem] + ".";
 
  if(monsterhit())
  {
monsterHealt = monsterHealt - (weapons[currentItem].power + Math.floor(Math.random()*xp+1));
  }
  else{
    text.innerText +=  " You Miss.";
  }

  health = health - getmonsterattackvalue(monsters[fighting].level);
  healthText.innerText = health;
  monsterHealth.innerText = monsterHealt;
  if(health<=0)
  {
    lose();
  }
  else if(monsterHealt<=0)
  {
   
  fighting === 2 ? wingame() : defeatMonster();
  }
 

  if(Math.random()<=0.1 && weapon.length!==1 && monsterhit())
  {
    text.innerText  += " Your "+weapon[currentItem]+" breaks. ";
    weapon.pop();
    currentItem--;
  }

}
//! hits only according to monsterhit condition
function monsterhit()
{
  let store = Math.random();
  return store>0.2 || health<=20;
}
//*end

function getmonsterattackvalue(level)
{
let hitvalue = (level*5) - Math.floor(Math.random()*xp); 
console.log(hitvalue);
return hitvalue;
}

function dodge()
{
text.innerHTML = "You dodged an attack from "+ monsters[fighting].name+".";
}

function defeatMonster()
{
 
  xp = xp + monsters[fighting].level;
  gold = gold + Math.ceil(monsters[fighting].level * 4.3);
  goldText.innerText = gold;
  xpText.innerText = xp;
  monsterStats.style.display = "none";
  update(4); 
}
function lose()
{
  monsterStats.style.display = "none";
  update(5);
}
function wingame()
{
update(6);

}

function restart()
{

  health = 100;
  gold = 50;
  currentItem = 0;
  weapon= ["🪵"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xp = 0;
  xpText.innerText = xp;
  TownSquare();
}

function easter_eggs()
{
  update(7);
}

function pickTwo()
{
checkeggsgift(2);
}

function pickEight()
{
  checkeggsgift(8);
}

function checkeggsgift(input)
{
  
  let yes = false;
  text.innerText = "You picked " + input + ". Here are the random numbers:";
let numbers = [];

while(numbers.length<10)
{
  numbers.push(Math.floor(Math.random()*10+1));
}

for (let i = 0; i < 10; i++) {
  text.innerText += numbers[i] + "\n";
}


for(let i=0;i<10;i++)
{
  if(input == numbers[i])
  {
    // text.innerText += "Right! You win 20 gold!"
    // gold += 20;
    // goldText.innerText = gold;
     yes = true;
  }

}
if(yes === false)
{
      text.innerText += " Wrong! You lose 10 health!.....Wait!"
    health -= 10;
    healthText.innerText = health;
    if(health<=0)
    {
      lose();
    }

}
if(yes===true)
{
    text.innerText += " Right! You win 20 gold!......Wait!"
    gold += 20;
    goldText.innerText = gold;

}

setTimeout(() => {
  update(1);
  
}, 2500);
}

