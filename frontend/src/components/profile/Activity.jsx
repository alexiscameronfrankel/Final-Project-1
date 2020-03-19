import React, { Component } from 'react';
import { Container, Card, ListGroup, Button, ButtonGroup,} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import InfiniteCarousel from 'react-leaf-carousel';
import actions from '../../services/index';

class Activity extends Component {
  
  state={
    ready:false,
    recentActivity: [],
    ready2: false
  }
    async componentDidMount(){
        actions.getProfile(this.props.user._id).then(profileFound=>{
          this.setState({
              ...profileFound.data[0],
              ready: true
          })
            if (profileFound.data[0].activity.length >0){
              actions.findActivityRecipes({UserID:this.props.user._id}).then(activityFound=>{
                console.log(activityFound.data)
                this.setState({
                    recentActivity: [...activityFound.data],
                    ready2: true
                })
              })
            }
        })
        .catch(error => console.log("yousuck!"))
    }
    render(){ 
     console.log( this.state)
    return (
        <div>
            
          <Container className="home-recipe">
          <Card id="main-card" 
          style={{ width: '100%' }}>
          
          <Card.Title className="text-center">
            <Card.Header>
                <h1 className="prof-title">{this.state.ready ? <span>Account Activity | {this.state.username}</span>:("Loading")}</h1>
                
            </Card.Header> 
          </Card.Title>
          <Card.Header>
          <Card.Img className="prof-cover" variant="top" src="http://www.ironchefamerica.tv/us/images/lets-get-cooking.jpg "/>
          </Card.Header>
        </Card>
        <div className="settings">
        <Card className="sm-card" id="main-card" style={{ width: '18rem' }}>
            <Card.Header>Settings</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item className="settings-links"><Link to="/profile"><Button className="settings-button" ><i class="fas fa-user-circle"></i> Profile</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myrecipes"><Button className="settings-button" ><i class="fas fa-list"></i> MyRecipes</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/myactivity"><Button className="settings-button" ><i class="fas fa-chart-line"></i> Activity</Button></Link></ListGroup.Item>
                <ListGroup.Item className="settings-links"><Link to="/log-out"><Button className="settings-button" ><i class="fas fa-sign-out-alt"></i> Logout</Button></Link></ListGroup.Item>
            </ListGroup>
        </Card>
        <Card className="sm-card" id="main-card" style={{ width: '100%' }}>
            <Card.Header>Account Activity
                <ButtonGroup>
                <Link to="/recent"> <Button variant="secondary" className="settings-button">Recent</Button></Link>
                <Link to="/liked"> <Button variant="secondary" className="settings-button">Liked</Button></Link>
                <Link to="/commented">  <Button variant="secondary" className="settings-button">Commented</Button></Link>
                    <Link to="/uploaded"> <Button variant="secondary" className="settings-button">Uploaded</Button> </Link>

                </ButtonGroup>
            </Card.Header>
            <Card>
            <Card.Header className="recent-views">Recently Viewed Recipes</Card.Header>
            <InfiniteCarousel
    breakpoints={[
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ]}
    dots={false}
    showSides={true}
    sidesOpacity={.5}
    sideSize={.1}
    slidesToScroll={1}
    slidesToShow={2}
    scrollOnDevice={true}
  >
    <div>
      {this.state.ready2 ? 
            (
              
              this.state.recentActivity.map((eachRecipe,i) => {
            console.log(eachRecipe,this.state.ready2)
            return <div key={i}>{eachRecipe.title}</div>
            {/* (<Card key={i} className="past-recipe-card" style={{ width: '100%' }}>
                      <Card.Img key={i} variant="top" src={eachRecipe.imageUrl} />
                      <Card.Body>
                          <Card.Title key={i}>{eachRecipe.title}</Card.Title>
                          <Card.Text key={i}>
                              Some quick example text to build on the card title and make up the bulk of
                              the card's content.
                          </Card.Text>
                          <Button variant="secondary" className="settings-button">View Recipe</Button>
                      </Card.Body>
                  </Card>
                  ) */}
          })
          ) 
      :
      ("No Recent asdf")
      }
    </div>
    {/* <div>
    <Card className="past-recipe-card" style={{ width: '100%' }}>
            <Card.Img variant="top" src="https://i.ytimg.com/vi/LIubvcunMBc/hqdefault.jpg" />
                <Card.Body>
                    <Card.Title>Brooklyn Style Pizza</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div>
    <div>
    <Card className="past-recipe-card" style={{ width: '100%' }}>
            <Card.Img variant="top" src="https://i.ytimg.com/vi/ZJPpMSx3eSw/hqdefault.jpg" />
                <Card.Body>
                    <Card.Title> Tiquana Street Tacos</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div>
    <div>
    <Card className="past-recipe-card" style={{ width: '100%' }}>
            <Card.Img variant="top" src="https://i.ytimg.com/vi/ZJPpMSx3eSw/hqdefault.jpg" />
                <Card.Body>
                    <Card.Title> Tiquana Street Tacos</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div>
    <div>
    <Card className="past-recipe-card" style={{ width: '100%' }}>
            <Card.Img variant="top" src="https://i.ytimg.com/vi/ZJPpMSx3eSw/hqdefault.jpg" />
                <Card.Body>
                    <Card.Title> Tiquana Street Tacos</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="secondary" className="settings-button">View Recipe</Button>
                </Card.Body>
            </Card>
    </div> */}
  </InfiniteCarousel>
           
            </Card>

            
            
           
            
        </Card>
        </div>
        
        
        </Container>
        </div>
    );
}
}

export default Activity;