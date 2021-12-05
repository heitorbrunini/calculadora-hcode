class CalcControler {

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

    addOperation(operation) {
        this._operation.push(operation);
    }

    lastOperation(){
        return this._operation[_operation.length - 1];
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
                break;
            case "multiplicacao":
                break;
            case "subtracao":
                break;
            case "divisao":
                break;
            case "porcento":
                break;
            case "igual":
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
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                let text = btn.className.baseVal.replace("btn-", "");
                this.displayCalc = text;
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