// Data Anggota Kelas (Template - Anda bisa mengubahnya)
const members = [
    { id: 1, name: 'Nama Anggota 1', role: 'Anggota' },
    { id: 2, name: 'Nama Anggota 2', role: 'Anggota' },
    { id: 3, name: 'Nama Anggota 3', role: 'Anggota' },
    { id: 4, name: 'Nama Anggota 4', role: 'Anggota' },
    { id: 5, name: 'Nama Anggota 5', role: 'Anggota' },
    { id: 6, name: 'Nama Anggota 6', role: 'Anggota' },
    { id: 7, name: 'Nama Anggota 7', role: 'Anggota' },
    { id: 8, name: 'Nama Anggota 8', role: 'Anggota' },
    { id: 9, name: 'Nama Anggota 9', role: 'Anggota' },
    { id: 10, name: 'Nama Anggota 10', role: 'Anggota' },
    { id: 11, name: 'Nama Anggota 11', role: 'Anggota' },
    { id: 12, name: 'Nama Anggota 12', role: 'Anggota' },
    { id: 13, name: 'Nama Anggota 13', role: 'Anggota' },
    { id: 14, name: 'Nama Anggota 14', role: 'Anggota' },
    { id: 15, name: 'Nama Anggota 15', role: 'Anggota' },
    { id: 16, name: 'Nama Anggota 16', role: 'Anggota' },
    { id: 17, name: 'Nama Anggota 17', role: 'Anggota' },
    { id: 18, name: 'Nama Anggota 18', role: 'Anggota' },
    { id: 19, name: 'Nama Anggota 19', role: 'Anggota' },
    { id: 20, name: 'Nama Anggota 20', role: 'Anggota' },
    { id: 21, name: 'Nama Anggota 21', role: 'Anggota' },
    { id: 22, name: 'Nama Anggota 22', role: 'Anggota' },
    { id: 23, name: 'Nama Anggota 23', role: 'Anggota' },
    { id: 24, name: 'Nama Anggota 24', role: 'Anggota' },
    { id: 25, name: 'Nama Anggota 25', role: 'Anggota' },
    { id: 26, name: 'Nama Anggota 26', role: 'Anggota' },
    { id: 27, name: 'Nama Anggota 27', role: 'Anggota' },
    { id: 28, name: 'Nama Anggota 28', role: 'Anggota' },
    { id: 29, name: 'Nama Anggota 29', role: 'Anggota' },
    { id: 30, name: 'Nama Anggota 30', role: 'Anggota' },
    { id: 31, name: 'Nama Anggota 31', role: 'Anggota' },
    { id: 32, name: 'Nama Anggota 32', role: 'Anggota' },
    { id: 33, name: 'Nama Anggota 33', role: 'Anggota' },
    { id: 34, name: 'Nama Anggota 34', role: 'Anggota' },
    { id: 35, name: 'Nama Anggota 35', role: 'Anggota' },
    { id: 36, name: 'Nama Anggota 36', role: 'Anggota' }
];

// Data Galeri (Template - Anda bisa menambahkan foto Anda)
const galleryItems = [
    { id: 1, title: 'Foto Memori 1', category: 'outing', image: 'https://via.placeholder.com/400x300?text=Foto+1' },
    { id: 2, title: 'Foto Memori 2', category: 'event', image: 'https://via.placeholder.com/400x300?text=Foto+2' },
    { id: 3, title: 'Foto Memori 3', category: 'study', image: 'https://via.placeholder.com/400x300?text=Foto+3' },
    { id: 4, title: 'Foto Memori 4', category: 'outing', image: 'https://via.placeholder.com/400x300?text=Foto+4' },
    { id: 5, title: 'Foto Memori 5', category: 'event', image: 'https://via.placeholder.com/400x300?text=Foto+5' },
    { id: 6, title: 'Foto Memori 6', category: 'study', image: 'https://via.placeholder.com/400x300?text=Foto+6' },
    { id: 7, title: 'Foto Memori 7', category: 'outing', image: 'https://via.placeholder.com/400x300?text=Foto+7' },
    { id: 8, title: 'Foto Memori 8', category: 'event', image: 'https://via.placeholder.com/400x300?text=Foto+8' }
];

// Render Members
function renderMembers() {
    const membersGrid = document.getElementById('membersGrid');
    membersGrid.innerHTML = members.map(member => `
        <div class="member-card">
            <div class="member-photo">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
            </div>
        </div>
    `).join('');
}

// Render Gallery
function renderGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
    
    galleryGrid.innerHTML = filteredItems.map(item => `
        <div class="gallery-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}" class="gallery-img">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
            <div class="gallery-caption">${item.title}</div>
        </div>
    `).join('');
    
    // Add click listeners to gallery items
    addGalleryListeners();
}

// Gallery Filter
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            renderGallery(filter);
        });
    });
}

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

function addGalleryListeners() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption');
            modal.style.display = 'block';
            modalImg.src = img.src;
            captionText.innerHTML = caption.innerText;
        });
    });
}

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Smooth scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// Initialize
window.addEventListener('load', function() {
    renderMembers();
    renderGallery();
    setupGalleryFilters();
});
