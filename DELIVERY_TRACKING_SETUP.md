# 🚚 Real-Time Delivery Tracking Setup Guide

## Overview

The Bake-Ree delivery tracking system provides real-time order tracking with map visualization, similar to Swiggy/Zomato. Customers can track their orders in real-time with live location updates, status changes, and completion notifications.

## Features Implemented

✅ **Real-time Location Tracking**
- Live GPS location updates from delivery staff
- Location history tracking
- Route visualization on map

✅ **Interactive Map**
- Google Maps integration
- Real-time marker updates
- Route drawing between bakery, delivery location, and destination
- Multiple markers (Bakery, Delivery Vehicle, Destination)

✅ **Status Timeline**
- Visual progress indicator
- Step-by-step status updates
- Real-time status changes

✅ **Completion Notifications**
- Toast notifications for status updates
- Special completion notification when order is delivered
- Real-time updates via WebSocket

✅ **Delivery Management**
- Admin can assign delivery staff
- Staff can update location
- Automatic delivery record creation

## Setup Instructions

### 1. Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Directions API
   - Geocoding API (optional, for address validation)
4. Create credentials (API Key)
5. Restrict the API key to your domain (recommended for production)

### 2. Environment Variables

Add the following to your `.env.local` file in the `client` directory:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Update Bakery Location

Update the bakery coordinates in `/client/src/app/track/[orderId]/page.tsx`:

```typescript
const BAKERY_LOCATION = {
  lat: 28.5702,  // Your bakery latitude
  lng: 77.3268,  // Your bakery longitude
};
```

## Usage

### For Customers

1. **Track Order from Order Details**
   - Go to order details page (`/orders/[id]`)
   - Click "Track Order" button (for delivery orders)
   - View real-time tracking on map

2. **Direct Tracking URL**
   - Navigate to `/track/[orderId]`
   - Real-time updates will appear automatically

### For Delivery Staff

Delivery staff can update their location using the API endpoint:

```javascript
PATCH /api/deliveries/:id/location
Body: {
  lat: 28.5702,
  lng: 77.3268,
  estimatedTimeRemaining: 15  // optional, in minutes
}
```

### For Admins

1. **Assign Delivery Staff**
   - Go to Admin Dashboard → Deliveries
   - Select a delivery
   - Assign staff member from dropdown

2. **Update Delivery Status**
   - Change status through the status dropdown
   - Status updates are broadcast in real-time

## API Endpoints

### Delivery Tracking

- `GET /api/deliveries/order/:orderId` - Get delivery by order ID
- `GET /api/deliveries/:id` - Get delivery by ID
- `PATCH /api/deliveries/:id/status` - Update delivery status
- `PATCH /api/deliveries/:id/location` - Update delivery location
- `PATCH /api/deliveries/:id/assign` - Assign delivery staff

## WebSocket Events

### Client Events (Listen)

- `delivery:locationUpdated` - Real-time location updates
- `delivery:statusUpdated` - Status change notifications
- `delivery:completed` - Order delivery completion

### Server Events (Emit)

- `emitDeliveryLocationUpdated()` - Emits location updates
- `emitDeliveryStatusUpdated()` - Emits status changes
- Automatic completion event when status changes to "Delivered"

## Status Flow

1. **Pending** - Order placed, waiting for assignment
2. **Assigned** - Delivery staff assigned
3. **Picked Up** - Order picked up from bakery
4. **In Transit** - On the way to destination
5. **Out for Delivery** - Almost at destination
6. **Delivered** - Successfully delivered

## Map Features

- **Bakery Marker** (Blue) - Starting point
- **Delivery Vehicle Marker** (Truck icon) - Current delivery location
- **Destination Marker** (Red) - Delivery address
- **Route Line** (Amber) - Real-time route visualization

## Troubleshooting

### Map Not Loading

1. Check if Google Maps API key is set correctly
2. Verify API key has proper restrictions
3. Check browser console for errors
4. Ensure Maps JavaScript API is enabled

### Real-time Updates Not Working

1. Check WebSocket connection status (indicator on tracking page)
2. Verify user is logged in and has valid token
3. Check server logs for socket connection issues
4. Ensure delivery record exists for the order

### Location Updates Not Appearing

1. Verify delivery staff is updating location via API
2. Check if delivery status allows location tracking
3. Verify socket events are being emitted from server

## Security Considerations

1. **API Key Protection**
   - Use environment variables (never commit keys)
   - Restrict API key to specific domains/IPs
   - Use separate keys for development/production

2. **Location Privacy**
   - Only delivery staff can update locations
   - Customers can only view their own deliveries
   - Admin access required for all delivery management

3. **WebSocket Security**
   - Users can only receive updates for their own orders
   - Admin can view all deliveries
   - Staff can only update assigned deliveries

## Future Enhancements

- [ ] Push notifications for status updates
- [ ] Estimated arrival time calculation
- [ ] Delivery route optimization
- [ ] Multiple delivery stops
- [ ] Delivery history playback
- [ ] SMS notifications
- [ ] WhatsApp integration

## Support

For issues or questions, please check:
- Server logs for WebSocket errors
- Browser console for client-side errors
- Network tab for API request failures

---

**Last Updated:** December 2024

