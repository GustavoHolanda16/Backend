from flask import Flask, render_template,request,redirect,url_for
app = Flask(__name__, static_url_path='/static')

@app.route('/')
def hello():
    return render_template('home.html')
@app.route('/submit', methods=['POST'])
def submit():
    input_text = request.form['input_text']
    return redirect(url_for('result', input_text=input_text))
@app.route('/filmes')
def filmes():
    input_text = request.args.get('input_text')
    return render_template('index.html')
if __name__ == '__main__':
    app.run()
