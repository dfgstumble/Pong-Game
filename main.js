const canvas = document.getElementById("pongCanvas");
  const ctx = canvas.getContext("2d");

  // Paddle properties
  const paddleWidth = 30;
  const paddleHeight = 180;
  const paddleSpeed = 8;
  const paddleBorderSpacing = 20;

  // Paddle positions
  let paddle1Y = canvas.height / 2 - paddleHeight / 2;
  let paddle2Y = canvas.height / 2 - paddleHeight / 2;

  // Ball properties
  const ballSize = 20;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballSpeedX = 7; // Increased speed
  let ballSpeedY = 7; // Increased speed

  // Scores
  let player1Score = 0;
  let player2Score = 0;

  // Update function
  function update() {
    // Move paddles
    movePaddles();

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Check for collisions with paddles
    if (
      (ballX - ballSize / 2 < paddleWidth + paddleBorderSpacing && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) ||
      (ballX + ballSize / 2 > canvas.width - paddleWidth - paddleBorderSpacing && ballY > paddle2Y && ballY < paddle2Y + paddleHeight)
    ) {
      ballSpeedX = -ballSpeedX;
    }

    // Check for collisions with top and bottom borders
    if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }

    // Check for scoring
    if (ballX - ballSize / 2 < 0) {
      // Player 2 scores
      player2Score++;
      resetBall();
    }

    if (ballX + ballSize / 2 > canvas.width) {
      // Player 1 scores
      player1Score++;
      resetBall();
    }
  }

  // Draw function
  function draw() {
    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    drawPaddle(paddleBorderSpacing, paddle1Y, paddleWidth, paddleHeight, "red");
    drawPaddle(canvas.width - paddleWidth - paddleBorderSpacing, paddle2Y, paddleWidth, paddleHeight, "red");

    // Draw ball
    drawBall(ballX, ballY, ballSize, "blue");

    // Draw scores
    ctx.font = "50px Calibri";
    ctx.fillText(`(${player1Score}-${player2Score})`, canvas.width / 2 - 80, 70);
  }

  // Helper function to draw paddles
  function drawPaddle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  // Helper function to draw ball
  function drawBall(x, y, size, color) {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  // Helper function to move paddles
  function movePaddles() {
    // Player 1 controls
    if (keys.w && paddle1Y > 0) {
      paddle1Y -= paddleSpeed;
    }
    if (keys.s && paddle1Y < canvas.height - paddleHeight) {
      paddle1Y += paddleSpeed;
    }

    // Player 2 controls
    if (keys.ArrowUp && paddle2Y > 0) {
      paddle2Y -= paddleSpeed;
    }
    if (keys.ArrowDown && paddle2Y < canvas.height - paddleHeight) {
      paddle2Y += paddleSpeed;
    }
  }

  // Helper function to reset ball position
  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
  }

  // Keyboard event listeners
  const keys = {};
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });
  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });

  // Game loop
  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();