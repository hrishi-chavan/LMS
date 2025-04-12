class CallerIdPage extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      
      // Styles for the component
      const style = `
      .textbox {
        margin-bottom: 20px;
        position: relative;
        }

        .textbox input, .textbox textarea, .textbox select {
        width: calc(100% - 24px);
        padding: 12px;
        font-size: 16px;
        border: 2px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3s;
        }

        .textbox input:focus, .textbox textarea:focus, .textbox select:focus {
        border-color: #1976d2;
        }

        .card-actions {
        display: flex;
        justify-content: space-between;
        }

        .card-actions button {
        padding: 8px 16px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        display: inline-flex;
        width: 150px;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        }

        .card-actions button > svg  {
        width: 20px;
    margin-right: 8px;
    }

        .answer-btn {
        background-color: #4caf50;
        color: white;
        }

        .answer-btn:hover {
        background-color: #45a049;
        }

        .hangup-btn {
        background-color: #f44336;
        color: white;
        }

        .hangup-btn:hover {
        background-color: #e53935;
        }

        .submit-btn {
          background-color: #1976d2;
          color: white;
      }
        .call_status_container{
            background-color: #e53935;
            color : #FFF;
            text-align : center;
            display : none;
        }
        .call_status_container #call_status{
            padding: 10px;
            margin: 0px;
            font-weight : 900;
        }
            #timer{
            display : none;
            }
      `;
  
      // HTML structure
      const containerHTML = `
      <div class="call_status_container">
        <p id="call_status"></p>
        <div id="timer">00:00:00</div>
      </div>
      <div class="customer-card">
         <div class="card-body">
         <div>
          <form id="form">
            <div class="textbox">
              <lable>Customer Name</lable>
              <input type="text" id="name" required>
            </div>
            <div class="textbox">
              <lable>Customer Phone</lable>
              <input type="text" id="phone" disabled>
            </div>
            <div class="textbox">
              <lable>Disposition</lable>
              <select id="disposition">
                <option value="1">Connected</option>
                <option value="2">Not Connected</option>
              </select>
            </div>
            <div class="textbox">
              <lable>Sub Disposition</lable>
              <select id="disposition">
                <option>Interested</option>
                <option>Not Interested</option>
                <option>Follow Up</option>
              </select>
            </div>
            <div class="textbox">
              <lable>Remarks</lable>
              <textarea id="phone"></textarea>
            </div>
          </form>
          </div>
          <div class="card-actions">
          
          <button class="answer-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z"/></svg>
          Answer
          </button>
          <button class="hangup-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M228.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C76.1 30.2 64 46 64 64c0 107.4 37.8 206 100.8 283.1L9.2 469.1c-10.4 8.2-12.3 23.3-4.1 33.7s23.3 12.3 33.7 4.1l592-464c10.4-8.2 12.3-23.3 4.1-33.7s-23.3-12.3-33.7-4.1L253 278c-17.8-21.5-32.9-45.2-45-70.7L257.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96zm96.8 319l-91.3 72C310.7 476 407.1 512 512 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L368.7 368c-15-7.1-29.3-15.2-43-24.3z"/></svg>
          Hang-Up
          </button>
          <button class="submit-btn">
          Submit
          </button>
          </div>
          </div>
        </div>
      
      `;
  
      // Append styles and HTML template to shadow DOM
      this.shadowRoot.innerHTML = `
        <style>${style}</style>
        ${containerHTML}
      `;
    }

    set callStatus(data) {
        this._callStatus = data;
        this.updateCallStatus();
    }
  
    get callStatus() {
        return this._callStatus ?? localStorage.getItem("initCallState");
    }

    get callDirection() {
      return queryString().d;
    }

    get mobile() {
      return queryString().m;
    }

    get isDialerAvailable() {
      return window.Flutter !== undefined;
    }

    set timerInterval(data) {
      this._timerInterval  = data;
  }

  get timerInterval() {
      return this._timerInterval;
  }

    startTimer(){
      let elapsedTime = 0; // Elapsed time in seconds
      let timerDisplay = this.shadowRoot.querySelector("#timer");
      timerDisplay.style.display = "inline-block";
      this.timerInterval = setInterval(() => {
        let hours = Math.floor(elapsedTime / 3600);  // Calculate hours
      let minutes = Math.floor((elapsedTime % 3600) / 60); // Calculate minutes
      let seconds = elapsedTime % 60; // Calculate seconds

      // Add leading zero if hours, minutes, or seconds are less than 10
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // Display the formatted time
      timerDisplay.textContent = hours + ":" + minutes + ":" + seconds;

      // Increment elapsed time by 1 second
      elapsedTime++;
      }, 1000);
    }

    stopTimer(){
      clearInterval(this.timerInterval);
    }

    bindEvent(){
      let btnAnswer = this.shadowRoot.querySelector(".answer-btn");
      let btnHangUp = this.shadowRoot.querySelector(".hangup-btn");
      let btnSubmit = this.shadowRoot.querySelector(".submit-btn");

      btnAnswer.addEventListener('click', () => this.handleClick("answer"));
      btnHangUp.addEventListener('click', () => this.handleClick("hangup"));
      btnSubmit.addEventListener('click', () => this.gotoHome());
    }

    bindData(){
      let lead = customer_data.find(o => o.phone === this.mobile);
        
        let txtname = this.shadowRoot.querySelector('#name');
        txtname.value = lead ? lead.name : "";
    
        let txtmobile = this.shadowRoot.querySelector('#phone');
        txtmobile.value = maskPhoneNumber(lead ? lead.phone : mobile);
    }

    updateCallStatus(){
      let lblCallStatus = this.shadowRoot.querySelector('#call_status');
      if(this.isDialerAvailable){
          lblCallStatus.textContent = this.callStatus;
      }
      else{
        lblCallStatus.style.display = "none";
      }
      localStorage.removeItem("initCallState");
      this.updateCallAction();
    }

    handleClick(action){
      window.Flutter.postMessage(`{"method" : "${action}", "mobile" : ""}`);
    }

    gotoHome(){
      window.location.hash = `home`;
    }

    updateCallAction(){
      let btnAnswer = this.shadowRoot.querySelector(".answer-btn");
      let btnHangUp = this.shadowRoot.querySelector(".hangup-btn");
      let btnSubmit = this.shadowRoot.querySelector(".submit-btn");

      btnAnswer.style.visibility = "hidden";
      btnHangUp.style.display = "none";
      if(!this.isDialerAvailable){
          //btnAnswer.style.visibility = "hidden";
          //btnHangUp.style.display = "none";
      }
      else {
        if (this.callStatus === "Ringing") {
          //btnAnswer.style.removeProperty('visibility');
          //btnHangUp.style.removeProperty('display');
          //btnSubmit.style.display = "none"; 
        }
        else if (this.callStatus === "Active") {
            //btnAnswer.style.visibility = "hidden";
            btnSubmit.style.display = "none"; 
            this.startTimer();
        }
        else if(this.callStatus === "Disconnected"){
            //btnAnswer.style.visibility = "hidden";
            //btnHangUp.style.display = "none";            
            btnSubmit.style.removeProperty('display');
            this.stopTimer();
        }
      }
    }
  
    connectedCallback() {
      this.bindEvent();
        this.bindData();
        this.updateCallStatus();
        
        if(!this.isDialerAvailable){
          this.dispatchEvent(new CustomEvent('toast-show', {
            detail: { msg : "Unable to call.", type : "error" }, bubbles: true, composed: true
          }));
        }
        else if((!this.callDirection || this.callDirection !== "in") && this.isDialerAvailable){
          window.Flutter.postMessage(`{"method" : "call", "mobile" : "${this.mobile}"}`);
        }
        
        // let btnAnswer = document.getElementById("btnAnswer");
        // if (callDirection == "incoming") {
        //     // Show the element
        //     btnAnswer.style.display = "block"; // Or "inline", depending on your layout
        // } else {
        //     // Hide the element
        //     btnAnswer.style.display = "none";
        // }
        // var _modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
        // _modal.show();
    }
  }
  
  // Define the custom element for the Toast component
  customElements.define('callerid-page', CallerIdPage);
  