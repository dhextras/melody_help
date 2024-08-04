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

   > Need to be done...

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

    > Need to be done...

### Supabase Details

- **Supabase URL**: This is the API URL provided by Supabase for your project. It's used to connect your application to the Supabase database.
- **Supabase `anon` key**: This is the anonymous key provided by Supabase, which allows your application to make authenticated requests to the Supabase API without requiring user authentication.

Make sure to keep your Supabase credentials (URL and `anon` key) secure and never expose them in client-side code or commit them to version control.

---

# FOR THE DEVS!

Following these coding guidelines will help keep our codebase clean, consistent, and easier to maintain. Trust me, your future self (and your fellow devs) will thank you!

[Check them out here](https://gist.github.com/dhextras/77cffdb7eaaa574952828067c79de1a2):
