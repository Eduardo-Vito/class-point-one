// Data Anggota Kelas
const members = [
    { id: 1, name: 'Ahmad Hafizh Novadhilah', role: 'Anggota' },
    { id: 2, name: 'Aisha Dwi Apriliani', role: 'Anggota' },
    { id: 3, name: 'Aisha Keena', role: 'Anggota' },
    { id: 4, name: 'Ajri atthila Baihaqi', role: 'Anggota' },
    { id: 5, name: 'Akbar Ibrahim', role: 'Anggota' },
    { id: 6, name: 'Amandha Freideline Rayendra', role: 'Anggota' },
    { id: 7, name: 'Annissa Siti Mutia', role: 'Anggota' },
    { id: 8, name: 'Aura Hurin Nasywa Tarigan', role: 'Anggota' },
    { id: 9, name: 'Cheryl Aginta Nur Rahmadina', role: 'Anggota' },
    { id: 10, name: 'Diah Ayu Puspitasari', role: 'Anggota' },
    { id: 11, name: 'Eduardo Vito Adisaputra', role: 'Anggota' },
    { id: 12, name: 'Erna Aprilia Putri', role: 'Anggota' },
    { id: 13, name: 'Fifi Alysya Safira', role: 'Anggota' },
    { id: 14, name: 'Gandhis Setyo Nugroho', role: 'Anggota' },
    { id: 15, name: 'Hanamellya Dwieke Zharifa', role: 'Anggota' },
    { id: 16, name: 'Hannan Azkia Syamil', role: 'Anggota' },
    { id: 17, name: 'Hilda Nurul Shafira', role: 'Anggota' },
    { id: 18, name: 'Iqlima Zeta Ihsan', role: 'Anggota' },
    { id: 19, name: 'Khansa Chairunnisa Rodjie', role: 'Anggota' },
    { id: 20, name: 'klarisha Safinatun Barokah', role: 'Anggota' },
    { id: 21, name: 'Leeloo Raffa', role: 'Anggota' },
    { id: 22, name: 'Mahatma Aryanta Sutejo', role: 'Anggota' },
    { id: 23, name: 'Meisya Salsabila', role: 'Anggota' },
    { id: 24, name: 'Michelle Cleodine Sumolang', role: 'Anggota' },
    { id: 25, name: 'Muhammad Abriel Al Faridzi', role: 'Anggota' },
    { id: 26, name: 'Nakeisya Ataya Haura', role: 'Anggota' },
    { id: 27, name: 'Nikeisha Nabilah Sakhi', role: 'Anggota' },
    { id: 28, name: 'Priscilla Gracia Mayra Sibuea', role: 'Anggota' },
    { id: 29, name: 'Putri Zhaskia Anggraini', role: 'Anggota' },
    { id: 30, name: 'Qarina Ramadhani Husin', role: 'Anggota' },
    { id: 31, name: 'Rijal Hameed Al Mahdi', role: 'Anggota' },
    { id: 32, name: 'Satrio Alfatah', role: 'Anggota' },
    { id: 33, name: 'Sulthan Adlii Prasetyo', role: 'Anggota' },
    { id: 34, name: 'Wafiq Nur Azizah', role: 'Anggota' },
    { id: 35, name: 'Zahra Rizky Rahmani', role: 'Anggota' },
    { id: 36, name: 'Zefanya Mei Artanauli Hutahaean', role: 'Anggota' }
];

// Data Galeri (akan dimuat dari Firebase)
let galleryItems = [];
let currentFilter = 'all';

// Upload info text constant
const UPLOAD_INFO_TEXT = 'Foto, Video, GIF (Max 500MB untuk foto, 2GB untuk video)';

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
    
    if (filteredItems.length === 0) {
        galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">Belum ada file yang diupload</p>';
        return;
    }
    
    galleryGrid.innerHTML = filteredItems.map(item => {
        const isVideo = item.url.includes('.mp4') || item.url.includes('.webm') || item.url.includes('.mov') || item.url.includes('.avi');
        return `
            <div class="gallery-item" data-category="${item.category}">
                ${isVideo ? `<video class="gallery-media" src="${item.url}"></video>` : `<img class="gallery-media" src="${item.url}" alt="${item.title}">`}
                <div class="gallery-overlay">
                    <i class="fas ${isVideo ? 'fa-play' : 'fa-search-plus'}"></i>
                </div>
                <div class="gallery-caption">${item.title}</div>
            </div>
        `;
    }).join('');
    
    addGalleryListeners();
}

// Gallery Filter
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderGallery(currentFilter);
        });
    });
}

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalVid = document.getElementById('modalVideo');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

function addGalleryListeners() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const media = this.querySelector('.gallery-media');
            const caption = this.querySelector('.gallery-caption');
            const isVideo = media.tagName === 'VIDEO';
            
            modal.style.display = 'block';
            
            if (isVideo) {
                modalImg.style.display = 'none';
                modalVid.style.display = 'block';
                modalVid.src = media.src;
            } else {
                modalImg.style.display = 'block';
                modalVid.style.display = 'none';
                modalImg.src = media.src;
            }
            captionText.innerHTML = caption.innerText;
        });
    });
}

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    modalVid.pause();
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        modalVid.pause();
    }
});

// FIREBASE UPLOAD FUNCTIONALITY
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const uploadStatus = document.getElementById('uploadStatus');
const titleInput = document.getElementById('titleInput');
const categoryInput = document.getElementById('categoryInput');
const descriptionInput = document.getElementById('descriptionInput');

let selectedFile = null;

// Define file size limits (in bytes)
const FILE_SIZE_LIMITS = {
    photo: 500 * 1024 * 1024,  // 500 MB for photos
    video: 2 * 1024 * 1024 * 1024  // 2 GB for videos
};

// Video file extensions
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'mts', 'm4v'];

// Check if file is video
function isVideoFile(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    return VIDEO_EXTENSIONS.includes(ext);
}

// Get max file size for file type
function getMaxFileSize(filename) {
    return isVideoFile(filename) ? FILE_SIZE_LIMITS.video : FILE_SIZE_LIMITS.photo;
}

// Format bytes to readable format
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Handle drag and drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    selectedFile = e.dataTransfer.files[0];
    updateFileInfo();
});

uploadArea.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    updateFileInfo();
});

function updateFileInfo() {
    if (selectedFile) {
        const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
        uploadArea.innerHTML = `<i class="fas fa-check-circle" style="color: green;"></i><h3>${selectedFile.name}</h3><p>${sizeMB} MB</p>`;
    }
}

uploadBtn.addEventListener('click', uploadFile);

function uploadFile() {
    if (!selectedFile) {
        alert('Pilih file terlebih dahulu!');
        return;
    }
    
    if (!titleInput.value) {
        alert('Masukkan judul foto/video!');
        return;
    }
    
    // Check file size with smart limit
    const maxSize = getMaxFileSize(selectedFile.name);
    const isVideo = isVideoFile(selectedFile.name);
    const fileType = isVideo ? 'video' : 'foto';
    
    if (selectedFile.size > maxSize) {
        const maxSizeFormatted = formatBytes(maxSize);
        alert(`File ${fileType} terlalu besar! Max ${maxSizeFormatted}`);
        return;
    }
    
    const title = titleInput.value;
    const category = categoryInput.value;
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${selectedFile.name}`;
    const storageRef = window.firebaseStorage.ref(window.firebaseStorage.storage, `gallery/${category}/${fileName}`);
    
    const uploadTask = window.firebaseStorage.uploadBytesResumable(storageRef, selectedFile);
    
    progressContainer.style.display = 'block';
    uploadStatus.innerHTML = '';
    
    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressFill.style.width = progress + '%';
            progressText.textContent = `Uploading... ${Math.round(progress)}%`;
        },
        (error) => {
            progressContainer.style.display = 'none';
            uploadStatus.innerHTML = `<p class="error">Error: ${error.message}</p>`;
            console.error('Upload error:', error);
        },
        async () => {
            try {
                const downloadURL = await window.firebaseStorage.getDownloadURL(storageRef);
                
                // Add to gallery
                galleryItems.push({
                    id: timestamp,
                    title: title,
                    category: category,
                    url: downloadURL,
                    description: descriptionInput.value
                });
                
                // Save to localStorage
                localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
                
                progressContainer.style.display = 'none';
                uploadStatus.innerHTML = '<p class="success">✓ File berhasil diupload!</p>';
                
                // Reset form
                titleInput.value = '';
                descriptionInput.value = '';
                categoryInput.value = 'outing';
                selectedFile = null;
                fileInput.value = '';
                uploadArea.innerHTML = `<i class="fas fa-cloud-upload-alt"></i><h3>Drag & drop file di sini</h3><p>atau klik untuk memilih file</p><p class="upload-info">${UPLOAD_INFO_TEXT}</p>`;
                
                // Refresh gallery
                renderGallery(currentFilter);
                
                // Scroll to gallery
                setTimeout(() => {
                    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            } catch (error) {
                progressContainer.style.display = 'none';
                uploadStatus.innerHTML = `<p class="error">Error: ${error.message}</p>`;
                console.error('Download URL error:', error);
            }
        }
    );
}

// Load gallery from Firebase
async function loadGalleryFromFirebase() {
    try {
        // Load from localStorage first
        const savedItems = localStorage.getItem('galleryItems');
        if (savedItems) {
            galleryItems = JSON.parse(savedItems);
        }
        
        // Also try to load from Firebase Storage
        try {
            const storageRef = window.firebaseStorage.ref(window.firebaseStorage.storage, 'gallery');
            const result = await window.firebaseStorage.listAll(storageRef);
            
            // Get files from all category folders
            for (const folder of result.prefixes) {
                const folderResult = await window.firebaseStorage.listAll(folder);
                for (const file of folderResult.items) {
                    const url = await window.firebaseStorage.getDownloadURL(file);
                    const fileName = file.name;
                    const category = folder.name;
                    
                    // Check if already exists
                    if (!galleryItems.find(item => item.url === url)) {
                        galleryItems.push({
                            id: Date.now(),
                            title: fileName.replace(/^\d+_/, ''),
                            category: category,
                            url: url
                        });
                    }
                }
            }
            
            // Save to localStorage
            localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
        } catch (e) {
            console.log('Could not load from Firebase Storage (may not have permission yet)');
        }
        
        renderGallery();
    } catch (error) {
        console.error('Error loading gallery:', error);
        renderGallery();
    }
}

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

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
});

// Initialize
window.addEventListener('load', function() {
    renderMembers();
    loadGalleryFromFirebase();
    setupGalleryFilters();
});