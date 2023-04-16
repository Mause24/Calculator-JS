const list = document.getElementById("list");
let history = [];


window.addEventListener("load", () => {
    const clean = document.getElementById("clean");
    const history = document.getElementById("history");
    const backdrop = document.getElementById("backdrop");
    const historyContainer = document.getElementById("historyContainer");
    const close = document.getElementById("close");

    history.children[0].addEventListener("click", () => {
        backdrop.classList.add("open")
        historyContainer.classList.add("slide-left")
    })

    close.addEventListener("click", () => {
        backdrop.classList.remove("open")
        historyContainer.classList.remove("slide-left")
    })

    clean.addEventListener("click", () => {
        list.innerHTML = ""
    })
})

$(function () {
    let num1 = '0';
    let num2 = '0';
    let operator = '';
    let result = '';
    let msg = '';

    let displayTop = $('.display__top');
    let displayBottom = $('.display__bottom');

    display();

    $('.keyboard').on('click', function (e) {
        switch (e.target.id) {
            case 'delete-one':
                deleteOne();
                break;
            case 'ce':
                deleteDisplayBottom();
                break;
            case 'c':
                deleteAll();
                break;
            case '1':
                addDigit('1');
                break;
            case '2':
                addDigit('2');
                break;
            case '3':
                addDigit('3');
                break;
            case '4':
                addDigit('4');
                break;
            case '5':
                addDigit('5');
                break;
            case '6':
                addDigit('6');
                break;
            case '7':
                addDigit('7');
                break;
            case '8':
                addDigit('8');
                break;
            case '9':
                addDigit('9');
                break;
            case '0':
                addDigit('0');
                break;
            case 'div':
                addOperator('/');
                break;
            case 'mul':
                addOperator('*');
                break;
            case 'sub':
                addOperator('-');
                break;
            case 'sum':
                addOperator('+');
                break;
            case 'point':
                addPoint();
                break;
            case 'equal':
                calculate();
        }
        display();
    });

    function display() {
        if (msg !== '') {
            displayBottom.val(msg);
            msg = '';
        } else if (result !== '') {
            displayBottom.val(result);
        } else if (operator === '') {
            displayTop.val('');
            displayBottom.val(num1);
        } else {
            displayTop.val(num1 + ' ' + operator);
            displayBottom.val(num2);
        }
    }

    function deleteOne() {
        if (operator === '') {
            num1 = deleteDigit(num1);
        } else {
            num2 = deleteDigit(num2);
        }
    }

    function deleteDigit(num) {
        if (num.length > 1) {
            return num.substring(0, num.length - 1);
        }
        return '0';
    }

    function deleteDisplayBottom() {
        if (result !== '') {
            result = '';
        }
        if (operator === '') {
            num1 = '0';
        } else {
            num2 = '0';
        }
    }

    function deleteAll() {
        num1 = '0';
        num2 = '0';
        operator = '';
        result = '';
    }

    function addDigit(digit) {
        if (result !== '') {
            result = '';
        }
        if (operator === '') {
            num1 = getNewNumber(num1, digit);
        } else {
            num2 = getNewNumber(num2, digit);
        }
    }

    function getNewNumber(num, digit) {
        if (num === '0') {
            return digit;
        }
        return num + digit;
    }

    function addOperator(ope) {
        if (result !== '') {
            num1 = result;
            result = '';
        }
        if (operator === '') {
            operator = ope;
        } else if (parseFloat(num2) === 0) {
            operator = ope;
        } else {
            calculate();
            addOperator(ope);
        }
    }

    function addPoint() {
        if (operator === '') {
            num1 = getNumberWithPoint(num1);
        } else {
            num2 = getNumberWithPoint(num2);
        }
    }

    function getNumberWithPoint(num) {
        if (num.indexOf('.') === -1) {
            return num + '.';
        }
        return num;
    }

    function calculate() {
        if (num1 === '' || num2 === '' || operator === '') {
            return;
        }
        history.push({
            operator: num1 + operator + num2,
            result: eval(num1 + operator + num2),
        })
        list.innerHTML += `
        <li>
            <h3>${eval(num1 + operator + num2)}</h3>
            <p>${num1 + operator + num2}</p>
        </li>
        `
        if (operator === '/') {
            makeDivision();
        } else {
            showResult(eval(num1 + operator + num2));
        }
    }

    function makeDivision() {
        if (parseFloat(num2) === 0) {
            deleteAll();
            msg = 'Indefinido';
            return;
        }
        showResult(eval(num1 + operator + num2));
    }

    function showResult(res) {
        deleteAll();
        result = res;
    }
});
