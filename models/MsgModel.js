export class Msg {
    constructor(to,from, subject, text) {
        this.to = to;
        this.from= from;
        this.subject = subject;
        this.text = text;
    }
}
