class TerminalPortfolio {
    constructor() {
        this.output = document.getElementById('output');
        this.commandInput = document.getElementById('command-input');
        this.cursor = document.getElementById('cursor');
        this.currentCommand = '';
        this.commandHistory = [];
        this.isTyping = false;
        
        this.commands = {
            help: this.showHelp.bind(this),
            about: this.showAbout.bind(this),
            projects: this.showProjects.bind(this),
            skills: this.showSkills.bind(this),
            contact: this.showContact.bind(this),
            clear: this.clearTerminal.bind(this),
            whoami: this.whoami.bind(this),
            ls: this.listFiles.bind(this),
            cat: this.catFile.bind(this),
            education: this.showEducation.bind(this),
            leadership: this.showLeadership.bind(this)
        };
        
        this.init();
    }
    
    init() {
        this.isMobile = this.detectMobile();
        this.showWelcome();
        this.setupEventListeners();

        // Add mobile-specific initialization
        if (this.isMobile) {
            this.initMobileFeatures();
        }
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    initMobileFeatures() {
        // Add mobile class to body
        document.body.classList.add('mobile-device');

        // Show mobile input button
        const mobileBtn = document.querySelector('.mobile-input-btn');
        if (mobileBtn) {
            mobileBtn.style.display = 'inline-block';
        }

        // Show mobile-specific welcome message
        setTimeout(() => {
            this.addOutput('\n📱 Mobile detected! Tap anywhere to bring up keyboard.', 'info');
            this.addOutput('Use the buttons below for quick navigation.', 'info');
            this.addOutput('Or use the "📝 Type" button for manual input.', 'info');
            this.addOutput('Debug: Mobile input initialized: ' + (this.mobileInput ? 'Yes' : 'No'), 'info');
        }, 3000);

        // Add debugging for mobile events
        console.log('Mobile features initialized');
        console.log('User agent:', navigator.userAgent);
    }
    
    setupEventListeners() {
        // Desktop keyboard events
        document.addEventListener('keydown', (e) => {
            if (this.isTyping) return;

            if (e.key === 'Enter') {
                this.executeCurrentCommand();
            } else if (e.key === 'Backspace') {
                this.currentCommand = this.currentCommand.slice(0, -1);
                this.updateCommandInput();
            } else if (e.key.length === 1) {
                this.currentCommand += e.key;
                this.updateCommandInput();
            }
        });

        // Mobile support - create persistent hidden input
        this.setupMobileInput();

        // Touch events for mobile
        document.addEventListener('touchstart', () => {
            if (this.mobileInput) {
                this.mobileInput.focus();
            }
        });
    }

    setupMobileInput() {
        try {
            // Create a persistent hidden input for mobile
            this.mobileInput = document.createElement('input');
            this.mobileInput.type = 'text';
            this.mobileInput.style.position = 'absolute';
            this.mobileInput.style.left = '-9999px';
            this.mobileInput.style.opacity = '0';
            this.mobileInput.style.pointerEvents = 'none';
            this.mobileInput.autocomplete = 'off';
            this.mobileInput.autocorrect = 'off';
            this.mobileInput.autocapitalize = 'off';
            this.mobileInput.spellcheck = false;
            this.mobileInput.setAttribute('inputmode', 'text');

            document.body.appendChild(this.mobileInput);

            // Handle mobile input events
            this.mobileInput.addEventListener('input', (e) => {
                if (this.isTyping) return;

                const newValue = e.target.value;
                this.currentCommand = newValue;
                this.updateCommandInput();
                console.log('Mobile input:', newValue);
            });

            this.mobileInput.addEventListener('keydown', (e) => {
                if (this.isTyping) return;

                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.executeCurrentCommand();
                    this.mobileInput.value = '';
                }
            });

            // Add focus/blur handlers for better mobile experience
            this.mobileInput.addEventListener('focus', () => {
                console.log('Mobile input focused');
            });

            this.mobileInput.addEventListener('blur', () => {
                console.log('Mobile input blurred');
            });

            console.log('Mobile input setup complete');
        } catch (error) {
            console.error('Error setting up mobile input:', error);
        }
    }
    
    updateCommandInput() {
        this.commandInput.textContent = this.currentCommand;
    }
    
    async showWelcome() {
        const asciiArt = `
    ███╗   ██╗ █████╗ ██████╗      ██╗██╗██████╗ 
    ████╗  ██║██╔══██╗██╔══██╗     ██║██║██╔══██╗
    ██╔██╗ ██║███████║██║  ██║     ██║██║██████╔╝
    ██║╚██╗██║██╔══██║██║  ██║██   ██║██║██╔══██╗
    ██║ ╚████║██║  ██║██████╔╝╚█████╔╝██║██████╔╝
    ╚═╝  ╚═══╝╚═╝  ╚═╝╚═════╝  ╚════╝ ╚═╝╚═════╝ 
                                                   
    ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗ 
       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
    `;
        
        await this.typeText(asciiArt, 30, 'ascii-art glow');
        await this.sleep(1000);
        await this.typeText('\nWelcome to Nadjib\'s Terminal Portfolio!', 50);
        await this.sleep(500);
        await this.typeText('\nType \'help\' to begin your journey...', 50);
        await this.sleep(500);
        await this.typeText('\n\nSystem initialized successfully ✓', 50, 'success');
        await this.typeText('\nAll modules loaded ✓', 50, 'success');
        await this.sleep(1000);
    }
    
    async typeText(text, speed = 50, className = '') {
        this.isTyping = true;
        const element = document.createElement('div');
        element.className = `output-line ${className}`;
        this.output.appendChild(element);
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await this.sleep(speed);
        }
        
        this.scrollToBottom();
        this.isTyping = false;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    scrollToBottom() {
        document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
    }
    
    addOutput(text, className = '') {
        const element = document.createElement('div');
        element.className = `output-line ${className}`;
        element.innerHTML = text;
        this.output.appendChild(element);
        this.scrollToBottom();
    }
    
    async executeCurrentCommand() {
        if (this.isTyping || !this.currentCommand.trim()) return;

        const command = this.currentCommand.trim().toLowerCase();
        this.addOutput(`guest@nadjib:~$ ${this.currentCommand}`, 'command-line');
        this.commandHistory.push(this.currentCommand);

        this.currentCommand = '';
        this.updateCommandInput();

        // Clear mobile input if it exists
        if (this.mobileInput) {
            this.mobileInput.value = '';
        }

        await this.sleep(100);

        if (this.commands[command]) {
            await this.commands[command]();
        } else {
            this.addOutput(`bash: ${command}: command not found`, 'error');
            this.addOutput('Type \'help\' to see available commands.', 'info');
        }
    }
    
    async showHelp() {
        const helpText = `
Available commands:

  <span class="success">help</span>        - Show this help message
  <span class="success">about</span>       - Learn about Nadjib
  <span class="success">education</span>   - Academic background & university info
  <span class="success">projects</span>    - View portfolio projects  
  <span class="success">skills</span>      - Display technical skills
  <span class="success">leadership</span>  - Leadership roles & activities
  <span class="success">contact</span>     - Get contact information
  <span class="success">clear</span>       - Clear the terminal
  <span class="success">whoami</span>      - Display current user
  <span class="success">ls</span>          - List directory contents
  <span class="success">cat</span>         - Display file contents

Use the buttons below or type commands directly.
Navigation tip: Press TAB for command completion (coming soon!)
        `;
        await this.typeText(helpText, 20);
    }
    
    async showAbout() {
        const aboutText = `
<span class="info">╭─────────────────────────────────────────────────────╮</span>
<span class="info">│                  ABOUT NADJIB                       │</span>
<span class="info">╰─────────────────────────────────────────────────────╯</span>

<span class="glow">Name:</span> Dabouz Mohammed Nadjib
<span class="glow">Age:</span> 19 (born February 11, 2006)
<span class="glow">Location:</span> Lives in Algiers, studies in Béjaïa
<span class="glow">Status:</span> 1st Year Computer Science Student at ESTIN
<span class="glow">I'm using Arch Btw</span>

<span class="success">🎯 Passion & Drive:</span>
• Loves challenges and building creative projects
• Natural leadership qualities
• Thrives on starting from zero and building up
• Passionate about technology and innovation

<span class="success">🚀 Current Focus:</span>
• Mastering computer science fundamentals
• Building real-world applications
• Leading tech communities and events
• Developing entrepreneurial ventures

<span class="success">💡 Nadjib's Philosophy:</span>
"Every challenge is an opportunity to innovate. 
I believe in learning by doing and leading by example."

<span class="info">Fun fact:</span> Triple-boot setup enthusiast (Ubuntu + Arch + Windows) 🐧
        `;
        await this.typeText(aboutText, 25);
    }
    
    async showEducation() {
        const educationText = `
<span class="info">╭─────────────────────────────────────────────────────╮</span>
<span class="info">│                   EDUCATION                         │</span>
<span class="info">╰─────────────────────────────────────────────────────╯</span>

<span class="glow">🎓 Current Institution:</span>
<span class="success">ESTIN</span> - Higher School of Computer Science and Digital Technology
└ Location: Béjaïa, Algeria
└ Program: Computer Science (1st Year)
└ Focus: Software Engineering & Digital Innovation

<span class="glow">🌍 Languages:</span>
• <span class="success">Arabic</span> - Native
• <span class="success">French</span> - Currently learning & improving
• <span class="success">English</span> - Proficient (as you can see! 😊)

<span class="glow">💻 Technical Learning Path:</span>
┌─────────────────────────────────────────┐
│ Foundation: C, Java, HTML/CSS/JS        │
│ Expanding: Python, React, Flutter       │
│ Systems: Linux (I'm using Arch btw)     │
│ Tools: GTK+, Qt Creator, FastAPI        │
└─────────────────────────────────────────┘

<span class="success">🎯 Academic Goals:</span>
• Master advanced algorithms & data structures
• Specialize in full-stack development
• Contribute to open-source projects
• Build innovative software solutions

<span class="info">Study approach:</span> Learn by building real projects! 🛠️
        `;
        await this.typeText(educationText, 25);
    }
    
    async showProjects() {
        const projectsText = `
<span class="info">╭─────────────────────────────────────────────────────╮</span>
<span class="info">│                  MY PROJECTS                        │</span>
<span class="info">╰─────────────────────────────────────────────────────╯</span>

<span class="success">🚀 Featured Projects:</span>

<span class="glow">1. 🧮 Base Converter GUI</span>
   │ Tech: C + GTK+ (upgrading to Qt Creator)
   │ Desc: Number base conversion tool with GUI
   │ Status: ✅ Working & compiled
   └ Next: Enhanced UI with background images

<span class="glow">3. 💚 BioLife Health App (InjazElDjzair)</span>
   │ Role: Marketing Director
   │ Tech: Mobile app + Marketplace
   │ Features: Trusted health info, personalized plans
   │ Special: Bio-products from verified sellers
   └ Status: 🚧 Pre-launch marketing phase

<span class="glow">4. 🧠 Mini AI Datathon</span>
   │ Role: Participant
   │ Topics: ML concepts, Grid/Random Search, Regularization
   │ Focus: Teaching Bagging, Boosting, practical ML
   └ Status: ✅ 8th place(first experiance tho)

<span class="glow">5. 🏆 Competitive Programming</span>
   │ Events: ByteCraft, CodeCraft, picoCTF
   │ Languages: Primarily C and Python
   │ Approach: Problem-solving & algorithm optimization
   └ Status: 🔄 Ongoing participation

<span class="info">💡 All projects focus on real-world impact and learning!</span>
        `;
        await this.typeText(projectsText, 25);
    }
    
    async showSkills() {
        const skillsText = `
<span class="info">╭─────────────────────────────────────────────────────╮</span>
<span class="info">│                 TECHNICAL SKILLS                    │</span>
<span class="info">╰─────────────────────────────────────────────────────╯</span>

<span class="success">💻 Programming Languages:</span>
┌─────────────────────────────────────────┐
│ <span class="glow">C</span>           ██████████████████░░ 85% │
│ <span class="glow">Java</span>        ████████████████░░░░ 80% │
│ <span class="glow">JavaScript</span>  ██████████████░░░░░░ 75% │
│ <span class="glow">HTML/CSS</span>    ██████████████████░░ 90% │
│ <span class="glow">Python</span>      ██████████░░░░░░░░░░ 60% │
│ <span class="glow">French</span>      ████████░░░░░░░░░░░░ 50% │
└─────────────────────────────────────────┘

<span class="success">🛠️ Frameworks & Tools:</span>
• <span class="info">GUI Development:</span> GTK+, Qt Creator
• <span class="info">Mobile:</span> Flutter (learning)
• <span class="info">Web:</span> React (started), FastAPI (learning)
• <span class="info">CMS:</span> WordPress (Ubuntu setup)
• <span class="info">Competitive Programming:</span> Algorithm optimization

<span class="success">🖥️ Operating Systems:</span>
• <span class="glow">Triple Boot Setup:</span> Ubuntu + Arch Linux + Windows
• <span class="info">Primary:</span> Linux-based development
• <span class="info">Expertise:</span> System administration & configuration

<span class="success">🎯 Currently Learning:</span>
• Advanced Python for data science
• React for modern web development
• Flutter for cross-platform mobile apps
• FastAPI for backend development
• French language proficiency

<span class="info">🏆 Specialties:</span>
• Problem-solving & algorithm design
• GUI application development
• System setup & configuration
• Project leadership & organization
        `;
        await this.typeText(skillsText, 25);
    }
    
    async showLeadership() {
        const leadershipText = `
<span class="info">╭─────────────────────────────────────────────────────╮</span>
<span class="info">│                   LEADERSHIP                        │</span>
<span class="info">╰─────────────────────────────────────────────────────╯</span>

<span class="success">🌍 AIESEC - oGT Operations</span>
┌─────────────────────────────────────────┐
│ Role: Active Member                     │
│ Mission: Global internship opportunities│
│ Impact: Connecting students worldwide   │
│ Focus: Operations & student development │
└─────────────────────────────────────────┘

<span class="success">💚 BioLife Startup</span>
┌─────────────────────────────────────────┐
│ Position: Marketing Director            │
│ Responsibility: Brand strategy & growth │
│ Current: Building pre-launch hype       │
│ Platform: Instagram marketing campaign │
└─────────────────────────────────────────┘

<span class="success">💡 Leadership Philosophy:</span>
"Lead by example, innovate through collaboration,
and always start from zero with determination."

<span class="info">🎯 Impact Areas:</span>
• Technology education & skill development
• Startup ecosystem building in Algeria
• International student exchange programs
• Community building through tech events
        `;
        await this.typeText(leadershipText, 25);
    }
    
    async showContact() {
        const contactText = `
<span class="info">╭─────────────────────────────────────────────────────╮</span>
<span class="info">│                 GET IN TOUCH                        │</span>
<span class="info">╰─────────────────────────────────────────────────────╯</span>

<span class="success">📬 Contact Information:</span>

<span class="glow">📧 Email:</span>
   <span class="link" onclick="copyToClipboard('m_dabouz@estin.dz')">m_dabouz@estin.dz</span>
   <span class="info">(Click to copy)</span>

   <span class="glow">📞 Phone Number:</span>
   <span class="link" onclick="copyToClipboard('+213549769944')">+213549769944</span>
   <span class="info">(Click to copy)</span>

<span class="glow">🎓 University:</span>
   ESTIN - Béjaïa, Algeria

<span class="glow">📍 Location:</span>
   Lives in Algiers, Studies in Béjaïa

<span class="glow">🔗 Professional Networks:</span>
   <span class="link" onclick="window.open('https://www.linkedin.com/in/mohammed-nadjib-dabouz-47679b351/', '_blank')">LinkedIn Profile</span>
   <span class="link" onclick="window.open('https://github.com/nadjib-dbz', '_blank')">GitHub Portfolio</span>
   <span class="link" onclick="window.open('https://www.instagram.com/m_o_h__d_z/', '_blank')">Instagram</span>
<span class="success">💼 Open For:</span>
┌─────────────────────────────────────────┐
│ • Collaboration on innovative projects  │
│ • Startup partnerships & ventures       │
│ • Technical mentorship exchange         │
│ • AIESEC global opportunities           │
│ • Competitive programming teams         │
│ • Open source contributions             │
└─────────────────────────────────────────┘

<span class="success">🚀 Current Interests:</span>
• Health tech innovation (BioLife)
• AI/ML learning & application
• Cross-platform mobile development

<span class="info">Response time: Usually within 24 hours</span>
<span class="glow">Status: Always ready for new challenges! 💪</span>

<span class="info">💡 Fun fact:</span> Best way to reach me? Challenge me with an interesting project! 🎯
        `;
        await this.typeText(contactText, 25);
    }
    
    async whoami() {
        await this.typeText('guest', 30);
        await this.sleep(300);
        await this.typeText('\nBut you can call me Nadjib! 😊', 30, 'info');
        await this.sleep(500);
        await this.typeText('\n19-year-old CS student, future startup founder inchallah, and challenge seeker! 🚀', 30, 'success');
    }
    
    async listFiles() {
        const lsText = `
total 12
drwxr-xr-x  2 nadjib nadjib 4096 Dec 15 10:30 <span class="info">projects/</span>
drwxr-xr-x  2 nadjib nadjib 4096 Dec 15 10:30 <span class="info">skills/</span>
drwxr-xr-x  2 nadjib nadjib 4096 Dec 15 10:30 <span class="info">leadership/</span>
-rw-r--r--  1 nadjib nadjib 1024 Dec 15 10:30 <span class="success">about.txt</span>
-rw-r--r--  1 nadjib nadjib  512 Dec 15 10:30 <span class="success">contact.txt</span>
-rw-r--r--  1 nadjib nadjib  256 Dec 15 10:30 <span class="success">education.txt</span>
-rw-r--r--  1 nadjib nadjib  128 Dec 15 10:30 <span class="success">README.md</span>
        `;
        await this.typeText(lsText, 20);
    }
    
    async catFile() {
        await this.typeText('Usage: cat [filename]', 30, 'info');
        await this.typeText('\nTry: cat about.txt, cat education.txt, cat contact.txt, or cat README.md', 30, 'info');
    }
    
    clearTerminal() {
        this.output.innerHTML = '';
    }
}

// Utility functions
function executeCommand(command) {
    if (terminal) {
        terminal.currentCommand = command;
        terminal.executeCurrentCommand();
    } else {
        console.error('Terminal not initialized');
    }
}

// Mobile fallback - prompt for command input
function promptCommand() {
    if (terminal && terminal.isMobile) {
        const command = prompt('Enter command:');
        if (command) {
            executeCommand(command);
        }
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        terminal.addOutput('✓ Email copied to clipboard!', 'success');
    }).catch(() => {
        terminal.addOutput('✗ Failed to copy email. Please copy manually: ' + text, 'error');
    });
}

// Initialize terminal when page loads
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    terminal = new TerminalPortfolio();
});

// Mobile device detection and additional mobile support
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Enhanced mobile support
if (isMobileDevice()) {
    // Prevent zoom on double tap
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    });

    // Prevent default touch behaviors that might interfere
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });

    // Add mobile-specific styling
    document.body.classList.add('mobile-device');
}