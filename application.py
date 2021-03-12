import os

from flask_mysqldb import MySQL, MySQLdb
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime

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

# Ensure responses aren't cached

@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def index():
    return render_template("index.html")
    
@app.route("/costos")
def main():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT * FROM departamentos ORDER BY nombre_dpto")
    departamentos = cur.fetchall()
    return render_template('cotizaciones.html', departamentos=departamentos)

@app.route("/provincias",methods=["POST","GET"])
def provincias():  
    cursor = mysql.connection.cursor()
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if request.method == 'POST':
        codigo_dpto = request.form['codigo_dpto']  
        cur.execute("SELECT * FROM provincias WHERE codigo_dpto = %s ORDER BY nombre_prov ASC", [codigo_dpto] )
        provincia = cur.fetchall()

        OutputArray = []
        for row in provincia:
            outputObj = {
                'id': row['dpto_prov'],
                'name': row['nombre_prov']}
            OutputArray.append(outputObj)

    return jsonify(OutputArray)

@app.route("/distritos",methods=["POST","GET"])
def distritos():  
    cursor = mysql.connection.cursor()
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if request.method == 'POST':
        dpto_prov = request.form['dist_prov']  
        cur.execute("SELECT * FROM distritos WHERE dpto_prov = %s ORDER BY nombre_dist ASC", [dpto_prov])
        distrito = cur.fetchall()  

        OutputArray = []
        for row in distrito:
            outputObj = {
                'id': row['ubigeo'],
                'name': row['nombre_dist']}
            OutputArray.append(outputObj)

    return jsonify(OutputArray)

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
 
        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    if request.method == "GET":
        return render_template("register.html")

    else:

        return redirect("/")


def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return apology(e.name, e.code)


# Listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
