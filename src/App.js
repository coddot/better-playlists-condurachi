import React, { Component } from 'react';
import './App.css'
import queryString from 'query-string'
let defaultStyle = {
  color: '#fff'
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
class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => { /** we reduce the playlists to a single list of songs; first argument = what we pick up; second argument = the initial state of the reduce - empty */
      return songs.concat(eachPlaylist.songs) /** songs starts with nothing, and then we add each playlist song to that  */
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
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
        <img src="" alt=""/>
        <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}
class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return(
      <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
        <img src={playlist.imageUrl} alt="" style={{width:'100px'}}/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => <li>{song.name}</li>)}
        </ul>
      </div>
    );
  }
}
class App extends Component {
  constructor() {
    super()
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer '+accessToken}
    }).then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.display_name
        }
    }))
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        console.log(data.items)
        return {
          name: item.name,
          imageUrl: item.images[0].url, 
          songs: []
        }
    })
    }))
  }
  render() {
    let playlistToRender = 
      this.state.user &&
      this.state.playlists 
        ? this.state.playlists.filter( /** expects its parameter function to be a callback function*/
            playlist => playlist.name.toLocaleLowerCase().includes(
              this.state.filterString.toLocaleLowerCase()
            )
        ) : []
    return (
      <div className="App">
        {this.state.user ?
          <div>
            <h1 style={{...defaultStyle, 'font-size': '54px'}}>
              {this.state.user.name}'s Playlist
            </h1>
            {this.state.playlists &&
              <div>
                <PlaylistCounter playlists = {playlistToRender}/> 
                <HoursCounter playlists = {playlistToRender}/> 
                <Filter onTextChange = {
                  text => this.setState({filterString: text})
                }/>
                {playlistToRender.map( /** map = it's a way of transforming an array to another array; it goes in the entire playlits array and each playlist will transfrom and create a new object with that */
                    playlist => <Playlist playlist={playlist}/>
                )}
              </div>
            }
          </div> : <button onClick={() => window.location='http://localhost:8888/login'} style={{'padding': '20px', 'margin': '20px'}}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}
export default App;