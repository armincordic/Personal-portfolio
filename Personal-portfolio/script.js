document.addEventListener("DOMContentLoaded", function() {
    const textLines = [
        "Hey there, I'm",
        "Armin Cordic",
        "Student + Developer :)"
    ];
    const typingSpeed = 100;
    let lineIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        const typingElement = document.getElementById("typing-text");
        typingElement.classList.add("show-cursor");

        if (charIndex < textLines[lineIndex].length) {
            if (lineIndex === 1) {
                typingElement.innerHTML += `<span class='highlight'>${textLines[lineIndex].charAt(charIndex)}</span>`;
            } else {
                typingElement.innerHTML += textLines[lineIndex].charAt(charIndex);
            }
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            charIndex = 0;
            lineIndex++;
            if (lineIndex < textLines.length) {
                typingElement.innerHTML += "<br>";
                setTimeout(typeWriter, typingSpeed);
            } else {
                typingElement.classList.remove("show-cursor");

                const socialIcons = document.getElementById('social-icons');
                socialIcons.classList.remove('hidden');
                socialIcons.classList.add('visible');
            }
        }
    }

    typeWriter();

    const profilePic = document.querySelector('.profile-pic');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };

    function fadeInProfilePic(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                profilePic.classList.add('visible');
                observer.unobserve(profilePic);
            }
        });
    }

    const observer = new IntersectionObserver(fadeInProfilePic, observerOptions);
    observer.observe(profilePic);

    function triggerAnimations() {
        const aboutMeImage = document.querySelector('.about-me-image');
        const aboutMeListItems = document.querySelectorAll('.about-me-text li');

        aboutMeImage.style.animation = "burstIn 1s ease-out forwards";

        aboutMeListItems.forEach((item, index) => {
            item.style.animation = `slideInLeft 0.5s ease forwards ${index * 0.3}s`;
            item.style.opacity = 1;
        });

        document.querySelector('.about-me-text').style.opacity = 1;
    }

    function checkIfInView() {
        const aboutMeSection = document.getElementById("about-me");
        const rect = aboutMeSection.getBoundingClientRect();
        const isVisible = (rect.top < window.innerHeight * 0.75 && rect.bottom >= 0);

        if (isVisible) {
            typeAboutMeTitle();
            triggerAnimations();
            window.removeEventListener("scroll", checkIfInView);
        }
    }

    window.addEventListener("scroll", checkIfInView);
    checkIfInView();

    document.querySelector('.about-me-image').addEventListener('mouseenter', function() {
        triggerAnimations();
    });

    document.querySelector('.about-me-text').addEventListener('mouseenter', function() {
        triggerAnimations();
    });

    const projectsContent = [
        "Coming soon :)"
    ];

    function typeProjectsTitle() {
        const projectsTitle = "Projects";
        const typingElement = document.getElementById("projects-title");
        typingElement.innerHTML = '';
        typingElement.style.opacity = 1;
        let charIndex = 0;
        const typingSpeed = 100;

        function typeChar() {
            if (charIndex < projectsTitle.length) {
                typingElement.innerHTML = projectsTitle.substring(0, charIndex + 1) + '<span id="cursor"></span>';
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            } else {
                typingElement.innerHTML = projectsTitle;
                triggerProjectsAnimation();
            }
        }

        typeChar();
    }

    function triggerProjectsAnimation() {
        const projectsText = document.getElementById("projects-content");
        projectsText.style.opacity = 1;
        let projectsList = "<ul>";

        projectsContent.forEach((project, index) => {
            projectsList += `<li style="animation: slideInLeft 0.5s ease forwards ${index * 0.3}s">${project}</li>`;
        });

        projectsList += "</ul>";
        projectsText.innerHTML = projectsList;
    }

    function checkIfProjectsInView() {
        const projectsSection = document.getElementById("projects");
        const rect = projectsSection.getBoundingClientRect();
        const isVisible = (rect.top < window.innerHeight * 0.75 && rect.bottom >= 0);

        if (isVisible) {
            typeProjectsTitle();
            window.removeEventListener("scroll", checkIfProjectsInView);
        }
    }

    window.addEventListener("scroll", checkIfProjectsInView);
    checkIfProjectsInView();

    function updateDocumentTitle() {
        const scrollPosition = window.scrollY;
        const aboutMeSection = document.getElementById("about-me").offsetTop;
        const projectsSection = document.getElementById("projects").offsetTop;
        const contactSection = document.getElementById("contact").offsetTop;

        if (scrollPosition >= contactSection - 100) {
            document.title = "Contact | Armin Cordic";
        } else if (scrollPosition >= projectsSection - 100) {
            document.title = "Projects | Armin Cordic";
        } else if (scrollPosition >= aboutMeSection - 100) {
            document.title = "About Me | Armin Cordic";
        } else {
            document.title = "Home | Armin Cordic";
        }
    }

    window.addEventListener('scroll', updateDocumentTitle);
    updateDocumentTitle();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function typeAboutMeTitle() {
    const aboutMeTitle = "About Me";
    const typingElement = document.getElementById("about-me-title");
    typingElement.innerHTML = '';
    typingElement.style.opacity = 1;
    let charIndex = 0;
    const typingSpeed = 100;

    function typeChar() {
        if (charIndex < aboutMeTitle.length) {
            typingElement.innerHTML = aboutMeTitle.substring(0, charIndex + 1) + '<span id="cursor"></span>';
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        } else {
            typingElement.innerHTML = aboutMeTitle;
        }
    }

    typeChar();
}
