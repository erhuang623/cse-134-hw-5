class RatingWidget extends HTMLElement {
constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const template = document.createElement('template');
    template.innerHTML = `
    <style>

    .star {
        color: gray;
        font-size: 40px;
        cursor: pointer;
      }
      
      .selected,
      .hovered {
        color: gold;
      }
    </style>

        <div class="rating">
            <span class="star" id="1">★</span>
            <span class="star" id="2">★</span>
            <span class="star" id="3">★</span>
            <span class="star" id="4">★</span>
            <span class="star" id="5">★</span>
        </div>
        <p id="feedback"></p>
    `
    shadow.appendChild(template.content.cloneNode(true));


const star = shadow.querySelectorAll('.star');
let clicked=false;

star.forEach(star => {
  star.addEventListener('mouseover', () => {
    const hoveredStarId = parseInt(star.id);
    ChangeStarColor(hoveredStarId);
  });
  

  star.addEventListener('mouseout', () => {
    if(clicked === false) {
        resetStars(); 
    }
  });

  star.addEventListener('click', () => {
    const clickedStarId = parseInt(star.id);
    clicked = true;
    for (let i = 1; i <= clickedStarId; i++) {
      const starElement = shadow.getElementById(`${i}`);
      starElement.classList.add('selected');
    }
    
    if(clickedStarId >= 4) {
        shadow.getElementById('feedback').innerText = `Thank you for a ${clickedStarId} rating!`;
    }

    else if(clickedStarId <= 2) {
        shadow.getElementById('feedback').innerText = `Thank you for a ${clickedStarId} rating, We'll try to improve!`;
    }

    else {
        shadow.getElementById('feedback').innerText = `You gave a ${clickedStarId} rating!`;
    }

    //How to send echo
    let input = document.getElementById('rating');
    input.value = clickedStarId;
    let form = document.getElementById('starForm');
    form.submit();

  });
});



function ChangeStarColor(hoveredStarId) {
  resetStars(); 

  for (let i = 1; i <= hoveredStarId; i++) {
    const starElement = shadow.getElementById(`${i}`);
    starElement.classList.add('hovered');
  }
}

// Function to reset all star to default state
function resetStars() {
  star.forEach(star => {
    star.classList.remove('selected', 'hovered');
  });
}


  }
}

window.customElements.define('rating-widget', RatingWidget);
