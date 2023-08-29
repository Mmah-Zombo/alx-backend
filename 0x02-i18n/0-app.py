#!/usr/bin/env python3
"""this is the main app"""
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index() -> str:
    """renders a html page"""
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run()
