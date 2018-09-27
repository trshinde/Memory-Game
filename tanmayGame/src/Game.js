import React, { Component } from 'react';
import './Game.css';
import CardView from './CardView';
import { connect } from 'react-redux'
import { flipUpCard, checkMatchedPair, startingStep } from './MemGameFunctions';

class Game extends Component {
  componentWillMount() {
    setInterval(this.props.onCheckForMatchedPair,2000);
  }

  getCardViews() {
    let card_views = [];
    let onClick = this.props.onCardClicked;
    this.props.cards.forEach(c => {
      let cardView = <CardView  key={c.id} 
                                id={c.id} 
                                image={c.image}
                                imageUp = {c.imageUp}
                                matched = {c.matched} 
                                onClick={onClick}/>
                                card_views.push(cardView);
    });
    return card_views;
  }

  render() {
    let card_views = this.getCardViews();
    let gameStatus = <div className='Game-status'>
                      <div>Turns: {this.props.turnNo}</div>
                      <div className='Game-changing'><i>Matching Pairs found:</i> {this.props.pairsFound}</div>
                    </div>;

    if (this.props.gameComplete) {
      gameStatus = <div className='Game-status'>
                    <div><strong>GAME COMPLETED!</strong></div>
                    <div className='Game-change'>You used {this.props.turnNo-1} turns to complete the 6X6 memory game.</div>
                    <div><button onClick={this.props.onPlayAgain}>Click to play again</button></div></div>;      
    }

    return (
      <div className='Game'>
        <header className='Game-header'>
          <div className='Game-title'>Memory Game with ReactJS</div>
        </header>
        <div>
          {gameStatus}
        </div>
        <div className='CardContainer'>
          {card_views}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    cards: state.cards,
    turnNo: state.turnNo,
    gameComplete: state.gameComplete,
    pairsFound: state.pairsFound
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCardClicked: id => {
      dispatch(flipUpCard(id));
    },
    onCheckForMatchedPair: () => {
      dispatch(checkMatchedPair());
    },
    onPlayAgain: () => {
      dispatch(startingStep());
    }
  }
}

const GameView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)

export default GameView;

