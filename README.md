# MelodyHelp

Music Streaming Web App

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dhextras/melody_help.git
   ```

2. Install dependencies:

   ```bash
   cd melody_help
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
   -- Create Tables & Buckets

   -- Create 'playlists' table
   CREATE TABLE playlists (
      id UUID DEFAULT uuid_generate_v4() PRIMARY key,
      title TEXT NOT NULL,
      description TEXT,
      total_songs integer DEFAULT 0,
      cover_image TEXT NOT NULL, -- Path to cover image
      thumbnail_image TEXT NOT NULL -- Path to thumbnail image
   );

   -- Create 'songs' table
   CREATE TABLE songs (
      id UUID DEFAULT uuid_generate_v4() PRIMARY key,
      title TEXT NOT NULL,
      playlist_id UUID NOT NULL REFERENCES playlists(id),
      path TEXT NOT NULL, -- Path to song file
      producer TEXT,
      time INTEGER DEFAULT 0
   );

   -- NOTE: Make sure to make the buckets public
   -- Restrict Mime type for both of the buckets to audio and image

   -- Create 'songs' bucket
   INSERT INTO storage.buckets (id, name)
   VALUES ('songs', 'songs')
   ON CONFLICT (id) DO NOTHING;

   -- Create 'images' bucket
   INSERT INTO storage.buckets (id, name)
   VALUES ('images', 'images')
   ON CONFLICT (id) DO NOTHING;

   -- Create Policies for Tables & Buckets

   -- Allow read access for All buckets
   CREATE POLICY "Enable read access for all users"
   ON "storage"."buckets" FOR SELECT USING (true);

   -- Allow read access to 'playlists' table
   CREATE POLICY "Allow read access to playlists table"
   ON playlists FOR SELECT USING (true);

   -- Allow read access to 'songs' table
   CREATE POLICY "Allow read access to songs table"
   ON songs FOR SELECT USING (true);

   -- Allow read access to 'songs' bucket
   CREATE POLICY "Allow read access to songs bucket"
   ON storage.objects FOR SELECT USING (bucket_id = 'songs');

   -- Allow read access to 'images' bucket
   CREATE POLICY "Allow read access to images bucket"
   ON storage.objects FOR SELECT USING (bucket_id = 'images');

   -- Allow write access to 'songs' bucket
   CREATE POLICY "Allow write access to songs bucket"
   ON storage.objects FOR INSERT TO authenticated
   WITH CHECK (bucket_id = 'songs');

   -- Allow write access to 'images' bucket
   CREATE POLICY "Allow write access to images bucket"
   ON storage.objects FOR INSERT TO authenticated
   WITH CHECK (bucket_id = 'images');

   -- Create a function to update total_songs in playlists table
   CREATE OR REPLACE FUNCTION update_total_songs()
   RETURNS TRIGGER AS $$
   BEGIN
   IF TG_OP = 'INSERT' THEN
      UPDATE playlists
      SET total_songs = total_songs + 1
      WHERE id = NEW.playlist_id;
   ELSIF TG_OP = 'DELETE' THEN
      UPDATE playlists
      SET total_songs = total_songs - 1
      WHERE id = OLD.playlist_id;
   END IF;
   RETURN NULL;
   END
   $$ LANGUAGE plpgsql;

   -- Create a trigger to automatically update total_songs
   CREATE TRIGGER update_total_songs_trigger
   AFTER INSERT OR DELETE ON songs
   FOR EACH ROW
   EXECUTE PROCEDURE update_total_songs();

   -- Enable RLS on tables
   ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
   ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3000`.

## Deployment to VPS

To deploy Melody Help to a VPS and manage it using PM2 for process management and Caddy for SSL and reverse proxy:

1. Install PM2 globally (if not already installed):

   ```bash
   npm install pm2 -g
   ```

2. Build and start the server with PM2:

   ```bash
   pm2 start npm --name "melody_help" -- start --watch
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

   Once DNS propagation is complete, you can access Melody Help app at your configured domain over HTTPS.

## Database structure

### Playlists Table

This table stores information about playlists. It includes:

- `id`: A unique identifier for each playlist.
- `title`: The title of the playlist.
- `description`: An optional description of the playlist.
- `total_songs`: The total number of songs in the playlist (automatically updated).
- `cover_image`: The path to the cover image of the playlist.
- `thumbnail_image`: The path to the thumbnail image of the playlist.

### Songs Table

This table stores information about songs. It includes:

- `id`: A unique identifier for each song.
- `title`: The title of the song.
- `playlist_id`: The ID of the playlist to which the song belongs.
- `path`: The path to the song file.
- `producer`: The producer of the song.
- `time`: The duration of the song in seconds.

### Songs Bucket

This bucket stores song files. It is used for:

- Uploading and storing song files.
- Managing access to song files.

### Images Bucket

This bucket stores cover and thumbnail images. It is used for:

- Uploading and storing cover and thumbnail images.
- Managing access to image files.

### Policies

#### Table Policies

- **Playlists Table**: Allows read access to the `playlists` table for all users.
- **Songs Table**: Allows read access to the `songs` table for all users.

#### Bucket Policies

- **Songs Bucket**: Allows read and write access to the `songs` bucket for authenticated users.
- **Images Bucket**: Allows read and write access to the `images` bucket for authenticated users.

#### Triggers

- **Update Total Songs**: A trigger that updates the `total_songs` count in the `playlists` table whenever a song is added or removed.

### Supabase Details

- **Supabase URL**: This is the API URL provided by Supabase for your project. It's used to connect your application to the Supabase database.
- **Supabase `anon` key**: This is the anonymous key provided by Supabase, which allows your application to make authenticated requests to the Supabase API without requiring user authentication.

Make sure to keep your Supabase credentials (URL and `anon` key) secure and never expose them in client-side code or commit them to version control.

---

# FOR THE DEVS!

Following these coding guidelines will help keep our codebase clean, consistent, and easier to maintain. Trust me, your future self (and your fellow devs) will thank you!

[Check them out here](https://gist.github.com/dhextras/77cffdb7eaaa574952828067c79de1a2):
