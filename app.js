class App {
    constructor() {
        this.initHandlers();
        this.initData();

        this.render = this.render.bind(this);
        this.render();
    }

    handleKeyDown(event) {
        switch (event.key) {
            case 'w':
                this.up = true;
                break;
            case 's':
                this.down = true;
                break;
        }
    }

    handleKeyUp(event) {
        switch (event.key) {
            case 'w':
                this.up = false;
                break;
            case 's':
                this.down = false;
                break;
        }
    }

    initHandlers() {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    initData() {
        this.up = false;
        this.down = false;

        this.elements = {
            canvas: document.querySelector(".stage"),
            startButton: document.querySelector(".start"),
            playerScore: document.querySelector(".player"),
            computerScore: document.querySelector(".computer"),
        };

        this.elements.canvas.width = 600;
        this.elements.canvas.height = 600;

        this.ctx = this.elements.canvas.getContext("2d");

        this.player = {
            x: 10,
            y: 260,
            score: 0
        };

        this.computer = {
            x: 580,
            y: 260,
            score: 0
        };

        this.ball = {
            x: 300,
            y: 300,
            vx: 5,
            vy: 2,
            radius: 10,
            create: () => {
                this.ctx.beginPath();
                this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    }

    render() {
        // Clear Canvas
        this.ctx.clearRect(0, 0, 600, 600);
        this.ctx.save();

        // Render Player
        this.ctx.fillRect(this.player.x, this.player.y, 10, 50);
        this.ctx.restore();
        this.ctx.save();

        // Render Computer
        this.ctx.fillRect(this.computer.x, this.computer.y, 10, 50);
        this.ctx.restore();

        // Render Ball
        this.ball.create();
        this.ball.x += this.ball.vx;
        this.ball.y += this.ball.vy;

        // Canvas Collision
        if (this.ball.y + this.ball.vy > this.elements.canvas.height || this.ball.y + this.ball.vy < 0) {
            this.ball.vy = -this.ball.vy;
        }

        if (this.ball.x + this.ball.vx > this.elements.canvas.width) {
            this.ball.vx = -this.ball.vx;
            this.player.score += 1;
        }

        if (this.ball.x + this.ball.vx < 0) {
            this.ball.vx = -this.ball.vx;
            this.computer.score += 1;
        }

        // Player Collision Detection
        const playerCollisionX = this.player.x + 10;
        const playerCollisionY = this.player.y + 50;
        if (this.player.x < this.ball.x + this.ball.radius && playerCollisionX > this.ball.x && this.player.y < this.ball.y + this.ball.radius && playerCollisionY > this.ball.y) {
            this.ball.vx = -this.ball.vx;
        }

        // Computer Collision Detection
        const computerCollisionX = this.computer.x + 10;
        const computerCollisionY = this.computer.y + 50;
        if (this.computer.x < this.ball.x + this.ball.radius && computerCollisionX > this.ball.x && this.computer.y < this.ball.y + this.ball.radius && computerCollisionY > this.ball.y) {
            this.ball.vx = -this.ball.vx;
        }

        // Player Movement
        if (this.up) {
            this.player.y = Math.max(0, this.player.y -= 8);
        } else if (this.down) {
            this.player.y = Math.min(550, this.player.y += 8);
        }

        // Computer Movement
        this.computer.y = Math.min(550, Math.max(0, this.ball.y));

        this.elements.playerScore.textContent = this.player.score;
        this.elements.computerScore.textContent = this.computer.score;

        requestAnimationFrame(this.render);
    }
}

new App();
