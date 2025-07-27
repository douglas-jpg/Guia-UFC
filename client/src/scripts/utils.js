const mobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
};

const smoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            const navMenu = document.getElementById('nav-menu');

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth',
                });
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });
};

const courseTabs = () => {
    const courseTabs = document.querySelectorAll('.course-tab');
    const courseContents = document.querySelectorAll('.course-content');

    if (courseTabs.length > 0) {
        courseTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                courseTabs.forEach((t) => t.classList.remove('active'));
                tab.classList.add('active');

                courseContents.forEach((content) =>
                    content.classList.remove('active')
                );

                const courseId = tab.getAttribute('data-course');
                document.getElementById(courseId).classList.add('active');
            });
        });
    }
};

const eventFilters = () => {
    const filterBtns = document.querySelectorAll('.events-filters .filter-btn');
    const eventCards = document.querySelectorAll('.event-card');

    if (filterBtns.length > 0 && eventCards.length > 0) {
        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                eventCards.forEach((card) => {
                    if (filter === 'all') {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = card.classList.contains(filter)
                            ? 'flex'
                            : 'none';
                    }
                });
            });
        });
    }
};

export const utils = () => {
    mobileMenu();
    smoothScrolling();
    courseTabs();
    eventFilters();
};
