# Deutsch-Karten - German Flashcards Practice

A simple yet effective web application for practicing German vocabulary using a flashcard system. Click or tap cards to reveal answers, track your progress, and improve your German language skills.

## Features

- **Interactive Flashcards**: Click to flip cards and reveal answers
- **Category Filtering**: Practice specific topics (Articles, Verbs, Numbers, Common Phrases)
- **Customizable Sessions**: Choose 10, 30, or 50 cards per practice session
- **Progress Tracking**: Built-in timer and score tracking
- **Keyboard Shortcuts**: 
  - Space: Flip card
  - Arrow Up: Mark as correct
  - Arrow Down: Mark as incorrect
  - Arrow Right: Next card
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Deutsch-Karten.git
cd Deutsch-Karten
```

2. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the application:
```bash
python app.py
```

5. Open your browser and navigate to `http://localhost:5001`

### Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up --build
```

2. Access the application at `http://localhost:5001`

## Data Structure

The vocabulary data is stored in `data/german_cards.csv` with the following format:

```csv
Category,Front,Back
Articles,Haus,das Haus
Verbs,gehen,to go
```

You can easily add your own vocabulary by editing this CSV file.

## Deployment Options

### GitHub Actions + Render.com

1. Fork this repository
2. Create a new Web Service on Render.com
3. Add your Render deploy hook URL as a GitHub secret named `RENDER_DEPLOY_HOOK`
4. Push to main branch to trigger automatic deployment

### Other Platforms

The application includes a Dockerfile and can be deployed to:
- Railway.app
- Fly.io
- Google Cloud Run
- AWS ECS
- Any platform supporting Docker containers

## Technology Stack

- **Backend**: Python Flask
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Data Storage**: CSV file
- **Deployment**: Docker + Docker Compose

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License