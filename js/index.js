const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');

canvas.width = 1600;
canvas.height = 1024;

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch((error) => {
            console.warn("Unable to play background music:", error);
        });
    }
    animate();
});

const widthTilesCount = 25;
const heightTilesCount = 16;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.onload = () => {
    c.drawImage(image, 0, 0);
};
image.src = 'img/gameMap.png';

const backgroundMusic = new Audio('audio/music.mp3'); 
backgroundMusic.loop = true; 

const enemies = [];
let enemyCount = 3;
let rounds = 1;
let hearts = 10;
let coins = 100;
const buildings = [];
let activeTile = undefined;
const placementTiles = [];
const placementTilesData2D = [];
const mouse = {
    x: undefined,
    y: undefined
};

function spawnEnemies(spawnCount) {
    for (let i = 1; i <= spawnCount; i++) {
        const xOffset = i * 150;
        enemies.push(
            new Enemy({
                position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
            })
        );
    }
}
spawnEnemies(enemyCount);

for (let i = 0; i < placementTilesData.length; i += widthTilesCount) {
    placementTilesData2D.push(placementTilesData.slice(i, i + widthTilesCount));
}

placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol == 57) {
            placementTiles.push(new PlacementTile({
                position: {
                    x: x * 64,
                    y: y * 64
                }
            }));
        }
    });
});

function animate() {
    const game = requestAnimationFrame(animate);

    c.drawImage(image, 0, 0);
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        enemy.update();

        if (enemy.position.x > canvas.width) {
            hearts -= 1;
            enemies.splice(i, 1);

            document.querySelector("#hearts").innerHTML = hearts;

            if (hearts === 0) {
                cancelAnimationFrame(game);
                document.querySelector("#gameOver").style.display = 'flex';
            }
        }
    }

    document.querySelector("#rounds").innerHTML = rounds + "/5";

    if (enemies.length === 0) {
        rounds++;
        console.log(rounds);
        if (rounds > 5) {
            rounds = 5;
            cancelAnimationFrame(game);
            document.querySelector("#gameWin").style.display = 'flex';
        }
        enemyCount += 2;
        spawnEnemies(enemyCount);
    }

    placementTiles.forEach((tile) => {
        tile.update(mouse);
    });

    buildings.forEach((building) => {
        building.update();
        building.target = null;
        const validEnemies = enemies.filter(enemy => {
            const xDifference = enemy.center.x - building.center.x;
            const yDifference = enemy.center.y - building.center.y;
            const distance = Math.hypot(xDifference, yDifference);

            return distance < enemy.radius + building.range;
        });
        building.target = validEnemies[0];

        for (let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i];

            projectile.update();

            const xDifference = projectile.enemy.center.x - projectile.position.x;
            const yDifference = projectile.enemy.center.y - projectile.position.y;
            const distance = Math.hypot(xDifference, yDifference);

            if (distance < projectile.enemy.radius + projectile.radius) {
                projectile.enemy.health -= projectile.damage;
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy;
                    });
                    if (enemyIndex > -1) {
                        enemies.splice(enemyIndex, 1);
                        coins += 25;
                        document.querySelector("#coins").innerHTML = coins;
                    }
                }

                building.projectiles.splice(i, 1);
            }
        }
    });
}

canvas.addEventListener('click', (event) => {
    if (activeTile && !activeTile.isOccupied && coins - 50 >= 0) {
        coins -= 50;
        document.querySelector('#coins').innerHTML = coins;
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }));
        activeTile.isOccupied = true;
        buildings.sort((a, b) => {
            return a.position.y - b.position.y;
        });

        if (backgroundMusic.paused) {
            backgroundMusic.play().catch((error) => {
                console.warn("Не удалось воспроизвести музыку:", error);
            });
        }
    }
});

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    activeTile = null;
    for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i];
        if (mouse.x > tile.position.x &&
            mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y &&
            mouse.y < tile.position.y + tile.size
        ) {
            activeTile = tile;
            break;
        }
    }
});