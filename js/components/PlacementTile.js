class PlacementTile {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.size = 64
        this.colorMouseIn = 'rgba(255, 255, 255, 0.5)'
        this.colorMouseOut = 'rgba(255, 255, 255, 0.1)'
        this.color = this.colorMouseOut
        this.isOccupied = false
        this.range = 250
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update(mouse) {
        this.draw()

        if (mouse.x > this.position.x &&
            mouse.x < this.position.x + this.size &&
            mouse.y > this.position.y &&
            mouse.y < this.position.y + this.size
        ) {
            this.color = this.colorMouseIn
        } else {
            this.color = this.colorMouseOut
        }
    }
}