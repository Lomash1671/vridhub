/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import elderlyCommunityImg from '../../assets/back.jpg';
import communityMeetup1 from '../../assets/communityMeetup1.jpeg';
import communityMeetup2 from '../../assets/communityMeetup1.jpeg';
import communityMeetup3 from '../../assets/communityMeetup1.jpeg';
import { Helmet } from 'react-helmet';
// import Footer from '../Footer';
import { Link } from 'react-router-dom';

const headerStyle = css`
  background-color: #2C3E50;
  color: white;
  text-align: center;
  padding: 30px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  h1 {
    font-size: 2.5em;
    margin: 0;
    font-weight: bold;
  }
  p {
    margin-top: 10px;
    font-size: 1.2em;
    font-style: italic;
  }
`;

const navStyle = css`
  position: sticky;
  top: 0;
  background-color: #34495E;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  a {
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
    font-weight: bold;
  }
`;

const heroStyle = css`
  background-image: url(${elderlyCommunityImg});
  background-size: cover;
  background-position: center;
  height: 500px;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);
  h1 {
    font-size: 3.5em;
    margin: 0;
    text-shadow: 2px 2px 5px #000;
    line-height: 1.2;
  }
`;

const contentStyle = css`
  padding: 60px 20px;
  background-color: white;
  text-align: center;
`;

const sectionTitleStyle = css`
  font-size: 2.2em;
  margin-bottom: 40px;
  color: #2C3E50;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
`;

const featureStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 40px;
`;

const featureCardStyle = css`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
  margin: 20px 0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 1.5em;
    color: #2C3E50;
    margin-bottom: 15px;
  }
  p {
    font-size: 1em;
    color: #666;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  button {
    padding: 12px 18px;
    background-color: #1ABC9C;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1em;
    transition: background-color 0.3s ease;
  }
  .more-info {
    display: block;
    margin-top: 15px;
    color: #34495E;
    text-align: center;
    font-size: 0.9em;
  }
`;

const Community = () => {
  const [info, setInfo] = useState({ info1: false, info2: false, info3: false });

  const toggleInfo = (infoId) => {
    setInfo(prevInfo => ({ ...prevInfo, [infoId]: !prevInfo[infoId] }));
  };

  return (
    <>
    <Helmet>
      <title>Isolation - Community</title>
    </Helmet>
    <div css={{ fontFamily: 'Helvetica Neue, Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f9f9f9', color: '#333' }}>
      <header css={headerStyle}>
        <h1>Elderly Connect</h1>
        <p>Combating Isolation Through Community</p>
      </header>

      <nav css={navStyle}>
        <Link to="/" >Home</Link>
        <a href="#features">Features</a>
        <Link to="/about">About Us</Link>
        <Link to="/isolation">Community</Link>
      </nav>

      <section css={heroStyle}>
        <h1>Building Bridges, Not Walls</h1>
      </section>

      <section id="community" css={contentStyle}>
        <h2 css={sectionTitleStyle}>Community Meetups</h2>
        <div css={featureStyle}>
          <div css={featureCardStyle}>
            <img src={communityMeetup1} alt="Local Gatherings" />
            <h3>Local Gatherings</h3>
            <p>Participate in local gatherings organized by NGOs to foster a sense of belonging among the elderly.</p>
            <button onClick={() => toggleInfo('info1')}>Learn More</button>
            {info['info1'] && (
              <div className="more-info">
                <p>These gatherings provide an opportunity to share stories, play games, and enjoy each other's company in a friendly and supportive environment.</p>
              </div>
            )}
          </div>
          <div css={featureCardStyle}>
            <img src={communityMeetup2} alt="Workshops and Activities" />
            <h3>Workshops and Activities</h3>
            <p>Join various workshops and activities tailored to the interests of elderly participants.</p>
            <button onClick={() => toggleInfo('info2')}>Learn More</button>
            {info['info2'] && (
              <div className="more-info">
                <p>From crafting to technology sessions, these activities are designed to engage and empower seniors, helping them learn new skills and stay active.</p>
              </div>
            )}
          </div>
          <div css={featureCardStyle}>
            <img src={communityMeetup3} alt="Outdoor Events" />
            <h3>Outdoor Events</h3>
            <p>Experience the joy of outdoor events like picnics, nature walks, and cultural festivals.</p>
            <button onClick={() => toggleInfo('info3')}>Learn More</button>
            {info['info3'] && (
              <div className="more-info">
                <p>Outdoor events are a wonderful way to enjoy nature, connect with others, and have fun in a vibrant setting.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
    {/* <Footer /> */}
    </>
  );
};

export default Community;
