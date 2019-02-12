# Travel Time System

## Project Description
Web application to visualize the travel time over a period between preselected intersections.

# Table of Contents

1. [Getting Started](#gettingStarted)
2. [Prerequisites](#Prerequisites)
3. [Usage](#usage)
4. [Authors](#authors)
5. [License](#license)

## Getting Started <a name="gettingStarted"></a>
To get a copy of the project running on your local machine for development and testing purposes you will need to clone the repository into a brand new folder on your machine and navigate to the backend folder and run:
```
npm install
```
Then navigate to frontend folder then navigate to the client folder and run:
```
npm install
```
After all the dependancies are downloaded ensure that you have MariaDB service up and running and create a database named **timetravelsystem**. This can be changed in the config.json file inside the server folder. From the backend folder, you need to enter the db folder and run the following commands to init the database and add the migrations and the seeds:
```
cd db/   (to change to the db folder)
../node_modules/.bin/sequelize db:migrate
../node_modules/.bin/sequelize db:seed:all
cd ..  (to change back to the root folder)
```
To run the backend server, open git bash from the folder **server**  and use the command:
```
npm run start
```
Now it's time to run the frontend. Navigate to **client** folder and in the terminal use the command:
```
ng serve -o
```
This will open your default browser. The app will be running on port 4200.
Please esnure that both the backend server and the frontend are running.
Voalá!!
## Prerequisites <a name ="Prerequisites"></a>

The only mandatory requirement for installing the project is [Node Js](https://nodejs.org/dist/v8.11.1/node-v8.11.1-x64.msi). The rest of the dependancies are installed via the command:

```
npm install
```
in the respective folders frontend and backend.

## Usage <a name ="Usage"></a>
==NB: Normally codes such as environment variables, API Keys, database passwords etc would not be uploaded to github, however as this is a final project for a course and may need to be scored remotely, we have left the information visible to everyone==




## Authors<a name ="authors"></a>

Osman Yumer   - [o.yumer](https://gitlab.com/o.yumer) 

Stefka Marinova - [jibonita](https://gitlab.com/jibonita)

## License<a name ="license"></a>

This project is licensed under the MIT License

  

Copyright 2019

  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Trello to manage tasks
[travel-time-system](https://trello.com/b/uFogqGci/travel-time-system)