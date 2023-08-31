#!/usr/bin/env python3
"""this is the main app"""
from flask import Flask, render_template, request, g
from flask_babel import Babel
from typing import Union, Dict
import pytz


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


def get_user() -> Union[Dict, None]:
    """gets a user"""
    login_as = request.args.get('login_as')
    if login_as:
        return users.get(int(login_as))
    else:
        return None


@app.before_request
def before_request() -> None:
    """executes before other functions"""
    user = get_user()
    g.user = user


@babel.localeselector
def get_locale() -> str:
    """sets the defualt language for a user session"""
    locale = request.args.get('locale', '')
    if locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user.get('locale') in app.config['LANGUAGES']:
        return g.user.get('locale')
    locale_h = request.headers.get('locale', '')
    if locale_h in app.config['LANGUAGES']:
        return locale_h
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@babel.timezoneselector
def get_timezone() -> str:
    """gets the user timezone"""
    tz = request.args.get('timezone')
    if not tz and g.user:
        tz = g.user.get('timezone')
    try:
        pytz.timezone(tz).zone
        return tz
    except pytz.UnknownTimeZoneError:
        return app.config['BABEL_DEFAULT_TIMEZONE']


@app.route('/')
def index() -> str:
    """renders a html page"""
    return render_template('5-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.1', port=5000)
