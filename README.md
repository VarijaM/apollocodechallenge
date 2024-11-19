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
