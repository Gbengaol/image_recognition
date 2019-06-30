import React, {Component }  from 'react';
import './App.css';
import SearchUrl from './Components/SearchUrl';
import FaceRecognition from './Components/FaceRecognition';
import Clarifai from 'clarifai';

 const app = new Clarifai.App({apiKey: '733c6cd79e34456eb6620b760aba3b05'});

class App extends Component{
    state = {
      url: '',
      boxImage: {},
      imageUrl: ''
    }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * width)
    }
  }

  displayFaceBox = (box) => {
    this.setState({boxImage: box})
  }

  submitImage = async (e) => {
    e.preventDefault();
    await this.setState({imageUrl: this.state.url})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, `${this.state.imageUrl}`)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => {
          console.log(err);
        });
      this.setState({imageUrl: ''})
  }

  render(){
    return (
      <div className="container">
        <SearchUrl onChange={this.onChange} value={this.state.url} submitImage={this.submitImage} />
        <FaceRecognition url={this.state.url} box={this.state.boxImage} />
      </div>
    );
} 
}

export default App;