const game = document.getElementById('game');
const dog = document.getElementById('dog');
const scoreEl = document.getElementById('score');
let score = 0;

// 강아지 위치 이동 함수
function moveDog(x) {
  if (x < 25) x = 25;
  if (x > game.offsetWidth - 25) x = game.offsetWidth - 25;
  dog.style.left = x + 'px';
}

// 마우스 이동
game.addEventListener('mousemove', e => {
  const x = e.clientX - game.getBoundingClientRect().left;
  moveDog(x);
});

// 터치 이동
game.addEventListener('touchmove', e => {
  e.preventDefault(); // 화면 스크롤 방지
  const touch = e.touches[0];
  const x = touch.clientX - game.getBoundingClientRect().left;
  moveDog(x);
});

// 뼈다귀 생성
function createBone() {
  const bone = document.createElement('div');
  bone.classList.add('bone');
  bone.style.left = Math.random() * (game.offsetWidth - 30) + 'px';
  bone.style.top = '0px';
  game.appendChild(bone);

  const fallInterval = setInterval(() => {
    let top = parseInt(bone.style.top);
    if (top > game.offsetHeight - 30) {
      bone.remove();
      clearInterval(fallInterval);
    } else {
      bone.style.top = top + 5 + 'px';

      // 충돌 체크
      const dogRect = dog.getBoundingClientRect();
      const boneRect = bone.getBoundingClientRect();
      if (
        dogRect.left < boneRect.right &&
        dogRect.right > boneRect.left &&
        dogRect.top < boneRect.bottom &&
        dogRect.bottom > boneRect.top
      ) {
        score++;
        scoreEl.textContent = '점수: ' + score;
        bone.remove();
        clearInterval(fallInterval);
      }
    }
  }, 20);
}

// 주기적으로 뼈다귀 생성
setInterval(createBone, 1000);