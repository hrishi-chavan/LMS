class LoginPage extends HTMLElement {
    constructor() {
      super();
  
      // Attach a shadow DOM to the component
      const shadow = this.attachShadow({mode: 'open'});
  
      // HTML structure for the login form
      const formHTML = `
        <div class="login-box">
          <h2>Login</h2>
          <form id="loginForm">
            <div class="textbox">
              <input type="text" placeholder="Email / User ID" name="email" id="email" required>
            </div>
            <div class="textbox">
              <input type="password" placeholder="Password" name="password" id="password" required>
            </div>
            <button type="submit" class="btn">Log In</button>
          </form>
        </div>
      `;
  
      // CSS styles for the login form
      const style = `
        /* Login Box */
        .login-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        width: 73%;
        }

        h2 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #333;
        }

        /* Textbox Styling */
        .textbox {
        margin-bottom: 20px;
        position: relative;
        }

        .textbox input {
        width: calc(100% - 24px);
        padding: 12px;
        font-size: 16px;
        border: 2px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3s;
        }

        .textbox input:focus {
        border-color: #1976d2;
        }

        /* Button */
        .btn {
        background-color: #1976d2;
        color: white;
        padding: 12px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.3s;
        }

        .btn:hover {
        background-color: #1565c0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
        .login-box {
            padding: 30px;
        }
        h2 {
            font-size: 22px;
        }
        }

        @media (max-width: 480px) {
        .login-box {
            padding: 20px;
        }
        h2 {
            font-size: 20px;
        }
        .textbox input {
            padding: 10px;
            width: calc(100% - 24px);
        }
        .btn {
            font-size: 14px;
            padding: 10px;
        }
        }
      `;
  
      // Append the template and styles to the shadow DOM
      shadow.innerHTML = `
        <style>${style}</style>
        ${formHTML}
      `;
    }

    // When the component is connected to the DOM
    connectedCallback() {
      // Form submission logic
      this.form = this.shadowRoot.querySelector("#loginForm");
      this.form.addEventListener('submit', this.handleSubmit.bind(this));

      if(localStorage.getItem("email") &&  localStorage.getItem("password")){
        this.login(localStorage.getItem("email"), localStorage.getItem("password"));
      }
    }
  
    handleSubmit(event) {
      event.preventDefault();
  
      const email = this.shadowRoot.querySelector("#email").value;
      const password = this.shadowRoot.querySelector("#password").value;

      this.login(email, password);
    }

    login(email, password){
      if (email === "" || password === "") {
        alert("Please fill out both fields.");
        return;
      }
  
      // You can handle login here (e.g., validate against a database, call an API, etc.)
      // For demonstration purposes, let's log the email and password to the console
      //console.log("Email:", email);
      //console.log("Password:", password);

      if(email == "Test" && password == "test@123"){
        // You can redirect or show a success message after successful login
        //showToast("Login successful!", "success");
        this.dispatchEvent(new CustomEvent('toast-show', {
            detail: { msg : "Login successful!!!", type : "success" },
            bubbles: true,
            composed: true
          }));
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          window.location.hash = 'home';
      }
      else {
        // You can redirect or show a success message after successful login
        this.dispatchEvent(new CustomEvent('toast-show', {
            detail: { msg : "Invalid credentials.", type : "error" },
            bubbles: true,
            composed: true
          })); 
      }
      this.form.reset(); // Reset form fields after submission
    }
  }
  
  // Define the custom element
  customElements.define('login-page', LoginPage);
  