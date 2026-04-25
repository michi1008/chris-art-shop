import React from "react";
import "./AboutScreen.css";
import profile from "../assets/Chris.jpg";
import sample from "../assets/paint_with_frame.jpg";
import { MdLocalShipping } from "react-icons/md";
import { MdFilterFrames } from "react-icons/md";
import { TbAdjustmentsDown } from "react-icons/tb";
import { Link } from "react-router-dom";

const AboutScreen = () => {
  return (
    <div className="about-content">

      <div className="about-artist">
        <div className="section-header">
          <h1>About the Artist</h1>
          <div className="section-divider"></div>
        </div>
        <div className="about-artist-profile">
          <div className="artist-photo-wrapper">
            <img className="profile-image" src={profile} alt="Chris Lange" />
            <p className="artist-photo-caption">Chris Lange</p>
          </div>
          <div className="artist-photo-wrapper">
            <img className="sample-image" src={sample} alt="Chris Lange Art" />
            <p className="artist-photo-caption">Chris Lange Art</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="artist-bio">

          <div className="bio-section">
            <div className="bio-section-title">
              <h3>Her history</h3>
              <div className="bio-title-line"></div>
            </div>
            <p>
              Chris began her lifelong passion for drawing and painting early in life. In her early years, she
              visited National Parks in the American West. She received a Bachelor of Arts Degree in Fine Arts
              from San Diego State University in 1970. For economic reasons, she worked a corporate job while
              raising her family, but continued painting and drawing in her spare time using watercolor and ink.
              In 2007, she began selling her work at horse shows and on a commission basis, now painting with
              acrylics and including horses and wildlife in her paintings.
            </p>
            <p>
              When she retired in 2014, she took the plunge to make Art her new career. While self-taught up to
              that time, she recognized that to become an accomplished artist, she needed formal training. At that
              time, she transitioned from Acrylic to Oils.
            </p>
            <p>
              In 2016 she moved to San Antonio, Texas, and with the encouragement of local artists, was juried
              into American Plains Artists, and later Oil Painters of America. She was also President of the
              Boerne Professional Artists and assisted with the production of 2 shows during her 2-year tenure.
              Southwest Art Magazine March/April 2022 included her in the editorial section "Close to Nature."
              In 2023 she was juried into Cowgirl Artists of America.
            </p>
            <p>
              She continues to paint both plein air and in studio, drawing from her extensive photographic library.
            </p>
            <blockquote>
              "I have a lifelong love of the outdoors and am a horse owner-rider. My oil paintings express the
              many western elements from majestic mountains to flowing rivers and streams, and their unique barns
              and architectural elements. Through my composition, I lead the viewer into the painting taking them
              on a journey to a peaceful place that resonates with them. Oil has become my medium of choice
              because I like the way I can manipulate the paint to create texture, values, and tone for depth in
              my landscapes."
            </blockquote>
            <p className="memberships-label">Memberships</p>
            <ul className="memberships-list">
              <li>APA: American Plains Artists &mdash; 2017 to present</li>
              <li>OPA: Oil Painters of America &mdash; 2020 to present</li>
              <li>Cowgirl Artists of America &mdash; 2023 to present</li>
            </ul>
          </div>

          <div className="bio-section">
            <div className="bio-section-title">
              <h3>Her statement</h3>
              <div className="bio-title-line"></div>
            </div>
            <blockquote>
              "My passion is being outdoors among the majestic vistas that inspire my art. Painting plein air
              gives me the true colors for my work that are sometimes completed in studio from photographs. My
              photographic library gives me subjects from the Pacific Coast to the Great Plains. The ones that
              inspire me the most become my next painting. I also paint subjects by request on a commission
              basis — these include places people enjoyed, Corvettes, race cars, and equine portraits. When
              I'm not painting, I'm riding or grooming my horse, and visiting National and State parks here in
              Texas, Colorado, Wyoming, and the rest of the West."
            </blockquote>
          </div>

        </div>
      </div>

      <div className="about-service">
        <div className="section-header">
          <h1>About Service</h1>
          <div className="section-divider"></div>
        </div>
        <div className="service-content">
          <div className="service-content-item">
            <MdFilterFrames style={{ fontSize: "3rem", color: "var(--clr-primary-2)" }} />
            <h4>All paintings are framed and the frame is included in the price.</h4>
          </div>
          <div className="service-content-item">
            <MdLocalShipping style={{ fontSize: "3rem", color: "var(--clr-primary-2)" }} />
            <h4>Paintings are delivered safely to your door via FedEx.</h4>
          </div>
          <div className="service-content-item">
            <TbAdjustmentsDown style={{ fontSize: "3rem", color: "var(--clr-primary-2)" }} />
            <h4>
              Inquire about commissions on the{" "}
              <Link to="/contact">
                <button className="contact-btn">Contact page</button>
              </Link>
            </h4>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutScreen;
