import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
// import {EmailShareButton, FacebookShareButton, InstapaperShareButton, LineShareButton, LinkedinShareButton, LivejournalShareButton, MailruShareButton, OKShareButton, PinterestShareButton, PocketShareButton, RedditShareButton, TelegramShareButton, TumblrShareButton, TwitterShareButton, ViberShareButton, VKShareButton, WhatsappShareButton, WorkplaceShareButton} from 'react-share';

const Footer = () => {
  return (
    <MDBFooter color="indigo" className="font-small darken-3 pt-0" >
    <MDBContainer>
      <MDBRow>
        <MDBCol md="12" className="py-5">
          <div className="mb-5 flex-center">
            <a className="fb-ic" href="https://www.facebook.com">
              <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
              </i>
            </a>
            <a className="tw-ic" href="https://www.twitter.com">
              <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x">
              </i>
            </a>
            <a className="gplus-ic" href="https://www.google.com">
              <i className="fab fa-google-plus fa-lg white-text mr-md-5 mr-3 fa-2x">
              </i>
            </a>
            <a className="li-ic" href="https://www.linkedin.com">
              <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
              </i>
            </a>
            <a className="ins-ic" href="https://www.instagram.com">
              <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
              </i>
            </a>
            <a className="pin-ic" href="https://www.pinterest.com">
              <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>
            </a>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div className="footer-copyright text-center py-3">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a href="https://www.RecipeBox.com"> Recipe Box </a>
      </MDBContainer>
    </div>
  </MDBFooter>
  );
}

export default Footer;