import React from 'react';
import NavBar from './NavBar'; // Import the NavBar component
import './style/OurTeam.css'

const OurTeam = () => (
  <div class = 'our-team__body'>
    <NavBar />
    <h2 class="page-title">Our Team</h2>

    <section class="people-container">
          <div class="our-team">
            <div class="pic">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"></img>
            </div>
            <h3 class="title">Megha</h3>
            <span class="post">Founder</span>
            <ul class="social">
              <li><a href="#" class="fa fa-facebook"></a></li>
            </ul>
          </div>

          <div class="our-team">
            <div class="pic">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"></img>
            </div>
            <h3 class="title">Shreya</h3>
            <span class="post">Daughter</span>
            <ul class="social">
              <li><a href="#" class="fa fa-facebook"></a></li>
            </ul>
          </div>

          <div class="our-team">
            <div class="pic">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"></img>
            </div>
            <h3 class="title">Harish</h3>
            <span class="post">Husband</span>
            <ul class="social">
              <li><a href="#" class="fa fa-facebook"></a></li>
            </ul>
          </div>

          <div class="our-team">
            <div class="pic">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"></img>
            </div>
            <h3 class="title">Ojas</h3>
            <span class="post">Turtle</span>
            <ul class="social">
              <li><a href="#" class="fa fa-facebook"></a></li>
            </ul>
          </div>

    </section>
  </div>
);

export default OurTeam;
