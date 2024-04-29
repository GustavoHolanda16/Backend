from flask import Flask, render_template
app = Flask(__name__, static_url_path='/static')

@app.route('/')
def hello():
    return 'Essa é a minha primeira pagina!'
@app.route('/contato')
def contato():
    return render_template('contato.html')
if __name__ == '__main__':
    app.run()
