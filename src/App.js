import { useState } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import Building_center from './component/building_center';
import Building_left from './component/building_left';
import Building_right from './component/building_right';
import Menu from './component/Menu';
import Direction from './component/direction';

function App() {  
  const [input, setInput] = useState({
    degree: "",
    distance: "",
  });

  const [height, setHeight] = useState(null);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const calculateHeight = () => {
    const angleInRadians = input.degree * (Math.PI / 180);
    const calculatedHeight = Math.tan(angleInRadians) * input.distance;
    setHeight(Math.floor(calculatedHeight)); 
  };

  const [scale, setScale] = useState(1); 
  const zoomIn = () => {
    setScale(prevScale => prevScale + 0.1); // Increment zoom level
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.1)); // Decrement zoom level, ensuring scale doesn't go below 0.1
  };

  const zoomableStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left', // Ensure scaling happens from the top-left corner
    transition: 'transform 0.2s ease', // Smooth scaling transition
  }; 

  const [cursorStyle, setCursorStyle] = useState('default-cursor');

  // Handler to toggle cursor size
  const toggleCursorSize = () => {
    setCursorStyle(prevStyle => prevStyle === 'default-cursor' ? 'large-cursor' : 'default-cursor');
  };

  const [draggingEnabled, setDraggingEnabled] = useState(false);

  // Handler to toggle dragging
  const toggleDragging = () => {
    setDraggingEnabled(prevState => !prevState);
  };
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="bgimg" style={zoomableStyle}>
      <Menu 
        onZoomIn={zoomIn} 
        onZoomOut={zoomOut} 
        toggleCursorSize={toggleCursorSize} 
        toggleDragging={toggleDragging}
        reloadPage={reloadPage} // Pass handler to Menu
      /> 
      <button className='imgcapture' onClick={calculateHeight}>Click Image</button> 

      <input 
        type='text' 
        name='degree' 
        value={input.degree} 
        onChange={handleChange} 
        className='degree' 
        placeholder='Degree'
      /> 

      <input 
        type='text' 
        value={height || ''} // Display height or empty string
        className='hight' 
        placeholder='Height'
        readOnly // Make this input read-only since it's an output field
      />

      <input 
        type='text' 
        name='distance' 
        value={input.distance} 
        onChange={handleChange} 
        className='distance' 
        placeholder='Distance'
      />

      <Direction/>

      {draggingEnabled ? (
        <>
          <Draggable>
            <div>
              <Building_center height={height}/> 
            </div>
          </Draggable>
          <Draggable>
            <div>
              <Building_left/>
            </div>
          </Draggable>
          <Draggable>
            <div>
              <Building_right/>
            </div>
          </Draggable>
        </>
      ) : (
        <>
          <Building_center height={height}/> 
          <Building_left/>
          <Building_right/>
        </>
      )}
    </div>
  );
}

export default App;
