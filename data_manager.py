import database_common
import json


@database_common.connection_hanlder
def insert_vote(cursor, planet_name):
    cursor.execute("""
					INSERT INTO votes (planet_name)
					VALUES  (%(planet_name)s);
					""",
                   {'planet_name': planet_name})


@database_common.connection_hanlder
def get_all_planet_votes(cursor):
    cursor.execute("""
					SELECT planet_name, COUNT(planet_name)
					FROM votes
					GROUP BY planet_name
					ORDER BY COUNT(planet_name) DESC;
					""")
    return json.dumps(cursor.fetchall())
