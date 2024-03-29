var canvas = document.getElementById('myCanvas');
                var ctx = canvas.getContext('2d');
                
                var painting = document.getElementById('paint');
                var paint_style = getComputedStyle(painting);

                var mouse = {x: 0, y: 0};
                
                canvas.addEventListener('mousemove', function(e) {
                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
                }, false);

                ctx.lineWidth = 3;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#000000';
                
                canvas.addEventListener('mousedown', function(e) {
                    ctx.beginPath();
                    ctx.moveTo(mouse.x, mouse.y);
                
                    canvas.addEventListener('mousemove', onPaint, false);
                }, false);
                
                canvas.addEventListener('mouseup', function() {
                    canvas.removeEventListener('mousemove', onPaint, false);
                }, false);
                
                var onPaint = function() {
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                };
                let x_pred = [];
                function predict(){
                    const img = ctx.getImageData(0,0,28*4,28*4);
                    for(var i = 0; i < img.data.length ; i += 4){
                        x_pred.push(img.data[i+3]);
                    }
                    console.log(x_pred);
                x_predict = {"x" : JSON.stringify(x_pred)};
                x_predict = JSON.stringify(x_predict);
                let xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://127.0.0.1:5000/predict', true);
                xhr.getResponseHeader('content-type','application/json');
                xhr.onload = function(){
                    console.log(this.responseText);
                    document.getElementById('predict').innerHTML = "Vous venez d'écrire un " + this.responseText[1];
                }
                xhr.send(JSON.stringify(x_predict))
                }
