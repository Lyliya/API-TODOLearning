# Basic TODO Api Project

This API is created to help in my journey to learn front-web framework and back-end architecture using Typescript, Express and TypeORM  
You can find all the front-web application here :

**Web**
- ReactJS - TBD
- VueJS - TBD
- Angular - TBD

**Mobile**
- SwiftUI - TBD
- React Native - TBD
- Flutter - TBD



## Usage
### Download dependencies
```
npm install
```

### Run typeorm migration
Update `ormconfig.json` and `src/database.ts` with your database information, then run migration to synchronise the tables
```
npm run typeorm migration:run
```

### Start the API
This start the API on port 3000
```
npm start
```

## Q/A
Q: Why do you use plaintext for the password ? Why are you not using any .env file or configuration ?  
A: This API is only meant for development purposes, implementing bcrypt or configuration can be done in 5 minutes here but is not the purpose of all this project

## Feedback
If you have any feedback regarding to the architecture or any advice on my way to code, feel free to make a PR explaining how you would have done it, or send me a mail at gguerin45480@gmail.com