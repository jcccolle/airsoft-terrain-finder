let userLat = null;
let userLon = null;

const terrains = [
    {
        name:"CAT Airsoft",
        address:"Rue de Bavery 13 Bis, 6200 Châtelet",
        style:"Extérieur + CQB léger",
        prix:"15-20 €",
        pa:"330 FPS",
        assaut:"350 FPS",
        dmr:"400 FPS",
        sniper:"450 FPS",
        lat:50.4045,
        lon:4.5195
    },
    {
        name:"Infantry44",
        address:"Rue de la Gazéification, 7350 Thulin",
        style:"Boisé + Industriel",
        prix:"15-20 €",
        pa:"330 FPS",
        assaut:"350 FPS",
        dmr:"400 FPS",
        sniper:"450 FPS",
        lat:50.4285,
        lon:3.7413
    },
    {
        name:"Grizzly Squad",
        address:"Avenue du Champs de Bataille 587, Flénu",
        style:"CQB + Extérieur",
        prix:"20 €",
        pa:"330 FPS",
        assaut:"350 FPS",
        dmr:"400 FPS",
        sniper:"450 FPS",
        lat:50.4298,
        lon:3.8898
    },
    {
        name:"L'Intemporelle",
        address:"Gand'Route 142, Jemappes",
        style:"Milsim",
        prix:"15-20 €",
        pa:"330 FPS",
        assaut:"350 FPS",
        dmr:"400 FPS",
        sniper:"450 FPS",
        lat:50.4477,
        lon:3.8890
    }
];

function calculDistance(lat1, lon1, lat2, lon2){
    const R = 6371;
    const dLat = (lat2-lat1) * Math.PI/180;
    const dLon = (lon2-lon1) * Math.PI/180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R*c;
}

function afficherTerrains(){
    const container = document.getElementById("terrains");
    let liste = terrains.map(t => ({...t}));

    if(userLat && userLon){
        liste.forEach(t => {
            t.distance = calculDistance(userLat, userLon, t.lat, t.lon);
        });
        liste.sort((a,b) => a.distance - b.distance);
    }

    let htmlContent = "";

    liste.forEach(t => {
        htmlContent += `
        <div class="card">
            <h2>🎯 ${t.name}</h2>
            <p>📍 ${t.address}</p>
            <div class="distance">
                ${t.distance ? "📏 " + t.distance.toFixed(1) + " km" : "📏 Activez le GPS"}
            </div>
            <div class="info">🌳 ${t.style}</div>
            <div class="info">💶 ${t.prix}</div>
            <div class="info">🔫 PA : ${t.pa}</div>
            <div class="info">🔫 Assaut : ${t.assaut}</div>
            <div class="info">🎯 DMR : ${t.dmr}</div>
            <div class="info">🏹 Sniper : ${t.sniper}</div>
            <button class="routeBtn" onclick="ouvrirItineraire('${t.address.replace(/'/g, "\\'")}')">
                🚗 Itinéraire
            </button>
        </div>
        `;
    });

    container.innerHTML = htmlContent;
}

function ouvrirItineraire(destination){
    if(userLat && userLon){
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${encodeURIComponent(destination)}`);
    } else {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("gpsBtn").addEventListener("click", () => {
        const statusDiv = document.getElementById("status");
        statusDiv.innerHTML = "⏳ Recherche du signal GPS...";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLat = position.coords.latitude;
                userLon = position.coords.longitude;
                statusDiv.innerHTML = "✅ Position GPS enregistrée";
                afficherTerrains();
            },
            (
