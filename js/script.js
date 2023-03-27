const form = document.getElementById('test-form');
const result = document.querySelector('.result');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formResults = new FormData(form);
  const resultValues = [];
  
  for (let value of formResults.values()) {
    resultValues.push(value);
  }
  
  const countValues = resultValues.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  
  const maxCount = Math.max(...Object.values(countValues));
  const resultKeys = Object.keys(countValues).filter(key => countValues[key] === maxCount);
  
  if (resultKeys.length === 1) {
    const resultValue = getResult(resultKeys[0]);
    result.innerHTML = `Ваше направление - <a href="${resultValue.link}">${resultValue.title}</a>`;
  } else {
    result.textContent = 'У Вас несколько направлений, пожалуйста, ответьте на вопросы более конкретно.';
  }
});

function getResult(value) {
  switch (value) {
    case '1':
      return {
        title: 'Программная инженерия (ПИНЖ)',
        link: links['1']
      };
    case '2':
      return {
        title: 'Информационные системы и технологии (ИФСТ)',
        link: links['2']
      };
    case '3':
      return {
        title: 'Прикладная информатика (ПИФН)',
        link: links['3']
      };
    case '4':
      return {
        title: 'Информатика и вычислительная техника (ИВЧТ)',
        link: links['4']
      };
    default:
      return '';
  }
}

function confirmReset() {
  if (confirm('Вы уверены, что хотите сбросить форму?')) {
    document.getElementById('application-form').reset();
  }
}

const links = {
  '1': 'https://inpit.sstu.ru/direction.php?dir=pinj',
  '2': 'https://inpit.sstu.ru/direction.php?dir=ifst1',
  '3': 'https://inpit.sstu.ru/direction.php?dir=pinf',
  '4': 'https://inpit.sstu.ru/direction.php?dir=ivcht'
};