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
        console.log('Initializing terminal...');
        this.showWelcome();
        this.setupEventListeners();
        console.log('Terminal initialized');
    }
    
    setupEventListeners() {
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
    
    clearTerminal() {
        this.output.innerHTML = '';
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

<span class="glow">2. 💚 BioLife Health App</span>
   │ Role: Marketing Director
   │ Tech: Mobile app + Marketplace
   │ Status: 🚧 Pre-launch marketing phase
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
└─────────────────────────────────────────┘
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
└─────────────────────────────────────────┘

<span class="success">💚 BioLife Startup</span>
┌─────────────────────────────────────────┐
│ Position: Marketing Director            │
│ Responsibility: Brand strategy & growth │
│ Current: Building pre-launch hype       │
└─────────────────────────────────────────┘
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
        `;
        await this.typeText(contactText, 25);
    }

    async whoami() {
        await this.typeText('guest', 30);
        await this.sleep(300);
        await this.typeText('\nBut you can call me Nadjib! 😊', 30, 'info');
        await this.sleep(500);
        await this.typeText('\n19-year-old CS student, future startup founder inchallah! 🚀', 30, 'success');
    }

    async listFiles() {
        const lsText = `
total 12
drwxr-xr-x  2 nadjib nadjib 4096 Dec 15 10:30 <span class="info">projects/</span>
drwxr-xr-x  2 nadjib nadjib 4096 Dec 15 10:30 <span class="info">skills/</span>
drwxr-xr-x  2 nadjib nadjib 4096 Dec 15 10:30 <span class="info">leadership/</span>
-rw-r--r--  1 nadjib nadjib 1024 Dec 15 10:30 <span class="success">about.txt</span>
-rw-r--r--  1 nadjib nadjib  512 Dec 15 10:30 <span class="success">contact.txt</span>
        `;
        await this.typeText(lsText, 20);
    }

    async catFile() {
        await this.typeText('Usage: cat [filename]', 30, 'info');
        await this.typeText('\nTry: cat about.txt, cat contact.txt', 30, 'info');
    }
}

// Utility functions
function executeCommand(command) {
    if (terminal) {
        terminal.currentCommand = command;
        terminal.executeCurrentCommand();
    }
}

// Mobile support
function promptCommand() {
    const command = prompt('Enter command:');
    if (command && terminal) {
        executeCommand(command);
    }
}

// Simple mobile detection
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        terminal.addOutput('✓ Copied to clipboard!', 'success');
    }).catch(() => {
        terminal.addOutput('✗ Failed to copy: ' + text, 'error');
    });
}

// Initialize terminal when page loads
let terminal;
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('DOM loaded, initializing simple terminal...');
        terminal = new TerminalPortfolio();

        // Add mobile support
        if (isMobile()) {
            document.body.classList.add('mobile-device');
            const mobileBtn = document.querySelector('.mobile-input-btn');
            if (mobileBtn) {
                mobileBtn.style.display = 'inline-block';
            }

            // Add mobile message after welcome
            setTimeout(() => {
                if (terminal && terminal.addOutput) {
                    terminal.addOutput('\n📱 Mobile detected! Use buttons or "📝 Type" for input.', 'info');
                }
            }, 5000);
        }

        console.log('Simple terminal initialized successfully');
    } catch (error) {
        console.error('Error initializing terminal:', error);
        // Show error in the terminal if possible
        const output = document.getElementById('output');
        if (output) {
            output.innerHTML = '<div class="error">Error loading terminal. Please refresh the page.</div>';
        }
    }
});
