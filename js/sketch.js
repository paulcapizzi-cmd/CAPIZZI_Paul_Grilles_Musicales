  let grille = 10;
  let grille2 = grille/2;
  let sound;
  let amp;
  let fft;
  let img = [];
  let img1; 
  let timeCode;

  let images = [];       // img1 → img7
let imgFrameIndex = 1; // commence à img2 (index 1)
let imagesPlay = false;


  let effet1Play = false;
  let effet2Play = true; 
  let effet3Play = false;
  let effet4Play = false;
  let effet5Play = true;
  let effet6Play = false;
  let effet7Play = true;
  let effet8Play = false;

  function preload(){
  // for (let i = 1; i <= 1; i++) {
  //   img[i-1] = loadImage('image/ciel' + i + '.png');
  // }

  images[0] = loadImage("image/ciel1.png");
  images[1] = loadImage("image/ciel2.png");
  images[2] = loadImage("image/ciel3.png");
  images[3] = loadImage("image/ciel4.png");
  images[4] = loadImage("image/ciel5.png");
  images[5] = loadImage("image/ciel6.png");
  images[6] = loadImage("image/ciel7.png");


  sound = loadSound('sound/Panacea.mp3');
   // sound = loadSound('sound/1584.mp3')
    // sound = loadSound('sound/Panacea.mp3')
}

    // sound = loadSound('sound/1584.mp3')
    // sound = loadSound('sound/Panacea.mp3')
  


  let marge = 30;
  function setup() {
      
      angleMode[DEGREES]
      colorMode(HSL, 360, 100, 100, 1);
      //colorMode(RGB)
  createCanvas(windowWidth, windowHeight);
  fullscreen(true)

  for (let i = 0; i < img.length; i++) {
    img[i].resize(width * 1.2, height * 1.2); 
  }

  
  frameRate(10)

  amp = new p5.Amplitude();
  fft = new p5.FFT();


  }

  let zoom =0.0006;
  let temps =0;
  let marge1 = 0;

  function draw() {

    if(sound.isPlaying){
      timeCode = sound.currentTime(); ///time code actuel de la musique
    }
  
    let level = amp.getLevel();

    let spectrum = fft.analyze();

    // Récupération des graves et des aigus
    let bass = fft.getEnergy(20, 200);       // graves
    let highs = fft.getEnergy(8000, 16000);  // aigus

    // Normalisation des valeurs 0–255 -> 1–50 pixels
    let bassStroke = map(bass, 0, 255, 1, 50);
    let highStroke = map(highs * 3, 0, 255, 1, 120);

    
    temps = temps+level;
    background(255)


    if(effet7Play==true){
  effet7()
  } 
  if(effet5Play==true){
  effet5()
  } 
  if(effet1Play==true){
  effet1()
  }
  if(effet2Play==true){
  effet2()
  }
  if(effet3Play==true){
  effet3()
  } 
  if(effet4Play==true){
  effet4()
  } 
  
  if(effet6Play==true){
  effet6()
  } 
  if(effet8Play==true){
  effet8()
  } 
  
  }


  function mousePressed(){

      print(timeCode)//impression du time code
  let lecture = sound.isPlaying();
  if(lecture == false){
        sound.play()
        
  //       let fs = fullscreen();
  // fullscreen(!fs);
  }
  

      
  }

  function keyPressed(){
  if(key == '1'){
    effet1Play = !effet1Play
  }
  if(key == '2'){
    effet2Play = !effet2Play
  }
  if(key == '3'){
    effet3Play = !effet3Play
  }
  
  if(key == '4'){
    effet4Play = !effet4Play
  }
  if(key == '5'){
    effet5Play = !effet5Play
  }
  if(key == '6'){
    effet6Play = !effet6Play
  }
  if(key == '7'){
    effet7Play = !effet7Play
  }
  if(key == '8'){
    effet8Play = !effet8Play
  }
  }


  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  

  



  let tempAigu=0;
  let tempBass=0;

  function effet1(){
    noStroke();
    // Récupération du son
    let spectrum = fft.analyze();
    let bass = fft.getEnergy(20, 1500);       // graves 0-255
    let highs = fft.getEnergy(2000, 8000);   // aigus

    // On mappe les valeurs pour HSL
    let bassMapped = map(bass, 0, 255, 0, 1);    // teinte selon bass
    let highsMapped = map(highs, 0, 255, 30, 100);  // luminance selon highs

    tempBass= tempBass + bassMapped*0.1;

      for (let x = marge1; x <width-marge1; x+=grille) {
        for (let y =marge1; y<height-marge1; y+=grille) {
        
          let paramX=x*zoom;
          let paramY =y*zoom;

          let noise3d = noise(paramX,paramY,tempBass)*360
          let c = ((+noise3d/180)+(noise3d/6)); 
          // let a = ((-5)+(noise3d/6)); 
          fill(50+noise3d,0,c,(0.10))
          square(x,y,grille)
        }
    
  }
  }

  function effet3() {
    noStroke();

    // Récupération du son
    let spectrum = fft.analyze();
    let bass = fft.getEnergy(20, 1500);       // graves 0-255
    let highs = fft.getEnergy(2000, 8000);   // aigus

    // On mappe les valeurs pour HSL
    let bassMapped = map(bass, 0, 255, 0, 1);    // teinte selon bass
    let highsMapped = map(highs, 0, 255, 30, 100);  // luminance selon highs

    tempBass= tempBass + bassMapped*0.1;

      for (let x = marge1; x <width-marge1; x+=grille) {
        for (let y =marge1; y<height-marge1; y+=grille) {
        
          let paramX=x*zoom;
          let paramY =y*zoom;

          let noise3d = noise(paramX,paramY,tempBass)*360
          let a = (random(140,180)+(noise3d/4));   // teinte limitée
          let b = random(50, 80);   // saturation contrôlée
          let c = random(40, 70);   // luminosité contrôlée

          fill(a, b, c);
          //  fill(noise3d-20,noise3d,20)
          square(x,y,grille)
        }
    
  }
  }

  function effet2() {
  stroke(0);

  let margeX = 500;
  let margeY = 200;

  let highs = fft.getEnergy(5000, 16000);   // aigus
    let highsMapped = map(highs, 0, 255, 0, 0.6);  // très petit incrément pour noise

    tempAigu += highsMapped*2;

  for (let x = margeX; x < width - margeX; x += grille) {
    for (let y = margeY; y < height - margeY; y += grille) {

      let paramX = x * zoom;
      let paramY = y * zoom;

      let noise3d = noise(paramX, paramY, tempAigu) * 2;
      strokeWeight(noise3d * 1.3);

      push();
      translate(x, y);
      rotate(noise3d);
      stroke(0, 0, 0, 245);
      line(0, 0, 0, grille * 10);
      pop();
    }
  }
}




  function effet4() {
    background(140,20,60,15)
    noStroke();
    // Récupération du son
    let highs = fft.getEnergy(2500, 16000);   // aigus
    let highsMapped = map(highs, 0, 255, 0, 0.6);  // très petit incrément pour noise

    tempAigu += highsMapped*2;

    for (let x = marge1; x < width - marge1; x += grille) {
      for (let y = marge1; y < height - marge1; y += grille) {
        let paramX = x * zoom;
        let paramY = y * zoom;

        let noise3d = noise(paramX, paramY, tempAigu) *grille*1.5;

        // couleur visible
        push()
          translate(x,y)
          rotate(noise3d)
          //  stroke(highsMapped*2000,39,55,grille*(highsMapped*1000));
          
          let d = (random(100,150)+(noise3d/4));   // teinte limitée
          let e = random(50,55);   // saturation contrôlée
          let f = ((30)+(noise3d/6));   // luminosité contrôlée

          //  stroke(d,e,f,grille*(highsMapped*1000));
          stroke(d,e,f,-5+noise3d);
          let longueur = min(grille * (highsMapped * 500), ); // 100 pixels max
          line(0, 0, 0, longueur);

          pop()
          print(highsMapped);
      }
    }
  }



  function effet5() {
    // Récupération du son
    let highs = fft.getEnergy(2500, 16000);
    let highsMapped = map(highs, 0, 255, 0, 0.6); 
    tempAigu += highsMapped * 2;  

    let y = marge1; // fixe y en haut de l'écran

    for (let x = marge1; x < width - marge1; x += grille2) {
      let paramX = x * zoom;
      let paramY = y * zoom;

      let noise3d = noise(paramX, paramY, tempAigu*5) * grille2 * 1.5;

      push();
      translate(x, y);
      stroke(
        166,
        39,
        39,
        map(highsMapped, 0, 0.6, 0, 255)
      );
      line(0, 0, 0, grille * (highsMapped * 750 + noise3d*1));
      pop();
    }
  }

  function effet5() {
    let highs = fft.getEnergy(2500, 16000); 
    let hMapped = map(highs, 0, 255, 0, 0.6);
    tempAigu += hMapped * 2;

    let cx = width / 2;
    let cy = height / 2;
    let rayon = 70;
    let nbLignes = floor(TWO_PI / 0.1);

    for (let i = 0; i < nbLignes; i++) {
      let theta = i * TWO_PI / nbLignes;

      // position de départ sur le cercle
      let x = cx + cos(theta) * rayon;
      let y = cy + sin(theta) * rayon;

      let noise3d = noise(x * zoom, y * zoom, tempAigu * 5) * grille2 * 1.5;

      // longueur de la ligne
      let longueur = random(0, 30) + grille * (hMapped * 750 + noise3d * 1);
      
      push();
      translate(x, y);

      // calcul du vecteur dans la direction du rayon
      let dx = cos(theta) * longueur;
      let dy = sin(theta) * longueur;

      strokeWeight(noise3d);
      stroke(68, 45, 100, map(hMapped, 0, 0.6, 0, 255));

      line(0, 0, dx, dy);
      pop();
    }
  }

  // function effet8() {
  //   let highs = fft.getEnergy(8000, 16000);
  //   let hMapped = map(highs, 0, 255, 0, 0.6);
  //   tempAigu += hMapped * 2;

  //   let cx = width / 2;
  //   let cy = height / 2;
  //   let rayon = 100;
  //   let nbLignes = floor(TWO_PI / 0.1);

  //   for (let i = 0; i < nbLignes; i++) {
  //     let theta = i * TWO_PI / nbLignes;

  //     // position de départ sur le cercle
  //     let x = cx + cos(theta) * rayon;
  //     let y = cy + sin(theta) * rayon;

  //     let noise3d = noise(x * zoom, y * zoom, tempAigu * 5) * grille2 * 1.5;

  //     // longueur de la ligne
  //     let longueur = (random(0, 30) + grille * (hMapped * 750 + noise3d * 1))*3;
      
  //     push();
  //     translate(x, y);

  //     // calcul du vecteur dans la direction du rayon
  //     let dx = cos(theta) * longueur;
  //     let dy = sin(theta) * longueur;

  //     strokeWeight(noise3d);
  //     stroke(68, 45, 100, map(hMapped, 0, 0.6, 0, 255));

  //     line(0, 0, dx, dy);
  //     pop();
  //   }
  // }





  function effet6() {
    noStroke();

    // Récupération du son
    let spectrum = fft.analyze();
    let bass = fft.getEnergy(20, 1500);       // graves 0-255
    let highs = fft.getEnergy(2000, 8000);   // aigus

    // On mappe les valeurs pour HSL
    let bassMapped = map(bass, 0, 255, 0, 1);    // teinte selon bass
    let highsMapped = map(highs, 0, 255, 30, 100);  // luminance selon highs

    tempBass= tempBass + bassMapped*0.1;

      for (let x = marge1; x <width-marge1; x+=grille) {
        for (let y =marge1; y<height-marge1; y+=grille) {
        
          let paramX=x*zoom;
          let paramY =y*zoom;

          let noise3d = noise(paramX,paramY,tempBass)*360
          let a = (random(140,180)+(noise3d/4));   // teinte limitée
          let b = random(50,55);   // saturation contrôlée
          let c = ((-15)+(noise3d/6));   // luminosité contrôlée

          fill(a, b, c);
          //  fill(noise3d-20,noise3d,20)
          square(x,y,grille)
        }
    
  }
  }

function effet7() {

  let imgToShow = images[0]; // img1 par défaut

if (imagesPlay) {
  imgToShow = images[imgFrameIndex];

  // avancer d'une image à chaque frame
  if (imgFrameIndex < images.length - 1) {
    imgFrameIndex++;
  }
}


  background(0,0,0)
  imageMode(CENTER);

  // Calcul du ratio pour que l'image remplisse l'écran sans déformation
  let ratio = min(width / imgToShow.width, height / imgToShow.height);
let newWidth = imgToShow.width * ratio;
let newHeight = imgToShow.height * ratio;

image(imgToShow, width / 2, height / 2, newWidth, newHeight);


  if(effet1Play==true){
  effet1()
  }


  if (timeCode >= 88 && !effet1Play) {
    effet1();
    effet1Play = true; // évite de répéter l'effet
  }

  if (timeCode >= 88 && !effet1Play) {
    effet1();
    effet1Play = true; // évite de répéter l'effet
  }


if (timeCode >= 88 && !imagesPlay) {
  imagesPlay = true;   // déclenche la séquence une seule fois
  imgFrameIndex = 1;   // img2
}



  if(effet2Play==true){
  effet2()
  }


  if (timeCode >= 88 && effet2Play) {
    effet2Play = false;
}
}

  






  // function effet8(){
  //   let bass = fft.getEnergy(20,200);
  // let mids = fft.getEnergy(200,2000);
  // let highs = fft.getEnergy(2000,16000);

  // for (let i = 0; i < width; i += 10){
  //   let n = noise(i*0.01, frameCount*0.01);
  //   stroke(map(bass,0,255,0,255), map(mids,0,255,0,255), map(highs,0,255,0,255), 150);
  //   line(i,0, i, height/10 + n*200);
  // }
  // }







  // function effet3(){
  //   blendMode(BLEND)
  //   stroke(0)
  //   image(img,0,0)
  //   for (let x = marge1; x <width-marge1; x+=grille) {
  //       for (let y =marge1; y<height-marge1; y+=grille) {
        
  //          let paramX=x*zoom;
  //          let paramY =y*zoom;

  //          let noise3d = noise(paramX,paramY,temps)*360
          
  //          let filtre = noise(paramX,paramY,temps)///valeurs entre 0 et 1

  //          if(filtre>0.5){
  //           blendMode(REMOVE)
  //           noStroke()
  //           square(x,y,grille)
  //          }
          

          
  //       }
    
  //  }
  // }