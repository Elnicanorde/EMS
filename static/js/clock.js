// Time zones configuration
const DEFAULT_TIMEZONES = [
    { name: 'New York', timezone: 'America/New_York', country: 'United States' },
    { name: 'London', timezone: 'Europe/London', country: 'United Kingdom' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
    { name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' },
    { name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' },
    { name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore' }
];

const ALL_TIMEZONES = [
    // Americas
    { name: 'New York', timezone: 'America/New_York', country: 'United States' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'United States' },
    { name: 'Chicago', timezone: 'America/Chicago', country: 'United States' },
    { name: 'Denver', timezone: 'America/Denver', country: 'United States' },
    { name: 'Anchorage', timezone: 'America/Anchorage', country: 'United States' },
    { name: 'Honolulu', timezone: 'Pacific/Honolulu', country: 'United States' },
    { name: 'Mexico City', timezone: 'America/Mexico_City', country: 'Mexico' },
    { name: 'Toronto', timezone: 'America/Toronto', country: 'Canada' },
    { name: 'Vancouver', timezone: 'America/Vancouver', country: 'Canada' },
    { name: 'São Paulo', timezone: 'America/Sao_Paulo', country: 'Brazil' },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', country: 'Argentina' },
    { name: 'Santiago', timezone: 'America/Santiago', country: 'Chile' },
    
    // Europe
    { name: 'London', timezone: 'Europe/London', country: 'United Kingdom' },
    { name: 'Paris', timezone: 'Europe/Paris', country: 'France' },
    { name: 'Berlin', timezone: 'Europe/Berlin', country: 'Germany' },
    { name: 'Madrid', timezone: 'Europe/Madrid', country: 'Spain' },
    { name: 'Rome', timezone: 'Europe/Rome', country: 'Italy' },
    { name: 'Amsterdam', timezone: 'Europe/Amsterdam', country: 'Netherlands' },
    { name: 'Istanbul', timezone: 'Europe/Istanbul', country: 'Turkey' },
    { name: 'Moscow', timezone: 'Europe/Moscow', country: 'Russia' },
    { name: 'Athens', timezone: 'Europe/Athens', country: 'Greece' },
    { name: 'Dublin', timezone: 'Europe/Dublin', country: 'Ireland' },
    { name: 'Prague', timezone: 'Europe/Prague', country: 'Czech Republic' },
    
    // Asia
    { name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok', country: 'Thailand' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', country: 'Hong Kong' },
    { name: 'Shanghai', timezone: 'Asia/Shanghai', country: 'China' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
    { name: 'Seoul', timezone: 'Asia/Seoul', country: 'South Korea' },
    { name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata', country: 'India' },
    { name: 'New Delhi', timezone: 'Asia/Kolkata', country: 'India' },
    { name: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur', country: 'Malaysia' },
    { name: 'Manila', timezone: 'Asia/Manila', country: 'Philippines' },
    { name: 'Jakarta', timezone: 'Asia/Jakarta', country: 'Indonesia' },
    { name: 'Hanoi', timezone: 'Asia/Ho_Chi_Minh', country: 'Vietnam' },
    { name: 'Karachi', timezone: 'Asia/Karachi', country: 'Pakistan' },
    
    // Africa
    { name: 'Cairo', timezone: 'Africa/Cairo', country: 'Egypt' },
    { name: 'Johannesburg', timezone: 'Africa/Johannesburg', country: 'South Africa' },
    { name: 'Lagos', timezone: 'Africa/Lagos', country: 'Nigeria' },
    { name: 'Nairobi', timezone: 'Africa/Nairobi', country: 'Kenya' },
    
    // Oceania
    { name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' },
    { name: 'Melbourne', timezone: 'Australia/Melbourne', country: 'Australia' },
    { name: 'Auckland', timezone: 'Pacific/Auckland', country: 'New Zealand' },
    { name: 'Fiji', timezone: 'Pacific/Fiji', country: 'Fiji' }
];

class DigitalClock {
    constructor() {
        this.clockGrid = document.getElementById('clockGrid');
        this.addZoneBtn = document.getElementById('addZoneBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.modal = document.getElementById('zoneModal');
        this.closeBtn = document.querySelector('.close');
        this.searchZone = document.getElementById('searchZone');
        this.zoneList = document.getElementById('zoneList');
        
        this.activezones = this.loadFromLocalStorage() || DEFAULT_TIMEZONES;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.render();
        this.startClocks();
    }
    
    setupEventListeners() {
        this.addZoneBtn.addEventListener('click', () => this.openModal());
        this.resetBtn.addEventListener('click', () => this.resetToDefault());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.searchZone.addEventListener('input', () => this.filterZones());
        
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }
    
    render() {
        this.clockGrid.innerHTML = '';
        this.activezones.forEach((zone, index) => {
            const card = this.createClockCard(zone, index);
            this.clockGrid.appendChild(card);
        });
    }
    
    createClockCard(zone, index) {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.innerHTML = `
            <button class="remove-btn" data-index="${index}">×</button>
            <div class="zone-name">${zone.name}</div>
            <div class="zone-country">${zone.country}</div>
            <div class="digital-display">
                <div class="time" data-timezone="${zone.timezone}">--:--:--</div>
                <div class="ampm" data-ampm="${zone.timezone}"></div>
                <div class="date" data-date="${zone.timezone}"></div>
                <div class="timezone-offset" data-offset="${zone.timezone}"></div>
            </div>
        `;
        
        const removeBtn = card.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => this.removeZone(index));
        
        return card;
    }
    
    updateClock(timezone) {
        try {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            
            const timeString = formatter.format(now);
            const [time, ampm] = timeString.split(' ');
            
            // Get date in timezone
            const dateFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            const dateString = dateFormatter.format(now);
            
            // Calculate offset
            const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
            const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
            const offset = (tzDate - utcDate) / (1000 * 60 * 60);
            const offsetSign = offset >= 0 ? '+' : '';
            const offsetStr = `UTC ${offsetSign}${offset.toFixed(1)}`;
            
            // Update DOM
            const timeElement = document.querySelector(`[data-timezone="${timezone}"]`);
            const ampmElement = document.querySelector(`[data-ampm="${timezone}"]`);
            const dateElement = document.querySelector(`[data-date="${timezone}"]`);
            const offsetElement = document.querySelector(`[data-offset="${timezone}"]`);
            
            if (timeElement) timeElement.textContent = time;
            if (ampmElement) ampmElement.textContent = ampm;
            if (dateElement) dateElement.textContent = dateString;
            if (offsetElement) offsetElement.textContent = offsetStr;
        } catch (error) {
            console.error(`Error updating timezone ${timezone}:`, error);
        }
    }
    
    startClocks() {
        // Update immediately
        this.activezones.forEach(zone => this.updateClock(zone.timezone));
        
        // Update every second
        setInterval(() => {
            this.activezones.forEach(zone => this.updateClock(zone.timezone));
        }, 1000);
    }
    
    openModal() {
        this.modal.style.display = 'block';
        this.populateZoneList();
        this.searchZone.focus();
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        this.searchZone.value = '';
    }
    
    populateZoneList() {
        this.zoneList.innerHTML = '';
        ALL_TIMEZONES.forEach(zone => {
            if (!this.activezones.find(z => z.timezone === zone.timezone)) {
                const item = document.createElement('div');
                item.className = 'zone-item';
                item.innerHTML = `<strong>${zone.name}</strong> - ${zone.country}`;
                item.addEventListener('click', () => this.addZone(zone));
                this.zoneList.appendChild(item);
            }
        });
    }
    
    filterZones() {
        const query = this.searchZone.value.toLowerCase();
        const items = this.zoneList.querySelectorAll('.zone-item');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? 'block' : 'none';
        });
    }
    
    addZone(zone) {
        if (!this.activezones.find(z => z.timezone === zone.timezone)) {
            this.activezones.push(zone);
            this.saveToLocalStorage();
            this.render();
            this.startClocks();
            this.closeModal();
        }
    }
    
    removeZone(index) {
        this.activezones.splice(index, 1);
        this.saveToLocalStorage();
        this.render();
    }
    
    resetToDefault() {
        if (confirm('Reset to default time zones?')) {
            this.activezones = JSON.parse(JSON.stringify(DEFAULT_TIMEZONES));
            this.saveToLocalStorage();
            this.render();
        }
    }
    
    saveToLocalStorage() {
        localStorage.setItem('activezones', JSON.stringify(this.activezones));
    }
    
    loadFromLocalStorage() {
        const saved = localStorage.getItem('activezones');
        return saved ? JSON.parse(saved) : null;
    }
}

// Initialize clock when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DigitalClock();
});