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
   git clone https://github.com/your-username/apollocodechallenge.git
   cd apollocodechallenge

2. Install the dependencies:
    ```bash
    npm install

3. Set up the PostgreSQL database

4. Update Pool configuration within server.js file to match local database:
    const pool = new Pool({
        user: 'your-username',
        host: 'localhost',
        database: 'vehicles_db',
        password: 'your-password',
        port: 5432,
    });

5. Start the server: 
    ```bash
    npm start

6. Run the tests: 
    ```bash
    npm test
