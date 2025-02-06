const data = [
    {
      place: "$15,000 annually", // Price
      title: "Pearl Patron", // Name
      title2: "Priority reservations, 24/7 butler service, and private spa treatments.", // Description
      description: "15 nights/year in deluxe rooms, private diving, and personalized gifts.", // Brief Description
      image: 'images/card_images/PEARL PATRON.png',
      alt: 'Pearl Patron Membership Card'
    },
    {
      place: "$35,000 annually",
      title: "Sapphire Sentinel",
      title2: "Private check-in, butler services, and tailored wellness.",
      description: "15 nights/year in suite rooms, personalized touches, and exclusive rewards.",
      image: 'images/card_images/SAPPHIRE SENTINEL.png',
      alt: 'Sapphire Sentinel Membership Card'
    },
    {
      place: "$40,000 annually",
      title: "Crystal Connoisseur",
      title2: "Unrivaled access, private spa treatments, and exclusive rewards.",
      description: "15 nights/year in penthouse suites, personalized gifts, and VIP events.",
      image: 'images/card_images/CRYSTAL CONNOISSEUR.png',
      alt: 'Crystal Connoisseur Membership Card'
    },
    {
      place: "$45,000 annually",
      title: "Amber Advocate",
      title2: "VIP access, personal concierge, and elite events.",
      description: "10 nights/year in beach villas, tailored wellness, and curated dining.",
      image: 'images/card_images/AMBER ADVOCATE.png',
      alt: 'Amber Advocate Membership Card'
    },
    {
      place: "$50,000 annually",
      title: "Aqua Astra",
      title2: "Exclusive ocean experiences, wellness treatments, and oceanfront stays.",
      description: "15 nights/year in beach villas, private dining, and security services.",
      image: 'images/card_images/AQUA ASTRA.png',
      alt: 'Aqua Astra Membership Card'
    },
    {
      place: "$60,000 annually",
      title: "Titanium Treasure",
      title2: "Private island hopping, scuba diving, and floating dining.",
      description: "20 nights/year in private villas, personalized spa treatments, and VIP events.",
      image: 'images/card_images/TITANIUM TREASURE.png',
      alt: 'Titanium Treasure Membership Card'
    },
    {
      place: "$65,000 annually",
      title: "Mystic Member",
      title2: "Sunset cruises, mystic stays, and personalized wellness.",
      description: "25 nights/year in beach villas, private chef dining, and special gifts.",
      image: 'images/card_images/MYSTIC MEMBER.png',
      alt: 'Mystic Member Membership Card'
    },
    {
      place: "$75,000 annually",
      title: "Elysian Elite",
      title2: "Private sky deck access, celestial wellness, and elite dining.",
      description: "30 nights/year in beach villas, private yacht access, and exclusive celebrations.",
      image: 'images/card_images/ELYSIAN ELITE.png',
      alt: 'Elysian Elite Membership Card'
    },
    {
      place: "$85,000 annually",
      title: "Topaz Titan",
      title2: "Vibrant nightlife, exclusive entertainment, and luxury transport.",
      description: "35 nights/year in private villas, private performances, and premium dining.",
      image: 'images/card_images/TOPAZ TITAN.png',
      alt: 'Topaz Titan Membership Card'
    },
    {
      place: "$100,000 annually",
      title: "Diamond Dune",
      title2: "Ultimate luxury with VIP services, private jet access, and exclusive stays.",
      description: "40 nights/year in luxury accommodations, private chefs, and investment opportunities.",
      image: 'images/card_images/DIAMOND.png',
      alt: 'Diamond Dune Membership Card'
    }
  ];                    
  

const _ = (id) => document.getElementById(id);

// Render Cards
const cards = data.map((i, index) => 
    `<div class="card" id="card${index}" style="background-image:url(${i.image});">
        <img src="${i.image}" alt="${i.alt}" class="card-image" />
    </div>`
).join('');

// Render Card Contents (Only Price and Name for Cards)
const cardContents = data.map((i, index) => 
    `<div class="card-content" id="card-content-${index}">
        <div class="content-place">${i.place}</div>
        <div class="content-title-1">${i.title}</div>
    </div>`
).join('');



// Render Slide Numbers
const slideNumbers = data.map((_, index) => 
    `<div class="item" id="slide-item-${index}">${index + 1}</div>`
).join('');

// Insert HTML Content
_('demo').innerHTML = cards + cardContents;
_('slide-numbers').innerHTML = slideNumbers;

// Button Click Event Listeners
document.querySelector(".arrow-left").addEventListener("click", () => {
    order.unshift(order.pop()); // Move last to first
    updateCards();
});

document.querySelector(".arrow-right").addEventListener("click", () => {
    order.push(order.shift()); // Move first to last
    updateCards();
});


const range = (n) => Array(n).fill(0).map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
    return `#card${index}`;
}

function getCardContent(index) {
    return `#card-content-${index}`;
}

function getSliderItem(index) {
    return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
    return new Promise((resolve) => {
        gsap.to(target, {
            ...properties,
            duration: duration,
            onComplete: resolve
        });
    });
}

let order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
// let cardWidth = 300; // Wider width for landscape cards
// let cardHeight = 200; // Shorter height for landscape cards


let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
    const [active, ...rest] = order;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
    const { innerHeight: height, innerWidth: width } = window;

    // Adjust card sizes and positions for mobile
    if (width <= 768) {
        cardWidth = width * 0.8; // 80% of screen width
        cardHeight = 200; // Fixed height for mobile
        offsetTop = height - cardHeight - 20; // Adjust to keep cards at the bottom
        offsetLeft = width * 0.1; // 10% of screen width
        gap = 20; // Smaller gap for mobile
    } else {
        cardWidth = 200; // Default width for desktop
        cardHeight = 300; // Default height for desktop
        offsetTop = height - 430; // Default top offset for desktop
        offsetLeft = width - 830; // Default left offset for desktop
        gap = 40; // Default gap for desktop
    }
    

    gsap.set("#pagination", {
        top: offsetTop + 330,
        left: offsetLeft,
        y: 200,
        opacity: 0,
        zIndex: 60
    });

    gsap.set("nav", { y: -200, opacity: 0 });

    gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
    });
    gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });

    gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
    gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
    gsap.set(`${detailsInactive} .text`, { y: 100 });
    gsap.set(`${detailsInactive} .title-1`, { y: 100 });
    gsap.set(`${detailsInactive} .title-2`, { y: 100 });
    gsap.set(`${detailsInactive} .desc`, { y: 50 });
    gsap.set(`${detailsInactive} .cta`, { y: 60 });

    gsap.set(".progress-sub-foreground", {
        width: 500 * (1 / order.length) * (active + 1)
    });

    rest.forEach((i, index) => {
        gsap.set(getCard(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            borderRadius: 10
        });
        gsap.set(getCardContent(i), {
            x: offsetLeft + 400 + index * (cardWidth + gap),
            zIndex: 40,
            y: offsetTop + cardHeight - 100
        });
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
    });

    gsap.set(".indicator", { x: -window.innerWidth });

    const startDelay = 0.6;

    gsap.to(".cover", {
        x: width + 400,
        delay: 0.5,
        ease,
        onComplete: () => {
            setTimeout(() => {
                loop();
            }, 500);
        }
    });         

    rest.forEach((i, index) => {
        gsap.to(getCard(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 30,
            delay: 0.05 * index,
            ease,
            delay: startDelay
        });
        gsap.to(getCardContent(i), {
            x: offsetLeft + index * (cardWidth + gap),
            zIndex: 40,
            delay: 0.05 * index,
            ease,
            delay: startDelay
        });
    });

    gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function step() {
    return new Promise((resolve) => {
        order.push(order.shift());
        detailsEven = !detailsEven;

        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

        document.querySelector(`${detailsActive} .place-box .text`).textContent = data[order[0]].place;
        document.querySelector(`${detailsActive} .title-1`).textContent = data[order[0]].title;
        document.querySelector(`${detailsActive} .title-2`).textContent = data[order[0]].title2;
        document.querySelector(`${detailsActive} .desc`).textContent = data[order[0]].description;

        gsap.set(detailsActive, { zIndex: 22 });
        gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
        gsap.to(`${detailsActive} .text`, {
            y: 0,
            delay: 0.1,
            duration: 0.7,
            ease
        });
        gsap.to(`${detailsActive} .title-1`, {
            y: 0,
            delay: 0.15,
            duration: 0.7,
            ease
        });
        gsap.to(`${detailsActive} .title-2`, {
            y: 0,
            delay: 0.15,
            duration: 0.7,
            ease
        });
        gsap.to(`${detailsActive} .desc`, {
            y: 0,
            delay: 0.3,
            duration: 0.4,
            ease
        });
        gsap.to(`${detailsActive} .cta`, {
            y: 0,
            delay: 0.35,
            duration: 0.4,
            onComplete: resolve,
            ease
        });
        gsap.set(detailsInactive, { zIndex: 12 });

        const [active, ...rest] = order;
        const prv = rest[rest.length - 1];

        gsap.set(getCard(prv), { zIndex: 10 });
        gsap.set(getCard(active), { zIndex: 20 });
        gsap.to(getCard(prv), { scale: 1.5, ease });

        gsap.to(getCardContent(active), {
            y: offsetTop + cardHeight - 10,
            opacity: 0,
            duration: 0.3,
            ease
        });

        gsap.to(getSliderItem(active), { x: 0, ease });
        gsap.to(getSliderItem(prv), { x: -numberSize, ease });
        gsap.to(".progress-sub-foreground", {
            width: 500 * (1 / order.length) * (active + 1),
            ease
        });

        gsap.to(getCard(active), {
            x: 0,
            y: 0,
            ease,
            width: window.innerWidth,
            height: window.innerHeight,
            borderRadius: 0,
            onComplete: () => {
                const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                gsap.set(getCard(prv), {
                    x: xNew,
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    zIndex: 30,
                    borderRadius: 10,
                    scale: 1
                });

                gsap.set(getCardContent(prv), {
                    x: xNew,
                    y: offsetTop + cardHeight - 100,
                    opacity: 1,
                    zIndex: 40
                });
                gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

                gsap.set(detailsInactive, { opacity: 0 });
                gsap.set(`${detailsInactive} .text`, { y: 100 });
                gsap.set(`${detailsInactive} .title-1`, { y: 100 });
                gsap.set(`${detailsInactive} .title-2`, { y: 100 });
                gsap.set(`${detailsInactive} .desc`, { y: 50 });
                gsap.set(`${detailsInactive} .cta`, { y: 60 });
                clicks -= 1;
                if (clicks > 0) {
                    step();
                }
            }
        });

        rest.forEach((i, index) => {
            if (i !== prv) {
                const xNew = offsetLeft + index * (cardWidth + gap);
                gsap.set(getCard(i), { zIndex: 30 });
                gsap.to(getCard(i), {
                    x: xNew,
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    ease,
                    delay: 0.1 * (index + 1)
                });

                gsap.to(getCardContent(i), {
                    x: xNew,
                    y: offsetTop + cardHeight - 100,
                    opacity: 1,
                    zIndex: 40,
                    ease,
                    delay: 0.1 * (index + 1)
                });
                gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
            }
        });
    });
}
function updateCards() {
    const [active, ...rest] = order;
    
    // Animate the main (active) card
    gsap.to(getCard(active), {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        zIndex: 20,
        borderRadius: 0
    });

    // Animate the remaining cards (stacked)
    rest.forEach((i, index) => {
        gsap.to(getCard(i), {
            x: offsetLeft + index * (cardWidth + gap),
            y: offsetTop,
            width: cardWidth,
            height: cardHeight,
            zIndex: 30,
            delay: 0.05 * index,
            ease
        });
    });

    // Animate card content
    gsap.to(getCardContent(active), { x: 0, y: 0, opacity: 1 });
}

let touchStartX = 0;
let touchEndX = 0;

// Detect swipe start
document.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
});

// Detect swipe movement
document.addEventListener("touchmove", (event) => {
    touchEndX = event.touches[0].clientX;
});

// Detect swipe end and determine direction
document.addEventListener("touchend", () => {
    let swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50) {
        // Swiped Right - Move to previous card
        order.unshift(order.pop()); 
        updateCards();
    } else if (swipeDistance < -50) {
        // Swiped Left - Move to next card
        order.push(order.shift());
        updateCards();
    }
});


async function loop() {
    await animate(".indicator", 2, { x: 0 });
    await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
    set(".indicator", { x: -window.innerWidth });
    await step();
    loop();
}

async function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image: ${src}`);
        img.src = src;
    });
}

async function loadImages() {
    const promises = data.map(({ image }) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    await Promise.all(promises);
  }
  
  async function start() {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.display = "flex";
    }
  
    try {
      await loadImages();
      init();
    } catch (error) {
      console.error("One or more images failed to load", error);
    }
  
    if (loader) {
      loader.style.display = "none";
    }
  }
  
  start();