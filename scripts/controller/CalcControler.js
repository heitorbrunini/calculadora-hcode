class CalcControler {

    constructor() {

        //document.getElementById("display")
        this._displaycalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this._displayCalc = "0";
        this.initialize();

    };

    initialize() {
        setInterval(() => {
            this.displayDate = this.currentDate.toLocaleDateString("pt-BR");
            this.displayTime = this.currentDate.toLocaleTimeString("pt-BR");
        }, 1000 );

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

    get currentDate(){
        return new Date();
    }

}