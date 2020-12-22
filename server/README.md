## Backend

<table>
<tbody>

<tr>
<td align="center" width="20%">
<span><b><center></center></b></span>
<img height=140px width="140" src="https://img.icons8.com/color/344/javascript.png"/>
</td>

<td align="center" width="20%">
<span><b><center></center></b></span> 
<img height=140px width="140" src="https://img.icons8.com/color/344/nodejs.png"/>
</td>

<td align="center" width="20%">
<span><b><center></center></b></span> 
<img height=140px width="140" src="https://img.icons8.com/color/344/postgreesql.png"/>
</td>

<td align="center" width="20%">
<span><b><center></center></b></span> 
<img height=140px width="140" src="https://img.icons8.com/nolan/344/heroku.png"/>
</td>

</tr>

</tbody>
</table>

### Some notes about the backend

### Prerequisites

- PostgreSQL version 12.4^ download [here](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/en/download/) with npm

### Entity Relationship Diagram

<img src=https://i.imgur.com/6UXIb3t.png />

### Usage and Installation

    $ git clone https://github.com/hector4213/memoir.git (if you haven't already)
    $ cd server
    $ npm install
    $ npm run dev

### Creating Databases

You can either create databases using the command-line / terminal if using the terminal is not in your comfort zone,
use a GUI client such as [pgAdmin4](https://www.pgadmin.org/download/)

For more information on how to create databases using PostgreSQL see this [article](https://www.guru99.com/postgresql-create-database.html) with instructions on how to create databases using the GUI or terminal.

### Setting your environment variables

- See env.example for required environment variables

_Only one database is needed for the backend application to run, creating a second database for testing is optional, but reccommended_

### Seeding your new database

Ensure you are in the /server directory and type

    $ knex migrate:latest

This command will create tables for the database, to seed the database type

    $ knex seed:run

To reset the database to its original application state type

    $ npm run resetdb

### Testing

<table>
<tbody>

<tr>
<td align="center" width="20%">
<span><b><center></center></b></span>
<img height=140px width="280" src="https://w7.pngwing.com/pngs/794/590/png-transparent-javascript-test-driven-development-mocha-react-jasmine-onsen-text-logo-nodejs.png/>
</td>

</tr>

</tbody>
</table>

To run tests type

    $ npm test

Memoir uses Mocha as a test runner and Chai for assertions.

### Dependencies

- Node.js
- PostgreSQL
- Objection.js
- knex.js
- Jsonwebtokens
- bcrypt
- Mocha
- Chai
