class msg {
    constructor(destinatario,from, asunto, contenido) {
        this.to = destinatario;
        this.from= from;
        this.subject = asunto;
        this.text = contenido;
    }
}

module.exports = msg;
