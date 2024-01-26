// Canvas Variables
var WIDTH = 400;
var HEIGHT = 500;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Orb Variables
var orb;
var orbStartingX = 200;
var orbStartingY = 480;

// Brick Variables
var brick, c, r, brickX, brickY;
var brickColumns = 8;
var brickRows = 15;
var brickWidth = 50;
var brickHeight = 28;
var brickHealth = 3;


// Money Variables
var money = 0;
var price, originalPrice;

// Counting Variables
var level = 1;
var numNewOrbs = 0;
var bricksBroken = 0;
var bricksLeft = brickColumns * brickRows;

// Arrays
var orbList = [];
var brickList = [];
var bricks = [];
var upgradePrices = [
  2, // More Orbs
  3, // More Damage
  4, // More Speed
];
var numTimesUpgraded = [
  1, // More Orbs
  1, // More Damage
  1, // More Speed
];

// Level Variables
var randomLevel = 0;
var levelFormats = [
  "full",
  "upper-half",
  "double-column",
  // "four-corners",
  // "diamond"
];
var currentLevel = levelFormats[randomLevel];
var numLevelsBeaten = 1;
var full = levelFormats[0];
var upperhalf = levelFormats[1];
var doublecolumn = levelFormats[2];
var fourcorners = levelFormats[3];
var diamond = levelFormats[4];
function getRandomLevel() {
  randomLevel = Math.floor(Math.random() * levelFormats.length);
  currentLevel = levelFormats[randomLevel];
}

// ----BRICK OBJECT----------------------
for (c = 0; c < brickColumns; c++) {
  bricks[c] = [];
  for (r = 0; r < brickRows; r++) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: brickHealth,
    };
  }
}

// ----ORB OBJECT------------------------
orb = {
  name: "Orb",
  id: "O",
  x: orbStartingX,
  y: orbStartingY,
  radius: 12,
  spdX: 4,
  spdY: 3,
  color: "yellow",
  stroke: "orange",
  damage: 1,
};

// ----RANDOM DIRECTIONAL VALUES---------
function getRandomX() {
  var rngSpd = Math.floor(Math.random() * 8) + 1;
  var negOrPosRNG = Math.floor(Math.random() * 2);
  if (negOrPosRNG === 0) {
    rngSpd = -rngSpd;
  }
  return rngSpd;
}
var randomSpdX = getRandomX();

function chooseSpdY() {
  var rngSpd = getRandomX();
  var randomSpdY;
  var negOrPosRNG = Math.floor(Math.random() * 2);
  if (Math.abs(rngSpd) === 1) {
    if (negOrPosRNG < 0) {
      randomSpdY = -6;
    } else {
      randomSpdY = 6;
    }
  } else if (Math.abs(rngSpd) === 2) {
    if (negOrPosRNG < 0) {
      randomSpdY = -5;
    } else {
      randomSpdY = 5;
    }
  } else if (Math.abs(rngSpd) === 3) {
    if (negOrPosRNG < 0) {
      randomSpdY = -4;
    } else {
      randomSpdY = 4;
    }
  } else if (Math.abs(rngSpd) === 4) {
    if (negOrPosRNG < 0) {
      randomSpdY = -3;
    } else {
      randomSpdY = 3;
    }
  } else if (Math.abs(rngSpd) === 5) {
    if (negOrPosRNG < 0) {
      randomSpdY = -2;
    } else {
      randomSpdY = 2;
    }
  } else {
    if (negOrPosRNG < 0) {
      randomSpdY = -1;
    } else {
      randomSpdY = 1;
    }
  }
  return randomSpdY;
}
var randomSpdY = chooseSpdY();

// ----NEW ORBS OBJECT-------------------
var newOrbs = {
  x: orbStartingX,
  y: orbStartingY,
  radius: orb.radius,
  spdX: randomSpdX,
  spdY: randomSpdY,
  color: orb.color,
  stroke: orb.stroke,
};

// ----DRAW OBJECTS----------------------
function drawOrb(ent) {
  ctx.save();
  ctx.fillStyle = ent.color;
  ctx.strokeStyle = ent.stroke;
  ctx.beginPath();
  ctx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

// =|=|=|=|=|=| FUNCTION REQUIRES LEVEL UPDATE |=|=|=|=|=
function drawBrick(level) {
  if (level === full) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        brickX = c * brickWidth;
        brickY = r * brickHeight;
        if (bricks[c][r].status >= 1) {
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          brick = {
            name: "level" + level,
            id: "B",
            x: brickX,
            y: brickY,
            width: brickWidth,
            height: brickHeight,
            color: "white",
            stroke: "red",
          };
          brickList[brick.name] = brick;

          ctx.save();
          ctx.fillStyle = brick.color;
          ctx.strokeStyle = brick.stroke;
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }
  } else if (level == upperhalf) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows / 2; r++) {
        brickX = c * brickWidth;
        brickY = r * brickHeight;
        if (bricks[c][r].status >= 1) {
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          brick = {
            name: "level " + level,
            id: "B",
            x: brickX,
            y: brickY,
            width: brickWidth,
            height: brickHeight,
            color: "white",
            stroke: "red",
          };
          brickList[name] = brick;

          ctx.save();
          ctx.fillStyle = brick.color;
          ctx.strokeStyle = brick.stroke;
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }
  } else if (level == doublecolumn) {
    for (c = 0; c < 3; c++) {
      for (r = 0; r < brickRows; r++) {
        brickX = c * brickWidth;
        brickY = r * brickHeight;
        if (bricks[c][r].status >= 1) {
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          brick = {
            name: "level " + level,
            id: "B",
            x: brickX,
            y: brickY,
            width: brickWidth,
            height: brickHeight,
            color: "white",
            stroke: "red",
          };
          brickList[name] = brick;

          ctx.save();
          ctx.fillStyle = brick.color;
          ctx.strokeStyle = brick.stroke;
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }
    for (c = 5; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        brickX = c * brickWidth;
        brickY = r * brickHeight;
        if (bricks[c][r].status >= 1) {
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          brick = {
            name: "level " + level,
            id: "B",
            x: brickX,
            y: brickY,
            width: brickWidth,
            height: brickHeight,
            color: "white",
            stroke: "red",
          };
          brickList[name] = brick;

          ctx.save();
          ctx.fillStyle = brick.color;
          ctx.strokeStyle = brick.stroke;
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          ctx.fill();
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
        }
      }
    }
  }
}

// ----NEW POS FUNCTION------------------
function newPos(ent) {
  // Right Wall Collision
  if (ent.x > WIDTH - ent.radius) {
    ent.x = WIDTH - ent.radius;
    ent.spdX = -ent.spdX;
  }
  // Left Wall Collision
  if (ent.x < ent.radius) {
    ent.x = ent.radius;
    ent.spdX = -ent.spdX;
  }
  // Floor Collision
  if (ent.y >= HEIGHT - ent.radius) {
    ent.y = HEIGHT - ent.radius;
    ent.spdY = -ent.spdY;
  }
  // Ceiling Collision
  if (ent.y <= ent.radius) {
    ent.y = ent.radius;
    ent.spdY = -ent.spdY;
  }
  ent.x += ent.spdX;
  ent.y += ent.spdY;
}

// ----COLLISION FUNCTION----------------

// =|=|=|=|=|=| FUNCTION REQUIRES LEVEL UPDATE |=|=|=|=|=
function testBrickCollision(ent, level) {
  if (level == full) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        var barray = bricks[c][r];
        if (barray.status >= 1) {
          if (ent.x + ent.radius > barray.x && ent.x - ent.radius < (barray.x + brick.width) && ent.y + ent.radius > barray.y && ent.y - ent.radius < (barray.y + brick.height)) {
            if (barray.status <= 1) {
              bricksBroken++;
              bricksLeft--;
              money += (15 + Math.floor(Math.random() * 3));
            }
            // Collision with brick's left side (right side of orb)
            if (ent.x - ent.radius < barray.x && ent.y > barray.y && ent.y < barray.y + brick.height) {
              ent.x = barray.x - ent.radius;
              ent.spdX = -ent.spdX;
              barray.status -= ent.damage;
            }
            // Collision with brick's right side (left side of orb)
            if (ent.x + ent.radius > barray.x + brick.width && ent.y > barray.y && ent.y < barray.y + brick.height) {
              ent.x = barray.x + brick.width + ent.radius;
              ent.spdX = -ent.spdX;
              barray.status -= ent.damage;
            }
            // Collision with top of brick (bottom of orb)
            if (ent.y + ent.radius > barray.y && ent.x > barray.x && ent.x < barray.x + brick.width && ent.y - ent.radius < barray.y) {
              ent.y = barray.y - ent.radius;
              ent.spdY = -ent.spdY;
              barray.status -= ent.damage;
            }
            
            // Collision with bottom of brick (top of orb)
            if (ent.y - ent.radius < barray.y + brick.height && ent.x > barray.x && ent.x < barray.x + brick.width && ent.y + ent.radius> barray.y + brick.height) {
              ent.y = barray.y + brick.height + ent.radius;
              ent.spdY = -ent.spdY;
              barray.status -= ent.damage;
            }
          }
        }
      }
    }
  } else if (level == upperhalf) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows / 2; r++) {
        var barray = bricks[c][r];
        if (barray.status >= 1) {
          if (ent.x + ent.radius > barray.x && ent.x - ent.radius < (barray.x + brick.width) && ent.y + ent.radius > barray.y && ent.y - ent.radius < (barray.y + brick.height)) {
            if (barray.status <= 1) {
              bricksBroken++;
              bricksLeft--;
              money += (15 + Math.floor(Math.random() * 3));
            }
            // Collision with brick's left side (right side of orb)
            if (ent.x - ent.radius < barray.x && ent.y > barray.y && ent.y < barray.y + brick.height) {
              ent.x = barray.x - ent.radius;
              ent.spdX = -ent.spdX;
              barray.status -= ent.damage;
            }
            // Collision with brick's right side (left side of orb)
            if (ent.x + ent.radius > barray.x + brick.width && ent.y > barray.y && ent.y < barray.y + brick.height) {
              ent.x = barray.x + brick.width + ent.radius;
              ent.spdX = -ent.spdX;
              barray.status -= ent.damage;
            }
            // Collision with top of brick (bottom of orb)
            if (ent.y + ent.radius > barray.y && ent.x > barray.x && ent.x < barray.x + brick.width && ent.y - ent.radius < barray.y) {
              ent.y = barray.y - ent.radius;
              ent.spdY = -ent.spdY;
              barray.status -= ent.damage;
            }
            
            // Collision with bottom of brick (top of orb)
            if (ent.y - ent.radius < barray.y + brick.height && ent.x > barray.x && ent.x < barray.x + brick.width && ent.y + ent.radius> barray.y + brick.height) {
              ent.y = barray.y + brick.height + ent.radius;
              ent.spdY = -ent.spdY;
              barray.status -= ent.damage;
            }
          }
        }
      }
    }
  } else if (level == doublecolumn) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        var barray = bricks[c][r];
        if (barray.status >= 1) {
          if (ent.x + ent.radius > barray.x && ent.x - ent.radius < (barray.x + brick.width) && ent.y + ent.radius > barray.y && ent.y - ent.radius < (barray.y + brick.height)) {
            if (barray.status <= 1) {
              bricksBroken++;
              bricksLeft--;
              money += (15 + Math.floor(Math.random() * 3));
            }
            
            // Collision with brick's left side (right side of orb)
            if (ent.x - ent.radius < barray.x && ent.y > barray.y && ent.y < barray.y + brick.height) {
              ent.x = barray.x - ent.radius;
              ent.spdX = -ent.spdX;
              barray.status -= ent.damage;
            }
            
            // Collision with brick's right side (left side of orb)
            if (ent.x + ent.radius > barray.x + brick.width && ent.y > barray.y && ent.y < barray.y + brick.height) {
              ent.x = barray.x + brick.width + ent.radius;
              ent.spdX = -ent.spdX;
              barray.status -= ent.damage;
            }
            
            // Collision with top of brick (bottom of orb)
            if (ent.y + ent.radius > barray.y && ent.x > barray.x && ent.x < barray.x + brick.width && ent.y - ent.radius < barray.y) {
              ent.y = barray.y - ent.radius;
              ent.spdY = -ent.spdY;
              barray.status -= ent.damage;
            }
            
            // Collision with bottom of brick (top of orb)
            if (ent.y - ent.radius < barray.y + brick.height && ent.x > barray.x && ent.x < barray.x + brick.width && ent.y + ent.radius> barray.y + brick.height) {
              ent.y = barray.y + brick.height + ent.radius;
              ent.spdY = -ent.spdY;
              barray.status -= ent.damage;
              
            }
          }
        }
      }
    }
  }
}

// ----BRICK HEALTH---------------------

// =|=|=|=|=|=| FUNCTION REQUIRES LEVEL UPDATE |=|=|=|=|=
function displayBrickHealth(level) {
  if (level == full) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        if (bricks[c][r].status >= 1) {
          ctx.save();
          ctx.font = "13px Arial";
          ctx.fillStyle = "black";
          ctx.fillText(bricks[c][r].status, bricks[c][r].x + 20, bricks[c][r].y + 20);
          ctx.restore();
        }
      }
    }
  } else if (level == upperhalf) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows / 2; r++) {
        if (bricks[c][r].status >= 1) {
          ctx.save();
          ctx.font = "13px Arial";
          ctx.fillStyle = "black";
          ctx.fillText(bricks[c][r].status, bricks[c][r].x + 20, bricks[c][r].y + 20);
          ctx.restore();
        }
      }
    }
  } else if (level == doublecolumn) {
    for (c = 0; c < brickColumns / 2 - 1; c++) {
      for (r = 0; r < brickRows; r++) {
        if (bricks[c][r].status >= 1) {
          ctx.save();
          ctx.font = "13px Arial";
          ctx.fillStyle = "black";
          ctx.fillText(bricks[c][r].status, bricks[c][r].x + 20, bricks[c][r].y + 20);
          ctx.restore();
        }
      }
    }
    for (c = 5; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        if (bricks[c][r].status >= 1) {
          ctx.save();
          ctx.font = "13px Arial";
          ctx.fillStyle = "black";
          ctx.fillText(bricks[c][r].status, bricks[c][r].x + 20, bricks[c][r].y + 20);
          ctx.restore();
        }
      }
    }
  }
}

// ----ECONOMIC FUNCTIONS--------------
function getMoney() {
  ctx.save();
  ctx.font = "18px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(money + "$", 8, 490)
  ctx.restore();
}

function getPrice(upgrade) {
  if (upgrade == "moreOrbs") {
    originalPrice = upgradePrices[0];
    price = Math.pow(originalPrice, numTimesUpgraded[0]) * 50;
  } else if (upgrade == "moreDamage") {
    originalPrice = upgradePrices[1];
    price = Math.pow(originalPrice, numTimesUpgraded[1]) * 50;
  } else if (upgrade == "moreSpeed") {
    originalPrice = upgradePrices[2];
    price = Math.pow(originalPrice, numTimesUpgraded[2]) * 50;
  }
  return price;
}

function purchaseMoreOrbs() {
  getPrice("moreOrbs");
  if (money >= price) {
    money -= price;
    numTimesUpgraded[0] ++;

    var randomSpdY = chooseSpdY();
    var randomSpdX = getRandomX();
    var newOrbName = "orb" + numNewOrbs;
    var newOrb = {
      name: newOrbName,
      x: orbStartingX,
      y: orbStartingY,
      radius: orb.radius,
      spdX: randomSpdX,
      spdY: randomSpdY,
      color: orb.color,
      stroke: orb.stroke,
      damage: orb.damage,
    };
    orbList[newOrbName] = newOrb;

    numNewOrbs++;
    console.info("INFO: Purchased more orbs for " + price + ". It is now at level " + numTimesUpgraded[0] + " with " + (numNewOrbs + 1) + " orbs.");
  } else {
    console.warn("WARNING: Cannot purchase more orbs as you do not own enough money to do so.");
  }
}

function purchaseMoreDamage() {
  getPrice("moreDamage");
  if (money >= price) {
    money -= price;
    numTimesUpgraded[1] ++;
    orb.damage++;
    for (var key in orbList) {
      orbList[key].damage++;
    }
    console.info("purchased more damage for " + price + ". It is now at level " + numTimesUpgraded[1]);
  } else {
    console.warn("WARNING: Cannot purchase more damage as you do not own enough money to do so. " + (getPrice("moreDamage") - money) + "$ more required.");
  }
}

function purchaseMoreSpeed() {
  getPrice("moreSpeed");
  if (money >= price) {
    money -= price;
    numTimesUpgraded[2] ++;
    console.info("INFO: Purchased more speed for " + price + ". It is now at level " + numTimesUpgraded[2] + " with a speed of " + (Math.abs(orb.spdX) + Math.abs(orb.spdY)) + ".");
    if (orb.spdX <= 0) {
      orb.spdX--;
    } else {
      orb.spdX++;
    }
    if (orb.spdY <= 0) {
      orb.spdY--;
    } else {
      orb.spdY++;
    }
    for (var key in orbList) {
      var orbs = orbList[key];
      if (orbs.spdX <= 0) {
        orbs.spdX--;
      } else {
        orbs.spdX++;
      }
      if (orbs.spdY <= 0) {
        orbs.spdY--;
      } else {
        orbs.spdY++;
      }
    }
  } else {
    console.warn("WARNING: Cannot purchase more speed as you do not own enough money to do so. " + (getPrice("moreSpeed") - money) + "$ more required.");
  }
}

// ----LEVEL FUNCTIONS---------------

// =|=|=|=|=|=| FUNCTION REQUIRES LEVEL UPDATE |=|=|=|=|=
function levelUp(rnglevel) {
  brickHealth++;
  numLevelsBeaten++;

  if (rnglevel == full) {
    //Draw all bricks (FULL LEVEL)
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (c = 0; c < brickColumns; c++) {
      bricks[c] = [];
      for (r = 0; r < brickRows; r++) {
        bricks[c][r] = {
          x: 0,
          y: 0,
          status: brickHealth,
        };
      }
    }
    drawOrb(orb);
    drawBrick(rnglevel);
    testBrickCollision(orb);
    displayBrickHealth();
    level++;
    bricksLeft = brickColumns * brickRows;
    orb.x = orbStartingX;
    orb.y = orbStartingY;
    for (var key in orbList) {
      orbList[key].x = orbStartingX;
      orbList[key].y = orbStartingY;
    }
  } else if (rnglevel == upperhalf) {
    // Draw half the bricks (UPPER-HALF LEVEL)
    for (c = 0; c < brickColumns; c++) {
      bricks[c] = [];
      for (r = 0; r < (brickRows / 2); r++) {
        bricks[c][r] = {
          x: 0,
          y: 0,
          status: brickHealth,
        };
      }
    }
    drawOrb(orb);
    drawBrick(rnglevel);
    testBrickCollision(orb);
    displayBrickHealth();
    getMoney();
    level++;
    bricksLeft = brickColumns * brickRows;
    orb.x = orbStartingX;
    orb.y = orbStartingY;
    for (var newkey in orbList) {
      orbList[newkey].x = orbStartingX;
      orbList[newkey].y = orbStartingY;
    }
  } else if (rnglevel == doublecolumn) {
    // Draw two columns of bricks (DOUBLE COLUMN LEVEL)
    for (c = 0; c < brickColumns; c++) {
      bricks[c] = [];
      for (r = 0; r < brickRows; r++) {
        bricks[c][r] = {
          x: 0,
          y: 0,
          status: brickHealth,
        };
      }
    }
    drawOrb(orb);
    drawBrick(rnglevel);
    testBrickCollision(orb);
    displayBrickHealth();
    getMoney();
    level++;
    bricksLeft = brickColumns * brickRows;
    orb.x = orbStartingX;
    orb.y = orbStartingY;
    for (var anotherkey in orbList) {
      orbList[anotherkey].x = orbStartingX;
      orbList[anotherkey].y = orbStartingY;
    }
  }
}

function drawLevelScore() {
  ctx.save();
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Level " + (numLevelsBeaten + 1), WIDTH - 20, HEIGHT - 4);
  ctx.restore();
}

// =|=|=|=|=|=| FUNCTION REQUIRES LEVEL UPDATE |=|=|=|=|=
function getTotalBrickHealth(level) {
  var totalHealth = 0;
  if (level == full) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        totalHealth += bricks[c][r].status;
      }
    }
  } else if (level == upperhalf) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows / 2; r++) {
        totalHealth += bricks[c][r].status;
      }
    }
  } else if (level == doublecolumn) {
    for (c = 0; c < 3; c++) {
      for (r = 0; r < brickRows; r++) {
        totalHealth += bricks[c][r].status;
      }
    }
    for (c = 5; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        totalHealth += bricks[c][r].status;
      }
    }
  }
  return totalHealth;
}

// ----CONSOLE COMMANDS---------------

function genocide() {
  if (currentLevel == full) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        bricks[c][r].status = 0;
        bricksLeft = 0;
      }
    }
    console.info("INFO: Killed all current bricks. Levelup() is run as a result and the game has procceeded to the next level.");
  } else if (currentLevel == upperhalf) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows / 2; r++) {
        bricks[c][r].status = 0;
        bricksLeft = 0;
      }
    }
    console.info("INFO: Killed all current bricks. Levelup() is run as a result and the game has procceeded to the next level.");
  }
}

var cmd = {
  orbs: {
    add: function(n) {
      for (var i = 0; i < n; i++) {
        var orbPrice = getPrice("moreOrbs");
        money += orbPrice;
        purchaseMoreOrbs();
      }
    },
    remove: function(n) {
      for (var i = 0; i < n; i++) {
        orbList.splice(newOrbName - 1);
        numNewOrbs -= n;
      }
    },
    speed: {
      add: function(n) {
        for (var i = 0; i < n; i++) {
          var speedPrice = getPrice("moreSpeed");
          money += speedPrice;
          purchaseMoreSpeed();
        }
      },
      remove: function() {
        console.info("Currently, this command does not do anything. Better work on that. ;)");
      },
    },
    damage: {
      add: function(n) {
        for (var i = 0; i < n; i++) {
          var damagePrice = getPrice("moreDamage");
          money += damagePrice;
          purchaseMoreDamage();
        }
      },
      remove: function() {
        console.info("Currently, this command does not do anything. Better work on that. ;)");
      }
    },
  },
  money: {
    add: function(addedMoney) {
      money += addedMoney;
      console.log("INFO: Added " + addedMoney + "$")
    },
  },
};

// ----FUNCTION FOR PREVENTING NEGATIVE HEALTH VALUES-----

function preventHealthNegatives() {
  if (currentLevel == full) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        if (bricks[c][r].status <= 0) {
          bricks[c][r].status = 0;
        }
      }
    }
  } else if (currentLevel == upperhalf) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows / 2; r++) {
        if (bricks[c][r].status <= 0) {
          bricks[c][r].status = 0;
        }
      }
    }
  } else if (currentLevel == doublecolumn) {
    for (c = 0; c < brickColumns; c++) {
      for (r = 0; r < brickRows; r++) {
        if (bricks[c][r].status <= 0) {
          bricks[c][r].status = 0;
        }
      }
    }
  }
}

// ----SAVE DATA FUNCTIONS
var saveNecess = [
  ["orb", orb],
  ["numLevelsBeaten", numLevelsBeaten],
  ["money", money],
];

function save() {
  for (var necesKey in saveNecess) {
      localStorage.setItem(saveNecess[necesKey][0], JSON.stringify(saveNecess[necesKey][1]));
  }
  for (var savekey in orbList) {
    localStorage.setItem(orbList[savekey].name, JSON.stringify(orbList[savekey]));
  }
}

function load() {
  return JSON.parse(localStorage.getItem(SAVE_KEY));
}

// ====MAIN UPDATE====================
function update() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  newPos(orb);
  drawOrb(orb);
  

  drawBrick(currentLevel);
  testBrickCollision(orb, currentLevel);
  displayBrickHealth(currentLevel);
  preventHealthNegatives();

  for (var key in orbList) {
    drawOrb(orbList[key]);
    newPos(orbList[key]);
    testBrickCollision(orbList[key], currentLevel);
  }

  if (getTotalBrickHealth(currentLevel) <= 0) {
    getRandomLevel();
    levelUp(currentLevel);
  }

  getMoney();
  getPrice("moreOrbs");
  document.getElementById("moreOrbs").value = price;
  getPrice("moreDamage");
  document.getElementById("moreDamage").value = price;
  getPrice("moreSpeed");
  document.getElementById("moreSpeed").value = price;

  drawLevelScore();
}

setInterval(update, 20);
window.onload = setInterval(save(), 10000);
window.onload = load();
