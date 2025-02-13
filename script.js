
  document.addEventListener("DOMContentLoaded", () => {
    // Confirm JavaScript activity
    const jsTextElem = document.getElementById("jsText");
    jsTextElem.textContent = "JavaScript is active, enhancing this demo with new abilities!";

    // Handle the form submission
    const demoForm = document.getElementById("demoForm");
    demoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = document.getElementById("nameInput").value;
      const htmlOutput = document.getElementById("htmlOutput");

      if (nameInput.trim() !== "") {
        // Added a rocket emoji in the greeting
        htmlOutput.textContent = `Hello, ${nameInput}! Welcome to our interactive demo 🚀`;
        // Add a little animation for feedback
        htmlOutput.style.backgroundColor = 'rgba(85, 99, 222, 0.1)';
        setTimeout(() => { htmlOutput.style.backgroundColor = 'transparent'; }, 500);
      } else {
        htmlOutput.textContent = "Please enter your name to receive a greeting.";
      }
    });

    // Utility function to clear theme classes
    const clearThemes = () => document.body.classList.remove("dark-mode", "blue-mode", "barbershop-mode", "rainbow-mode", "underwater-mode");

    // Theme buttons event listeners
    document.getElementById("defaultTheme").addEventListener("click", () => {
      clearThemes();
      animateThemeChange();
    });

    document.getElementById("darkTheme").addEventListener("click", () => {
      clearThemes();
      document.body.classList.add("dark-mode");
      animateThemeChange();
    });

    document.getElementById("blueTheme").addEventListener("click", () => {
      clearThemes();
      document.body.classList.add("blue-mode");
      animateThemeChange();
    });

    // Updated Barbershop Mode
    document.getElementById("barbershopMode").addEventListener("click", () => {
      clearThemes();
      document.body.classList.add("barbershop-mode");
      animateThemeChange();
    });

    // New Rainbow Mode
    const rainbowThemeBtn = document.createElement('button');
    rainbowThemeBtn.classList.add('theme-btn');
    rainbowThemeBtn.id = 'rainbowTheme';
    rainbowThemeBtn.textContent = 'Rainbow Mode';
    document.querySelector('.theme-controls').appendChild(rainbowThemeBtn);

    rainbowThemeBtn.addEventListener("click", () => {
      clearThemes();
      document.body.classList.add("rainbow-mode");
      animateThemeChange();
    });

    // New Underwater Mode
    const underwaterThemeBtn = document.createElement('button');
    underwaterThemeBtn.classList.add('theme-btn');
    underwaterThemeBtn.id = 'underwaterMode';
    underwaterThemeBtn.textContent = 'Underwater Mode';
    document.querySelector('.theme-controls').appendChild(underwaterThemeBtn);

    underwaterThemeBtn.addEventListener("click", () => {
      clearThemes();
      document.body.classList.add("underwater-mode");
      animateThemeChange();
    });

    // Global variable for emoji interval
    let emojiInterval = null;

    // Global variables for bouncing emojis
    let bouncingEmojis = [];
    let bouncingAnimationFrame = null;

    // Crazy Animations toggle
    const crazyAnimationBtn = document.getElementById("crazyAnimationBtn");
    crazyAnimationBtn.addEventListener("click", () => {
      const mainContainer = document.querySelector(".main-container");
      mainContainer.classList.toggle("crazy");

      // Toggle emoji animations when crazy mode is activated
      if (mainContainer.classList.contains("crazy")) {
        crazyAnimationBtn.textContent = "Stop Crazy Animations";
        startEmojiAnimations();
        addStationaryEmojis();
        startBouncingEmojis();
      } else {
        crazyAnimationBtn.textContent = "Crazy Animations";
        stopEmojiAnimations();
        stopBouncingEmojis();
      }
    });

    // Animation demo interaction: on click, change background color and add a ripple effect
    const animationDemo = document.querySelector('.animation-demo');
    animationDemo.addEventListener("click", () => {
      animationDemo.style.backgroundColor = getRandomColor();
      animationDemo.textContent = "Background Color Changed!";
      rippleEffect(animationDemo);
    });

    // Utility function to get a random color
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // Function to animate theme changes with a temporary overlay
    function animateThemeChange() {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
      overlay.style.zIndex = '9999';
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.5s';
      document.body.appendChild(overlay);

      setTimeout(() => { overlay.style.opacity = '1'; }, 50);

      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => { document.body.removeChild(overlay); }, 500);
      }, 500);
    }

    // Simple ripple effect function
    function rippleEffect(element) {
      const circle = document.createElement('span');
      const diameter = Math.max(element.clientWidth, element.clientHeight);
      const radius = diameter / 2;
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.position = 'absolute';
      circle.style.borderRadius = '50%';
      circle.style.background = 'rgba(255,255,255,0.6)';
      circle.style.transform = 'scale(0)';
      circle.style.animation = 'ripple 600ms linear';

      // Positioning the circle at the click center
      circle.style.left = `${element.clientWidth/2 - radius}px`;
      circle.style.top = `${element.clientHeight/2 - radius}px`;

      element.appendChild(circle);
      circle.addEventListener('animationend', () => {
        circle.remove();
      });
    }

    // Append keyframes for ripple in a style tag
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // Functions for Floating Emoji animations in Crazy Mode
    function spawnEmoji() {
      let emojiList;
      if(document.body.classList.contains("underwater-mode")) {
        // Updated underwater emojis for a more aquatic feel
        emojiList = ['🐠', '🐟', '🐡', '🐬', '🐙', '🦑', '🐚', '🐳'];
      } else {
        emojiList = ['🚀', '🎉', '✨', '💥', '🔥', '🌈', '🤩', '😎', '🥳'];
      }
      const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      const span = document.createElement('span');
      span.classList.add('floating-emoji');
      span.textContent = emoji;

      // Determine random horizontal positions
      const windowWidth = window.innerWidth;
      const startX = Math.floor(Math.random() * windowWidth);
      const offset = Math.floor(Math.random() * 100 - 50); // random offset from -50 to 50
      const endX = startX + offset;
      const midX = (startX + endX) / 2;

      span.style.setProperty('--start-x', startX + 'px');
      span.style.setProperty('--mid-x', midX + 'px');
      span.style.setProperty('--end-x', endX + 'px');

      document.body.appendChild(span);

      // Remove the emoji element after the animation duration (5s)
      setTimeout(() => {
        span.remove();
      }, 5000);
    }

    function startEmojiAnimations() {
      // Spawn a floating emoji every 300ms when crazy mode is active
      emojiInterval = setInterval(spawnEmoji, 300);
    }

    // Function to add a few stationary emojis that wobble on hover
    function addStationaryEmojis() {
      const numberStationary = 3; // Add 3 stationary emojis
      let emojiList;
      if(document.body.classList.contains("underwater-mode")) {
        // Updated underwater emojis for stationary elements
        emojiList = ['🐠', '🐟', '🐡', '🐬', '🐙', '🦑', '🐚', '🐳'];
      } else {
        emojiList = ['🚀', '🎉', '✨', '💥', '🔥', '🌈', '🤩', '😎', '🥳'];
      }
      for (let i = 0; i < numberStationary; i++) {
        const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
        const span = document.createElement('span');
        span.classList.add('stationary-emoji');
        span.textContent = emoji;
        // Random fixed position within the viewport
        span.style.position = 'fixed';
        span.style.top = Math.floor(Math.random() * 80) + 'vh';
        span.style.left = Math.floor(Math.random() * 80) + 'vw';
        span.style.fontSize = '2em';
        // Add hover events to trigger wobble effect
        span.addEventListener('mouseenter', () => { span.classList.add('wobble'); });
        span.addEventListener('mouseleave', () => { span.classList.remove('wobble'); });
        document.body.appendChild(span);
      }
    }

    function stopEmojiAnimations() {
      if (emojiInterval) {
        clearInterval(emojiInterval);
        emojiInterval = null;
      }
      // Remove floating emojis
      document.querySelectorAll('.floating-emoji').forEach(el => el.remove());
      // Remove stationary emojis
      document.querySelectorAll('.stationary-emoji').forEach(el => el.remove());
    }

    // Functions for bouncing emojis that zoom/bounce around the screen
    function startBouncingEmojis() {
      let emojiList;
      if(document.body.classList.contains("underwater-mode")) {
        // Updated underwater emojis for bouncing animations
        emojiList = ['🐠', '🐟', '🐡', '🐬', '🐙', '🦑', '🐚', '🐳'];
      } else {
        emojiList = ['😜', '😎', '🤪', '🕺'];
      }
      // Create 2 bouncing emojis
      for (let i = 0; i < 2; i++) {
        const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
        const span = document.createElement('span');
        span.classList.add('bouncing-emoji');
        span.textContent = emoji;
        span.style.position = 'fixed';
        span.style.fontSize = '2em';
        // Set initial random position
        let posX = Math.random() * (window.innerWidth - 50);
        let posY = Math.random() * (window.innerHeight - 50);
        span.style.left = posX + 'px';
        span.style.top = posY + 'px';

        // Set random velocities for x and y direction
        const velocity = {
          dx: (Math.random() * 4 + 1) * (Math.random() < 0.5 ? 1 : -1),
          dy: (Math.random() * 4 + 1) * (Math.random() < 0.5 ? 1 : -1)
        };

        // Attach custom properties to the element for tracking position and velocity
        span.dataset.posX = posX;
        span.dataset.posY = posY;
        span.dataset.dx = velocity.dx;
        span.dataset.dy = velocity.dy;

        document.body.appendChild(span);
        bouncingEmojis.push(span);
      }

      updateBouncingEmojis();
    }

    function updateBouncingEmojis() {
      bouncingEmojis.forEach(span => {
        let posX = parseFloat(span.dataset.posX);
        let posY = parseFloat(span.dataset.posY);
        let dx = parseFloat(span.dataset.dx);
        let dy = parseFloat(span.dataset.dy);

        posX += dx;
        posY += dy;

        // Bounce off the left and right boundaries
        if (posX <= 0 || posX >= window.innerWidth - 50) {
          dx = -dx;
          posX = Math.max(0, Math.min(posX, window.innerWidth - 50));
        }
        // Bounce off the top and bottom boundaries
        if (posY <= 0 || posY >= window.innerHeight - 50) {
          dy = -dy;
          posY = Math.max(0, Math.min(posY, window.innerHeight - 50));
        }

        span.dataset.posX = posX;
        span.dataset.posY = posY;
        span.dataset.dx = dx;
        span.dataset.dy = dy;
        span.style.left = posX + 'px';
        span.style.top = posY + 'px';
      });

      bouncingAnimationFrame = requestAnimationFrame(updateBouncingEmojis);
    }

    function stopBouncingEmojis() {
      if (bouncingAnimationFrame) {
        cancelAnimationFrame(bouncingAnimationFrame);
        bouncingAnimationFrame = null;
      }
      bouncingEmojis.forEach(span => span.remove());
      bouncingEmojis = [];
    }
  });
  