# Combinatorics - Interactive Learning Website

An interactive, responsive, and modern single-page website for learning combinatorics. Built with HTML5, Tailwind CSS (via CDN), and Vanilla JavaScript.

## 🎯 Features

- **Responsive Design**: Mobile-first approach that works seamlessly on all devices
- **Interactive Calculators**: 
  - Permutation calculator (P(n,r))
  - Combination calculator (C(n,r))
- **Educational Content**:
  - Clear explanations of combinatorics concepts
  - Formula references with detailed descriptions
  - Real-world examples
- **Modern UI**: Clean, professional design using Tailwind CSS
- **No Dependencies**: Pure vanilla JavaScript - no frameworks required

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or build process required!

### Running the Website

1. Clone this repository:
   ```bash
   git clone https://github.com/Khaerulmamu/kombinatorik.git
   cd kombinatorik
   ```

2. Open `index.html` in your web browser:
   - Double-click the file, or
   - Right-click and select "Open with" your preferred browser, or
   - Use a local server (optional):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using PHP
     php -S localhost:8000
     
     # Using Node.js http-server
     npx http-server
     ```

3. Navigate to `http://localhost:8000` if using a local server

## 📚 What is Combinatorics?

Combinatorics is a branch of mathematics concerning the study of finite or countable discrete structures. This website focuses on two fundamental concepts:

### Permutations
- **Definition**: Arrangements of objects where order matters
- **Formula**: P(n, r) = n! / (n - r)!
- **Example**: How many ways can you arrange 3 books from 5? Answer: 60 ways

### Combinations
- **Definition**: Selections of objects where order doesn't matter
- **Formula**: C(n, r) = n! / (r! × (n - r)!)
- **Example**: How many ways can you choose 3 books from 5? Answer: 10 ways

## 🛠️ Technology Stack

- **HTML5**: Semantic markup for structure
- **Tailwind CSS**: Utility-first CSS framework (loaded via CDN)
- **Vanilla JavaScript**: No frameworks, pure JS for interactivity

## 💡 Usage

### Permutation Calculator
1. Navigate to the Permutations section
2. Enter the total number of items (n)
3. Enter the number of items to arrange (r)
4. Click "Calculate Permutation" or press Enter
5. View the result with explanation

### Combination Calculator
1. Navigate to the Combinations section
2. Enter the total number of items (n)
3. Enter the number of items to select (r)
4. Click "Calculate Combination" or press Enter
5. View the result with explanation

## 🎨 Features

- ✅ Responsive navigation menu
- ✅ Smooth scrolling between sections
- ✅ Interactive calculators with real-time validation
- ✅ Clear visual feedback for results
- ✅ Educational examples for each concept
- ✅ Formula reference section
- ✅ Mobile-optimized layout
- ✅ Accessible design with semantic HTML

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as an educational resource for learning combinatorics through interactive examples.

---

**Note**: This is a static website with no backend. All calculations are performed client-side using JavaScript.
