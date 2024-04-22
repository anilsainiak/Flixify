import pickle
import sys
import json

with open('./util/data.pkl', 'rb') as f:
    df = pickle.load(f)
    similarity = pickle.load(f)

def recommend(movie):
    movie = movie.lower()
    movie_index = df[df['title'] == movie].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:200]

    recommended_movies = [df.iloc[i[0]]['title'] for i in movies_list]
    return recommended_movies



movie_title = sys.argv[1]


# Get recommendations

recommendations = recommend(movie_title)
with open('./util/recommendations.txt', 'w') as file:
    for i in recommendations:
        file.write(i+'\n')
# Print recommendations as JSON string
# print(json.dumps(recommendations))
