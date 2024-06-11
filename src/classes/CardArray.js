import { CardInst } from "./CardInst";

export class CardArray extends Array {
    duplicateNecessaryCards() {
        let cardsToDuplicate = this.filter(card => card.subName === undefined);
        this.push(...cardsToDuplicate.map(card => new CardInst(card.name)));
    }

    shuffle() {
        this.sort((a,b) => Math.random() - 0.5);
    }
}