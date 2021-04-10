import os

from flask_mysqldb import MySQL, MySQLdb
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime

from helpers import apology, login_required, usd, soles

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
app.jinja_env.filters["soles"] = soles

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
        cur.execute("SELECT * FROM provincias WHERE codigo_dpto = %(codigo_dpto)s ORDER BY nombre_prov ASC", {'codigo_dpto': codigo_dpto} )
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
        cur.execute("SELECT * FROM distritos WHERE dpto_prov = %(dpto_prov)s ORDER BY nombre_dist ASC", {'dpto_prov': dpto_prov})
        distrito = cur.fetchall()  

        OutputArray = []
        for row in distrito:
            outputObj = {
                'id': row['ubigeo'],
                'name': row['nombre_dist']}
            OutputArray.append(outputObj)

    return jsonify(OutputArray)

# ----------------------------------LLAMADOS A BASE DE DATOS PARA GENERAR LA INFORMACIÓN DE MATERIALES-------------------------------

@app.route("/resultado_materiales",methods=["POST","GET"])
def resultado_materiales():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if request.method == 'POST':
        search_word = request.form['query']
        ubigeo = request.form['ubigeo']
        if search_word == '':
            query = "SELECT AVG(Precio) AS average from materiales"
            cur.execute(query)
            material = cur.fetchall()
        else:    
            query = "SELECT CAST(SUM(CASE WHEN Id_fuente = 'T_VIR' THEN 1 ELSE 0 END) AS int) AS t_virtual, CAST(SUM(CASE WHEN Id_fuente = 'T_FIS' THEN 1 ELSE 0 END) AS int) AS t_fisica, CAST(SUM(CASE WHEN Id_fuente = 'E_PUB' THEN 1 ELSE 0 END) AS int) AS expe, AVG(Precio) AS average, MAX(Fecha) AS max_date, Und_largo, Und from materiales WHERE Descrip LIKE '%{}%' AND ubigeo='{}' GROUP BY Und_largo".format(search_word, ubigeo)
            cur.execute(query)
            material = cur.fetchall()

    return jsonify({'htmlresponse': render_template('respuesta2.html', material=material)})


@app.route("/unidades_materiales",methods=["POST","GET"])
def unidades_materiales():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if request.method == 'POST':
        search_word = request.form['query']
        ubigeo = request.form['ubigeo']   
        query = "SELECT CAST(SUM(CASE WHEN Id_fuente = 'T_VIR' THEN 1 ELSE 0 END) AS int) AS t_virtual, CAST(SUM(CASE WHEN Id_fuente = 'T_FIS' THEN 1 ELSE 0 END) AS int) AS t_fisica, CAST(SUM(CASE WHEN Id_fuente = 'E_PUB' THEN 1 ELSE 0 END) AS int) AS expe, AVG(Precio) AS average, MAX(Fecha) AS max_date, Und_largo, Und from materiales WHERE Descrip LIKE '%{}%' AND ubigeo='{}' GROUP BY Und_largo".format(search_word, ubigeo)
        cur.execute(query)
        material = cur.fetchall()

        OutputArray = []
        for row in material:
            outputObj = {
                'und': row['Und'],
                'und_largo': row['Und_largo'],
                'average': soles(row['average']),
                'date': row['max_date'],
                'fisica': row['t_fisica'],
                'virtual': row['t_virtual'],
                'expe': row['expe']}
            OutputArray.append(outputObj)

    return jsonify(OutputArray)
# -------------------------------------------------------------------------------------------------------------------------------------




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

@app.route("/develop")
def develop():

    return render_template("develop.html")

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
