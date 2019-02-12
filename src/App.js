import React, { Component } from 'react'
import Clarifai from 'clarifai'
import 'tachyons'

import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import Register from './components/Register/Register'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import keys from './keys.js'



const initialState = {
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user:{
      id:"",
      name:"",
      email:"",
      password:"",
      entries:0,
      joined:''
  }
}

class App extends Component {
  state = initialState

  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then( data => console.table(data))
  // }

  loadUser = (data) => {
    this.setState({user : {
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    console.log(this.state.route)
    console.log(this.state.isSignedIn)
    this.setState({route:route})
  }

  onInputChange = (event) => {
    this.setState({
      input:event.target.value
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('input-image')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * width)
    }
  }
  
  displayFaceBox = ( box ) => {
    console.log(box)
    this.setState({box:box})
  } 

  onSubmit = (event) => {
    this.setState({imageUrl:this.state.input})
    fetch('https://ancient-beyond-30998.herokuapp.com/imageurl',{
      method:'post',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          input:this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch('https://ancient-beyond-30998.herokuapp.com/image',{
          method:'put',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              id:this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries:count}))
        })
        .catch(error => console.log(error))
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">

        <Navigation 
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        { this.state.route === "home" 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onSubmit={this.onSubmit}
                onInputChange={this.onInputChange}
              />
              <FaceRecognition 
                box={this.state.box}
                imageUrl={this.state.imageUrl}
              />
            </div>
          : (
            this.state.route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }

      </div>
    );
  }
}

export default App;
