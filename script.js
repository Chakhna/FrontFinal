
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});


const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageInput = document.getElementById('message');


const nameRegex = /^[a-zA-Z\s]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; 

function validateField(input, regex, errorElementId) {
    const errorElement = document.getElementById(errorElementId);
    if (!regex.test(input.value)) {
        errorElement.textContent = `Invalid ${input.name}`;
        errorElement.classList.add('show');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        return true;
    }
}

nameInput.addEventListener('blur', () => {
    validateField(nameInput, nameRegex, 'nameError');
});

emailInput.addEventListener('blur', () => {
    validateField(emailInput, emailRegex, 'emailError');
});

passwordInput.addEventListener('blur', () => {
    validateField(passwordInput, passwordRegex, 'passwordError');
});

messageInput.addEventListener('blur', () => {
    const errorElement = document.getElementById('messageError');
    if (messageInput.value.trim() === '') {
        errorElement.textContent = 'Message cannot be empty';
        errorElement.classList.add('show');
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
});


const togglePasswordBtn = document.getElementById('togglePassword');

togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
});


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    
    const isNameValid = nameRegex.test(nameInput.value);
    const isEmailValid = emailRegex.test(emailInput.value);
    const isPasswordValid = passwordRegex.test(passwordInput.value);
    const isMessageValid = messageInput.value.trim() !== '';

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const messageError = document.getElementById('messageError');

    
    if (!isNameValid) {
        nameError.textContent = 'Please enter a valid name (letters and spaces only)';
        nameError.classList.add('show');
    }
    if (!isEmailValid) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
    }
    if (!isPasswordValid) {
        passwordError.textContent = 'Password must be at least 6 characters';
        passwordError.classList.add('show');
    }
    if (!isMessageValid) {
        messageError.textContent = 'Message cannot be empty';
        messageError.classList.add('show');
    }

    if (isNameValid && isEmailValid && isPasswordValid && isMessageValid) {
        
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            message: messageInput.value,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        
        alert('Thank you for subscribing! Your data has been saved.');

        
        contactForm.reset();
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = 'Show';

       
        nameError.classList.remove('show');
        emailError.classList.remove('show');
        passwordError.classList.remove('show');
        messageError.classList.remove('show');
    }
});


window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        console.log('Saved form data:', JSON.parse(savedData));
    }
});


const cookieNotification = document.getElementById('cookieNotification');
const acceptCookiesBtn = document.getElementById('acceptCookies');


function checkCookieConsent() {
    const cookieConsent = sessionStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        cookieNotification.classList.remove('hidden');
    } else {
        cookieNotification.classList.add('hidden');
    }
}

acceptCookiesBtn.addEventListener('click', () => {
    sessionStorage.setItem('cookieConsent', 'accepted');
    cookieNotification.classList.add('hidden');
});

checkCookieConsent();


const jojoQuotes = [
    "It was me, Dio!",
    "Gureto daze!",
    "Yare yare daze",
    "MUDA MUDA MUDA!",
    "ORA ORA ORA!",
    "ZA WARUDO!",
    "Peacefully, I was thinking about you",
    "I am the bone of my sword",
    "The intent to kill",
    "I reject my humanity!"
];

function fetchJojoQuote() {
    const randomIndex = Math.floor(Math.random() * jojoQuotes.length);
    return jojoQuotes[randomIndex];
}


window.addEventListener('DOMContentLoaded', () => {
    const randomQuote = fetchJojoQuote();
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quoteDisplay) {
        quoteDisplay.textContent = `"${randomQuote}"`;
    }
    console.log('Random JoJo Quote:', randomQuote);
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});


const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.id = 'scrollToTop';
scrollToTopBtn.textContent = '↑';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #FFB923;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: background-color 0.3s ease, transform 0.2s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.backgroundColor = '#FF9500';
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.backgroundColor = '#FFB923';
    scrollToTopBtn.style.transform = 'scale(1)';
});
