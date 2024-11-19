# Apollo Code Challenge
Simple web service providing CRUD-style API access to a DBMS.

--

## Technologies Used
- **Backend Framework**: Node.js with Express
- **Database**: PostgreSQL
- **Testing**: Mocha, Chai, and Chai HTTP

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/VarijaM/apollocodechallenge.git
   cd apollocodechallenge

2. Install the dependencies:
    ```bash
    npm install

3. Set up the PostgreSQL database
    - Create a new database named vehicles_db
    - Execute the following SQL code to create the Vehicle table
    ```bash
    CREATE TABLE Vehicle (
        vin VARCHAR(17) PRIMARY KEY,
        manufacturer_name VARCHAR(100) NOT NULL,
        description TEXT,
        horse_power INT,
        model_name VARCHAR(100) NOT NULL,
        model_year INT NOT NULL,
        purchase_price DECIMAL(10, 2) NOT NULL,
        fuel_type VARCHAR(50) NOT NULL
    );


4. Update Pool configuration within server.js file to match local database:
    ```bash
    const pool = new Pool({
        user: 'enter-your-username',
        host: 'localhost',
        database: 'vehicles_db',
        password: 'enter-your-password',
        port: 5432,
    });

5. Start the server: 
    ```bash
    npm start

6. Run the tests: 
    ```bash
    npm test
