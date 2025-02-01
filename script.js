const data = [
  {
      place: 'Switzerland Alps',
      title: 'SAINT',
      title2: 'ANTONIEN',
      description: 'Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It\'s a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.',
      image: 'https://assets.codepen.io/3685267/timed-cards-1.jpg'
  },
  {
      place: 'Japan Alps',
      title: 'NANGANO',
      title2: 'PREFECTURE',
      description: 'Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country\'s best powder.',
      image: 'https://assets.codepen.io/3685267/timed-cards-2.jpg'
  },
  {
      place: 'Sahara Desert - Morocco',
      title: 'MARRAKECH',
      title2: 'MEROUGA',
      description: 'The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.',
      image: 'https://assets.codepen.io/3685267/timed-cards-3.jpg'
  },
  {
      place: 'Sierra Nevada - USA',
      title: 'YOSEMITE',
      title2: 'NATIONAL PARK',
      description: 'Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.',
      image: 'https://assets.codepen.io/3685267/timed-cards-4.jpg'
  },
  {
      place: 'Tarifa - Spain',
      title: 'LOS LANCES',
      title2: 'BEACH',
      description: 'Los Lances Beach in Tarifa is a coastal paradise known for its consistent winds, making it a world-renowned spot for kitesurfing and windsurfing. The beach\'s long, sandy shores provide ample space for relaxation and sunbathing, with a vibrant atmosphere of beach bars and cafes.',
      image: 'https://assets.codepen.io/3685267/timed-cards-5.jpg'
  },
  {
      place: 'Cappadocia - Turkey',
      title: 'Göreme',
      title2: 'Valley',
      description: 'Göreme Valley in Cappadocia is a historical marvel set against a unique geological backdrop, where centuries of wind and water have sculpted the landscape into whimsical formations. The valley is also famous for its open-air museums, underground cities, and the enchanting experience of hot air ballooning.',
      image: 'https://assets.codepen.io/3685267/timed-cards-6.jpg'
  },
];

const _ = (id) => document.getElementById(id);

const cards = data.map((i, index) => 
  `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`
).join('');

const cardContents = data.map((i, index) => 
  `<div class="card-content" id="card-content-${index}">
      <div class="content-start"></div>
      <div class="content-place">${i.place}</div>
      <div class="content-title-1">${i.title}</div>
      <div class="content-title-2">${i.title2}</div>
  </div>`
).join('');

const slideNumbers = data.map((_, index) => 
  `<div class="item" id="slide-item-${index}">${index + 1}</div>`
).join('');

_('demo').innerHTML = cards + cardContents;
_('slide-numbers').innerHTML = slideNumbers;

const range = (n) => Array(n).fill(0).map((_, j) => j);

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
          onComplete: resolve,
      });
  });
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
      top: offsetTop + 330,
      left: offsetLeft,
      y: 200,
      opacity: 0,
      zIndex: 60,
  });

  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
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
      width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
      gsap.set(getCard(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
      });

      gsap.set(getCardContent(i), {
          x: offsetLeft + 400 + index * (cardWidth + gap),
          zIndex: 40,
          y: offsetTop + cardHeight - 100,
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
      },
  });

  rest.forEach((i, index) => {
      gsap.to(getCard(i), {
          x: offsetLeft + index * (cardWidth + gap),
          zIndex: 30,
          delay: 0.05 * index,
          ease,
          delay: startDelay,
      });

      gsap.to(getCardContent(i), {
          x: offsetLeft + index * (cardWidth + gap),
          zIndex: 40,
          delay: 0.05 * index,
          ease,
          delay: startDelay,
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

      document.querySelector(`${detailsActive} .place-box .text`).textContent =
          data[order[0]].place;
      document.querySelector(`${detailsActive} .title-1`).textContent =
          data[order[0]].title;
      document.querySelector(`${detailsActive} .title-2`).textContent =
          data[order[0]].title2;
      document.querySelector(`${detailsActive} .desc`).textContent =
          data[order[0]].description;

      gsap.set(detailsActive, { zIndex: 22 });
      gsap.to(detailsActive, { opacity: 1, delay: 0.4, x: 0, ease });
      gsap.to(detailsInactive, { opacity: 0, delay: 0.4, zIndex: 12 });

      gsap.to("#pagination .progress-sub-foreground", {
          width: 500 * (1 / order.length) * (clicks + 1),
          ease: "linear",
      });

      clicks++;

      const [active, ...rest] = order;

      gsap.to(getCard(active), {
          x: 0,
          y: 0,
          delay: 0.1,
          zIndex: 50,
          duration: 0.6,
          ease,
          onComplete: resolve,
      });

      gsap.to(getCardContent(active), {
          x: 0,
          y: 0,
          delay: 0.1,
          ease,
      });

      rest.forEach((i, index) => {
          gsap.to(getCard(i), {
              x: offsetLeft + index * (cardWidth + gap),
              y: offsetTop,
              zIndex: 30,
              delay: 0.05 * index,
              ease,
          });

          gsap.to(getCardContent(i), {
              x: offsetLeft + index * (cardWidth + gap),
              zIndex: 40,
              delay: 0.05 * index,
              ease,
          });
      });

      gsap.to("#pagination", { opacity: 0, y: -60 });
      gsap.to("nav", { opacity: 0, y: -100 });
      gsap.set(".indicator", { x: -window.innerWidth });

      setTimeout(() => {
          animate(".cover", 0.8, { x: -window.innerWidth, ease, delay: 0 });
      }, 1000);
  });
}

function loop() {
  return new Promise((resolve) => {
      step().then(() => {
          loop();
      });
  });
}

init();
