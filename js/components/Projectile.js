class Projectile extends Animation {
    constructor({ position = { x: 0, y: 0 }, enemy }) {
        super({ position, imageSrc: "img/projectile.png" })
        this.velocity = {
            x: 0,
            y: 0
        }
        this.speed = 10
        this.enemy = enemy
        this.radius = 10
        this.damage = 10
    }


    update() {
        this.draw()

        const angle = Math.atan2(
            this.enemy.center.y - this.position.y,
            this.enemy.center.x - this.position.x
        )

        this.velocity.x = Math.cos(angle)
        this.velocity.y = Math.sin(angle)

        this.position.x += this.velocity.x * this.speed
        this.position.y += this.velocity.y * this.speed
    }
}