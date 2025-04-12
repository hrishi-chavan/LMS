class CustomerCard extends HTMLElement {
    constructor() {
      super();
      // Attach shadow DOM to the component
      const shadow = this.attachShadow({ mode: 'open' });

      // Initial structure of customer card
      const formHTML = `<div class="customer-card">
         <div class="card-body">
         <div>
          <h2 class="name">Loading...</h2>
          <p class="email">Email: Loading...</p>
          <p class="phone">Phone: Loading...</p>
          </div>
          <div class="card-actions">
          <!--<button class="delete-btn">Delete</button>-->
          <button class="edit-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg> Call
          </button>
          </div>
          </div>
        </div>
      `;

      // CSS styles for the login form
      const style = `
        /* Card */
        .customer-card {
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-in-out;
        }

        .customer-card:hover {
        transform: translateY(-5px);
        }

        .card-image {
        width: 100%;
        height: 150px;
        object-fit: cover;
        }

        .card-body {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        }

        .card-body h2 {
        font-size: 20px;
        margin-bottom: 0px;
        margin-top: 0px;
        }

        .card-body p {
        font-size: 14px;
        margin-bottom: 8px;
        }

        .card-actions {
        display: flex;
        justify-content: space-between;
        /* margin-top: 15px; */
        }

        .card-actions button {
        padding: 8px 16px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        }

        .edit-btn {
        background-color: #4caf50;
        color: white;
        }

        .edit-btn:hover {
        background-color: #45a049;
        }

        .delete-btn {
        background-color: #f44336;
        color: white;
        }

        .delete-btn:hover {
        background-color: #e53935;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
        header {
            flex-direction: column;
            align-items: flex-start;
        }

        .add-customer-btn {
            width: 100%;
            margin-top: 10px;
        }

        .card-list {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }

        .card-body h3 {
            font-size: 18px;
        }

        .card-body p {
            font-size: 13px;
        }
        }

        @media (max-width: 480px) {
        .add-customer-btn {
            padding: 8px 16px;
            font-size: 14px;
        }

        .card-body h3 {
            font-size: 16px;
        }

        .card-body p {
            font-size: 12px;
        }
        }
      `;
  
      // Append the template and styles to the shadow DOM
      shadow.innerHTML = `
        <style>${style}</style>
        ${formHTML}
      `;
    }

    // Method to update the data when customer data is set
    set customerData(data) {
      this._customerData = data;
      this.updateUI();
    }

    get customerData() {
      return this._customerData;
    }

    // Method to update the UI
    updateUI() {
      if (this._customerData) {
        this.shadowRoot.querySelector('.name').textContent = this._customerData.name;
        this.shadowRoot.querySelector('.email').textContent = `Email: ${maskPhoneNumber(this._customerData.email, 4, 10)}`;
        this.shadowRoot.querySelector('.phone').textContent = `Phone: ${maskPhoneNumber(this._customerData.phone)}`;
      }
    }

    // Method to handle edit button click
    handleCallClick() {   
        window.location.hash = `callerid?m=${this._customerData.phone}`;
    }

    // When the component is connected to the DOM
    connectedCallback() {
      this.shadowRoot.querySelector('.edit-btn').addEventListener('click', () => this.handleCallClick());
      //this.shadowRoot.querySelector('.delete-btn').addEventListener('click', () => this.handleDeleteClick());
    }
  }

  // Register the custom element
  customElements.define('customer-card', CustomerCard);

  class DashboardPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const formHTML = `<div class="main-content">
    <div class="card">
        <h3>Hi, <b>Ravi Kumar</b></h3>
        <div class="stat">Total Calls: 120</div>
        <div class="stat">Total In-Calls: 70</div>
        <div class="stat">Total Out-Calls: 50</div>
        <div class="stat">Total Call Duration: 6hr 30minutes</div>
        <div class="stat">Avg. Call Duration: 4min 30sec</div>
    </div>
</div>`;
        const style = `
        .card {
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        .card h3 {
            margin-top: 0;
        }
        .card .stat {
            font-size: 14px;
            font-weight: bold;
        }
        .call-log-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .call-log-table th, .call-log-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .call-log-table th {
            background-color: #f2f2f2;
        }`;

        this.shadowRoot.innerHTML = `
      <style>${style}</style>
      ${formHTML}`
    }
  }

  customElements.define('dashboard-page', DashboardPage);

  // Customer List Component
  class HomePage extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      const style = `/* Card List */
        .customer-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 10px;
        }`
        const formHTML = `<dashboard-page></dashboard-page>
        <div class="customer-list"></div>`;
      this.shadowRoot.innerHTML = `
      <style>${style}</style>
      ${formHTML}
    `;

    this.customers = customer_data;

    }

    // Set customer list data
    set customers(data) {
      this._customers = data;
      this.render();
    }

    // Render customer cards
    render() {
      const customerListContainer = this.shadowRoot.querySelector('.customer-list');
      customerListContainer.innerHTML = ''; // Clear previous content

      // Loop through each customer and create a customer-card element
      this._customers.forEach(customer => {
        const customerCard = document.createElement('customer-card');
        customerCard.customerData = customer;
        customerListContainer.appendChild(customerCard);
      });
    }
  }

  // Register the customer-list element
  customElements.define('home-page', HomePage);
  