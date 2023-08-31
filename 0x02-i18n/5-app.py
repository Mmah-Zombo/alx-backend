#!/usr/bin/env python3
"""this is the main app"""
from flask import Flask, render_template, request
from flask_babel import Babel
from typing import Union, Dict


class Config():
    """a class that configures the required languges"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


@app.route('/')
def index() -> str:
    """renders a html page"""
    return render_template('0-index.html')


@babel.localeselector
def get_locale() -> str:
    """sets the defualt language for a user session"""
    if 'locale' in request.args and (request.args['locale']
                                     in app.config['LANGUAGES']):
        return request.args['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])


def get_user() -> Union[Dict, None]:
    """gets a user"""
    if request.args['login_as']:
        login_as = request.args['login_as']
        return users.get(login_as)
    else:
        return None


@app.before_request
def before_request() -> None:
    """executes before other functions"""
    user = get_user()
    g.user = user


if __name__ == '__main__':
    app.run(host='0.0.1', port=5000)
