# Nadjib's Terminal Portfolio

A modern, interactive terminal-style portfolio website showcasing Nadjib's skills, projects, and experience as a Computer Science student.

## 🚀 Features

- **Interactive Terminal Interface**: Navigate through the portfolio using terminal commands
- **Typing Animation**: Realistic typing effects for an authentic terminal experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Command System**: Multiple commands to explore different sections
- **ASCII Art**: Eye-catching terminal-style graphics
- **Mobile Support**: Touch-friendly interface with mobile keyboard handling

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with terminal aesthetics
- **Build Tools**: Vite, TypeScript
- **Code Quality**: ESLint, PostCSS
- **Frameworks**: React (in src folder), Tailwind CSS

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Learn about Nadjib |
| `education` | Academic background & university info |
| `projects` | View portfolio projects |
| `skills` | Display technical skills |
| `leadership` | Leadership roles & activities |
| `contact` | Get contact information |
| `clear` | Clear the terminal |
| `whoami` | Display current user |
| `ls` | List directory contents |
| `cat` | Display file contents |

## 🎯 Project Structure

```
project/
├── index.html          # Main HTML file
├── main.js            # Core terminal portfolio logic
├── style.css          # Terminal styling
├── src/               # React components (if using React version)
├── package.json       # Dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 💻 Usage

1. **Type Commands**: Use your keyboard to type any of the available commands
2. **Press Enter**: Execute the command
3. **Use Backspace**: Delete characters
4. **Click Buttons**: Use the UI buttons for quick navigation
5. **Mobile**: Tap anywhere to bring up the mobile keyboard

## 🎨 Customization

### Adding New Commands

To add a new command, modify the `commands` object in `main.js`:

```javascript
this.commands = {
    // existing commands...
    newcommand: this.newCommandFunction.bind(this)
};
```

Then implement the corresponding function:

```javascript
async newCommandFunction() {
    const text = `Your new command content here`;
    await this.typeText(text, 25);
}
```

### Styling

Modify `style.css` to customize the terminal appearance:
- Colors and themes
- Font families and sizes
- Animation speeds
- Layout and spacing

## 📱 Mobile Support

The portfolio includes special handling for mobile devices:
- Touch events to trigger mobile keyboard
- Responsive design for smaller screens
- Optimized typing experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Nadjib Dabouz**
- Email: m_dabouz@estin.dz
- Phone: +213549769944
- LinkedIn: [Mohammed Nadjib Dabouz](https://www.linkedin.com/in/mohammed-nadjib-dabouz-47679b351/)
- GitHub: [nadjib-dbz](https://github.com/nadjib-dbz)
- Instagram: [@m_o_h__d_z](https://www.instagram.com/m_o_h__d_z/)

## 🎓 About the Developer

19-year-old Computer Science student at ESTIN (Béjaïa, Algeria), passionate about technology, innovation, and building creative projects. Currently involved in:

- **AIESEC**: oGT Operations member
- **BioLife Startup**: Marketing Director
- **Competitive Programming**: Active participant in various contests
- **Open Source**: Contributing to community projects

---

*Built with ❤️ by Nadjib Dabouz*
