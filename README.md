# Daily Calendar

A full-stack calendar application for daily task and event planning with persistent data storage and intuitive scheduling features.

## Features

- **Interactive Calendar View**: Month/year navigation with visual task indicators
- **Task Management**: Add, complete, and delete todos for specific days
- **Daily Habits Tracking**: Create recurring daily habits that auto-populate each day
- **User Authentication**: Secure Google OAuth integration with a persistent database to take your tasks anywhere

##  Live Demo

[View Live Application](https://dailytask-calendar.vercel.app)

##  Tech Stack

### Frontend
- **React**
- **Next.js**
- **TypeScript** 

### Backend
- **Prisma ORM** 
- **PostgreSQL** 
- **NextAuth.js** 

### Infrastructure
- **Vercel** 
- **Neon** 

##  Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/trevrasher/DailyCalendar.git
   cd DailyCalendar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"
   NEXTAUTH_SECRET="your_nextauth_secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
