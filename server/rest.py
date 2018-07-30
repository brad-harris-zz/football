from flask import Flask, jsonify, Response
from flask_restful import Resource, Api
import MySQLdb
import json
import datetime

db = MySQLdb.connect(
    host="localhost",
    user="football",
    passwd="",
    db="football"
)
cur = db.cursor()

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

class getTeam(Resource):
    def get(self, team_id):
        query = "SELECT name, owner, icon FROM teams WHERE id=%s"
        cur.execute(query, (team_id,))
        result = cur.fetchone()
        return jsonify(result)

class GetPower5(Resource):
    def get(self):
        getTeams = '''
            SELECT teams.id, teams.name, teams.icon, conferences.name FROM teams 
            JOIN conferences ON teams.conference_id=conferences.id 
            WHERE conferences.id=4 OR conferences.id=5 OR conferences.id=6 OR conferences.id=11 OR conferences.id=12
            ORDER BY teams.name
        '''
        cur.execute(getTeams)
        teamData = {
            'ACC': [],
            'Big 10': [],
            'Big XII': [],
            'Pac 12': [],
            'SEC': []
        }
        for row in cur.fetchall():
            team = {
                'id': row[0],
                'name': row[1],
                'icon': row[2]
            }
            teamData[row[3]].append(team)
        teamsJSON = json.dumps(teamData)
        response = Response(teamsJSON, status=200, mimetype='application/json')
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

def serializer(o):
    if isinstance(o, datetime.datetime) or isinstance(o, datetime.date):
        return "{}-{}-{}".format(o.year, o.month, o.day)

class GetGames(Resource):
    def get(self, week_id):
        getWeek = "SELECT id, location, date FROM games WHERE week=%s"
        cur.execute(getWeek, (week_id,))
        results = cur.fetchall()
        print "Found {} results".format(len(results))
        games = []
        for game in results:
            getTeams = "SELECT teams.name FROM scores JOIN teams ON scores.team_id=teams.id WHERE game_id=%s"
            cur.execute(getTeams, (game[0],))
            teams = cur.fetchall()
            gameData = {
                'location': game[1],
                'date': game[2],
                'teams': []
            }
            for t in teams:
                gameData['teams'].append(t[0])
            games.append(gameData)
        gamesJSON = json.dumps(games, default=serializer)
        response = Response(gamesJSON, status=200, mimetype='application/json')
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

class GetOpponents(Resource):
    def get(self, team_id):
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
        cur.execute(opponentsQuery, (int(team_id), int(team_id)))
        oppData = []
        results = cur.fetchall()
        for opp in results:
            data = {
                'week': opp[0],
                'name': opp[1]
            }
            oppData.append(data)
        oppJSON = json.dumps({'team_id': team_id, 'opponents': oppData})
        response = Response(oppJSON, status=200, mimetype='application/json')
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

api.add_resource(HelloWorld, '/')
api.add_resource(getTeam, '/team/<int:team_id>')
api.add_resource(GetGames, '/week/<int:week_id>')
api.add_resource(GetPower5, '/power')
api.add_resource(GetOpponents, '/opponents/<int:team_id>')

if __name__ == '__main__':
    app.run(debug=True)