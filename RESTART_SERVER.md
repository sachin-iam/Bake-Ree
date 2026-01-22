# Server Restart Instructions

## Issue
The dashboard is showing 404 errors for API endpoints even though the routes are properly defined. This usually means the server needs to be restarted to pick up route changes.

## Steps to Fix

1. **Stop the current server:**
   - Find the server process: `ps aux | grep "node server.js"`
   - Kill it: `kill <process_id>`
   - Or press `Ctrl+C` in the terminal where the server is running

2. **Restart the server:**
   ```bash
   cd server
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   cd server
   npm run dev
   ```

3. **Verify the server is running:**
   - Check that you see: `🚀 Server running on http://localhost:5000`
   - Check that you see: `🔌 Socket.io ready for connections`
   - Visit http://localhost:5000 in your browser - you should see "🍞 Bake Ree API is running..."

4. **Test the endpoints:**
   - The routes should now be accessible
   - Refresh your dashboard page

## If issues persist:

1. Check that MongoDB is connected (you should see `✅ MongoDB Connected`)
2. Verify your `.env` file has all required variables
3. Check server console for any error messages
4. Make sure port 5000 is not being used by another application

