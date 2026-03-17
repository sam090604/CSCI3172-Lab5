const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const unsplashResults = document.getElementById('unsplashResults');
const uploadInput = document.getElementById('uploadInput');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const memeCanvas = document.getElementById('memeCanvas');
const downloadBtn = document.getElementById('downloadBtn');

let currentImage = null;

// 1. Fetch Unsplash images via our Node.js Proxy
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  
  if (!query) {
    unsplashResults.innerHTML = '<p class="col-span-3 text-yellow-500">Please enter a search term.</p>';
    return;
  }

  unsplashResults.innerHTML = '<div class="col-span-3 text-center text-gray-400">Searching Unsplash...</div>';

  try {
  const res = await fetch(`/.netlify/functions/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Server error');
    
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      unsplashResults.innerHTML = '';
      data.results.forEach(img => {
        const btn = document.createElement('button');
        btn.className = 'hover:opacity-75 transition focus:ring-2 focus:ring-blue-500 rounded';
        btn.setAttribute('aria-label', img.alt_description || 'Select this image');
        
        btn.innerHTML = `
          <img src="${img.urls.thumb}" 
               alt="${img.alt_description || 'Meme background'}" 
               class="rounded w-full h-32 object-cover" />
        `;
        
        btn.onclick = () => loadImage(img.urls.regular);
        unsplashResults.appendChild(btn);
      });
    } else {
      unsplashResults.innerHTML = '<div class="col-span-3 text-center text-red-400">No images found. Try "Angry Cat" or "Success".</div>';
    }
  } catch (err) {
    console.error(err);
    unsplashResults.innerHTML = '<div class="col-span-3 text-center text-red-400">Error connecting to server. Check terminal.</div>';
  }
});

// 2. Handle Local Image Uploads
uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (evt) => loadImage(evt.target.result);
  reader.readAsDataURL(file);
});

// 3. Load Image onto Canvas
function loadImage(src) {
  const img = new Image();
  // crossOrigin is vital for the "Download" button to work with API images
  img.crossOrigin = 'anonymous'; 
  img.onload = function() {
    currentImage = img;
    drawMeme();
    memeCanvas.scrollIntoView({ behavior: 'smooth' });
  };
  img.onerror = () => alert('Could not load image. Try another one.');
  img.src = src;
}

// 4. Core Meme Rendering Logic
function drawMeme() {
  const ctx = memeCanvas.getContext('2d');
  if (!currentImage) return;

  // Clear and set dimensions
  ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
  
  // Fit image to canvas maintaining aspect ratio
  const ratio = Math.min(memeCanvas.width / currentImage.width, memeCanvas.height / currentImage.height);
  const w = currentImage.width * ratio;
  const h = currentImage.height * ratio;
  const x = (memeCanvas.width - w) / 2;
  const y = (memeCanvas.height - h) / 2;
  
  ctx.drawImage(currentImage, x, y, w, h);

  // Text Style Setup (Impact is the classic meme font)
  ctx.lineWidth = Math.floor(memeCanvas.width / 100);
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.lineJoin = 'round';
  
  const fontSize = Math.floor(memeCanvas.width / 10);
  ctx.font = `${fontSize}px Impact, sans-serif`;

  // Draw Top Text
  const topText = topTextInput.value.toUpperCase();
  if (topText) {
    ctx.textBaseline = 'top';
    ctx.strokeText(topText, memeCanvas.width / 2, y + 10);
    ctx.fillText(topText, memeCanvas.width / 2, y + 10);
  }

  // Draw Bottom Text
  const bottomText = bottomTextInput.value.toUpperCase();
  if (bottomText) {
    ctx.textBaseline = 'bottom';
    ctx.strokeText(bottomText, memeCanvas.width / 2, y + h - 10);
    ctx.fillText(bottomText, memeCanvas.width / 2, y + h - 10);
  }
}

// Listen for text changes
topTextInput.addEventListener('input', drawMeme);
bottomTextInput.addEventListener('input', drawMeme);

// 5. Download Functionality
downloadBtn.addEventListener('click', () => {
  if (!currentImage) {
    alert("Select or upload an image first!");
    return;
  }
  const dataURL = memeCanvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'my-awesome-meme.png';
  link.href = dataURL;
  link.click();
});

// 6. Basic Unit Test (Required for README documentation)
function runBasicTest() {
  console.log("Running Unit Test: Canvas Integrity...");
  try {
    const testCtx = memeCanvas.getContext('2d');
    if (testCtx) {
      console.log("✅ Test Passed: Canvas context available.");
    } else {
      throw new Error("Canvas context missing");
    }
  } catch (e) {
    console.error("❌ Test Failed:", e.message);
  }
}

// Run test on load for console proof
runBasicTest();