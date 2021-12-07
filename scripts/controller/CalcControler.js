class CalcControler {

    print(value) {
        console.log(value);
    }
    constructor() {
        this._operation = [];
        //document.getElementById("display")
        this._displaycalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this._displayCalc = "0";
        this.initButtonEvents();
        this.initialize();

    };

    initialize() {
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
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
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

    calculate(clear) {

        if (!clear) {
            let last = this._operation.pop();
            let result = eval(this._operation.join(""));
            this._operation = [result, last];
        } else if (clear) {
            this.displayCalc = eval(this._operation.join(""));
            this._operation = []
        }

    }

    addOperation(value) {
        if (isNaN(value)) {
            if (isNaN(this.lastOperation()) && this._operation.length > 0) {
                if (this.isOperator(value)) {
                    this._operation[this._operation.length - 1] = value;
                } else {
                    console.log(".");
                }
            } else {
                if (this._operation.length != 0) {
                    this.operationPushValue(value);
                }
            }
        } else {
            if (this._operation.length == 0 || isNaN(this.lastOperation())) {
                this.operationPushValue(value);
                this.displayCalc = value;
            } else {
                let val = this.lastOperation().toString() + value.toString();
                this._operation[this._operation.length - 1] = parseInt(val);
                this.displayCalc = val;
            }//atualizar display

        }
        console.log(this._operation);
    }

    lastOperation() {
        return this._operation[this._operation.length - 1];
    }

    execBtn(value) {
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
                if (this._operation.length > 0) {
                    this.calculate(true)
                } else {
                    this.displayCalc = ""
                }
                break;
            case "ponto":

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


    get displayCalc() {
        return this._displaycalcEl.innerHTML;
    }

    set displayCalc(valor) {
        this._displaycalcEl.innerHTML = valor;
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