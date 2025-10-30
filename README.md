# compsigh Hackathon Platform 
![Static Badge](https://img.shields.io/badge/compsigh-black?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSI1MTIiIGN5PSI1MTIiIHI9IjM3NSIgc3Ryb2tlPSIjRkRCQjMwIiBzdHJva2Utd2lkdGg9IjUwIi8%2BCjxyZWN0IHg9IjI5NCIgeT0iNjk0LjIxOCIgd2lkdGg9IjQ1MCIgaGVpZ2h0PSI1MCIgcng9IjI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjk0IDY5NC4yMTgpIiBmaWxsPSIjRkRCQjMwIi8%2BCjxyZWN0IHg9IjQ2MS4zMDEiIHk9IjY5My43MTEiIHdpZHRoPSI0NTAiIGhlaWdodD0iNTAiIHJ4PSIyNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTYwIDQ2MS4zMDEgNjkzLjcxMSkiIGZpbGw9IiNGREJCMzAiLz4KPC9zdmc%2BCg%3D%3D&link=https%3A%2F%2Fcompsigh.club%2F)

Hackathon registration and management platform for compsigh hackathons.

## Tech Stack

Based on the [T3 stack](https://create.t3.gg/)

- **Next.js 15** - React framework
- **tRPC** - End-to-end typesafe APIs
- **Prisma** - Database ORM
- **NextAuth.js** - Authentication (Google OAuth)
- **PostgreSQL** - Database
- **Tailwind CSS** - Styling

## Features

- Participant registration and profile management
- Admin dashboard to view participants
- Event agenda and FAQ
- Photo gallery

## Getting Started

You can use Nix or direnv to automatically set up the development environment:

- **Nix**: Run `nix develop` to enter the development shell
- **direnv**: If you have direnv installed, it will automatically load the environment when you `cd` into the project

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up environment variables (create `.env`):
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hackathon"
   GOOGLE_CLIENT_ID="your-google-client-id" # 
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   AUTH_SECRET="your-auth-secret"
   ```
   > For the AUTH_SECRET use `bunx auth secret`

   > For the GOOGLE_CLIENT env vars, use bunx vercel env pull --environment development if you are a part of this project, or go to google cloud and make your own.

3. Start the database:
   ```bash
   ./start-database.sh
   ```

4. Run database migrations:
   ```bash
   bun db:push
   ```

5. Start the development server:
   ```bash
   bun dev
   ```

## Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun db:studio` - Open Prisma Studio
- `bun db:push` - Push schema changes to database
- `bun check` - Run ESLint and TypeScript type checking
- `bun format:check` - Check formatting
- `bun format:write` - Write formatted code
- `bun preview` - Preview production build
- `bun start` - Start production server