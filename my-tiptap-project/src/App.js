import Tiptap from "./Tiptap.jsx";
import TiptapMath from "./Tiptap-math.jsx";
import Intro from './Content.jsx';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Intro />
      <TiptapMath />
      <p>Another example:</p>
      <Tiptap />
    </div>
  );
};

export default App;
