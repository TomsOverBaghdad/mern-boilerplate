# MERN Boilerplate
Some boilerplate code to jumpstart app creation. This is a work in progress and any help is welcome!

## Our Setup

To make managing and deploying our frontend backend and any shared code between them easy, we use [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

In brief, we have a package.json to manage the repo as a hole and each folder has its own package.json to manage itself as a project.

Make sure to have yarn installed:

```bash
curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.22.4
```

### Database

We use MongoDB: Atlas as our databse and database management tool.

For local use you'll need to install homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Then go to [Mongo's homebrew page](https://github.com/mongodb/homebrew-brew) and follow instructions for latest available.

Follow the instructions for `Run mongod as a service`.

### Server

Our server is a simple expressJs app. We use passport to help manage sessions.

### Client

We use a variant of Facebook's create-react-app called [craco](https://github.com/gsoft-inc/craco) which lets us have a bit more control over configuration.

We also use [Ant Design](https://ant.design/components/overview/) as our component library. This lets us get started quicker since we don't have to worry (as much) about how our elements look. They provide basic components that we compose and build around.

## Development

Once you have node, yarn, homebrew, and the mongo package installed...

Clone locally and install dependencies:

```bash
git clone git@github.com:TomsOverBaghdad/pavo.git
cd pavo
yarn
```

To run both our server and client on the same terminal:
```bash
cd ~/pavo
yarn start:both
```

You'll most likely get an error.

Make sure you get a copy of our `.env` files from another dev. These are secret files and should be handled as such. We **never** push this in our git repo. This can include passwords, private ssh keys, your mom's cell number...


Don't worry about restarting the servers. When you change your code, both will hot refresh.

Sometimes we want to start each one on separate terminals or only want to test the server. To just start one go to that subdirectory `server|client` and run the `yarn start` command.

## Managing Dependencies

If you find a cool library and you want to use it so we dont have to write a bunch more code...

**Do Not Use** `npm install` !!

Go to the project folder that wants to use the dependency and use yarn to install the dependency there.

```bash
cd <client|server|shared|some-other>
yarn <dependency_name>
```

Sometimes if there's an issue, you may need to also do `yarn` from the project direcotry level.

```bash
cd ~/pavo
yarn
```
