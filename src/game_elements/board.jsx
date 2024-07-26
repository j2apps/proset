import React from 'react'
import Card from './card'
class Board extends React.Component {
    constructor(props) {
        super(props);
        const cards = this.populateDeck(props.size)
        const deck_size = cards.length
        let deck = Array(deck_size).fill(1)
        let inPlay = Array(deck_size).fill(0)
        for (let i = 0; i<= props.size; i++) {
            inPlay[i] = 1
            deck[i] = 0
        }
        this.state = {
            cards: cards,
            deck: deck,
            inPlay: inPlay,
            selected: Array(deck_size).fill(0),
            discard: Array(deck_size).fill(0),
            size: props.size,
            deckSpot: props.size + 1
        }
    }

    drawCards(n, inPlay) {
        if (this.state.deckSpot + n - 1 >= this.state.cards.length) {
            this.endGame()
            return
        }
        let deck = [...this.state.deck]
        console.log('HANDLE CARDS' + this.state.inPlay)
        for (let i = this.state.deckSpot; i <= this.state.deckSpot + n - 1; i++) {
            inPlay[i] = 1
            deck[i] = 0
        }
        const deckSpot = this.state.deckSpot + n
        this.setState({inPlay: inPlay, deck: deck, deckSpot: deckSpot})
        /*this.state.inPlay = inPlay
        this.state.deck = deck
        this.state.deckSpot = deckSpot*/

    }
    endGame() {
        let fill = Array(this.state.cards).fill(0)
        this.setState({inPlay: fill})
        alert('Win!')

    }
    populateDeck(size) {
        let card_values = []
        let values = Array(size)
        helper(size - 1, values)
        function helper(index, values) {
            if (index === -1) {
                card_values.push(values)
                return
            }
            let values_1 = [...values]
            let values_2 = [...values]
            values_1[index] = 0
            values_2[index] = 1
            helper(index-1, values_1)
            helper(index-1, values_2)
        }
        card_values.shift()
        return this.shuffleDeck(card_values)
    }
    handleCardClick(index) {
        let selected = [...this.state.selected]
        selected[index] = selected[index] ^ 1
        if (this.checkSuccess(selected)) {
            this.handleSuccess(selected)
            return
        }
        this.setState({selected: selected})
    }
    handleSuccess(selected) {
        let selectedCards = []
        for (let i = 0; i <= this.state.cards.length-1; i++) {
            if (selected[i] === 1) {
                selectedCards.push(i)
            }
        }
        let discard = [...this.state.discard]
        let inPlay = [...this.state.inPlay]
        for (let i = 0; i <= selectedCards.length - 1; i++) {
            discard[selectedCards[i]] = 1
            inPlay[selectedCards[i]] = 0
        }
        console.log('HANDLE SUCCESS' + inPlay)
        this.setState({discard: discard, selected: Array(this.state.cards.length).fill(0)})
        this.drawCards(selectedCards.length, inPlay)
    }
    checkSuccess(selected) {
        let values = this.state.cards
        let selectedCards = []
        for (let i = 0; i <= values.length-1; i++) {
            if (selected[i] === 1) {
                selectedCards.push(values[i])
            }
        }
        if (selectedCards.length === 0) {return false}
        for (let i=0; i<=values[0].length-1; i++) {
            let rowSum = 0
            for (let j = 0; j<=selectedCards.length-1; j++) {
                rowSum ^= selectedCards[j][i]
            }
            if (rowSum === 1) {return false}
        }
        return true
    }

    shuffleDeck(deck) {
        let deck_shuffled = []
        let deck_copy = [...deck]
        for (let i = 0; i<= deck.length; i++) {
            const index = Math.floor(Math.random() * deck_copy.length)
            deck_shuffled[i] = deck_copy[index]
            deck_copy.splice(index, 1)
        }
        return deck_shuffled
    }

    renderCards() {
        console.log('RENDER ' + this.state.inPlay)
        let values = this.state.cards
        let active_cards = []
        let first = true
        for (let i = 0; i <= values.length-1; i++) {
            if (this.state.inPlay[i] === 1) {
                let cardClass = (this.state.selected[i] === 1) ? "clicked" : "unclicked"
                if (first) {cardClass += " first"; first = false}
                if (active_cards.length === this.state.size) {cardClass += " last"}
                const card = <Card cardClass={cardClass} key={i} values={values[i]} onClick={() => this.handleCardClick(i)}></Card>
                active_cards.push(card)
            }
        }
        return <div className={'cardHolder'}>{active_cards}</div>
    }

    render() {
        return <div className={'board'}>{this.renderCards()}</div>
    }
}


export default Board;