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
    "blurred_vision": { blurClass: "active2" },
    "glaucoma": { overlayImage: "https://sightcentertoledo.org/wp-content/uploads/2021/04/glaucoma2.png", blurClass: "active1" },
    "cataracts": { overlayImage: "https://sightcentertoledo.org/wp-content/uploads/2021/04/cataracts2.png", blurClass: "active2" },
    "macular_degeneration": { overlayImage: "https://sightcentertoledo.org/wp-content/uploads/2021/04/macular-degeneration2.png", blurClass: "active1" },
    "night_blindness": { blurClass: "active1", overlayCSS: "background: rgba(0,0,0,0.5);" },
    "achromatopsia": { filterCSS: "grayscale(100%)" },
    "reduced_contrast": { filterCSS: "contrast(70%) brightness(110%)" },
    "glare": { overlayCSS: "background: rgba(255,255,255,0.3);" },
    "yellow_tint": { overlayCSS: "background: rgba(255,230,150,0.2);" },
    "dim_vision": { overlayCSS: "background: rgba(0,0,0,0.5);" },
    "tunnel_vision": { overlayCSS: "background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 90%);" }
};

const picbox = document.getElementById("simviewer");
const impbox = document.getElementById("siminner");
const perfectBox = document.getElementById("perfectInner");

let currentVision = "";
let currentImage = "";

function removeActiveClasses() {
    for (let i=1; i<=10; i++) {
        picbox.classList.remove("active"+i);
    }
}

function simulateVision() {
    if (!currentVision || !currentImage) return;
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
        impbox.style.background = "none";
        impbox.style.backgroundImage = "none";
        impbox.setAttribute("style", impbox.getAttribute("style") + vData.overlayCSS);
    }

    // Apply overlayImage if present
    if (vData.overlayImage) {
        impbox.style.backgroundImage = `url('${vData.overlayImage}')`;
        impbox.style.backgroundSize = "cover";
        impbox.style.backgroundPosition = "center";
    }
}

function handleVisionClick(e) {
    if (!e.target.classList.contains('option-btn')) return;
    document.querySelectorAll('#vision-options .option-btn').forEach(btn=>btn.classList.remove('active'));
    e.target.classList.add('active');
    currentVision = e.target.getAttribute('data-vision');
    simulateVision();
}

function handleImageClick(e) {
    if (!e.target.classList.contains('option-btn')) return;
    document.querySelectorAll('#image-options .option-btn').forEach(btn=>btn.classList.remove('active'));
    e.target.classList.add('active');
    currentImage = e.target.getAttribute('data-image');
    simulateVision();
}

document.getElementById('vision-options').addEventListener('click', handleVisionClick);
document.getElementById('image-options').addEventListener('click', handleImageClick);
