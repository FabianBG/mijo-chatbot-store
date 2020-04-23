# MIJO chatbot store site manager

The app can create a store site with a simple base Gatsby template and deploy a static site all with a help of a Whatsapp chatbot. The chatbot can help you to all the process of update, manage products and recive orders all by Whatsapp.
The app controll just one site per number and do all the front end management and user validation using the Whatsapp validation number because the only way to create the store is the chatbot.
When the customer checkout in the store it sends a message (through the chatbot) to the owner telling him about the customer and his order.

## Tech Stack

The main stack is NodeJS because of the compatibility with Gatsby which is the static site generator for the stores. And has the SDK for Twilio for the chatbot (Autopilot) and messaging bus (Programable SMS). For the server and REST API manager the beloved ExpressJS.

## Quick start

Clone the repository and install all the dependencies:

```
// project_folder
npm i
```

Copy the enviroment variables and add your keys and configurations:

```
// project_folder
cp .env.example .env
// Customize .env file
```

- You need a Twilio account and the keys to connect to the chatbot. [https://www.twilio.com/]

- Use Ngrok to expose your app and integrate with Twilio

Run the project:

```
// project_folder
npm start
```

## Docker start

There is a docker image generated, so if you want to use the containerized version:

```
docker run -p3000:3000 -d --env-file [custom_file] https://hub.docker.com/repository/docker/fabianbg/mijo

```

- Create a env file with the vars on the .env.example for the docker container.

## Configure Twilio Autopilot and Programable SMS

First of all create an accout and get the account SID and AUTH TOKEN, and put on the .env file, then follow the next steps:

1. Configure Whatsapp Programable SMS sandbox [https://www.twilio.com/console/sms/whatsapp/learn].
2. Create an Autopilot chatbot [https://www.twilio.com/console/autopilot/list], and add the tasks on the _chatbot/twilio-tasks_ folder, adn replace the url with your app url, use Ngrok for a local development.
3. Bound the two services adding a Whatsapp channle on autopilot settings, whit this url provided configure Programable SMS Whatsapp _WHEN A MESSAGE COMES IN_ url.

## Project structure

```
/
    app                             # Expose the app and twilio endpoints
    images                          # Demostration of a sample images
    chatbot/twilio-tasks            # Contain the chatbot task configurations
    domain                          # Contains the domain logic of the app
    integration                     # Contains the twilio interation scripts
    public                          # Contains the static sites deployed on the app
    scripts                         # Set of scripts to create, build and manage Gatsby sites
    sites                           # Contains the source code of the clients Gatsby sites
    templates                       # Contains the Gatsby templates to create sites
    server.js                       # Entry point of the app
    sites-config.js                 # Dynamic configuration file to define app url for the Gatsby sites
```

## Screenshoots

Main page:

![MIJO site](https://github.com/FabianBG/mijo-chatbot-store/raw/develop/images/m1.png)

Create an store:

![create a store](https://github.com/FabianBG/mijo-chatbot-store/blob/develop/images/m2.png?raw=true)
![MIJO site with a store](https://github.com/FabianBG/mijo-chatbot-store/blob/develop/images/m6.png?raw=true)

Add a product and update the site:

![add a product](https://github.com/FabianBG/mijo-chatbot-store/blob/develop/images/m3.png?raw=true)
![update site](https://github.com/FabianBG/mijo-chatbot-store/blob/develop/images/m5.png?raw=true)

Generated site:

![store](https://github.com/FabianBG/mijo-chatbot-store/blob/develop/images/m7.png?raw=true)

Place an order:

![checkout](https://github.com/FabianBG/mijo-chatbot-store/blob/develop/images/m10.png?raw=true)
![contact info](https://github.com/FabianBG/mijo-chatbot-store/blob/develop/images/m11.png?raw=true)
![order message](https://github.com/FabianBG/mijo-chatbot-store/blob/develop/images/m13.png?raw=true)

## Licence

MIT
