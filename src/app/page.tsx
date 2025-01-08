const bgColor = "white";

function Abc({ children, color }) {
  return (
    <>
      <button
        style={{
          backgroundColor: bgColor,
          color: color,
        }}
        className="container"
      >
        {children}
      </button>
      <p>hello</p>
    </>
  );
}

export default function Home() {
  return (
    <div>
      <h1>Hello Wolrd</h1>
      <input type="text" />
      <input type="checkbox" />
      <Abc color="red">Click Me!!</Abc>
      <Abc color="blue">Press Me!!</Abc>
      <button>Hello world</button>
    </div>
  );
}
