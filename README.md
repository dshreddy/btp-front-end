# Mental Helath App

## Flow of app

This starting point of app is at `index.tsx`, it initialises auth context & checks if role, user object, token are there not.
If (all are there & token is valid) {takes to the concerned role's dashboard if it's valid}
else { user needs to choose his role (which will be stored in AsyncStorage) & goes to `auth/login.tsx`, upon successful request the user object, token are stored in Asyncstoarge & login context is set}

## Doctor

3 screens -

1. Profile screen

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Things stored in AsyncStorage

User object received from server

```js
const { data } = await axios.post(`${role}/login`, {
  email,
  password,
});

await AsyncStorage.setItem("@auth", JSON.stringify(data));
```
