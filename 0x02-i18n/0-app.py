#!/usr/bin/env python3
"""this is the main app"""
from flask import Flask, render_template, Response


app = Flask(__name__)


@app.route('/')
def index() -> Response:
    """renders a html page"""
    return render_template('0-index.html')
