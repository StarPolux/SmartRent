/* ===================================
   SmartRent - Dashboard JavaScript
   JS unificado para páginas internas
   =================================== */

// ===================================
// NAVEGACIÓN
// ===================================

// Funcionalidad para botones de navegación
function initNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('logout-btn')) {
                if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
                    window.location.href = '../shared/cerrar-sesion.html';
                }
            }
        });
    });
}

// Marcar la página actual en la navegación
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const href = btn.getAttribute('href');
        if (href && currentPath.includes(href.replace('/', ''))) {
            btn.classList.add('active');
        }
    });
}

// ===================================
// PROPIEDADES
// ===================================

// Funcionalidad para botones "Ver más"
function initPropertyButtons() {
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.property-card, .featured-card');
            const propertyName = card?.querySelector('.property-name')?.textContent;
            if (propertyName) {
                // Redirigir a la página de detalles
                window.location.href = `/pages/arrendatario/propiedad-detalle.html?nombre=${encodeURIComponent(propertyName)}`;
            }
        });
    });
}

// ===================================
// NOTIFICACIONES
// ===================================

function initNotifications() {
    const closeBtn = document.querySelector('.close-btn');
    const emptyBtn = document.getElementById('empty-btn');
    const notificationsList = document.getElementById('notifications-list');
    const emptyState = document.getElementById('empty-state');
    const notificationCount = document.getElementById('notification-count');

    if (!notificationsList) return;

    function updateNotificationCount() {
        const count = document.querySelectorAll('.notification-item').length;
        if (notificationCount) notificationCount.textContent = count;
        
        if (count === 0 && emptyState) {
            if (emptyBtn) emptyBtn.style.display = 'none';
            notificationsList.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            if (emptyBtn) emptyBtn.style.display = 'block';
            notificationsList.style.display = 'block';
            if (emptyState) emptyState.style.display = 'none';
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.history.back();
        });
    }

    if (emptyBtn) {
        emptyBtn.addEventListener('click', () => {
            const notifications = document.querySelectorAll('.notification-item');
            
            notifications.forEach((notification, index) => {
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    notification.style.opacity = '0';
                    notification.style.transition = 'all 0.3s ease';
                }, index * 100);
            });
            
            setTimeout(() => {
                notificationsList.innerHTML = '';
                updateNotificationCount();
            }, notifications.length * 100 + 300);
        });
    }

    updateNotificationCount();
}

// ===================================
// MAPA
// ===================================

function initMap() {
    const backBtn = document.getElementById('back-btn');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const fullscreenBtn = document.getElementById('fullscreen');
    const mapImage = document.getElementById('map-image');

    if (!mapImage) return;

    let currentZoom = 1;
    let translateX = 0;
    let translateY = 0;

    function updateTransform() {
        mapImage.style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`;
    }

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (currentZoom < 3) {
                currentZoom += 0.2;
                updateTransform();
            }
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (currentZoom > 1) {
                currentZoom -= 0.2;
                if (currentZoom <= 1) {
                    currentZoom = 1;
                    translateX = 0;
                    translateY = 0;
                }
                updateTransform();
            }
        });
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (mapImage.requestFullscreen) {
                mapImage.requestFullscreen();
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
    }
}

// ===================================
// CHAT
// ===================================

function initChat() {
    const backBtn = document.getElementById('back-btn');
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.history.back();
        });
    }
}

// ===================================
// UPLOAD / SUBIR ARCHIVO
// ===================================

function initUpload() {
    const exploreBtn = document.getElementById('explore-btn');
    const fileInput = document.getElementById('file-input');
    const previewImage = document.getElementById('preview-image');
    const previewPlaceholder = document.getElementById('preview-placeholder');
    const saveBtn = document.getElementById('save-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    if (!exploreBtn || !fileInput) return;

    exploreBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (previewImage) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                }
                if (previewPlaceholder) {
                    previewPlaceholder.style.display = 'none';
                }
            };
            reader.readAsDataURL(file);
        }
    });

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('Imagen guardada correctamente');
            window.history.back();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            window.history.back();
        });
    }
}

// ===================================
// RESEÑAS
// ===================================

function initReviews() {
    const sortSelect = document.getElementById('sort-select');
    const closeBtn = document.querySelector('.close-btn');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const reviewItems = document.querySelectorAll('.review-item');
            const reviewsList = document.getElementById('reviews-list');
            
            if (!reviewsList) return;

            const sortedItems = Array.from(reviewItems).sort((a, b) => {
                const ratingA = parseFloat(a.dataset.rating) || 0;
                const ratingB = parseFloat(b.dataset.rating) || 0;
                
                switch(e.target.value) {
                    case 'rating-high':
                        return ratingB - ratingA;
                    case 'rating-low':
                        return ratingA - ratingB;
                    default:
                        return 0;
                }
            });

            sortedItems.forEach(item => reviewsList.appendChild(item));
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.history.back();
        });
    }
}

// ===================================
// CUENTA / PERFIL
// ===================================

function initProfile() {
    const editBtn = document.querySelector('.edit-btn');
    const changePhotoLink = document.querySelector('.change-photo');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            window.location.href = '/pages/arrendatario/editar-cuenta.html';
        });
    }

    if (changePhotoLink) {
        changePhotoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '/pages/shared/subir-foto.html';
        });
    }
}

// ===================================
// INICIALIZACIÓN GENERAL
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar navegación
    initNavigation();
    setActiveNavItem();

    // Inicializar componentes según la página
    initPropertyButtons();
    initNotifications();
    initMap();
    initChat();
    initUpload();
    initReviews();
    initProfile();
});
