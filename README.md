### README.md

# Academic Certificate Verification System

This project provides a comprehensive solution for issuing and verifying academic certificates using blockchain technology. The system comprises a client-side application built with Angular and a server-side API developed with Node.js and Express. The smart contract is deployed on the Ethereum Sepolia test network using Hardhat.

## Getting Started

Follow these instructions to get your project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- Angular CLI
- Hardhat (for interacting with Ethereum smart contracts)
- Docker (optional, for running PostgreSQL in a container)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://your-repository-url.git
   cd acv
   ```

2. **Smart Contract Interaction:**

   On the `acv` folder. Assuming the smart contract is already deployed, configure Hardhat to connect to the Sepolia test network:

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

   Ensure the `hardhat.config.js` is configured for the Sepolia network with the appropriate API keys and account information.

3. **Set up the Server:**

   Navigate to the `server` directory, install dependencies, and start the server:

   ```bash
   cd server
   npm install
   npm start
   ```

4. **Set up the Client:**

   In a new terminal window, navigate to the `client/` directory, install dependencies, and start the Angular application:

   ```bash
   cd client/
   npm install
   ng serve
   ```

   Access the application by navigating to `http://localhost:4200/` in your web browser.

### Testing

Use the provided Postman collection to test the API endpoints:

[Postman Collection](https://documenter.getpostman.com/view/11604430/2sA3QsBXqC)

### Docker Setup for PostgreSQL

If you are using Docker to run PostgreSQL, run the following command:

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

Then, connect to your PostgreSQL instance from your application using the connection string provided in your `.env` configuration.

### Usage

- **Register Institutions and Students**: Use the client-side forms to register institutions and students.
- **Issue and Revoke Certificates**: Institutions can issue and revoke certificates through the client interface.
- **Verify Certificates**: Use the verify link to check the validity of issued certificates.

### API Documentation

For detailed information about the API endpoints, refer to the Postman documentation.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

