This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

<hr></hr>


# 🍽️ Restaurant Ordering Website

A modern and mobile-friendly website for restaurants to take online orders, manage menus, and process payments.

---

## ✨ Features

- 🧾 Menu with Categories, Images & Prices  
- 🛒 Add to Cart & Customize Orders  
- 📦 Order Tracking & Status Updates  
- 💳 Online Payment Integration  
- 📲 Mobile-Friendly UI  
- 🧑‍🍳 Admin Panel for Menu Updates & Orders  
- 📉 Sales Dashboard & Reports  

---

## 🧑‍💻 Tech Stack

- **Frontend:** NextJS, Tailwind CSS  
- **Backend:** Node.js 
- **Database:** MongoDB  
- **Payment:**  Stripe  
- **Tools:** GitHub, Postman

## 🧑‍💻 Package Dependencies
<code> mongoose, shadcnui, zod, nodemailer, jose</code>


##  File Structure
```javascript

PACKITUP/
├── .next/
├── node_modules/
├── public/
│   ├── file.svg
│   ├── food-fruit.png
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── schemas/
│   ├── forgotPasswordSchema.ts
│   ├── signInSchema.ts
│   └── signUpSchema.ts
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (users)/
│   │   │   ├── menu/
│   │   │   │   └── page.tsx
│   │   │   └── users/[userid]/
│   │   │       ├── checkout/
│   │   │       │   └── page.tsx
│   │   │       ├── dashboard/
│   │   │       │   ├── page.tsx
│   │   │       │   ├── page.tsx 
│   │   │       │   ├── layout.tsx
│   │   │       └── admin/     
│   │   │            └── page.tsx  
│   │   ├── api/
│   │   │   ├── hello/
│   │   │   ├── refresh-access/
│   │   │   │   └── route.ts
│   │   │   ├── sign-in/
│   │   │   │   └── route.ts
│   │   │   └── verify-user/
│   │   │       └── route.ts
│   │   ├── providers/
│   │   │   └── auth-provider.tsx
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── cart-provider.tsx
│   │   │   ├── cart-sidebar.tsx
│   │   │   └── checkout-form.tsx
│   │   ├── features.tsx
│   │   ├── food-catalog.tsx
│   │   ├── footer.tsx
│   │   ├── forgot-form.tsx
│   │   ├── header.tsx
│   │   ├── signup-form.tsx
│   │   ├── testimonials.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── models/
│   │   │   └── accesslocals.ts
│   │   ├── database.ts
│   │   ├── sendEmail.ts
│   │   ├── utils.ts
│   │   └── middleware.ts
│   ├── styles/
│   │   └── globals.css
│   └── .env
├── .gitignore
├── components.json
├── eslint.config.mjs
├── image.png
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

## 📌 Note

Perfect for restaurants, cloud kitchens, or cafes looking for a stylish online ordering platform.



## Usage

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
