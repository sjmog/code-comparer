import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import acj from 'comparative-judgement';

var _ = require('underscore');
var async = require('async');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// 1. set up 
// a. players
// here I have given each of the students ('players') an absolute quality (devQuality)
// to see how the results stack up if they are judged 'perfectly'
// ultimately the mapping of the player.trueScore is what tells us the 'quality'
// (this is to simulate judging a cohort of 24 to find a reasonable number of required judgements to be accurate)
const players = [
{name: "Student #1", "_id": 1, devQuality: 4, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}, 
{name: "Student #2", "_id": 2, devQuality: 16, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}, 
{name: "Student #3", "_id": 3, devQuality: 18, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}, 
{name: "Student #4", "_id": 4, devQuality: 22, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}, 
{name: "Student #5", "_id": 5, devQuality: 28, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}, 
{name: "Student #6", "_id": 6, devQuality: 29, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}, 
{name: "Student #7", "_id": 7, devQuality: 33, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}, 
{name: "Student #8", "_id": 8, devQuality: 38, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}, 
{name: "Student #9", "_id": 9, devQuality: 38, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}, 
{name: "Student #10", "_id": 10, devQuality: 41, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #11", "_id": 11, devQuality: 55, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #12", "_id": 12, devQuality: 57, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #13", "_id": 13, devQuality: 61, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #14", "_id": 14, devQuality: 69, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #15", "_id": 15, devQuality: 71, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #16", "_id": 16, devQuality: 72, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #17", "_id": 17, devQuality: 74, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #18", "_id": 18, devQuality: 76, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #19", "_id": 19, devQuality: 77, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #20", "_id": 20, devQuality: 81, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #21", "_id": 21, devQuality: 81, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #22", "_id": 22, devQuality: 82, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #23", "_id": 23, devQuality: 88, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0},
{name: "Student #24", "_id": 24, devQuality: 91, selected: 0, comparisons: 0, observedScore: 0, trueScore: 0, seTrueScore: 0, opponents: [], decisions: [], theta: 0, chosen: 0, lastTrueScore: 0}
]

// (for the sim, we'll shuffle it too)
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

shuffle(players)

// b. empty decisions
let decisions = []

// c. empty model results
let results = []

// d. not sure what these are
let alphaResults = []

// 2. declare a number of judgements to make (140 seems about right for a group of 24 people)...
// (if coaches take around 20 seconds to judge, it'll take around 45 minutes to do a whole cohort)
const numberOfJudgements = 140
// ...and for each of them
async.each(_.range(numberOfJudgements), (judgementIndex) => {

  // 3. pull out a random pair, using Swiss selection
  const pair = acj.selection.selectionSwiss(players)

  // 4. judge them
  // a. We're using the devQuality to judge, 
  // but this will happen onClick based on a coach estimate.

  const winner = pair.sort((player1, player2) => player1.devQuality > player2.devQuality)[1]
  const loser = pair.sort((player1, player2) => player1.devQuality > player2.devQuality)[0]

  // Judgements are recorded twice (once for each player: a win and a loss)
  // this recordJudgement method
  // mutates data on each player to store the results
  const recordJudgement = (player, win, opponent) => {
    player.comparisons++
    player.selected++
    player.observedScore += win

    if (!_.contains(player.opponents,opponent))
      player.opponents.push(opponent);

    // this line differs from acj.simulation.recordJudgement
    // in the simulation module, the entire opponent is recorded in the decisions
    // but this throws up a problem when using estimation.estimateCJ
    // which expects the decisions to just contain opponent ids
    // and maps them to opponents :shrug:
    player.decisions.push(opponent._id);
  }

  recordJudgement(winner, 1, loser)
  recordJudgement(loser, 0, winner)

  // b. construct an object with decision data
  const decision = {
    judge: 'Sam',
    chosen: winner._id,
    notChosen: loser._id,
    timeTaken: 0
  }

  // c. push that object into some array of such decisions
  decisions.push(decision)

  // 5. Update the model (all iterations and judgements are 1 for this example)
  // for reference, the four nulls are fixTheta, maxIter, conv, and eps. Whatever they are
  acj.btm.btmModel(decisions, null, null, null, null, function(err, teams) {
    for(var i = 0; i < players.length; i++){
      const player = players[i]
      var playerInModel = _.find(teams, (team) =>  { return player._id == team.team })
      
      if (playerInModel) {
        player.chosen = 0

        if (player._id == decision.chosen | player._id == decision.notChosen)
          player.chosen = 1

        player.lastTrueScore = player.trueScore
        player.trueScore = playerInModel.theta
        player.seTrueScore = playerInModel.seTheta
      }

      // player.iteration tracks how many judges have judged this player
      // we're only simulating one judge ('Sam'), so it's 1
      player.iteration = 1
      player.judgement = judgementIndex + 1

      const clonedPlayer = Object.assign({}, player)
      results.push(clonedPlayer)
    }
    let alpha = acj.estimation.estimateReliability(players)
    alpha.iteration = 1
    alpha.judgement = judgementIndex + 1

    alphaResults.push(alpha)
  })
})

// once done, log the results
// console.log(results)

// // and the 'alpha' results?
// console.log(alphaResults)

// 6. and now construct a scale

// grab the chosens and unchosens from the decisions, and union them 
let chosen = _.uniq(_.pluck(decisions, 'chosen'))
let notChosen = _.uniq(_.pluck(decisions, 'notChosen'))
let playerIds = _.union(chosen, notChosen)

// args are task, players, iterations (4 is normal), and a callback(task, estimatedPlayers)
acj.estimation.estimateCJ('sim comparison', players, 4, (task, estimatedPlayers) => {
  // by way of proof this works, these should be ordered in various ways
  // more judgements makes for more likely ordering
  
  console.log('sorted by "observed Score"')
  const sortedByObservedScore = estimatedPlayers.slice().sort((player1, player2) => player1.observedScore - player2.observedScore)
  for(var i = 0; i < sortedByObservedScore.length; i++) {
    const player = sortedByObservedScore[i]
    console.log(`${player.name} : ${player.observedScore}`)
  }

  console.log('sorted by "true score"')
  const sortedByTrueScore = estimatedPlayers.slice().sort((player1, player2) => player1.trueScore - player2.trueScore)
  for(var i = 0; i < sortedByTrueScore.length; i++) {
    const player = sortedByTrueScore[i]
    console.log(`${player.name} : ${player.trueScore}`)
  }
    
  

  // seTrue score is just some measure of variance by the looks of things
  // console.log('sorted by "seTrue score"')
  // const sortedBySeTrueScore = estimatedPlayers.sort((player1, player2) => player1.seTrueScore - player2.seTrueScore)
  // for(var i = 0; i < sortedBySeTrueScore.length; i++) {
  //   const player = sortedBySeTrueScore[i]
  //   console.log(`${player.name} : ${player.seTrueScore}`)
  // }
})
