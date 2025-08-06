window.lazyMedia = Array.from(document.querySelectorAll('img[data-lazy-load],source[data-lazy-load]'));
let windowHeight = document.documentElement.clientHeight + 400;
window.addEventListener('scroll', lazyScroll);
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        lazyScrollCheck();
    }, 200);
});
function lazyScroll() {
    if (document.querySelectorAll('img[data-lazy-load],source[data-lazy-load]').length > 0) {
        lazyScrollCheck();
    }
}
function lazyScrollCheck() {
    if (window.lazyMedia.length > 0) {
        window.lazyMedia.forEach((media, index) => {
            let mediaPosition = media.getBoundingClientRect().top + pageYOffset;
            if (pageYOffset > mediaPosition - windowHeight) {
                if (media.dataset.src) {
                    if (!media.closest('.header-menu-item.has-submenu')) {
                        media.src = media.dataset.src;
                        media.removeAttribute('data-src');
                        if (media.tagName === 'SOURCE') {
                            media.closest('video').load();
                        }
                    }
                    window.lazyMedia.splice(index, 1);
                }
            }
        });
    }
}
function reloadLazyLoad() {
    let reloadLazyMedia = document.querySelectorAll('img[data-lazy-load],source[data-lazy-load]');
    if (reloadLazyMedia.length > 0) {
        reloadLazyMedia.forEach(media => {
            if (media.dataset.src) {
                let mediaPosition = media.getBoundingClientRect().top + pageYOffset;
                if (pageYOffset > mediaPosition - windowHeight) {
                    media.src = media.dataset.src;
                    media.removeAttribute('data-src');
                    if (media.tagName === 'SOURCE') {
                        media.closest('video').load();
                    }
                }
            }
        });
    }
    window.lazyMedia = Array.from(document.querySelectorAll('img[data-lazy-load],source[data-lazy-load]'));
    window.mediaPosition = [];
}
