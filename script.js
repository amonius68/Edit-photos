let saturate = document.getElementById('saturate')
let contrast = document.getElementById('contrast')
let brightness = document.getElementById('brightness')
let sepia = document.getElementById('sepia')
let grayscale = document.getElementById('grayscale')
let blur = document.getElementById('blur')
let hueRotate = document.getElementById('hue-rotate')

let upload = document.getElementById('upload')
let download = document.getElementById('download')
let reset = document.getElementById('reset')
let back = document.getElementById('return')

let img = document.getElementById('img')
let imgBox = document.querySelector('.img-box')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

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
    saturate.value = '100'
    contrast.value = '100'
    brightness.value = '100'
    sepia.value = '0'
    grayscale.value = '0'
    blur.value = '0'
    hueRotate.value = '0'

    ctx.filter = 'none'
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

back.addEventListener('click', function () {
    // استرجاع القيم المخزنة قبل الضغط على زر reset
    saturate.value = lastAppliedFilters.saturate;
    contrast.value = lastAppliedFilters.contrast;
    brightness.value = lastAppliedFilters.brightness;
    sepia.value = lastAppliedFilters.sepia;
    grayscale.value = lastAppliedFilters.grayscale;
    blur.value = lastAppliedFilters.blur;
    hueRotate.value = lastAppliedFilters.hueRotate;

    // إعادة تطبيق الفلاتر على الصورة
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
    download.style.display = 'none'
    reset.style.display = 'none'
    imgBox.style.display = 'none'
    back.style.display = 'none'
}

upload.onchange = function () {
    resetValuse()
    download.style.display = 'block'
    reset.style.display = 'block'
    imgBox.style.display = 'block'
    back.style.display = 'block'

    let file = new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload = function (){
        img.src = file.result
    }
    img.onload = function(){
        canvas.width = img.width
        canvas.height = img.height        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        img.style.display = 'none'
    }
}

let filters = document.querySelectorAll('ul li input')
filters.forEach(filters => {
    filters.addEventListener('input', function () {
        // تخزين القيم الحالية في المتغير قبل التعديل
        lastAppliedFilters.saturate = saturate.value;
        lastAppliedFilters.contrast = contrast.value;
        lastAppliedFilters.brightness = brightness.value;
        lastAppliedFilters.sepia = sepia.value;
        lastAppliedFilters.grayscale = grayscale.value;
        lastAppliedFilters.blur = blur.value;
        lastAppliedFilters.hueRotate = hueRotate.value;

        // تطبيق الفلاتر على الصورة
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
    // بعد إعادة تعيين الفلاتر، يتم تخزين القيم الحالية ليتم استرجاعها لاحقًا
    lastAppliedFilters.saturate = saturate.value;
    lastAppliedFilters.contrast = contrast.value;
    lastAppliedFilters.brightness = brightness.value;
    lastAppliedFilters.sepia = sepia.value;
    lastAppliedFilters.grayscale = grayscale.value;
    lastAppliedFilters.blur = blur.value;
    lastAppliedFilters.hueRotate = hueRotate.value;
    
    resetValuse();
});



download.addEventListener('click', function (){
    download.href = canvas.toDataURL()
    download.download = "Amonius.png"
})


