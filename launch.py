from flask import Flask, render_template, request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer

app = Flask(__name__)

bot = ChatBot("ChatterBot", storage_adapter="chatterbot.storage.SQLStorageAdapter")
trainer = ChatterBotCorpusTrainer(bot)
trainer.train("chatterbot.corpus.english")


@app.route('/')
def landing():
    return render_template('index.html')


@app.route('/mobile')
def mobile():
    return render_template('mobile.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route("/videocall")
def videocall():
    return render_template("videocall.html")


@app.route("/premium")
def premium():
    return render_template("premium.html")


@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    return str(bot.get_response(userText))


if __name__ == "__main__":
    app.run(debug=True, port=8080, use_reloader=False)

# pip install chatterbot==1.0.4
