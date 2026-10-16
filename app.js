let userLat = null;
let userLon = null;

const terrains = [
    {
        name: "CAT - Carolo Airsoft Team",
        address: "Rue de Bavery 13 Bis, 6200 Châtelet",
        style: "Extérieur + CQB léger",
        prix: "~15-20 €",
        pa: "330 FPS",
        assaut: "350 FPS",
        dmr: "400 FPS",
        sniper: "450 FPS",
        grammage: "Non spécifié",
        lat: 50.4045,
        lon: 4.5195
    },
    {
        name: "Infantry44",
        address: "Rue de la Gazéification, 7350 Thulin",
        style: "Extérieur boisé + Industriel",
        prix: "~15-20 €",
        pa: "330-350 FPS",
        assaut: "350 FPS",
        dmr: "400 FPS",
        sniper: "N/A",
        grammage: "Non spécifié",
        lat: 50.4285,
        lon: 3.7413
    },
    {
        name: "Grizzly Arena / Squad",
        address: "Avenue du champs de bataille 587, 7012 Flénu (Mons)",
        style: "CQB + Extérieur",
        prix: "~20 €",
        pa: "330 FPS",
        assaut: "350 FPS",
        dmr: "400-450 FPS",
        sniper: "400-450 FPS",
        grammage: "Non spécifié",
        lat: 50.4298,
        lon: 3.8898
    },
    {
        name: "L'Intemporelle (Nordisk - Intemporel)",
        address: "Gand'route 142, Jemappes",
        style: "Extérieur / Milsim",
        prix: "~15-20 €",
        pa: "330 FPS",
        assaut: "350 FPS",
        dmr: "N/A",
        sniper: "450 FPS",
        grammage: "Non spécifié",
        lat: 50.4477,
        lon: 3.8890
    },
    {
        name: "Skulls Airsoft",
        address: "Chemin de Cognelée, Namur",
        style: "Extérieur",
        prix: "~15 €",
        pa: "330 FPS",
        assaut: "350 FPS",
        dmr: "N/A",
        sniper: "450 FPS",
        grammage: "Non spécifié",
        lat: 50.4901,
        lon: 4.8622
    },
    {
        name: "Yakuzas Airsoft",
        address: "Rue J.Kinnaer, 4280 Grand-Hallet",
        style: "Extérieur / CQB",
        prix: "~15 €",
        pa: "330 FPS",
        assaut: "350 FPS",
        dmr: "N/A",
        sniper: "N/A",
        grammage: "0.23 - 0.28g",
        lat: 50.6936,
        lon: 5.0315
    },
    {
        name: "The Unit - Rixensart",
        address: "Rixensart, Brabant Wallon",
        style: "CQB PUR",
        prix: "15-20 €",
        pa: "330 FPS (GBB / Pompe)",
        assaut: "330-350 FPS (Semi)",
        dmr: "N/A",
        sniper: "N/A",
        grammage: "0.20 - 0.25g (BIO)",
        lat: 50.7145,
        lon: 4.5332
    },
    {
        name: "The Unit - Viaduc",
        address: "Bruxelles",
        style: "CQB Urbain",
        prix: "20 €",
        pa: "330 FPS",
        assaut: "330-350 FPS (Semi)",
        dmr: "N/A",
        sniper: "N/A",
        grammage: "0.20 - 0.25g (BIO)",
        lat: 50.8467,
        lon: 4.3525
    },
    {
        name: "Fort Knox",
        address: "Donderheide 3, 2570 Lier",
        style: "CQB + Extérieur Fort",
        prix: "25-35 €",
        pa: "330 FPS",
        assaut: "350 FPS",
        dmr: "N/A",
        sniper: "450 FPS",
        grammage: "Non spécifié",
        lat: 51.1313,
        lon: 4.5704
    },
    {
        name: "Muchas Maracas",
        address: "680 Pont Malin, 59111 Bouchain (FR)",
        style: "Peupleraie extérieur",
        prix: "PAF 2 € + bio",
        pa: "330 FPS",
        assaut: "350 FPS",
        dmr: "N/A",
        sniper: "450 FPS",
        grammage: "Non spécifié",
        lat: 50.2833,
        lon: 3.3167
    },
    {
        name: "ADES",
        address: "Ennetières-en-Weppes 59320 (FR)",
        style: "Boisé",
        prix: "5 €",
        pa: "330 FPS",
        assaut: "350 FPS",
        dmr: "400-450 FPS",
        sniper: "400-450 FPS",
        grammage: "Non spécifié",
        lat: 50.6347,
        lon: 2.9412
    },
    {
        name: "UTC Seclin",
        address: "Seclin 59113 (FR)",
        style: "Boisé 2,5ha",
        prix: "5 € + cotiz",
        pa: "330 FPS",
        assaut: "350 FPS",
        dmr: "400 FPS",
        sniper: "N/A",
        grammage: "Non spécifié",
        lat: 50.5486,
        lon: 3.0303
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
                ${t.distance ? "📏 " + t.distance.toFixed(1) + " km" : "📏 Activez le GPS pour calculer la distance"}
            </div>
            <div class="info">🌳 Style : ${t.style}</div>
            <div class="info">💶 Prix : ${t.prix}</div>
            <div class="info">🔫 PA / CQB : ${t.pa}</div>
            <div class="info">🔫 Assaut : ${t.assaut}</div>
            ${t.dmr !== "N/A" ? `<div class="info">🎯 DMR : ${t.dmr}</div>` : ""}
            ${t.sniper !== "N/A" ? `<div class="info">🏹 Sniper : ${t.sniper}</div>` : ""}
            ${t.grammage !== "Non spécifié" ? `<div class="info">⚖️ Grammage conseillé : ${t.grammage}</div>` : ""}
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
            (error) => {
                console.warn(`Erreur GPS (${error.code}): ${error.message}`);
                statusDiv.innerHTML = "❌ Impossible d'obtenir la position. Vérifiez les autorisations.";
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });

    afficherTerrains();
});
