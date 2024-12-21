document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const counter = document.getElementById("counter");
    const minusButton = document.getElementById("minus");
    const plusButton = document.getElementById("plus");
    const heartButton = document.getElementById("heart");
    const pauseButton = document.getElementById("pause");
    const likesList = document.querySelector(".likes");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentsDiv = document.getElementById("list");
  
    // Initialize variables
    let timer = null;
    let counterValue = 0;
    let isPaused = false;
    let likes = {};
  
    // Functions
    const startTimer = () => {
      timer = setInterval(() => {
        if (!isPaused) {
          counterValue++;
          updateCounter();
        }
      }, 1000);
    };
  
    const updateCounter = () => {
      counter.textContent = counterValue;
    };
  
    const togglePause = () => {
      isPaused = !isPaused;
      if (isPaused) {
        clearInterval(timer);
        pauseButton.textContent = "resume";
        toggleButtons(true);
      } else {
        startTimer();
        pauseButton.textContent = "pause";
        toggleButtons(false);
      }
    };
  
    const toggleButtons = (disable) => {
      minusButton.disabled = disable;
      plusButton.disabled = disable;
      heartButton.disabled = disable;
    };
  
    const addLike = () => {
      if (!likes[counterValue]) {
        likes[counterValue] = 1;
        const li = document.createElement("li");
        li.dataset.value = counterValue;
        li.textContent = `${counterValue} has been liked 1 time.`;
        likesList.appendChild(li);
      } else {
        likes[counterValue]++;
        const li = likesList.querySelector(`li[data-value="${counterValue}"]`);
        li.textContent = `${counterValue} has been liked ${likes[counterValue]} times.`;
      }
    };
  
    const addComment = (event) => {
      event.preventDefault();
      const commentText = commentInput.value.trim();
      if (commentText) {
        const p = document.createElement("p");
        p.textContent = commentText;
        commentsDiv.appendChild(p);
        commentInput.value = "";
      }
    };
  
    // Event Listeners
    minusButton.addEventListener("click", () => {
      if (!isPaused) {
        counterValue--;
        updateCounter();
      }
    });
  
    plusButton.addEventListener("click", () => {
      if (!isPaused) {
        counterValue++;
        updateCounter();
      }
    });
  
    heartButton.addEventListener("click", addLike);
    pauseButton.addEventListener("click", togglePause);
    commentForm.addEventListener("submit", addComment);
  
    // Start the timer
    startTimer();
  });
  