// Modern Vanilla JavaScript - No jQuery dependency, uses script defer for DOM readiness
// Constants
const SCROLL_THRESHOLD_LOW = 400;
const SCROLL_THRESHOLD_HIGH = 3000;
const ANIMATION_DURATION = 1000;
const SLIDE_DURATION = 500;
const CONTENT_URL = 'assets/data/content.json';

// Global content data
let contentData = null;

// Initialize page immediately - DOM is ready thanks to defer attribute
(async function () {
    try {
        // Load content data
        await loadContentData();

        // Initialize page elements
        window.scrollTo(0, document.body.scrollHeight);
        hide(querySelector('.dayC'));
        slideToggle(querySelector('.messageI'), 0);

        // Apply initial animations to list items
        initializeListAnimations();

        // Setup event listeners after content is loaded
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing page:', error);
        // Fallback: setup event listeners even if content loading fails
        setupEventListeners();
    }
})();

async function loadContentData() {
    try {
        const response = await fetch(CONTENT_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        contentData = await response.json();
        console.log('Content data loaded successfully');
    } catch (error) {
        console.error('Error loading content data:', error);
        // Fallback to basic content structure
        contentData = createFallbackContent();
    }
}

function createFallbackContent() {
    return {
        personal: {name: "Manish Aneja", age: 19, status: "Student"},
        aboutMe: {
            title: "About Me",
            intro: "Content loading failed. Please refresh the page.",
            points: []
        },
        studies: {title: "Studies", intro: "Content unavailable", education: [], scores: []},
        skills: {
            web: {title: "Web Skills", intro: "Content unavailable", categories: {}},
            programming: {title: "Programming", intro: "Content unavailable", languages: []}
        },
        experience: {title: "Experience", intro: "Content unavailable", projects: []}
    };
}

// Utility functions to replace jQuery
function querySelector(selector) {
    return document.querySelector(selector);
}

function querySelectorAll(selector) {
    return document.querySelectorAll(selector);
}

function addClass(element, className) {
    if (element) element.classList.add(className);
}

function removeClass(element, className) {
    if (element) element.classList.remove(className);
}

function toggleClass(element, className) {
    if (element) element.classList.toggle(className);
}

function addClassToAll(elements, className) {
    elements.forEach(el => addClass(el, className));
}

function removeClassFromAll(elements, className) {
    elements.forEach(el => removeClass(el, className));
}

function hide(element) {
    if (element) element.style.display = 'none';
}

function show(element) {
    if (element) element.style.display = 'block';
}

function fadeToggle(element, duration = 1000) {
    if (!element) return;

    const isVisible = element.style.opacity !== '0' && element.style.display !== 'none';

    element.style.transition = `opacity ${duration}ms ease`;

    if (isVisible) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.display = 'none';
        }, duration);
    } else {
        element.style.display = 'block';
        element.style.opacity = '1';
    }
}

function slideToggle(element, duration = 500) {
    if (!element) return;

    const isVisible = element.style.display !== 'none';

    if (isVisible) {
        element.style.transition = `height ${duration}ms ease`;
        element.style.height = element.offsetHeight + 'px';
        element.offsetHeight; // Force reflow
        element.style.height = '0px';
        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '';
            element.style.transition = '';
        }, duration);
    } else {
        element.style.display = 'block';
        const height = element.scrollHeight + 'px';
        element.style.height = '0px';
        element.style.transition = `height ${duration}ms ease`;
        element.offsetHeight; // Force reflow
        element.style.height = height;
        setTimeout(() => {
            element.style.height = '';
            element.style.transition = '';
        }, duration);
    }
}

function setHTML(element, html) {
    if (element) element.innerHTML = html;
}

function getText(element) {
    return element ? element.textContent || element.innerText : '';
}

function setAttribute(element, name, value) {
    if (element) element.setAttribute(name, value);
}

function focus(element) {
    if (element) element.focus();
}

// Animation utility functions
function applyListAnimation(elements, animationClass, removeClasses = []) {
    if (!elements || elements.length === 0) return;

    elements.forEach(element => {
        // Remove any conflicting animation classes
        removeClasses.forEach(className => {
            removeClass(element, className);
        });

        // Ensure element has the animated base class
        addClass(element, 'animated');

        // Add the specific animation class
        addClass(element, animationClass);
    });
}

function resetListAnimations(elements) {
    if (!elements || elements.length === 0) return;

    elements.forEach(element => {
        // Remove all animation classes
        removeClass(element, 'bounceInLeft');
        removeClass(element, 'bounceOutRight');
        removeClass(element, 'bounceInDown');
        removeClass(element, 'bounceOutUp');
    });
}

function initializeListAnimations() {
    // Wait for DOM to be fully ready, then apply animations
    setTimeout(() => {
        const windElements = querySelectorAll(".wind ul li");
        applyListAnimation(windElements, "bounceOutRight");

        // Also ensure any existing modal content has animations
        const modalListItems = querySelectorAll("#extraBox .content ul li");
        if (modalListItems.length > 0) {
            applyListAnimation(modalListItems, "bounceInLeft");
        }
    }, 200); // Increased timeout to ensure DOM is ready
}

// HTML Generation Functions
function generateAboutMeHTML(data) {
    const points = data.points.map(point => {
        if (point.includes(data.personal?.name || "Manish Aneja")) {
            point = point.replace(data.personal.name, `<span class="highlight">${data.personal.name}</span>`);
        }
        if (point.includes("B.Tech Student")) {
            point = point.replace("B.Tech Student", `<span class="highlight">B.Tech Student</span>`);
        }
        return `  <li>${point}</li>`;
    }).join('\n');

    return `
        <span class='content-intro'>${data.intro}</span>
        <ul class='content-list size15'>
${points}
        </ul>`;
}

function generateStudiesHTML(data) {
    const educationItems = data.education.map(edu =>
        `  <li>${edu.type} from ${edu.institution}${edu.university ? ` under ${edu.university}` : ''}</li>`
    ).join('\n');

    const scoreItems = data.scores.map(score =>
        `  <li>Score of ${score.exam} (Year: ${score.year})<br><span class="progressBar">${score.score}</span></li>`
    ).join('\n');

    const currentYear = contentData.personal?.currentYear || "3rd Year of B.Tech";

    return `
        <span class='content-intro'>${data.intro}</span>
        <ul class='content-list size15'>
${educationItems}
${scoreItems}
          <li>I am currently in ${currentYear}.</li>
        </ul>`;
}

function generateWebSkillsHTML(data) {
    const categories = Object.keys(data.categories).map(catKey => {
        const category = data.categories[catKey];
        const colorClass = catKey === 'frontend' || catKey === 'backend' ? 'red' : 'blue';
        const skills = category.skills.map(skill => `      <li>${skill}</li>`).join('\n');

        return `  <li>${category.title}</li>
  <li>
    <ul class='specialList ${colorClass}'>
${skills}
    </ul>
  </li>`;
    }).join('\n');

    return `
        <span class='content-intro'>${data.intro}</span>
        <ul class='content-list size15'>
${categories}
        </ul>`;
}

function generateProgrammingHTML(data) {
    const languages = data.languages.map(lang =>
        `  <li>${lang.name}<br><span class="progressBar">${lang.level}</span></li>`
    ).join('\n');

    return `
        <span class='content-intro'>${data.intro}</span>
        <ul class='content-list size15'>
          <li>Comfort Level in:</li>
${languages}
        </ul>`;
}

function generateExperienceHTML(data) {
    const projects = data.projects.map(project => {
        const linkText = project.description || project.name;
        return `  <li>${project.name} <a href="${project.url}" target="_blank" rel="noopener noreferrer">${linkText}</a></li>`;
    }).join('\n');

    return `
        <span class='content-intro'>${data.intro}</span>
        <ul class='content-list size15'>
${projects}
        </ul>`;
}

function setupEventListeners() {
    // Theme toggle with keyboard support
    const themeElement = querySelector('#theme');
    if (themeElement) {
        ['click', 'keypress'].forEach(eventType => {
            themeElement.addEventListener(eventType, function (e) {
                if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        });
    }

    // Scroll handler with debouncing
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 10);
    });

    // Info panel toggle with keyboard support
    const detailElement = querySelector('#detail');
    if (detailElement) {
        ['click', 'keypress'].forEach(eventType => {
            detailElement.addEventListener(eventType, function (e) {
                if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
                    e.preventDefault();
                    slideToggle(querySelector('.messageI'), SLIDE_DURATION);
                }
            });
        });
    }

    // Window animations
    setupWindowAnimations();

    // Modal and door interactions
    setupModalInteractions();

    // Door click handlers
    setupDoorClickHandlers();
}

function toggleTheme() {
    try {
        const themeElement = querySelector('#theme');
        const buildElement = querySelector('#build');
        const dayC = querySelector('.dayC');
        const nightC = querySelector('.nightC');

        toggleClass(themeElement, 'dayTheme');
        toggleClass(themeElement, 'nightTheme');
        toggleClass(buildElement, 'night');
        toggleClass(buildElement, 'day');
        fadeToggle(dayC, ANIMATION_DURATION);
        fadeToggle(nightC, ANIMATION_DURATION);
    } catch (error) {
        console.error('Error toggling theme:', error);
    }
}

function handleScroll() {
    try {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const guideElement = querySelector("#guide");

        if (scrollTop <= SCROLL_THRESHOLD_LOW || scrollTop >= SCROLL_THRESHOLD_HIGH) {
            addClass(guideElement, "move");
        } else {
            removeClass(guideElement, "move");
        }
    } catch (error) {
        console.error('Error handling scroll:', error);
    }
}

function setupWindowAnimations() {
    const windElements = querySelectorAll(".wind");

    windElements.forEach(windElement => {
        windElement.addEventListener('mouseenter', function () {
            try {
                addClass(this, "wind2");
                const items = this.querySelectorAll("ul li");

                // Use new animation utility for better control
                applyListAnimation(items, "bounceInLeft", ["bounceOutRight"]);
            } catch (error) {
                console.error('Error in window mouseenter:', error);
            }
        });

        windElement.addEventListener('mouseleave', function () {
            try {
                const items = this.querySelectorAll("ul li");

                // Use new animation utility for better control
                applyListAnimation(items, "bounceOutRight", ["bounceInLeft"]);
                removeClass(this, "wind2");
            } catch (error) {
                console.error('Error in window mouseleave:', error);
            }
        });
    });
}

function setupModalInteractions() {
    // Close modal with keyboard support
    const extraClose = querySelector('#extraClose');
    if (extraClose) {
        ['click', 'keypress'].forEach(eventType => {
            extraClose.addEventListener(eventType, function (e) {
                if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 27))) {
                    e.preventDefault();
                    closeModal();
                }
            });
        });
    }

    // Open modal on door click
    const doors = querySelectorAll('.door');
    doors.forEach(door => {
        ['click', 'keypress'].forEach(eventType => {
            door.addEventListener(eventType, function (e) {
                if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
                    e.preventDefault();
                    openModal();
                }
            });
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !querySelector('#extraBox').classList.contains('bounceOutRight')) {
            closeModal();
        }
    });
}

function openModal() {
    try {
        const modal = querySelector('#extraBox');
        removeClass(modal, 'bounceOutRight');
        addClass(modal, 'bounceInLeft');
        setAttribute(modal, 'aria-hidden', 'false');
        focus(querySelector('#extraClose')); // Focus management
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

function closeModal() {
    try {
        const modal = querySelector('#extraBox');
        removeClass(modal, 'bounceInLeft');
        addClass(modal, 'bounceOutRight');
        setAttribute(modal, 'aria-hidden', 'true');
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

function setupDoorClickHandlers() {
    const doorHandlers = [
        {
            selector: '#house .floor:nth-child(1) .door',
            dataKey: 'aboutMe',
            generator: (data) => generateAboutMeHTML(data)
        },
        {
            selector: '#house .floor:nth-child(2) .door',
            dataKey: 'studies',
            generator: (data) => generateStudiesHTML(data),
            hasProgressBar: true
        },
        {
            selector: '#house .floor:nth-child(3) .door',
            dataKey: 'web',
            generator: (data) => generateWebSkillsHTML(contentData.skills.web)
        },
        {
            selector: '#house .floor:nth-child(4) .door',
            dataKey: 'programming',
            generator: (data) => generateProgrammingHTML(contentData.skills.programming),
            hasProgressBar: true
        },
        {
            selector: '#house .floor:nth-child(5) .door',
            dataKey: 'experience',
            generator: (data) => generateExperienceHTML(data)
        }
    ];

    doorHandlers.forEach(handler => {
        const doorElement = querySelector(handler.selector);
        if (doorElement) {
            ['click', 'keypress'].forEach(eventType => {
                doorElement.addEventListener(eventType, function (e) {
                    if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
                        e.preventDefault();
                        try {
                            let data;
                            let title;

                            // Get the appropriate data based on the section
                            switch (handler.dataKey) {
                                case 'aboutMe':
                                    data = {...contentData.aboutMe, personal: contentData.personal};
                                    title = contentData.aboutMe.title;
                                    break;
                                case 'studies':
                                    data = contentData.studies;
                                    title = contentData.studies.title;
                                    break;
                                case 'web':
                                    data = contentData.skills.web;
                                    title = contentData.skills.web.title;
                                    break;
                                case 'programming':
                                    data = contentData.skills.programming;
                                    title = contentData.skills.programming.title;
                                    break;
                                case 'experience':
                                    data = contentData.experience;
                                    title = contentData.experience.title;
                                    break;
                            }

                            if (data) {
                                setHTML(querySelector('#extraBox .extraHead .headHere'), `<span class="content-heading">${title}</span>`);
                                setHTML(querySelector('#extraBox .content'), handler.generator(data));

                                // Initialize progress bars if needed
                                if (handler.hasProgressBar) {
                                    setTimeout(initializeProgressBars, 100);
                                }

                                // Reapply animations to newly loaded content
                                setTimeout(() => {
                                    const newListItems = querySelectorAll('#extraBox .content ul li');
                                    applyListAnimation(newListItems, "bounceInLeft");
                                }, 50);
                            } else {
                                console.warn(`No data found for section: ${handler.dataKey}`);
                            }
                        } catch (error) {
                            console.error(`Error handling door click for ${handler.dataKey}:`, error);
                        }
                    }
                });
            });
        }
    });
}

function initializeProgressBars() {
    try {
        const progressBars = querySelectorAll('.progressBar');
        progressBars.forEach(progressBar => {
            const value = getText(progressBar).trim();

            if (value && !isNaN(value)) {
                setHTML(progressBar, `
                    <span class="progress-fill" style="background-color:lightblue;left:0px;top:0px;position:absolute;width:${value}%;height:100%;padding:1px;z-index:-1;"></span>
                    <span class="progress-text" style="z-index:2">${value}%</span>
                `);
            }
        });
    } catch (error) {
        console.error('Error initializing progress bars:', error);
    }
}