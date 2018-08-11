import json
import pymysql

conn = pymysql.connect(
    host="localhost",
    user="football",
    passwd="",
    db="football"
)

cur = conn.cursor()

teamsQuery = '''
    SELECT teams.id FROM teams 
    JOIN conferences ON teams.conference_id=conferences.id 
    WHERE conferences.id=4 OR conferences.id=5 OR conferences.id=6 OR conferences.id=11 OR conferences.id=12
'''
teamIds = []
cur.execute(teamsQuery)
for row in cur.fetchall():
    teamIds.append(row[0])

opponents = {}

opponentsQuery = '''
    SELECT a.week, teams.name FROM (
        SELECT b.week as 'week', team_id
        FROM scores JOIN (
            SELECT game_id, games.week
            FROM scores
            JOIN games ON scores.game_id = games.id
            WHERE team_id = %s
        ) as b
        ON scores.game_id = b.game_id
        WHERE NOT scores.team_id = %s
    ) as a
    JOIN teams ON teams.id = a.team_id
'''

for id in teamIds:
    cur.execute(opponentsQuery, (id, id))
    oppData = []
    for row in cur.fetchall():
        oppData.append({
            'week': row[0],
            'name': row[1]
        })
    opponents[id] = oppData
print json.dumps(opponents)