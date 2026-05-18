# Digital Clock with Multiple Time Zones

## Overview
A modern, responsive digital clock application that displays the current time across different time zones simultaneously. Features real-time updates, timezone management, and persistent storage.

## Features

✨ **Core Features:**
- ⏰ Real-time digital clock display
- 🌍 Support for 40+ time zones globally
- 🎨 Beautiful dark theme with purple accents
- 📱 Fully responsive design (mobile, tablet, desktop)
- 💾 Persistent storage using localStorage
- 🔍 Search functionality for time zones
- ➕ Add/remove time zones dynamically
- 🔄 Reset to default time zones
- 📅 Display date and UTC offset for each timezone

## File Structure

```
static/
├── html/
│   └── clock.html          # Main clock HTML
├── css/
│   └── clock.css           # Complete styling
└── js/
    └── clock.js            # Clock logic and functionality
```

## How to Use

### 1. **Open the Clock**
   - Open `static/html/clock.html` in your web browser
   - Or integrate into your Django project:
     ```python
     # urls.py
     path('clock/', views.clock, name='clock')
     ```

### 2. **View Default Time Zones**
   - The clock displays 6 default time zones:
     - New York (America/New_York)
     - London (Europe/London)
     - Tokyo (Asia/Tokyo)
     - Sydney (Australia/Sydney)
     - Dubai (Asia/Dubai)
     - Singapore (Asia/Singapore)

### 3. **Add New Time Zone**
   - Click **"+ Add Time Zone"** button
   - Search for a city or country
   - Click to select and add
   - The new timezone will appear immediately

### 4. **Remove a Time Zone**
   - Click the **"×"** button on any clock card
   - The timezone will be removed instantly

### 5. **Reset to Default**
   - Click **"Reset to Default"** button
   - Confirms before resetting
   - Returns to original 6 time zones

## Supported Time Zones

### Americas (11 zones)
- New York, Los Angeles, Chicago, Denver, Anchorage, Honolulu
- Mexico City, Toronto, Vancouver
- São Paulo, Buenos Aires, Santiago

### Europe (11 zones)
- London, Paris, Berlin, Madrid, Rome, Amsterdam
- Istanbul, Moscow, Athens, Dublin, Prague

### Asia (15 zones)
- Dubai, Bangkok, Hong Kong, Shanghai, Tokyo, Seoul
- Singapore, Mumbai, New Delhi, Kuala Lumpur, Manila
- Jakarta, Hanoi, Karachi

### Africa (4 zones)
- Cairo, Johannesburg, Lagos, Nairobi

### Oceania (4 zones)
- Sydney, Melbourne, Auckland, Fiji

## Display Information

Each clock card shows:

1. **City Name** - Location name (e.g., "New York")
2. **Country** - Country/Region (e.g., "United States")
3. **Digital Time** - HH:MM:SS format with green glow effect
4. **AM/PM** - Current period
5. **Date** - Weekday, Month, Day, Year
6. **UTC Offset** - Timezone offset from UTC (e.g., "UTC -5.0")

## Design Features

### Color Scheme
- **Primary**: Purple (#7C3AED)
- **Secondary**: Army Green (#3D5A3D)
- **Background**: Dark gradient
- **Text**: White with green time display

### Responsive Breakpoints
- **Desktop**: 1400px (6 columns grid)
- **Tablet**: 300px-1024px (2-3 columns)
- **Mobile**: < 768px (1 column)

### Animations
- Smooth fade-in on page load
- Card hover effects with shadow
- Smooth transitions on all interactions
- Glow effect on digital time

## Technical Details

### JavaScript Features
- **Intl.DateTimeFormat API** - For accurate timezone conversion
- **localStorage** - Persists selected timezones
- **setInterval()** - Updates clock every second
- **Event Delegation** - Efficient event handling

### Browser Compatibility
- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Customization

### Add More Time Zones
Edit `clock.js` and add to `ALL_TIMEZONES` array:

```javascript
ALL_TIMEZONES = [
    // ... existing zones
    { name: 'Your City', timezone: 'Region/City', country: 'Country' }
];
```

### Change Default Zones
Modify `DEFAULT_TIMEZONES` array:

```javascript
const DEFAULT_TIMEZONES = [
    // Your preferred default zones
];
```

### Customize Colors
Edit CSS variables in `clock.css`:

```css
:root {
    --primary-color: #7C3AED;  /* Change purple */
    --secondary-color: #3D5A3D; /* Change green */
    /* ... other variables */
}
```

## Performance Optimization

- ⚡ Minimal DOM manipulation
- 🔋 Efficient timezone calculations
- 💾 Only stores selected timezones
- 📦 Lightweight (< 50KB total)

## Data Persistence

- Selected timezones are saved to browser's localStorage
- Automatically loads on page refresh
- No server required for basic functionality

## Troubleshooting

### Clock not updating?
- Check browser console for errors
- Ensure JavaScript is enabled
- Try clearing browser cache

### Time zones not saving?
- Clear browser storage: DevTools → Application → Clear storage
- Try a different browser

### Incorrect times?
- Check system timezone is correct
- Timezone database is built into browser
- Some timezones may change with DST

## Future Enhancements

- 🌙 12/24 hour format toggle
- 📊 Analog clock display option
- 🔔 Alarm functionality
- 📤 Share timezone links
- 🌐 Server-side timezone management
- 📱 Progressive Web App (PWA)

## License

MIT License - Free to use and modify

## Author

Elnicanorde - Digital Clock Project

---

**Version**: 1.0.0  
**Status**: Production Ready ✅