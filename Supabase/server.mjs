import express from 'express';
const app = express();
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ofdhmxxacziwrbcfyovw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mZGhteHhhY3ppd3JiY2Z5b3Z3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NzgzODAxNywiZXhwIjoyMDEzNDE0MDE3fQ.IyiiBXD-sBZNuXQEQoT494Ym_uZ-P1di2T0UddU4kJs';
const supabase = createClient(supabaseUrl, supabaseKey);


// GET /users
app.get('/users', async (req, res) => {
    const { data, error } = await supabase.from('Users').select('*');
    if (error) {
        return res.status(500).json({ error: 'Error fetching users.' });
    }
    res.json(data);
});

// GET /trips
app.get('/trips', async (req, res) => {
    const { data, error } = await supabase.from('Trips').select('*');
    if (error) {
        return res.status(500).json({ error: 'Error fetching trips.' });
    }
    res.json(data);
});

// GET /user/{id}
app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const { data, error } = await supabase.from('Users').select('*').eq('user_id', userId);
    if (error) {
        return res.status(500).json({ error: 'Error fetching user.' });
    }
    res.json(data[0]);
});

// GET /trip/{id}
app.get('/trip/:id', async (req, res) => {
    const tripId = req.params.id;
    const { data, error } = await supabase.from('Trips').select('*').eq('trip_id', tripId);
    if (error) {
        return res.status(500).json({ error: 'Error fetching trip.' });
    }
    res.json(data[0]);
});

// GET /user/{id}/travel-buddies
app.get('/user/:id/travel-buddies', async (req, res) => {
   const userId = req.params.id;

   // Use a SQL query to get a list of trip IDs for the given user.
   const { data: userTrips, error: tripsError } = await supabase
       .from('UsersToTrips')
       .select('trip_id')
       .eq('user_id', userId);

   if (tripsError) {
       return res.status(500).json({ error: 'Error fetching user trips.' });
   }

   const tripIds = userTrips.map((trip) => trip.trip_id);

   // Use another SQL query to get a list of user IDs who went on the same trips as the given user.
   const { data: travelBuddies, error: buddiesError } = await supabase
       .from('UsersToTrips')
       .select('user_id')
       .in('trip_id', tripIds)
       .neq('user_id', userId);

   if (buddiesError) {
       return res.status(500).json({ error: 'Error fetching travel buddies.' });
   }
   // if needed as an array, not using it rn for better visibility
   //const buddyUserIds = travelBuddies.map((buddy) => buddy.user_id);

   res.json(travelBuddies);
});

// Start the server
const port = 3000;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});



