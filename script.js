// File: script.js - FULL JAVASCRIPT DENGAN SEMUA ANIMASI
// Inisialisasi AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-out'
});

// Data galeri (6 foto)
const galleryImages = [
  'assets/galeri/poto1.jpeg',
  'assets/galeri/poto2.jpeg',
  'assets/galeri/poto3.jpeg',
  'assets/galeri/poto4.jpeg',
  'assets/galeri/poto5.jpeg',
  'assets/galeri/poto6.jpeg'
];

// Target tanggal pernikahan (09 Mei 2026)
const weddingDate = new Date(2026, 4, 9, 0, 0, 0);

// Ambil nama tamu dari URL
const urlParams = new URLSearchParams(window.location.search);
let guestName = urlParams.get('to') || urlParams.get('nama') || "Tamu Undangan";
guestName = decodeURIComponent(guestName);

// Set nama tamu
const homeGuestName = document.getElementById('home-guest-name');
const navGuestName = document.getElementById('nav-guest-name');
if (homeGuestName) homeGuestName.innerText = guestName;
if (navGuestName) navGuestName.innerText = guestName;

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }, 1500);
});

// Scroll Down Buttons
const scrollDownBtn = document.getElementById('scroll-down-btn');
const scrollSmallBtns = document.querySelectorAll('.scroll-down-btn-small');

function scrollToNextSection(currentSectionId) {
  const sections = document.querySelectorAll('.section');
  let currentIndex = -1;
  sections.forEach((section, index) => {
    if (section.id === currentSectionId) {
      currentIndex = index;
    }
  });
  if (currentIndex !== -1 && currentIndex + 1 < sections.length) {
    const nextSection = sections[currentIndex + 1];
    const offset = 70;
    const elementPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
  }
}

if (scrollDownBtn) {
  scrollDownBtn.addEventListener('click', () => scrollToNextSection('home'));
}
scrollSmallBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const parentSection = btn.closest('.section');
    if (parentSection) {
      scrollToNextSection(parentSection.id);
    }
  });
});

// Smooth Scroll Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
  let currentSection = '';
  const scrollPosition = window.scrollY + 150;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === currentSection) {
      link.classList.add('active');
    }
  });
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 70;
    const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const sectionId = link.getAttribute('data-section');
    scrollToSection(sectionId);
  });
});

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Music Player
let bgMusic = null;
let isMusicPlaying = false;
let musicStarted = false;

function initAudio() {
  if (!bgMusic) {
    bgMusic = document.getElementById('bgm');
    if (!bgMusic) {
      bgMusic = new Audio('assets/music/lagu.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0.4;
    }
  }
}

function playMusic() {
  initAudio();
  bgMusic.play()
    .then(() => {
      isMusicPlaying = true;
      musicStarted = true;
      updateMusicButton(true);
    })
    .catch(err => console.log('Autoplay blocked:', err));
}

function pauseMusic() {
  if (bgMusic) {
    bgMusic.pause();
    isMusicPlaying = false;
    updateMusicButton(false);
  }
}

function toggleMusic() {
  initAudio();
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function updateMusicButton(playing) {
  const musicBtn = document.getElementById('music-toggle');
  if (musicBtn) {
    if (playing) {
      musicBtn.innerHTML = '<i class="fas fa-pause" aria-hidden="true"></i>';
      musicBtn.classList.remove('muted');
    } else {
      musicBtn.innerHTML = '<i class="fas fa-music" aria-hidden="true"></i>';
      musicBtn.classList.add('muted');
    }
  }
}

const musicBtn = document.getElementById('music-toggle');
if (musicBtn) musicBtn.addEventListener('click', toggleMusic);

function enableAudioOnInteraction() {
  if (!musicStarted) playMusic();
  document.removeEventListener('click', enableAudioOnInteraction);
  document.removeEventListener('touchstart', enableAudioOnInteraction);
  document.removeEventListener('scroll', enableAudioOnInteraction);
}

document.addEventListener('click', enableAudioOnInteraction);
document.addEventListener('touchstart', enableAudioOnInteraction);
document.addEventListener('scroll', enableAudioOnInteraction, { once: true });

// Countdown
function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;
  if (diff <= 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerText = '00';
    });
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (86400000)) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  document.getElementById('days').innerText = days.toString().padStart(2, '0');
  document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
  document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Countdown Pulse Effect
function addCountdownPulse() {
  const countdownNumbers = document.querySelectorAll('.time-card span');
  const originalValues = {};
  
  countdownNumbers.forEach(el => {
    originalValues[el.id] = el.innerText;
  });
  
  setInterval(() => {
    countdownNumbers.forEach(el => {
      if (originalValues[el.id] !== el.innerText) {
        el.classList.add('changed');
        originalValues[el.id] = el.innerText;
        setTimeout(() => {
          el.classList.remove('changed');
        }, 300);
      }
    });
  }, 1000);
}

// Progress Bar
function createProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Scroll Top Button
function createScrollTopButton() {
  const btn = document.createElement('button');
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Kembali ke atas');
  btn.setAttribute('title', 'Kembali ke atas');
  document.body.appendChild(btn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Floating Hearts
function createFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '<i class="fas fa-heart" aria-hidden="true"></i>';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (8 + Math.random() * 20) + 'px';
    heart.style.animationDelay = Math.random() * 15 + 's';
    heart.style.animationDuration = (6 + Math.random() * 10) + 's';
    container.appendChild(heart);
  }
}

// Enhanced Floating Hearts (continuous)
function enhanceFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  if (!container) return;
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (10 + Math.random() * 25) + 'px';
    heart.style.animationDuration = (6 + Math.random() * 8) + 's';
    heart.style.animationDelay = '0s';
    container.appendChild(heart);
    
    setTimeout(() => {
      if (heart && heart.remove) heart.remove();
    }, 10000);
  }, 800);
}

// Gallery dengan Lightbox
const galleryGrid = document.getElementById('gallery-grid');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
let currentImageIndex = 0;

function buildGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';
  galleryImages.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-aos-delay', (index * 100).toString());
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Gallery ${index + 1}`;
    img.loading = 'lazy';
    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(item);
  });
}

function openLightbox(index) {
  currentImageIndex = index;
  lightboxImg.src = galleryImages[currentImageIndex];
  lightboxCaption.textContent = `Momen Bahagia ${currentImageIndex + 1}`;
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImageIndex];
  lightboxCaption.textContent = `Momen Bahagia ${currentImageIndex + 1}`;
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImageIndex];
  lightboxCaption.textContent = `Momen Bahagia ${currentImageIndex + 1}`;
}

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-next')?.addEventListener('click', nextImage);
document.querySelector('.lightbox-prev')?.addEventListener('click', prevImage);
lightboxModal?.addEventListener('click', (e) => {
  if (e.target === lightboxModal) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightboxModal?.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

buildGallery();

// Smooth Reveal untuk Gallery
function initGalleryReveal() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  galleryItems.forEach(item => observer.observe(item));
}

// Magnetic Button Effect
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-submit-glass, .glass-btn, .nav-link');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const moveX = x * 0.1;
      const moveY = y * 0.1;
      btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

// Petals Effect
function createPetals() {
  const container = document.createElement('div');
  container.className = 'petals-container';
  document.body.appendChild(container);
  
  const petals = ['🌸', '🌿', '🌺', '✨', '💕', '🌼', '🍃'];
  
  for(let i = 0; i < 60; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
    petal.style.cssText = `
      position: absolute;
      top: -20px;
      left: ${Math.random() * 100}%;
      font-size: ${10 + Math.random() * 20}px;
      opacity: ${0.3 + Math.random() * 0.5};
      animation: fall ${5 + Math.random() * 10}s linear infinite;
      animation-delay: ${Math.random() * 10}s;
      transform: rotate(${Math.random() * 360}deg);
      pointer-events: none;
    `;
    container.appendChild(petal);
  }
}

// Particle Background untuk Hero
function createParticleBackground() {
  const hero = document.querySelector('#home');
  if (!hero) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${2 + Math.random() * 5}px;
      height: ${2 + Math.random() * 5}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
      pointer-events: none;
    `;
    hero.appendChild(particle);
  }
}

// Tambahan keyframes untuk particle
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes floatParticle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 0.8; }
    90% { opacity: 0.8; }
    100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
  }
  
  @keyframes fall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.7; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(particleStyle);

// RSVP Form dengan Google Sheet
const rsvpForm = document.getElementById('rsvp-form');
const rsvpMessage = document.getElementById('rsvp-status-message');
const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXDZL7sxNQpZn1VVn9w-oayiN-VVB1PiQ3rfLMWTMDuhJs2GdHQRMZvo5ijb-tpNKh/exec';

async function loadRSVPData() {
  const tableBody = document.getElementById('rsvp-table-body');
  if (!tableBody) return;
  tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;"><i class="fas fa-spinner fa-pulse"></i> Memuat data...<\/td></td>';
  try {
    const response = await fetch(`${RSVP_SCRIPT_URL}?action=getData`);
    const result = await response.json();
    if (result.success && result.data && result.data.length > 0) {
      tableBody.innerHTML = '';
      result.data.forEach(row => {
        const tr = document.createElement('tr');
        const timestamp = row.Timestamp || row.timestamp || '-';
        const namaTamu = row.Nama_Tamu || row.name || '-';
        let statusKehadiran = row.Status_Kehadiran || row.attendance || '-';
        if (statusKehadiran === 'Hadir') statusKehadiran = '✅ Hadir';
        else if (statusKehadiran === 'Tidak Hadir') statusKehadiran = '❌ Tidak Hadir';
        else if (statusKehadiran === 'Ragu') statusKehadiran = '🤔 Ragu';
        const jumlahTamu = row.Jumlah_Tamu || row.guests || '0';
        const keterangan = row.Keterangan || row.message || '-';
        tr.innerHTML = `
          <td>${escapeHtml(timestamp)}</td>
          <td>${escapeHtml(namaTamu)}</td>
          <td>${escapeHtml(statusKehadiran)}</td>
          <td>${escapeHtml(jumlahTamu)}</td>
          <td>${escapeHtml(keterangan)}</td>
        `;
        tableBody.appendChild(tr);
      });
    } else {
      tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">✨ Belum ada data RSVP. Jadilah yang pertama! ✨</td></tr>';
    }
  } catch (error) {
    console.error('Gagal load data RSVP:', error);
    tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center;">⚠️ Gagal memuat data</td></tr>';
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvp-name').value.trim();
    const status = document.getElementById('rsvp-status').value;
    const guests = document.getElementById('rsvp-guests').value || '1';
    const keterangan = document.getElementById('rsvp-message').value.trim() || '';
    if (!name) {
      rsvpMessage.innerHTML = '❌ Harap isi nama lengkap Anda';
      rsvpMessage.style.color = '#e74c3c';
      return;
    }
    if (!status) {
      rsvpMessage.innerHTML = '❌ Harap pilih status kehadiran';
      rsvpMessage.style.color = '#e74c3c';
      return;
    }
    rsvpMessage.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Mengirim konfirmasi...';
    rsvpMessage.style.color = '#c9a96e';
    try {
      const formData = new URLSearchParams();
      formData.append('Nama_Tamu', name);
      formData.append('Status_Kehadiran', status);
      formData.append('Jumlah_Tamu', guests);
      formData.append('Keterangan', keterangan);
      formData.append('Timestamp', new Date().toLocaleString('id-ID'));
      await fetch(RSVP_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });
      rsvpMessage.innerHTML = '✅ Terima kasih! Konfirmasi kehadiran Anda telah tersimpan.';
      rsvpMessage.style.color = '#27ae60';
      rsvpForm.reset();
      setTimeout(() => loadRSVPData(), 1000);
      setTimeout(() => { rsvpMessage.innerHTML = ''; }, 5000);
    } catch (error) {
      console.error('RSVP Error:', error);
      rsvpMessage.innerHTML = '⚠️ Gagal mengirim. Silakan coba lagi.';
      rsvpMessage.style.color = '#e74c3c';
    }
  });
}

// Panggil semua fungsi setelah DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    addCountdownPulse();
    createProgressBar();
    initGalleryReveal();
    initMagneticButtons();
    createParticleBackground();
    createScrollTopButton();
    enhanceFloatingHearts();
  }, 500);
  
  setTimeout(createPetals, 2000);
});

// Panggil fungsi floating hearts
setTimeout(createFloatingHearts, 1000);

// Load RSVP Data
loadRSVPData();

// Refresh AOS
if (typeof AOS !== 'undefined') {
  AOS.refresh();
}

console.log('✨ Undangan Vinny & Yopie siap digunakan dengan semua animasi!');
console.log('💡 Tips: Ganti nama tamu dengan menambah ?to=NamaTamu di URL');