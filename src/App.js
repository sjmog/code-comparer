import React from 'react';
import Player from './Player'
import {Row, Column} from 'react-foundation';
import './App.css';
import acj from 'comparative-judgement';

var _ = require('underscore');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      decisions: [],
      results: [],
      pair: acj.selection.selectionSwiss(props.players),
      judgementIndex: 0
    }
  }

  judgeWinner = (judgement) => {
    const winnerId = judgement.target.id

    const winner = this.state.pair.find(pair => pair._id === Number(winnerId))
    const loser = this.state.pair.find(pair => pair._id !== Number(winnerId))

    this._recordJudgement(winner, 1, loser)
    this._recordJudgement(loser, 0, winner)

    this._updateModel(winner, loser)

    this.setState((prevState, props) => {
      return { pair: acj.selection.selectionSwiss(this.props.players) }
    })
  }

  _recordJudgement = (player, win, opponent) => {
    player.comparisons++
    player.selected++
    player.observedScore += win

    if (!_.contains(player.opponents,opponent))
      player.opponents.push(opponent);

    player.decisions.push(opponent._id);
  }

  _updateModel = (winner, loser) => {
    this.state.decisions.push({
      judge: 'Sam',
      chosen: winner._id,
      notChosen: loser._id,
      timeTaken: 0
    })

    acj.btm.btmModel(this.state.decisions, null, null, null, null, (err, teams) => {
      for(var i = 0; i < this.props.players.length; i++){
        const player = this.props.players[i]
        var playerInModel = _.find(teams, (team) =>  { return player._id === team.team })
        
        if (playerInModel) {
          player.chosen = 0

          if (player._id === winner | player._id === loser)
            player.chosen = 1

          player.lastTrueScore = player.trueScore
          player.trueScore = playerInModel.theta
          player.seTrueScore = playerInModel.seTheta
        }

        // player.iteration tracks how many judges have judged this player
        // we're only simulating one judge ('Sam'), so it's 1
        // for more judges, we'd have to add more iterations
        player.iteration = 1
        player.judgement = this.state.judgementIndex + 1

        const clonedPlayer = Object.assign({}, player)
        this.state.results.push(clonedPlayer)
      }
    })
  }

  render() {
    return (
      <main className="main">
        <Row className="display">
          <Column small={6}>
            <Player onJudge={this.judgeWinner} pair={this.state.pair[0]} side="Left" />
          </Column>
          <Column small={6}>
            <Player onJudge={this.judgeWinner} pair={this.state.pair[1]} side="Right" />
          </Column>
        </Row>
      </main>
    )
  }
}

export default App;