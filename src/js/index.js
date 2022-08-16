const CONTENT_LIMIT = 3;

const total = document.getElementById("total");
const modifier = document.querySelector(".modifier");
const digits = document.querySelector(".digits");
const operations = document.querySelector(".operations");

const calculate = (type, num, num2) => {
  switch (type) {
    case "+":
      return plus(num, num2);
    case "-":
      return subtract(num, num2);
    case "X":
      return multiply(num, num2);
    case "/":
      return divide(num, num2);
  }
};

const plus = (num, num2) => {
  return num + num2;
};

const subtract = (num, num2) => {
  return num - num2;
};

const multiply = (num, num2) => {
  return num * num2;
};

const divide = (num, num2) => {
  const result = num / num2;
  if (result > 0) {
    return Math.floor(num / num2);
  } else {
    return Math.ceil(num / num2);
  }
};

class Calculator {
  type;
  value;
  limit;

  constructor() {
    this.type = "";
    this.value = "0";
    this.limit = CONTENT_LIMIT;
  }

  resetType = () => {
    this.type = "";
  };

  resetValue = () => {
    this.value = "0";
  };

  resetLimit = () => {
    this.limit = CONTENT_LIMIT;
  };

  handleLimit = () => {
    this.limit = this.limit - 1;
  };

  addValue = (value) => {
    this.value = this.value + value;
  };

  checkValue = () => {
    if (this.value === "Infinity" || this.value === "NaN") {
      this.resetValue();
    }
  };

  handleAllClear = () => {
    this.resetLimit();
    this.resetType();
    this.resetValue();
  };

  handleDigit = (digit) => {
    this.checkValue();
    if (this.limit === 0) {
      alert("세자리까지 숫자 입력할 수 있음");
      return;
    }

    this.handleLimit();
    if (this.value === "0") {
      this.value = digit.toString();
      return;
    }
    this.addValue(digit);
  };

  splitNumbers = () => {
    let isMinus = false;
    if (this.value.startsWith("-")) {
      isMinus = true;
      this.value = this.value.substring(1);
    }

    const [first, second] = this.value.split(this.type);
    const num = isMinus ? -parseInt(first) : parseInt(first);
    const num2 = second !== "" ? parseInt(second) : 0;
    return { num, num2 };
  };

  calculateValue = () => {
    let result;
    if (this.type === "") {
      result = this.value;
    } else {
      const { num, num2 } = this.splitNumbers();
      result = calculate(this.type, num, num2);
    }
    this.value = result.toString();
  };

  checkType = (type) => {
    this.checkValue();
    if (type === "=") {
      this.calculateValue();
      this.resetType();
      this.resetLimit();
      return;
    }

    if (this.type === "") {
      this.addValue(type);
      this.type = type;
      this.resetLimit();
      return;
    }

    if (this.limit === CONTENT_LIMIT) {
      alert("숫자 입력 전 연산자를 입력해주세요");
      return;
    }
    alert("두 개 이상의 숫자를 계산할 수 없습니다");
  };
}

const cc = new Calculator();

const setTotal = (value) => {
  total.innerText = value;
};

const setAc = () => {
  cc.handleAllClear();
  setTotal(cc.value);
};

const setDigit = (event) => {
  const digit = event.target.innerText;
  cc.handleDigit(digit);
  setTotal(cc.value);
};

const setType = (event) => {
  const type = event.target.innerText;
  cc.checkType(type);
  setTotal(cc.value);
};

const addEventListeners = () => {
  modifier.addEventListener("click", setAc);
  digits.addEventListener("click", setDigit);
  operations.addEventListener("click", setType);
};

addEventListeners();
