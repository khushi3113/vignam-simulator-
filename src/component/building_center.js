import React from 'react' 
import '../component/building_center.css';

export default function Building_center(props) {
  let image=" ";
  if(props.height>=16){
        image="photo1.png";
  }
  else if(0<props.height<16){ 
    image="photo2.png";

  } 
  else if(props.height=null){
    image="photo0.png";
  }
  return (
    <div className='center'>
      <div className='camera-wrapper'>
        <img src='camerabig.png' height={'200px'} className='cam' alt='Big Camera'></img>
        <img src={image} height={'200px'} className='overlay-image' alt='Overlay Camera'></img> {/* New image */}
      </div>
      <div className='road2'></div>
      <div className='teraceborder'></div>
      <div className='terace'></div><div className='road'></div>
      <div className='teraceget'></div>
      <div className='teacherplateform'><div className='teacher'><img src='Layer 1.png' height={'200px'}></img></div><div className='teacherhand'><img src='hand.png'  height={'50px'}></img></div><div className='camera'><img src='camera.png' height={'10px'}></img></div><div className='plateform'></div></div>
      <div className='firstflorborder'></div>
      <div className='firstflor'></div>
    </div>
  )
}
