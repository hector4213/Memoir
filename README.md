[![Netlify Status](https://api.netlify.com/api/v1/badges/722411af-e8cb-4f25-9305-8dea8d5ec017/deploy-status)](https://app.netlify.com/sites/memoirapp/deploys)![Heroku](https://pyheroku-badge.herokuapp.com/?app=memoirbackend&path=/api&style=plastic)

![Banner Image](./client/README_images/banner.png)

# Memoir

Discover a story. Share yours.

See deployed version here: [Memoir App](https://memoirapp.netlify.app/)

Have you ever heard the Story of someone's life and been amazed ? 

The experiences and hardships that they've had to go through to get to an inspiring place in their lives ?

It's these stories that inspired Memoir. A visual experience where you will be able to scroll through people's lives and see that life's Story is full of small entries.

Is there someone you know a lot about ? Are you a big fan of someone ? Share that story!

Users can share stories about their friends, loved ones, pets, anybody you love ! One account can have as many stories as you can think of. Users can also post entries about a memorable moment they had with that individual.

Since entries can be told in many ways, Memoir encourages you to post in many formats. Post an entry with a YouTube link of them, post a picture of your favorite trip with them, send them a love song from a SoundCloud embed or keep it simple with plain text.

Memoir was made to share, learn, and empathize with your fellow human beings. Start your own stories and discover someone else's.


## Table of contents

- [Table of contents](#table-of-contents)
- [Features](#features)
  - [Create a Story](#creating-a-story-on-memoir)
  - [Create an Entry](#create-an-entry)
  - [Posting an Entry](#posting-an-entry)
  - [Single View Entry](#single-view-entry)
  - [Inspired Button](#inspired-button)
  - [User Dashboard](#user-dashboard)
  - [Entry Management](#entry-management)
  - [Search](#search)
  - [Responsiveness](#responsiveness)
- [Frontend](#frontend)
  - [Some notes about the Front end](#some-notes-about-the-frontend)
  - [Usage and Installation](#usage-and-installation)
  - [Testing](#testing)
  - [Dependencies](#dependencies)
- [Backend](#backend)
  - [Notes About the Backend](#some-notes-about-the-backend)
  - [Prerequisites](#prerequisites)
  - [Usage and Installation](#usage-and-installation)
  - [Entity Relationship Diagram](#entity-relationship-diagram)
  - [Creating the Databases](#creating-databases)
  - [Setting your environment variables](#setting-your-environment-variables)
  - [Seeding your new database](#seeding-your-new-database)
  - [Authentication and Encryption](#authentication-and-encryption)
  - [Testing](#testing)
  - [Dependencies](#dependencies)

---

## Features

#### Home

User created stories are displayed in the front page

![Stories](./client/README_images/stories.png)

#### Creating a Story on Memoir

 _What is a Story?_

A story resembles a profile, a persons named is entered, a picture of them and their occupation. From there yourself or other users can add entries related to that user "story"

![Timeline](./client/README_images/timeline_main.png)

#### Create an entry

Entries are a unique feature that users can post to stories. An entry can have one of four formats. Plain text. Audio in the form of a SoundCloud embed link, video in the form of a Youtube link either directly copied from your browser, or from a share link. Entries are displayed in a chronological order, in a timeline From earliest to latest entry date. 

_An entry should have a format selected, a description  and date for submission. Tags are optional._

![Timeline](./client/README_images/timeline.png)

#### Posting an Entry

Memoir doesn't discriminate when users post an entry to a story, any user can post to any story. If the user is not original author of the story, the entry will not be visible until it is approved by the story author. This way we prevent malicious people from posting distasteful posts. Entries should somewhat pertain to the story is it posted to. For example, you could post an image of a dancing chicken to remind your friend he is not so good at doing the dougie.

Posting an entry also has the feature of adding tags! You can make your entries more memorable with adding tags to your entries. With tags in your entries, other users are able to find similar entries with Memoirs search functionality.

![Add Entry](./client/README_images/add_entry.png)

#### Single Entry View

Each entry in a story can be viewed on it's individual page. The single entry view shows a presentation mode , users are able to look through other entries for that particular story.

![View Entry](./client/README_images/view_entry.png)

#### Inspired Button

Each Story can be marked as **inspiring** to recommend to others

![Inspired Button](./client/README_images/inspired_button.png)

#### User Dashboard

Every user has a story dashboard. The dashboard enables users to see the stories they have created in addition to creating new ones. Additionally users in their dashboard can [manage foreign entries](#entry-management) that were not written by them.

![View Profile](./client/README_images/view_profile.png)

#### Entry Management

The dashboard view has a divided section showing entries the user has authored in their stories and entries that were written by other users. As mentioned previously if a user posts an entry to a story is not theirs, it will not be visible and they must wait until it is approved by the story author. Story authors have the ability to approved or deny entries to their stories, a new entry from a foreign user will always be marked pending in the dashboard for the story author.

![Approve Foreign Entries](./client/README_images/approve_foreign.png)

#### Search

Memoir has search functionality, where users can search either by tag, specific date or entry title. Memoir uses a fuzzy searching to find matching strings. Dates must be specific.

_i.e_ YYYY_MM_DD

![Search](./client/README_images/search.png)

#### Responsiveness

Memoir is responsive and mobile-friendly!.

![Mobile Friendly](./client/README_images/mobile_friendly.png)

## Frontend

| ![](https://img.icons8.com/color/344/javascript.png) | ![](https://cdn.iconscout.com/icon/free/png-256/react-3-1175109.png) | ![](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/386/square_256/redux.png) | ![](https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png) |
| ---------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |

### Some notes about the Frontend

The frontend is deployed on Netlify. Memoir uses a React frontend that uses Redux to store it's global state and Sass for styling.

### Usage and Installation

```
$ git clone https://github.com/hector4213/memoir.git (if you haven't already)
$ cd client
$ npm install
$ npm start
```

## Testing

| ![](https://miro.medium.com/max/7200/1*Jkb_tsMBOvL6wQ8bzldu8Q.png) | ![](https://cdn.worldvectorlogo.com/logos/storybook-1.svg) |
| ------------------------------------------------------------------ | ---------------------------------------------------------- |

Memoir uses Storybook to test the component User Interface and Cypress for end to end testing to make sure all core fearures are working.

To run Storybook

```
$ npm run storybook
```

To run Cypress

```
$ npm run cypress
```

### Dependencies

- sass
- redux
- redux-thunk
- react-redux
- react-router
- react-icons
- storybook
- cypress
- axios

## Backend

| ![](https://img.icons8.com/color/344/javascript.png) | ![](https://img.icons8.com/color/344/nodejs.png) | ![](https://img.icons8.com/color/344/postgreesql.png) | ![](https://img.icons8.com/nolan/344/heroku.png) |
| ---------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------ |

### Some notes about the Backend

The backend portion of this application is currently deployed on heroku so please be patient with the cold start time. For the Database, PostgreSQL is used along with [Objection.js](https://vincit.github.io/objection.js/), although Objection.js is most commonly known as an ORM, it would be more accurate to call it a a **relational query builder**. You get all the benefits of an SQL query builder but also a powerful set of tools for working with relations.

Objection.js is built on the SQL query builder [knex](https://github.com/knex/knex). All databases supported by knex are supported by Objection.js. SQLite3, Postgres and MySQL.

### Authentication and Encryption

Memoir uses [Jsonwebtokens](https://github.com/auth0/node-jsonwebtoken), for authentication and [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) for hashing passwords and storing it in the Database.

### Prerequisites

- PostgreSQL version 12.4^ download [here](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/en/download/) with npm

### Usage and Installation

    $ git clone https://github.com/hector4213/memoir.git (if you haven't already)
    $ cd server
    $ npm install
    $ npm run dev

### Entity Relationship Diagram

<img src=https://i.imgur.com/6UXIb3t.png />

### Creating Databases

You can either create databases using the command-line / terminal if using the terminal is not in your comfort zone,
use a GUI client such as [pgAdmin4](https://www.pgadmin.org/download/)

For more information on how to create databases using PostgreSQL see this [article](https://www.guru99.com/postgresql-create-database.html) with instructions on how to create databases using the GUI or terminal.

### Setting your environment variables

- See env.example for required environment variables

_Only one database is needed for the backend application to run, creating a second database for testing purposes is optional, but reccommended_

### Seeding your new database

Ensure you are in the /server directory and type

    $ knex migrate:latest

This command will create tables for the database, to seed the database type

    $ knex seed:run

To reset the database to its original application state type

    $ npm run resetdb

### Testing

| ![](https://github.com/mochajs/mocha/blob/master/assets/mocha-logo-192.png?raw=true) | ![](https://github.com/chaijs/chaijs.github.io/blob/master/img/chai-logo.png) |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |

To run tests type

    $ npm test

Memoir uses Mocha as a test runner and Chai for assertions.

### Dependencies

- bcrypt
- dotenv
- express
- jsonwebtoken
- knex
- morgan
- objection
- pg
- yup
