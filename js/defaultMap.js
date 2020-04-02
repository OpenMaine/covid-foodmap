class DefaultMap {
    constructor(mapId, center, zoom=8) {
        this.center = center
        this.markers = {};
		this.startCenter = center;
		this.startZoom = zoom;
        this.map = L.map(mapId).setView([center.latitude, center.longitude], zoom);
        this.map.zoomControl.setPosition('topright');
        this.layerGroup = L.layerGroup().addTo(this.map);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    setPosition(geoPoint, zoom) {
        this.map.setView([geoPoint.latitude, geoPoint.longitude], zoom);
    }

    addMarker(geoPoint, key, icon = null) {
        let iconOption = icon ? {icon: icon} : {};
        let marker = L.marker([geoPoint.latitude, geoPoint.longitude], iconOption).addTo(this.layerGroup);
        this.markers[key] = marker;
    }

    addMarkerPopup(key, html) {
        this.markers[key].bindPopup(html);
    }

    clearMarkers() {
        this.layerGroup.clearLayers();
        this.markers = {};
    }

    fitMarkerBounds() {
        const group = new L.featureGroup(Object.values(this.markers));
        this.map.fitBounds(group.getBounds());
    }
}