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


api.add_resource(HelloWorld, '/')
api.add_resource(getTeam, '/team/<int:team_id>')
api.add_resource(GetGames, '/week/<int:week_id>')

if __name__ == '__main__':
    app.run(debug=True)