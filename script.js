/* script.js */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const filterBtns = document.querySelectorAll('.btn');

let currentIndex = 0;
// We create a list of currently visible items to ensure navigation works with filters
let visibleItems = Array.from(galleryItems); 

// Open Lightbox
galleryItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        // Find the index of the clicked item within the VISIBLE list
        const clickedIndex = visibleItems.indexOf(e.target);
        if (clickedIndex !== -1) {
            currentIndex = clickedIndex;
            showImage();
            lightbox.style.display = 'flex';
        }
    });
});

// Show Selected Image
function showImage() {
    if (visibleItems.length > 0) {
        lightboxImg.src = visibleItems[currentIndex].src;
    }
}

// Close Lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close Lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Previous Image
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : visibleItems.length - 1;
    showImage();
});

// Next Image
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < visibleItems.length - 1) ? currentIndex + 1 : 0;
    showImage();
});

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        document.querySelector('.btn.active').classList.remove('active');
        btn.classList.add('active');

        let category = btn.getAttribute('data-category');

        // Loop through all items to Hide/Show
        galleryItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // UPDATE the visibleItems list so navigation respects the filter
        visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    });
});
