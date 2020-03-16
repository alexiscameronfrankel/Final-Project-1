import React, { Component } from 'react';
import { Parallax } from "react-parallax";
import { Button } from 'react-bootstrap';
// import Footer from '../Footer';
// import Searchbar from './Searchbar';
// import actions from '../../services/index'



const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
const insideStyles = {
  background: "white",
  padding: 20,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)"
};
const image1 =
  "http://blog.hdwallsource.com/wp-content/uploads/2015/01/italian-food-wallpaper-hd-44478-45604-hd-wallpapers.jpg";
const image2 =
  "https://blog.hdwallsource.com/wp-content/uploads/2016/03/pasta-dish-wallpaper-50268-51956-hd-wallpapers.jpg";
const image3 =
  "https://s-media-cache-ak0.pinimg.com/originals/6d/0e/e0/6d0ee03a21b8eac01290eabc55b0de33.jpg";
const image4 =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages2.alphacoders.com%2F201%2Fthumb-1920-201292.jpg&f=1&nofb=1";

class Home extends Component {
  async componentDidMount() {
    //actions.test()
  }
  render() {
    return (
      <div>
        <div style={styles}>
        <p className="para-title">Recipe Box</p>
    <Parallax bgImage={image1} strength={500} blur={{ min: -1, max: 3 }}>
      <div style={{ height: 500 }}>
        
      </div>
    </Parallax>
    <blockquote className="para-div">“You have to be a romantic to invest yourself, your money, and your time in cheese.”
Medium Raw: A Bloody Valentine to the World of Food and the People Who Cook <br></br><br></br>
― Anthony Bourdain</blockquote>
    <Parallax bgImage={image2}  strength={500} blur={{ min: -1, max: 3 }}>
      <div style={{ height: 500 }}>
        {/* <div style={insideStyles}>Dynamic Blur</div> */}
      </div>
    </Parallax>
    <blockquote className="para-div">
   "I cook, I create, I'm incredibly excited by what I do, I've still got a lot to achieve." <br></br><br></br>

    ― Gordon Ramsay
    </blockquote>
    <Parallax bgImage={image3}  strength={500} blur={{ min: -1, max: 3 }}>
      <div style={{ height: 500 }}>
        {/* <div style={insideStyles}>Reverse direction</div> */}
      </div>
    </Parallax>
    <blockquote className="para-div">"A chef is a mixture maybe of artistry and craft. You have to learn the craft really to get there."<br></br><br></br>

    ― Wolfgang Puck</blockquote>
    <Parallax bgImage={image4}  strength={500} blur={{ min: -1, max: 3 }}>
      <div style={{ height: 500 }}>
      <Button href="/myrecipes" className="btn-secondary" style={insideStyles}>Start Cooking</Button>
        {/* <div style={insideStyles}>renderProp</div> */}
      </div>
    </Parallax>
    </div>
    </div>
    );
  }
}

export default Home;
 