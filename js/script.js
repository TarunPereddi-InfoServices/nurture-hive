function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        setTimeout(() => {
            navMenu.style.display = 'none';
        }, 500);
        hamburgerBtn.classList.remove('active');
    } else {
        navMenu.style.display = 'flex';
        setTimeout(() => {
            navMenu.classList.add('show');
        }, 10);
        hamburgerBtn.classList.add('active');
    }
}
