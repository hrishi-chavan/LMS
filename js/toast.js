class Toast extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      
      // Styles for the Toast component
      const style = `
        .toast {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          margin-bottom: 10px;
          border-radius: 5px;
          color: white;
          font-size: 14px;
          min-width: 200px;
          transition: opacity 0.5s ease-out;
        }
  
        .toast.success {
          background-color: #4caf50;
        }
  
        .toast.error {
          background-color: #f44336;
        }
  
        .toast .close-btn {
          background: transparent;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
        }
      `;
  
      // Toast HTML structure
      const containerHTML = `
        <div id="container"></div>
      `;
  
      // Append styles and HTML template to shadow DOM
      this.shadowRoot.innerHTML = `
        <style>${style}</style>
        ${containerHTML}
      `;
    }
  
    connectedCallback() {
        // Listen for the login-success event from the custom login form
        document.querySelector('*').addEventListener('toast-show', function(event) {
            const { msg, type } = event.detail;
            const toastComponent = document.querySelector('toast-notification');
            toastComponent.showToast(msg, type);
        });
    }
    
    // Function to show a toast
    showToast(message, type) {
      const toastContainer = this.shadowRoot.querySelector('#container');
  
      const toast = document.createElement('div');
      toast.classList.add('toast', type);
    
      toast.textContent = message;
  
      // Create a close button for the toast
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('close-btn');
      closeBtn.innerHTML = '&times;';
      closeBtn.onclick = () => toast.remove();
  
      // Append close button to the toast
      toast.appendChild(closeBtn);
  
      // Append the toast to the container
      toastContainer.appendChild(toast);
  
      // Remove the toast after 5 seconds
      setTimeout(() => {
        toast.remove();
      }, 5000);
    }
  }
  
  // Define the custom element for the Toast component
  customElements.define('toast-notification', Toast);
  