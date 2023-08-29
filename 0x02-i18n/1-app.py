#!/usr/bin/env python3
"""this is the main app"""
from flask import Flask, render_template
from flask_babel import Babel


class Config():
    """a class that configures the required languges"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def index() -> str:
    """renders a html page"""
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run()