from cs50 import SQL
from helpers import apology, login_required, usd
# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")

sym = "A"

username = db.execute("SELECT username FROM users WHERE id = :id", id = 3)

rows = db.execute("SELECT symbol, name, SUM(shares) AS shares, price2, SUM(total) AS total FROM stock_bought WHERE username = :username GROUP BY symbol", username = username[0]['username'])

rows2 = db.execute("SELECT symbol FROM stock_bought WHERE username = :username", username = username[0]['username'])

for row in rows:
    total1 = usd(row["total"])
    row["total1"] = total1
 
res = list(filter(lambda i: i['shares'] != 0, rows))   

#for i in range(len(rows)):
    #if rows[i]['shares'] == 0:

print(rows)