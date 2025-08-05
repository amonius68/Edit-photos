// ---------- الفلاتر وتعديل صورة واحدة ----------

let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');

let upload = document.getElementById('upload');
let download = document.getElementById('download');
let reset = document.getElementById('reset');
let back = document.getElementById('return');

let img = document.getElementById('img');
let imgBox = document.querySelector('.img-box');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let lastAppliedFilters = {
    saturate: '100',
    contrast: '100',
    brightness: '100',
    sepia: '0',
    grayscale: '0',
    blur: '0',
    hueRotate: '0'
};

function resetValuse() {
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';

    ctx.filter = 'none';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

back.addEventListener('click', function () {
    saturate.value = lastAppliedFilters.saturate;
    contrast.value = lastAppliedFilters.contrast;
    brightness.value = lastAppliedFilters.brightness;
    sepia.value = lastAppliedFilters.sepia;
    grayscale.value = lastAppliedFilters.grayscale;
    blur.value = lastAppliedFilters.blur;
    hueRotate.value = lastAppliedFilters.hueRotate;

    ctx.filter = `
    saturate(${lastAppliedFilters.saturate}%)
    contrast(${lastAppliedFilters.contrast}%)
    brightness(${lastAppliedFilters.brightness}%)
    sepia(${lastAppliedFilters.sepia}%)
    grayscale(${lastAppliedFilters.grayscale})
    blur(${lastAppliedFilters.blur}px)
    hue-rotate(${lastAppliedFilters.hueRotate}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
});

window.onload = function () {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
    back.style.display = 'none';
};

upload.onchange = function () {
    resetValuse();
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';
    back.style.display = 'block';

    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function () {
        img.src = file.result;
    };
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = 'none';
    };
};

let filters = document.querySelectorAll('ul li input');
filters.forEach((filterInput) => {
    filterInput.addEventListener('input', function () {
        lastAppliedFilters.saturate = saturate.value;
        lastAppliedFilters.contrast = contrast.value;
        lastAppliedFilters.brightness = brightness.value;
        lastAppliedFilters.sepia = sepia.value;
        lastAppliedFilters.grayscale = grayscale.value;
        lastAppliedFilters.blur = blur.value;
        lastAppliedFilters.hueRotate = hueRotate.value;

        ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
});

reset.addEventListener('click', function () {
    lastAppliedFilters.saturate = saturate.value;
    lastAppliedFilters.contrast = contrast.value;
    lastAppliedFilters.brightness = brightness.value;
    lastAppliedFilters.sepia = sepia.value;
    lastAppliedFilters.grayscale = grayscale.value;
    lastAppliedFilters.blur = blur.value;
    lastAppliedFilters.hueRotate = hueRotate.value;

    resetValuse();
});

download.addEventListener('click', function () {
    download.href = canvas.toDataURL();
    download.download = "Amonius.png";
});

// ---------- دمج صور متعددة ----------

const multiUpload = document.getElementById("multiUpload");
const merge = document.getElementById("merge");

let uploadedImages = [];

multiUpload.addEventListener("change", function () {
    uploadedImages = [];
    const files = multiUpload.files;

    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[i]);

        fileReader.onload = function (event) {
            const imgElement = new Image();
            imgElement.src = event.target.result;

            imgElement.onload = function () {
                uploadedImages.push(imgElement);
            };
        };
    }
});

merge.addEventListener("click", function () {
    if (uploadedImages.length === 0) return alert("Please upload multiple images.");

    // Grid auto calculation
    const count = uploadedImages.length;
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);

    const imgWidth = uploadedImages[0].width;
    const imgHeight = uploadedImages[0].height;

    canvas.width = cols * imgWidth;
    canvas.height = rows * imgHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    uploadedImages.forEach((img, index) => {
        const x = (index % cols) * imgWidth;
        const y = Math.floor(index / cols) * imgHeight;
        ctx.drawImage(img, x, y, imgWidth, imgHeight);
    });

    imgBox.style.display = 'block';
    download.style.display = 'block';
});
