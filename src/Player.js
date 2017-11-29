import React from 'react';
import Code from './Code';
import {Button} from 'react-foundation';

class Player extends React.Component {
  componentWillReceiveProps = (nextProps) => {
    console.log('player new props', nextProps)
  }

  render() {
    return(
      <div className="player">
        <Button 
          id={this.props.pair._id} 
          onClick={this.props.onJudge}
          >
            {this.props.side}
        </Button>
        <Code file={this.props.pair.file} />
      </div>
    )
  }
}

export default Player;