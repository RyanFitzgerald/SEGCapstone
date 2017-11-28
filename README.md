# SEGCapstone

This repo contains the code for the 2017 SEG4910 / SEG4911 project by Ryan Fitzgerald, Cody McCoshen, and David Ganim. It was built with React, Node, Express, and MongoDB.

## Setup Instructions

In order to setup, clone or fork the repo and run `npm install` to install all the required dependencies in the root. You must also run `npm install` under the `client` directory. You will need to then create a `variables.env` file with the required credentials and keys. See `variables.env.example` to see necessary fields. Finally, run `npm run watch` from the root in order to concurrently run the Node developement server and the client React server.

If you wish to run automated tests, run `npm test` from the root and client footer, respectively.

For full technical documentation of the system, [click here](https://github.com/RyanFitzgerald/SEGCapstone/wiki/System-Documentation).

## Test Data

If you need to populate a database with test data, first run `npm run data:remove` from the root to ensure no duplicates exist (NOTE: this will remove ALL data in the database), followed by `npm run data:add`. Since these commands clear the database of all data, it should only be run for testing purposes and not in a production environment.

## Test Accounts
*Here are several test accounts:*

email: david@example.com
password: david

email: ryan@example.com
password: ryan

email: cody@example.com
password: cody

email: admin@example.com
password: admin

Also a set of users 1-20.
For UserN where 21 > N > 0:

email: userN@example.com
password: user

## Additional Content

### [Development](https://github.com/RyanFitzgerald/SEGCapstone/wiki/Development)

This page is the landing page for everything relating to how we manage development, including development environments and our development processes. 

### [Architecture](https://github.com/RyanFitzgerald/SEGCapstone/wiki/Architecture)

This page is the landing page for everything relating to the architecture of our system, including the database schema and general architecture overview / breakdown.

### [Project](https://github.com/RyanFitzgerald/SEGCapstone/wiki/Project)

This page is the landing page for everything to administration documents for the course and the project, including the project plan, proposal, and important links.

### [System Design Interaction Examples](https://github.com/RyanFitzgerald/SEGCapstone/wiki/System-Design-Interaction-Examples)

This page contains a number of hand-picked system design interaction examples to better understand how data flows through the system.

### [User Manual](https://github.com/RyanFitzgerald/SEGCapstone/wiki/User-Manual)

This page contains the user manual that briefly explains how the system works and how to get the most effective use out of it. This is meant for the customer and any employees who may be using the system.

### [Reports](https://github.com/RyanFitzgerald/SEGCapstone/wiki/Reports)

This page is the landing page for all reports, including the quality assurance report and the impact assessment report.

### [System Documentation](https://github.com/RyanFitzgerald/SEGCapstone/wiki/System-Documentation)

This page is the landing page for all system documentation, including server-side documentation, client-side documentation, and deployment documentation.

### [Project Summary](https://github.com/RyanFitzgerald/SEGCapstone/wiki/Project-Summary)

This page includes the general project summary as well as a number of lessons learned along the way.

### [Member Contributions](https://github.com/RyanFitzgerald/SEGCapstone/wiki/Member-Contributions)

This page contains a list of the team members and their respective contributions to the project over the course of the two semesters.
