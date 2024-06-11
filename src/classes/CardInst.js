export class CardInst {
    constructor(filename) {
        this.directory = "img";
        this.extension = ".png";
        this.optionalSeparator = "_-_";
        this.id = Math.random();
        this.flipped = false;
        this.matched = false;

        let splitName = filename.split(this.optionalSeparator);
        this.name = splitName[0];
        this.subName = splitName[1];
    }

    getSrc() {
        return `/${this.directory}/${this.name}${this.extension}`;
    }

    flip() {
        this.flipped = !this.flipped;
    }

    reveal() {
        this.revealed = true;
    }
}