import React, { Component } from 'react';
import './App.css';
let defaultStyle = {
  color: '#fff'
}
let fakeServerData = {
  user: {
    name: 'Daniel',
    playlists: [
      {
        name: 'My favourites',
        songs: [
          {name:'Beat It', duration: 1254},
          {name:'Canenlloni Makaroni', duration: 445},
          {name:'Rosa Helikopter', duration: 22}
        ],
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name:'Le Song', duration: 465},
          {name:'The Song', duration: 65542},
          {name:'Sangen', duration: 23}
        ],
      },
      {
        name: 'Another Playlist - the best',
        songs: [
          {name:'fhsgdg', duration: 342},
          {name:'fgshg', duration: 464},
          {name:'rthrh gfh', duration: 87412}
        ],
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          {name:'retjnf', duration: 2565},
          {name:'yjhe5', duration: 744},
          {name:'yt56y7ujhf', duration: 645}
        ],
      },      
    ]
  }
}
class PlaylistCounter extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}
class HourCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    },[])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    },0)
    return(
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60/60)} hours</h2>
      </div>
    );
  }
}
class Filter extends Component {
  render() {
    return(
      <div style={defaultStyle}>
        <img src=""/>
        <input type="text"/>
        Filter
      </div>
    );
  }
}
class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
        <img/>
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
          <li>Song 4</li>
        </ul>
      </div>
    );
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout( /* insert a delay to mimic taking to a server */
      () => { /*arrow function locks 'this' with what is was just fefore declaring the function  */
        this.setState({serverData: fakeServerData})
      }, 
    1500);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ? 
          <div>
            {this.state.serverData.user && /*check on the left side of &&, and if it true then checks what is on the right side of && if it true and then moves*/
             <h1 style={{...defaultStyle, 'font-size': '54px'}}>
                      {this.state.serverData.user.name}'s Playlist
             </h1>
            }
            <PlaylistCounter playlists = {this.state.serverData.user.playlists}/> 
            <HourCounter playlists = {this.state.serverData.user.playlists}/> 
            <Filter/>
            <Playlist/>
            <Playlist/>
            <Playlist/>
            <Playlist/>
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}
export default App;