// const concat = (xs, ys) => xs.concat(ys);

// const hexToRGBA = hexStr => [
//     parseInt(hexStr.substr(1, 2), 16),
//     parseInt(hexStr.substr(3, 2), 16),
//     parseInt(hexStr.substr(5, 2), 16),
//     255
//   ];

// const flattenedRGBAValues = largeArray
//   .reduce(concat)  // 1d list of hex codes
//   // .map(hexToRGBA)  // 1d list of [R, G, B, A] byte arrays
//   .reduce(concat); // 1d list of bytes

// // Render on screen for demo
// const cvs = document.getElementById('canvas');
// const ctx = cvs.getContext("2d");
// const imgData = new ImageData(Uint8ClampedArray.from(flattenedRGBAValues), 32, 32);
// ctx.putImageData(imgData, 0, 0);

function drawImage (array, canvas) {
  var ctx = canvas.getContext('2d');
  var step = canvas.width / array.length;
  array.forEach((element, i) => {
    element.forEach((el, j) => {
      ctx.fillStyle = "#" + el;
      ctx.fillRect(j*step, i*step, step, step);
    });
  });

}

function draw(data, array, canvas) {
  var step = canvas.width / array.length;
  var iterator = 0;
  array.forEach(col => {
    for (var j = 0; j < step; j++) {
      col.forEach(row => {
        // console.log(row);
        for (var i = 0; i < step; i++) {
          data[iterator] = row[0];
          data[iterator + 1] = row[1];
          data[iterator + 2] = row[2];
          data[iterator + 3] = row[3];
          iterator += 4;
        }
      });
    }
  });
}

var canvas = document.getElementById('canvas');
var radioArray = document.getElementsByName('size_switcher');
var image = document.querySelector('.hide_image');

function checkRadio() {
  var ctx = canvas.getContext('2d');
  if (radioArray[0].checked) {
    drawImage(smallArray, canvas);
  }
  else if (radioArray[1].checked) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    draw(myImageData.data, largeArray, canvas);
    ctx.putImageData(myImageData, 0, 0);
  }
  else if (radioArray[2].checked) {
    // var cvs = document.createElement('canvas');
    // var context = cvs.getContext('2d');
    // var img = document.querySelector('.hide_image');
    // cvs.width = img.width;
    // cvs.height = img.height;
    // context.drawImage(img, 0, 0 );
    // var myData = context.getImageData(0, 0, img.width, img.height);

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(image, 0, 0);
  }
}

checkRadio();

for (var i = 0; i < radioArray.length; i++) {
  radioArray[i].addEventListener('change', function() {
    checkRadio();
  });
}
