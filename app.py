from flask import Flask, render_template, jsonify
import csv
import random
import os

app = Flask(__name__)

def load_cards():
    cards = []
    csv_path = os.path.join('data', 'german_cards.csv')
    with open(csv_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            cards.append({
                'category': row['Category'],
                'front': row['Front'],
                'back': row['Back']
            })
    return cards

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/cards')
def get_cards():
    cards = load_cards()
    return jsonify(cards)

@app.route('/api/cards/<category>')
def get_cards_by_category(category):
    cards = load_cards()
    if category.lower() == 'all':
        return jsonify(cards)
    filtered_cards = [card for card in cards if card['category'].lower() == category.lower()]
    return jsonify(filtered_cards)

@app.route('/api/categories')
def get_categories():
    cards = load_cards()
    categories = list(set(card['category'] for card in cards))
    return jsonify(categories)

@app.route('/api/random-cards/<int:count>')
def get_random_cards(count):
    cards = load_cards()
    if count > len(cards):
        count = len(cards)
    random_cards = random.sample(cards, count)
    return jsonify(random_cards)

@app.route('/api/random-cards/<category>/<int:count>')
def get_random_cards_by_category(category, count):
    cards = load_cards()
    if category.lower() != 'all':
        cards = [card for card in cards if card['category'].lower() == category.lower()]
    if count > len(cards):
        count = len(cards)
    random_cards = random.sample(cards, count)
    return jsonify(random_cards)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)