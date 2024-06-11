# BacknSport Backend

## Description

The BacknSport backend is a Node.js application built to support the Combos TV soccer watch app. It provides the necessary APIs to fetch live soccer match data from various leagues and tournaments, as well as manage user preferences and authentication.

## Dependencies

- **axios**: ^1.2.2
- **dotenv**: ^16.0.3
- **express**: ^4.18.2
- **form-data**: ^4.0.0
- **mysql2**: ^2.3.3
- **node-media-server**: ^2.4.9
- **nodemon**: ^2.0.20
- **nyc**: ^15.1.0
- **sequelize**: ^6.28.0
- **supertest**: ^6.3.3
- **unit.js**: ^2.1.1

## Features

- **API Endpoints**: Provides endpoints to fetch live match data, manage user preferences, and handle authentication.
- **Integration with MySQL Database**: Uses Sequelize ORM to interact with a MySQL database for data storage.
- **Media Streaming Support**: Utilizes node-media-server for media streaming functionality.

## Usage

1. Install Node.js and npm.
2. Clone the repository.
3. Run `npm install` to install dependencies.
4. Set up a MySQL database and configure the `.env` file with the database connection details.
5. Run `npm start` to start the server.

## Development

- **Testing**: Unit tests are implemented using Mocha and Supertest.
- **Continuous Integration**: Utilizes NYC for code coverage and integration with CI/CD pipelines.

## Contributions

Contributions are welcome. Feel free to open a pull request or submit an issue for any feature enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
