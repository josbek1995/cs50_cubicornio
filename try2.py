import os

from flask_mysqldb import MySQL, MySQLdb
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime

from helpers import apology, login_required, usd

from helpers import apology, login_required, usd

# Configure application
app = Flask(__name__)

# Add a MySQL instance to the code
mysql = MySQL(app)

app.secret_key = "clavesecreta"

# MySQL configurations
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "bd_insumos"
app.config["MYSQL_CURSORCLASS"] = "DictCursor"

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure app always listen 
if __name__ == '__main__':
    app.run(debug=True)

def main():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    result = cur.execute("SELECT * FROM departamentos ORDER BY nombre_dpto")
    departamentos = cur.fetchall()

print(result)