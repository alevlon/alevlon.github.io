class Building extends Animation {
    constructor({ position = { x: 0, y: 0 } }) {
        super({
            position,
            imageSrc: "img/tower.png",
            frames: {
                max: 19,
                duration: 4
            },
            offset: {
                x: 0,
                y: -80
            }
        })

        this.position = position
        this.width = 64 * 2
        this.height = 64
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = []
        this.range = 250
        this.target
        this.counter = 0
    }

    draw() {
        super.draw()
    }

    update() {
        this.draw()
        if (this.target || !this.target && this.frames.current !== 0) {
            super.update()
        }

        if (this.target &&
            this.frames.current === 6 &&
            this.frames.conter % this.frames.duration === 0) {
            this.shoot()
        }

        if (mouse.x > this.position.x &&
            mouse.x < this.position.x + this.width &&
            mouse.y > this.position.y &&
            mouse.y < this.position.y + this.height
        ) {
            c.beginPath()
            c.arc(this.center.x, this.center.y, this.range, 0, Math.PI * 2)
            c.fillStyle = "rgba(255, 255, 255, 0.1)"
            c.fill()
        }

        this.counter++
    }

    shoot() {
        this.projectiles.push(
            new Projectile({
                position: {
                    x: this.center.x - 25,
                    y: this.center.y - 105
                },
                enemy: this.target
            })
        )
    }
}