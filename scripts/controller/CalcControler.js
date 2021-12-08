class CalcControler {

    constructor() {
        this._audio = new Audio("click.mp3");
        this._operation = [];
        this._float = false;
        this._floatNumber = [];
        //document.getElementById("display")
        this._displaycalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this._displayCalc = "0";
        this.initButtonEvents();
        this.initKeyboard();
        this.initialize();

    };
    pasteFromClipboard(){
        document.addEventListener('paste', e=>{
            let text = e.clipboardData.getData('Text');
            if (!isNaN(text)){
                this.displayCalc = parseFloat(text);
            }
        });
    }

    copyToClipboard(){
        let input = document.createElement('input');
        input.value = this.displayCalc;
        document.body.appendChild(input);
        input.select();
        document.execCommand("Copy");
        input.remove();
    }

    initialize() {
        this.pasteFromClipboard();
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString("pt-BR");
        this.displayTime = this.currentDate.toLocaleTimeString("pt-BR");
    }

    addEventListenerAll(element, events, action) {
        events.split(" ").forEach(event => {
            element.addEventListener(event, action, false)
        });
    }

    clearAll() {
        this.checkFloat();
        this._operation = [];
        this.displayCalc = '0';
    }

    clearEntry() {
        this.checkFloat();        //error if CE called with no number and if operation len = 1
        if (/*!isNaN(this.lastOperation()) &&*/ this._operation.length > 2) {
            this.displayCalc = this._operation[0];;
        } else if (/*!isNaN(this.lastOperation()) &&*/ this._operation.length < 2) {
            this.displayCalc = '0';
        }

        this._operation.pop();
        console.log("CE:");
        console.log(this._operation);
    }

    isOperator(value) {
        return (["+", "-", "*", "%", "/"].indexOf(value) > -1);
    }

    operationPushValue(value) {
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.calculate(false);
        }
    }

    checkFloat() {
        if (this._float) {
            this._float = false;
            this.operationPushValue(parseFloat(this._floatNumber.join("")));
            this._floatNumber = []
        }
    }
    calculate(clear) {
        try{
            if (!clear) {
                let last = this._operation.pop();
                let result = eval(this._operation.join(""));
                this._operation = [result, last];
            } else if (clear) {
                this.checkFloat();
                let result = eval(this._operation.join(""));
                this.displayCalc = result;
                this._operation = [result];
            }
        } catch(er){
            this.clearAll();
            this.displayCalc = "error"
        }       

    }

    addOperation(value) {
        if (isNaN(value) && this.isOperator(value)) {
            this.checkFloat();
            if (isNaN(this.lastOperation()) && this._operation.length > 0) {
                this._operation[this._operation.length - 1] = value;
            } else {
                if (this._operation.length != 0) {
                    this.operationPushValue(value);
                }
            }

        } else if (!isNaN(value) && !this._float) {
            if (this._operation.length == 0 || isNaN(this.lastOperation())) {
                // list is empty and last operation its not a number
                this.operationPushValue(value);
                this.displayCalc = value;
            } else {
                let val = this.lastOperation().toString() + value.toString();
                this._operation[this._operation.length - 1] = parseInt(val);
                this.displayCalc = val;
            }
        } else {
            if (value == ".") {
                if (isNaN(this.lastOperation())) {
                    this._floatNumber.push(0);
                    this._floatNumber.push(".");
                } else {
                    this._floatNumber.push(this._operation.pop());
                    this._floatNumber.push(".");
                }
            } else {
                this._floatNumber.push(value);
            }
            this.displayCalc = this._floatNumber.join("");
            console.log(this._floatNumber);
        }
        console.log(this._operation);
    }

    lastOperation() {
        return this._operation[this._operation.length - 1];
    }

    execBtn(value) {
        this._audio.currentTime = 0;
        this._audio.play();
        switch (value) {
            case "ac":
                this.clearAll();
                break
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                this.addOperation("+")
                break;
            case "multiplicacao":
                this.addOperation("*")
                break;
            case "subtracao":
                this.addOperation("-")
                break;
            case "divisao":
                this.addOperation("/")
                break;
            case "porcento":
                this.addOperation("%")
                break;
            case "igual":
                if (this._operation.length > 1) {
                    this.calculate(true)
                }
                break;
            case "ponto":
                this.addOperation(".")
                this._float = true
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
        }
    }

    initButtonEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach((btn) => {

            this.addEventListenerAll(btn, "click drag", e => {
                let text = btn.className.baseVal.replace("btn-", "");
                //this.displayCalc = text;
                this.execBtn(text);
            });

            this.addEventListenerAll(btn, "mouseover mouseup", e => {
                btn.style.cursor = "pointer";
            });
        })
    }

    initKeyboard() {
        document.addEventListener("keyup", e => {
            this._audio.currentTime = 0;
            this._audio.play();
            switch (e.key) {
                case "Escape":
                    this.clearAll();
                    break
                case "Backspace":
                    this.clearEntry();
                    break;
                case "+":
                case "-":
                case "*":
                case "/":
                case "%":
                    this.addOperation(e.key)
                    break;
                case "Enter":
                case "=":
                    if (this._operation.length > 1) {
                        this.calculate(true)
                    }
                    break;
                case ".":
                case ",":
                    this.addOperation(".")
                    this._float = true
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;
                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
            }
        });
    }


    get displayCalc() {
        return this._displaycalcEl.innerHTML;
    }

    set displayCalc(valor) {
        if (valor.toString().length <=10){
            this._displaycalcEl.innerHTML = valor;
        } else{
            this.clearAll();
        }        
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        return this._timeEl.innerHTML = value;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        return this._dateEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

}