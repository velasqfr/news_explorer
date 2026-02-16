import "./About.css";
import avatar from "../../images/Avatar.jpg";

function About() {
  return (
    <div className="about">
      <div className="about__content">
        <img
          src={avatar}
          alt="Franklin Velasquez"
          className="about__avatar-photo"
        />
        <div className="about__section">
          <h1 className="about__title">About the Author</h1>
          <div className="about__text">
            <p>
              Greetings! My name is Franklin Velasquez, and I am currently
              enrolled in the TripleTen Software Engineering Program. My current
              employment is accounting with a background in business operations
              and management.
            </p>
            <p>
              Over the past few months, I&apos;ve gained hands-on experience in
              both frontend and backend development by creating and launching
              web applications through real-world projects. As an emerging web
              developer, I&apos;m passionate about building clean, maintainable,
              and user-friendly applications to address clients&apos; needs and
              support scalable, profitable growth. My goal is to deliver
              high-quality solutions and collaborate with teams to turn ideas
              into actionable results.
            </p>
            <p>
              My specialties include frontend development, working with HTML,
              modern JavaScript (ES6+), and CSS3 features such as transitions,
              animations, media queries, and flexbox. I also have experience in
              Node.js, working with APIs, and managing database systems to
              efficiently store, organize, and retrieve data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
