This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run `node initdb.js` to set up the dummy database with an admin user (since I don't have a create user functionality here).
Finally, run the app by running `npm run dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file

## Learn More

This project is a test submission for Simon Phillip Guillen's job application at Elio Systems. This simple blog is written in NextJS (a ReactJS-based framework that utilizes Server-side Rendering).

## Techstack

- NextJS
- ReactJS
- SQLite 3 (Basic database to store users, and posts)
- React's Context API (basic state management)
- Lucia (authentication handling)
- Tailwind CSS (CSS framework for designing)
- React Simple WYSIWYG

## Design decisions and challenges

With the latest version of NextJS, not just the App-based routing but also the ability to define and play around with the ability to use server-side and client-side components have presented some challenges to me.
As you notice, most of my form submissions utilized React's `useActionState` which handled the form submission and therefore submitted code directly to the NextJS server-side component without having to call the API
is not consistent with the way I used fetch API to get data from my AuthProvider which I needed to get the user data based from the current session. I had to play around because NextJS's full-stack ability
gave me different options for adding and fetching data. Though my implementation worked I would have loved it if my form submission was implemented the same way I did to my Auth providers for consistency purposes.
