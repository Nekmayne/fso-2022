const Header = ({ heading }) => <h1>{heading}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Total = ({ parts }) => (
  <p> total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</p>
);

const Courses = ({ courses }) => (
  <>
    {courses.map((course) => (
      <div>
        <Header heading={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </>
);

export default Courses;
