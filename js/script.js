const filterByType = (type, ...values) => values.filter((value) => typeof value === type), // создаем функцию, которая принимает тип данных и значения и фильтрует значения, оставляя только те значения, которые совпадают с выбранным типом данных. Полученные значения формируются в массив
  hideAllResponseBlocks = () => {
    //функция, скрывающая все блоки с ответами
    const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создаем массив из элементов-блоков с селектором div.dialog__response-block
    responseBlocksArray.forEach((block) => (block.style.display = 'none')); //перебираем полученный массив и каждый элемент-блок скрываем
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    //функция, показывающая нужные блоки. Принимает три аргумента: селектор блока, текст сообщения и селектор спана
    hideAllResponseBlocks(); //вызываем функцию, которая скрывает все блоки с ответами
    document.querySelector(blockSelector).style.display = 'block'; //ищем блоки с выбранным селектором и показываем их, присваивая свойство display: block
    if (spanSelector) {
      //если был передан селектор спана, то
      document.querySelector(spanSelector).textContent = msgText; //находим этот спан по селектору и отображаем в нём сообщение
    }
  },
  showError = (msgText) => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //функция показывающая ошибку, принимает в качестве аргумента сообщение и вызывающая функцию, показывающую блок, которая в свою очередь принимает три параметра: селектор блока, сообщение и селектор спана
  showResults = (msgText) => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //функция показывающая результат, принимает в качестве аргумента сообщение и вызывающая функцию, показывающую блок, которая в свою очередь принимает три параметра: селектор блока, сообщение и селектор спана
  showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //функция, которая показывает блок без результата
  tryFilterByType = (type, values) => {
    //создаем функцию, которая фильтрует данные и выводит сообщения. Принимает два аргумента: тип данных и значения
    try {
      //этот код выполняется, если в нем не возникает ошибок
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(', '); //запускается функция, которая фильтрует данные по типу, принимая два параметра: тип данных и значения. Полученный массив метод join объединяет в строку, элементы массива записываются через запятую. Метод eval позволяет выполнить код, записанный в строке.
      const alertMsg = valuesArray.length //формируется сообщение. Если строка не пустая, то выводится сообщение с типом данных и значениями, которые под этот тип попадают
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`; //а если строка пустая, то выводится сообщение что данные выбранного типа отсутствуют
      showResults(alertMsg); //выводится сообщение, сформированное выше.
    } catch (e) {
      //этот код выполняется, если в коде выше (в try{}) возникла ошибка
      showError(`Ошибка: ${e}`); //выводит ошибочный блок с текстом ошибки
    }
  };

const filterButton = document.querySelector('#filter-btn'); //находим кнопку с id='filter-btn'

filterButton.addEventListener('click', (e) => {
  //навешиваем на эту кнопку слушатель события клик по кнопке
  const typeInput = document.querySelector('#type'); //находим поле ввода с выбором типов данных
  const dataInput = document.querySelector('#data'); //находим поле ввода с данными, которые будут фильтроваться
  if (dataInput.value === '') {
    //если поле с данными пустое, то
    dataInput.setCustomValidity('Поле не должно быть пустым!'); //выводится стандартное предупреждение с нашим текстом
    showNoResults(); //выводится блок с пустым результатом
  } else {
    //если поле с данными не пустое, то
    dataInput.setCustomValidity(''); //сообщение в стандартном предупреждении очищается
    e.preventDefault(); // блокируется стандартное поведение браузера
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //запускается функция, которая фильтрует данные из поля Данные по типу данных, выбранных в поле Тип данных. Метод trim удаляет пробелы с начала и конца строки
  }
});
