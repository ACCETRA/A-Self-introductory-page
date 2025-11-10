// Configuration object for easy customization
const config = {
    message: "Welcome to the Pal Pal Universe!",
    typingSpeed: 60, // ms per character
    fadeInDelay: 300, // ms
    displayDuration: 4000, // ms
    fadeOutDuration: 1000, // ms
    audioPath: "sound.mp3",
    audioVolume: 0.5,
    styles: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "calc(var(--spacing-unit) * 2.5) calc(var(--spacing-unit) * 4.5)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "var(--text-color)",
        fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
        fontWeight: "600",
        borderRadius: "var(--border-radius-large)",
        border: "2px solid var(--primary-color)",
        boxShadow: "0 0 20px var(--shadow-color), 0 0 50px var(--shadow-color)",
        textAlign: "center",
        zIndex: "9999",
        opacity: "0",
        transition: `opacity ${config.fadeOutDuration}ms ease, transform ${config.fadeOutDuration}ms ease`,
        animation: "glowPulse 2.5s infinite alternate",
        pointerEvents: "none"
    }
};

// Inject CSS for glowPulse animation
const injectStyles = () => {
    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes glowPulse {
            from {
                box-shadow: 0 0 20px var(--shadow-color), 0 0 50px var(--shadow-color);
                border-color: var(--primary-color);
            }
            to {
                box-shadow: 0 0 35px var(--shadow-color), 0 0 70px var(--shadow-color);
                border-color: var(--secondary-color);
            }
        }
    `;
    document.head.appendChild(style);
};

// Create and style welcome element
const createWelcomeElement = () => {
    const welcomeDiv = document.createElement("div");
    const welcomeText = document.createElement("span");
    welcomeDiv.appendChild(welcomeText);
    Object.assign(welcomeDiv.style, config.styles);
    return { welcomeDiv, welcomeText };
};

// Typing animation
const typeText = (welcomeText, message, callback) => {
    let charIndex = 0;
    const type = () => {
        if (charIndex < message.length) {
            welcomeText.innerText += message[charIndex++];
            setTimeout(type, config.typingSpeed);
        } else if (callback) {
            callback();
        }
    };
    type();
};

// Handle audio playback with error handling
const playAudio = async () => {
    try {
        const audio = new Audio(config.audioPath);
        audio.volume = config.audioVolume;
        await audio.play();
    } catch (error) {
        console.warn("Audio playback failed:", error.message);
    }
};

// Main function to orchestrate the welcome animation
const initWelcomeAnimation = () => {
    injectStyles();
    const { welcomeDiv, welcomeText } = createWelcomeElement();
    document.body.appendChild(welcomeDiv);

    setTimeout(() => {
        welcomeDiv.style.opacity = "1";
        welcomeDiv.style.transform = "translate(-50%, -50%) scale(1.05)";
        typeText(welcomeText, config.message);
    }, config.fadeInDelay);

    playAudio();

    setTimeout(() => {
        welcomeDiv.style.opacity = "0";
        welcomeDiv.style.transform = "translate(-50%, -50%) scale(0.8)";
    }, config.displayDuration);

    setTimeout(() => {
        welcomeDiv.remove();
    }, config.displayDuration + config.fadeOutDuration);
};

// Radio button selection feedback
const radioInputs = document.querySelectorAll('.radio-container input[type="radio"]');
radioInputs.forEach(input => {
    input.addEventListener('change', () => {
        const selectedValue = input.value === 'Choice 1' ? 'Ali Soomro' : 'Affan Khan';
        const confirmation = document.createElement('div');
        Object.assign(confirmation.style, {
            ...config.styles,
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            padding: 'calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3)'
        });
        confirmation.innerText = `You selected ${selectedValue}!`;
        document.body.appendChild(confirmation);
        setTimeout(() => {
            confirmation.style.opacity = '0';
            confirmation.style.transform = 'translate(-50%, -50%) scale(0.8)';
        }, 3000);
        setTimeout(() => confirmation.remove(), 4000);
    });
});

// Initialize on window load
window.addEventListener("load", initWelcomeAnimation);

// Responsive adjustments
const adjustForMobile = () => {
    if (window.matchMedia("(max-width: 768px)").matches) {
        config.styles.fontSize = "clamp(1.2rem, 4vw, 1.8rem)";
        config.styles.padding = "calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3)";
    }
};
window.addEventListener("resize", adjustForMobile);
adjustForMobile();