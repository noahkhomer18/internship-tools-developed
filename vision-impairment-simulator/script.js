const imageMap = {
    "family_dinner": "https://i.ibb.co/8gmqpyQ/Family-Dinner.jpg",
    "freeway_entrance_signs": "https://i.ibb.co/DKr7s18/Freeway-entrance-signs.jpg",
    "game_day_snacks": "https://i.ibb.co/G3gHLHR/Game-Day-snacks.jpg",
    "gentle_stream_rolling_through_the_woods": "https://i.ibb.co/MGBJ7td/Gentle-stream-rolling-through-the-woods.jpg",
    "houston_tx_skyline_on_a_sunny_day": "https://i.ibb.co/f1L4Njn/Houston-TX-skyline-on-a-sunny-day.jpg",
    "looking_down_a_supermarket_aisle": "https://i.ibb.co/WD3KhFC/Looking-down-a-supermarket-aisle.jpg",
    "playing_with_children_in_the_backyard": "https://i.ibb.co/dJp4fdV/Playing-with-children-in-the-backyard.jpg",
    "reading_a_restaurant_menu": "https://i.ibb.co/xjpv31S/Reading-a-restaurant-menu.jpg",
    "shopping_at_the_farmers_market": "https://i.ibb.co/QQtvSVZ/Shopping-at-the-farmers-market.jpg",
    "using_my_smartphone": "https://i.ibb.co/F4x1Nbf/Using-my-smartphone.jpg",
    "walking_along_a_garden_path": "https://i.ibb.co/MsRvyfh/Walking-along-a-garden-path.jpg",
    "watching_a_movie_at_home": "https://i.ibb.co/wBTpGMc/Watching-a-movie-at-home.jpg",
    "christmas_morning": "https://i.ibb.co/PTv2qLV/Christmas-morning.jpg",
    "crossing_a_busy_street": "https://i.ibb.co/hcFzpKJ/Crossing-a-busy-street.jpg"
};

const visionMap = {
    "blurred_vision": { name: "Blurred Vision", desc: "Objects appear fuzzy and unclear.", blurClass: "active2" },
    "glaucoma": { name: "Glaucoma", desc: "Loss of peripheral vision leading to tunnel-like sight.", overlayImage: "https://sightcentertoledo.org/wp-content/uploads/2021/04/glaucoma2.png", blurClass: "active1" },
    "cataracts": { name: "Cataracts", desc: "Cloudy lens causing hazy or foggy vision.", overlayImage: "https://sightcentertoledo.org/wp-content/uploads/2021/04/cataracts2.png", blurClass: "active2" },
    "macular_degeneration": { name: "Macular Degeneration", desc: "Central vision loss, making it hard to see details.", overlayImage: "https://sightcentertoledo.org/wp-content/uploads/2021/04/macular-degeneration2.png", blurClass: "active1" },
    "night_blindness": { name: "Night Blindness", desc: "Difficulty seeing in low light or at night.", blurClass: "active1", overlayCSS: "background: rgba(0,0,0,0.5);" },
    "achromatopsia": { name: "Achromatopsia (No Color)", desc: "Complete color blindness, only shades of gray.", filterCSS: "grayscale(100%)" },
    "reduced_contrast": { name: "Reduced Contrast", desc: "Difficulty distinguishing between similar tones.", filterCSS: "contrast(70%) brightness(110%)" },
    "glare": { name: "Glare/Haze", desc: "Light scattering causes bright glare and reduced detail.", overlayCSS: "background: rgba(255,255,255,0.3);" },
    "yellow_tint": { name: "Yellow Tint", desc: "A yellowish filter over vision.", overlayCSS: "background: rgba(255,230,150,0.2);" },
    "dim_vision": { name: "Dim Vision", desc: "Reduced brightness, everything looks darker.", overlayCSS: "background: rgba(0,0,0,0.5);" },
    "tunnel_vision": { name: "Tunnel Vision", desc: "Only central vision is clear, peripheral vision lost.", overlayCSS: "background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 90%);" }
};

const picbox = document.getElementById("simviewer");
const impbox = document.getElementById("siminner");
const perfectBox = document.getElementById("perfectInner");
const impairmentTitle = document.getElementById("impairmentTitle");
const impairmentDesc = document.getElementById("impairmentDesc");

let currentVision = "";
let currentImage = "";

function removeActiveClasses() {
    for (let i=1; i<=10; i++) {
        picbox.classList.remove("active"+i);
    }
}

function updateInfoBox() {
    if (!currentVision) {
        impairmentTitle.textContent = "No Impairment Selected";
        impairmentDesc.textContent = "Select a vision problem to see its details.";
        return;
    }
    const vData = visionMap[currentVision];
    impairmentTitle.textContent = "Selected Vision Problem: " + vData.name;
    impairmentDesc.textContent = vData.desc;
}

function simulateVision() {
    // If either is not chosen, don't display images
    if (!currentVision || !currentImage) {
        perfectBox.style.backgroundImage = "none";
        picbox.style.backgroundImage = "none";
        updateInfoBox();
        return;
    }

    const baseUrl = imageMap[currentImage] + "?auto=format&fit=crop&w=800&q=80";

    // Perfect vision on the left
    perfectBox.style.backgroundImage = `url('${baseUrl}')`;

    // Impaired on the right
    picbox.style.backgroundImage = `url('${baseUrl}')`;

    // Reset filters and overlays
    removeActiveClasses();
    picbox.style.filter = "";
    impbox.style.background = "none";
    impbox.style.backgroundImage = "none";

    const vData = visionMap[currentVision];

    // Apply blurClass if present
    if (vData.blurClass) {
        picbox.classList.add(vData.blurClass);
    }

    // Apply filterCSS if present
    if (vData.filterCSS) {
        picbox.style.filter = vData.filterCSS;
    }

    // Apply overlayCSS if present
    if (vData.overlayCSS) {
        impbox.setAttribute("style", "");
        impbox.style.backgroundImage = "none";
        impbox.setAttribute("style", impbox.getAttribute("style") + vData.overlayCSS);
    }

    // Apply overlayImage if present
    if (vData.overlayImage) {
        impbox.style.backgroundImage = `url('${vData.overlayImage}')`;
        impbox.style.backgroundSize = "cover";
        impbox.style.backgroundPosition = "center";
    }

    updateInfoBox();
}

document.getElementById('visionSelect').addEventListener('change', (e) => {
    currentVision = e.target.value;
    simulateVision();
});

document.getElementById('imageSelect').addEventListener('change', (e) => {
    currentImage = e.target.value;
    simulateVision();
});
