#!/usr/bin/env python3
"""this is the main app"""
from flask import Flask, render_template, request
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


@babel.localeselector
def get_locale() -> str:
    """sets the defualt language for a user session"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


if __name__ == '__main__':
    app.run()
