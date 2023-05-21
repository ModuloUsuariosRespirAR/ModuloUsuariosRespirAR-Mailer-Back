class multipleMsg {
    constructor(destinatarios,from, asunto, contenido) {
        this.emailsTo = destinatarios;
        this.from= from;
        this.subject = asunto;
        this.text = contenido;
    }
}

module.exports = multipleMsg;