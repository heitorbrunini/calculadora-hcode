class CalcControler {

    constructor() {

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

    initButtonEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach((btn, index) => {
            btn.addEventListener("click", e => {
                console.log(btn.className.baseVal.replace("btn-",""))
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