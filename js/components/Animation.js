class Animation {
    constructor({ position = { x: 0, y: 0 }, imageSrc, frames = { max: 1, duration: 10 }, offset = { x: 0, y: 0 } }) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.frames = {
            max: frames.max,
            current: 0,
            duration: frames.duration,
            conter: 0
        }
        this.offset = offset
    }

    draw() {
        const cropWidth = this.image.width / this.frames.max
        const crop = {
            position: {
                x: cropWidth * this.frames.current,
                y: 0
            },
            width: this.image.width / this.frames.max,
            height: this.image.height
        }
        c.drawImage(
            this.image,
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.position.x + this.offset.x,
            this.position.y + this.offset.y,
            crop.width,
            crop.height
        )
    }

    update() {
        this.draw()
        this.frames.conter++
        if (this.frames.conter % this.frames.duration === 0) {
            this.frames.current++
            if (this.frames.current >= this.frames.max - 1) {
                this.frames.current = 0
            }
        } 
    }
}