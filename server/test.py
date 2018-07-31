import pymysql

conn = pymysql.connect(
    host="localhost",
    user="football",
    passwd="",
    db="football"
)

cur = conn.cursor()

cur.execute('SELECT * FROM teams')
for row in cur:
    print row