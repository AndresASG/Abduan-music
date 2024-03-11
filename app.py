from flask import Flask, request
import os
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

GEMINI_API_KEY = "" #REGISTRARSE Y OBTENER UNA API KEY EN https://console.cloud.google.com/
genai.configure(api_key = GEMINI_API_KEY)

model = genai.GenerativeModel('gemini-pro')

def generate_content(request):
    response = model.generate_content(f"Dame una lista de 10 {request.form['animo']} mood canciones de los {request.form['decada']} del genero {request.form['genero']}, con una duracion de {request.form['minutos']} en el lenguaje {request.form['idioma']}. Dame exclusivamente el nombre del artista y el nombre de la cancion. Formatea los datos como un objeto JSON con las llaves numero, nombre, artista. Todo en un solo JSON array Importante solo con esas llaves. Ademas, {request.form['adicional']}")
    text = response.text
    return text

@app.route("/playlist", methods=["POST"])
def playlist():
    text = generate_content(request)
    return text, 200

if __name__ == "__main__":
    app.run(debug=True)
    
