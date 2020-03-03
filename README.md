# ReactReserveApp

This is an E-commerce React App build with Next.js to render react on the server. And Deployed on ZEIT with now commands.

In addition to integrate type annotations with `TypeScript` which is a superset of `JavaScript`

# To Start:

## Install the required packages by the following command:

```
npm install
```

## Create a 'next.config.js' file and add your own credentials:

```
module.exports = {
  env: {
    MONGO_SRV: "<insert-mongo-srv>",
    JWT_SECRET: "<insert-jwt-secret>",
    CLOUDINARY_URL: "<insert-cloudinary-url>",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
```

## Run the following command to start the app in the development mode:

```
npm run dev
```

## Please, visit the following link to try the app:

https://react-reserve-app.wadeeakiwan.now.sh/
