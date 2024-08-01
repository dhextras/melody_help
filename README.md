# MoodTunes

Music Streaming Web App

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dhextras/mode_tunes.git
   ```

2. Install dependencies:

   ```bash
   cd mode_tunes
   npm install
   ```

3. Set up Supabase:

   - Create a new Supabase project at [https://supabase.com](https://supabase.com).
   - After creating the project, Supabase will provide you with the API URL and the `anon` key.
   - Run the below command to generate a session secret:

     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```

   - Copy the `.env.example` file to a new file called `.env`:

     ```bash
     cp .env.example .env
     ```

   - Open the `.env` file and replace the placeholders with your actual Supabase API URL, `anon` key, and session secret:

     ```
     SUPABASE_URL=YOUR_SUPABASE_URL
     SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
     SESSION_SECRET=THE_32_BYTES_SESSION_SECRET
     ```

4. Create the necessary database tables by running the following SQL queries in the Supabase SQL Editor:

   ```sql
   -- Create the users table
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
   );

   -- Create the therapists table
   CREATE TABLE therapists (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     code TEXT UNIQUE NOT NULL,
     name TEXT,
     total_conversations INTEGER DEFAULT 0,
     last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create the active_conversations table
   CREATE TABLE active_conversations (
     id UUID NOT NULL REFERENCES users(id),
     therapist_id UUID NOT NULL REFERENCES therapists(id),
     user_name TEXT,
     therapist_name TEXT,
     user_message TEXT,
     started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Create the pending_users table
   CREATE TABLE pending_users (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES users(id),
     name TEXT,
     initial_message TEXT
   );

   -- Create the online_therapists table
   CREATE TABLE online_therapists (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     therapist_id UUID NOT NULL REFERENCES therapists(id),
     online_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3000`.

## Deployment to VPS

To deploy Mode Tunes to a VPS and manage it using PM2 for process management and Caddy for SSL and reverse proxy:

1. Install PM2 globally (if not already installed):

   ```bash
   npm install pm2 -g
   ```

2. Build and start the server with PM2:

   ```bash
   pm2 start npm --name "mode_tunes" -- start --watch
   ```

   This command will start the application using PM2, which will manage the Node.js process, restart it on failures, and allow easy monitoring.

3. Set up Caddy for SSL and reverse proxy:

   - Install Caddy on your VPS. Visit [Caddy's official website](https://caddyserver.com/) for installation instructions.

   - Configure Caddy to serve your application and manage SSL certificates for HTTPS. Here's a basic Caddyfile example:

     ```
     yourdomain.com {
       reverse_proxy localhost:3000
       tls your@email.com
     }
     ```

     Replace `yourdomain.com` with your actual domain and `localhost:3000` with the address where your Node.js application is running.

4. Configure DNS forwarding:

   Configure DNS forwarding on your hosting provider to link your domain with your VPS's IP address.

5. Access your application:

   Once DNS propagation is complete, you can access Mode Tunes app at your configured domain over HTTPS.
  

## Database structure

### Users Table

This table stores basic information about users seeking therapy.

- `id`: A unique identifier for each User.

### Therapists Table

This table stores information about verified therapists. It has:

- `id`: A unique identifier for each therapist.
- `name`: Name of the therapist.
- `code`: A unique code for each therapist to log in.
- `total_conversations`: The total number of conversations a therapist has had.
- `last_login`: The time when the therapist logged into the account via the code.

### Active Conversations Table

This table stores information about ongoing conversations between users and therapists. It has:

- `id`: A unique identifier for each conversation which is actually the user_id.
- `therapist_id`: The therapist participating in the conversation.
- `user_name`: An optional name provided by the user or a random generated name.
- `therapist_name`: The therapist name stored in db.
- `user_message`: An optional initial message provided by the user or predefined message ( generated ).
- `started_at`: The time when the conversation started.

### Pending Users Table

This table stores information about users waiting to be matched with a therapist. It has:

- `id`: A unique identifier for each pending users.
- `user_id`: The user waiting for a therapist.
- `name`: An optional name provided by the user.
- `initial_message`: An optional initial message provided by the user.

### Online Therapists Table

This table stores information about therapists who are currently online and available. It has:

- `id`: A unique identifier for each online therapist record.
- `therapist_id`: The online therapist.
- `online_since`: The time when the therapist went online.

> The actual messages exchanged during a conversation are not stored in the database to keep it anonymous.

### Supabase Details

- **Supabase URL**: This is the API URL provided by Supabase for your project. It's used to connect your application to the Supabase database.
- **Supabase `anon` key**: This is the anonymous key provided by Supabase, which allows your application to make authenticated requests to the Supabase API without requiring user authentication.

Make sure to keep your Supabase credentials (URL and `anon` key) secure and never expose them in client-side code or commit them to version control.

---

# FOR THE DEVS!

Following these coding guidelines will help keep our codebase clean, consistent, and easier to maintain. Trust me, your future self (and your fellow devs) will thank you!

[Check them out here](https://gist.github.com/dhextras/77cffdb7eaaa574952828067c79de1a2):
