
# StudentOS

StudentOS is a platform for students, to manage all of their needs during school. That includes Assignments, Exams, Tasks, Notes and even an interactive Calendar.


## Getting Started - Developer

To get your project up and running as Developer, follow the steps listed below.

 
- Clone the repository to your local device
```bash
  git clone https://github.com/vLimax24/StudentOS.git
```

- Install all necessary packages
```bash
  npm install
```

- (Optional) | Set up your own convex dashboard. [Documentation](https://docs.convex.dev/home)
```bash
  npx convex dashboard
```

- Paste in all necessary .env secrets &#8594; see `.env.example`
```bash
  DATABASE_URL="db.sqlite"
  NEXTAUTH_URL="" 
  DISCORD_CLIENT_ID=""
  DISCORD_CLIENT_SECRET=""
  GOOGLE_CLIENT_ID=""
  GOOGLE_CLIENT_SECRET=""
  NEXT_PUBLIC_URL=""
  CONVEX_DEPLOYMENT= 
  NEXT_PUBLIC_CONVEX_URL=
```

- Create Convex backend functions
```bash
  npx convex dev
```

- (New Terminal) Start the local dvelopment server
```bash
  npm run dev
```




## Authors

- [@vLimax24](https://www.github.com/vLimax24)

