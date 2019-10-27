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
}

checkRadio();

for (var i = 0; i < radioArray.length; i++) {
  radioArray[i].addEventListener('change', function() {
    checkRadio();
  });
}
