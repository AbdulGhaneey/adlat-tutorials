const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, images) from the public folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Sample course data (in a real app this would come from a database)
const courses = [
  {
    id: 1,
    title: 'Digital Literacy Fundamentals',
    tutor: 'Mr. Abdul-Ghaniy',
    level: 'Beginner',
    description: 'Learn essential computer and internet skills for everyday life and school.'
  },
  {
    id: 2,
    title: 'Introduction to Coding',
    tutor: 'Mr. Abdul-Ghaniy',
    level: 'Beginner',
    description: 'Build a foundation in programming logic using block-based and text-based coding.'
  },
  {
    id: 3,
    title: 'Mathematics Clinic (JSS1 - SS3)',
    tutor: 'Mr. Abdul-Ghaniy',
    level: 'Intermediate',
    description: 'Targeted revision and problem-solving sessions for secondary school mathematics.'
  },
  {
    id: 4,
    title: 'MS Office Essentials',
    tutor: 'Mr. Abdul-Ghaniy',
    level: 'Beginner',
    description: 'Hands-on training in Word, Excel, and PowerPoint for school and work.'
  }
];

// Home page
app.get('/', (req, res) => {
  res.send(renderPage('Home', `
    <section class="hero">
      <h1>Welcome to Adlat Tutorials</h1>
      <p>An online platform for quality teaching and learning &mdash; anytime, anywhere.</p>
      <a class="btn" href="/courses">Browse Courses</a>
    </section>
  `));
});

// Courses listing page
app.get('/courses', (req, res) => {
  const cards = courses.map(c => `
    <div class="card">
      <h3>${c.title}</h3>
      <p class="meta">${c.level} &middot; Tutor: ${c.tutor}</p>
      <p>${c.description}</p>
    </div>
  `).join('');
  res.send(renderPage('Courses', `<h1>Our Courses</h1><div class="grid">${cards}</div>`));
});

// About page
app.get('/about', (req, res) => {
  res.send(renderPage('About', `
    <h1>About Adlat Tutorials</h1>
    <p>Adlat Tutorials is an online teaching platform connecting students with dedicated tutors
    across Digital Literacy, Coding, Mathematics, and Office skills. Our mission is to make
    quality, personalized education accessible to every learner.</p>
  `));
});

// Simple JSON API endpoint for the courses (useful for testing/demo purposes)
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Health check endpoint (handy for Docker/monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

function renderPage(title, bodyHtml) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Adlat Tutorials | ${title}</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <nav class="navbar">
      <div class="logo">Adlat Tutorials</div>
      <div class="links">
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
        <a href="/about">About</a>
      </div>
    </nav>
    <main>
      ${bodyHtml}
    </main>
    <footer>
      <p>&copy; ${new Date().getFullYear()} Adlat Tutorials. All rights reserved.</p>
    </footer>
  </body>
  </html>
  `;
}

app.listen(PORT, () => {
  console.log(`Adlat Tutorials app running on port ${PORT}`);
});
