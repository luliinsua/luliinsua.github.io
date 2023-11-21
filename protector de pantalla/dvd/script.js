const colors = [
    "green",
    "orange",
    "blue",
    "red",
    "purple",
    "teal",
    "yellow",
    "pink"
  ];
  
  let colorIndex = 0;
  
  //javascript doesn't have enums :( 
  // I should have wrote this in typescript
  const Directions = Object.freeze({
    SouthEast: 0,
    NorthEast: 1,
    NorthWest: 2,
    SouthWest: 3,
  });
  
  let directionTrajectory = Directions.SouthEast;
  const dvdMask = document.getElementById("dvd-mask");
  let dvdWidth, dvdHeight, siteWidth, siteHeight;
  
  function recalculateSizes(){
    let dvdMaskRect = dvdMask.getBoundingClientRect();
    ({ width: dvdWidth, height: dvdHeight} = dvdMaskRect);
    siteWidth = window.innerWidth - dvdWidth;
    siteHeight = window.innerHeight - dvdHeight;
    colorIndex = 0;
  }
  
  recalculateSizes();
  
  function updateColor(){
    colorIndex = (colorIndex+1) % colors.length;
    dvdMask.style.backgroundColor = colors[colorIndex];
  }
  
  window.addEventListener("resize", () =>{
    recalculateSizes();
  })
  
  function move(){
    let { top, left } = dvdMask.getBoundingClientRect();
    switch(directionTrajectory){
      case Directions.SouthEast:
        top += 5;
        left += 5;
        break;
      case Directions.NorthEast:
        top += -5;
        left += 5;
        break;
      case Directions.NorthWest:
        top += -5;
        left += -5;
        break;
      case Directions.SouthWest:
        top += 5;
        left += -5;
        break;
    }
    
    let colorChange = false;
    if (top < 0){
      top = 0;
      colorChange = true;
      if (directionTrajectory == Directions.NorthEast){
        directionTrajectory = Directions.SouthEast;
      }else{
        directionTrajectory = Directions.SouthWest;
      }
    }
    if (left < 0){
      left = 0;
      colorChange = true;
      if (directionTrajectory == Directions.NorthWest){
        directionTrajectory = Directions.NorthEast;
      }else{
        directionTrajectory = Directions.SouthEast;
      }
    }
    if (top > siteHeight){
      top = siteHeight-1;
      colorChange = true;
      if (directionTrajectory == Directions.SouthEast){
        directionTrajectory = Directions.NorthEast;
      }else{
        directionTrajectory = Directions.NorthWest;
      }
    }
    if (left > siteWidth){
      left = siteWidth-1;
      colorChange = true;
      if (directionTrajectory == Directions.NorthEast){
        directionTrajectory = Directions.NorthWest;
      }else{
        directionTrajectory = Directions.SouthWest;
      }
    }
    
    setDirection(left, top);
    if (colorChange){
      updateColor();
    }
  }
  
  function setDirection(x,y){
    dvdMask.style.transform = `translate3d(${x}px,${y}px,0)`;
  }
  
  function paint(){
    move();
    //this might screw me because refresh rates could be higher
    window.requestAnimationFrame(paint);
  }
  
  paint();