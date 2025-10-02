const clear = document.getElementById('clear');
const shapes = document.getElementById('shapes');
const div = document.getElementById('div');
const canvas = document.getElementById('canvas');
const canvasp = document.getElementById('canvasp');
let intervaleId = null;
const increaseBrush = document.getElementById('increase-brush');
const decreasebrush = document.getElementById('decrease-brush');
// Remove previous color picker and input box
function removecolorpic() {
    const existingColorPicker = document.querySelector('.colors');
    if (existingColorPicker) {
        existingColorPicker.remove();
    }
    const existingdegree = document.querySelector('.inputdeg');
    if (existingdegree) {
        existingdegree.remove();
    }
}

shapes.addEventListener('click', () => {
    if (div.children.length > 0) {
        div.innerHTML = ''; 
    } else {
        const circleBtn = document.createElement('button');
        const rectangleBtn = document.createElement('button');
        const lineBtn = document.createElement('button');

        circleBtn.innerText = 'Circle';
        rectangleBtn.innerText = 'Recta';
        lineBtn.innerText = 'Line';
        circleBtn.className = 'btnsm';
        rectangleBtn.className = 'btnsm';
        lineBtn.className = 'btnsm';

        div.appendChild(circleBtn);
        div.appendChild(rectangleBtn);
        div.appendChild(lineBtn);

        circleBtn.addEventListener('click', () => {
            removecolorpic();
        
            const rc = document.createElement('div');
            rc.className = 'circle';
            rc.style.position = 'absolute'; // Ensure it's positioned absolutely
        
            // ✅ Create rotation input
            const inputc = document.createElement('input');
            inputc.className = 'inputdeg';
            inputc.placeholder = 'Enter degrees';
        
            // ✅ Create color picker (only one at a time)
            let color = document.querySelector('.colors');
            if (!color) {
                color = document.createElement('input');
                color.type = 'color';
                color.className = 'colors';
                document.body.appendChild(color);
                color.style.display = 'block';
            }    
        
            color.addEventListener('input', () => {
                clearTimeout(intervaleId);
                intervaleId = setTimeout(() => {
                    rc.style.backgroundColor = color.value;
                }, 0);
            });
        
            const change = document.createElement('div');
            change.appendChild(color);
            change.appendChild(inputc);
            div.appendChild(change);
        
            canvasp.remove();
            canvas.appendChild(rc);
            console.log("Circle added to canvas!");
        
            // ✅ Double-click logic for rotation & dragging
            rc.addEventListener('dblclick', () => {
                removecolorpic();
        
                let rotation = parseInt(inputc.value.trim()) || 0;
                rc.style.transform = `rotate(${rotation}deg)`;
                inputc.value = '';
        
                // ✅ Fix: Move logic properly implemented
                const move = (e) => {
                    parentRect = canvas.getBoundingClientRect();
                    let x = ((e.clientX - parentRect.left) / parentRect.width) * 100;
                    let y = ((e.clientY - parentRect.top) / parentRect.height) *100;
                    rc.style.left = `${x}%`;
                    rc.style.top = `${y}%`;
                };
        
                const onMouseUp = () => {
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', onMouseUp);
                };
        
                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', onMouseUp);
            });
            //here the additional tools Opacity border
            const border = document.createElement('button');
            border.innerText ='border';
            border.className = 'button';
            const divetoolsImg = document.createElement('div');
            div.appendChild(divetoolsImg);
            div.appendChild(border);
            border.addEventListener(('click'),()=>{
                rc.style.border = '3px dashed red'; 
                if(!document.querySelector('.border-width')){
                    const borderwidth = document.createElement('div');   
                    borderwidth.className = 'border-width';
                    const inputbr = document.createElement('input');
                    const inputsi = document.createElement('input');
                    const inputcol = document.createElement('input');
                    const borderRadius = document.createElement('input');
                    const bordernono = document.createElement('button');
                    bordernono.className ='button';
                    bordernono.innerText ='border None';
                    borderRadius.className ='button';
                    borderRadius.placeholder ='radius %';
                    inputcol.type ='color';
                    inputcol.style.width ='200px';
                    inputsi.className ='button';
                    inputsi.placeholder ='size border with px';
                    inputbr.className ='button';
                    inputbr.placeholder ='dashed or solid or double';
                    borderwidth.appendChild(borderRadius);
                    borderwidth.appendChild(bordernono);
                    borderwidth.appendChild(inputcol);
                    borderwidth.appendChild(inputbr);
                    borderwidth.appendChild(inputsi);
                    divetoolsImg.appendChild(borderwidth);

                    //Event listners here of the border
                    bordernono.addEventListener('click',()=>{
                        rc.style.border ='none';
                        inputsi.style.display ='none';
                        inputbr.style.display ='none';
                        borderRadius.style.display ='none';
                        bordernono.style.display ='none';
                    })

                    borderRadius.addEventListener('input',()=>{
                        let putedRadius = borderRadius.value.trim();
                        if(!putedRadius){
                            return;
                        }
                        clearTimeout(timoutId);
                        timoutId = setTimeout(() => {
                            rc.style.borderRadius =`${putedRadius}%`;
                        }, 50);
                    })

                    inputcol.addEventListener(('input'),()=>{
                        let putedcolorBorder = inputcol.value.trim();
                        clearTimeout(timoutId);
                        putedcolor = setTimeout(()=>{
                            rc.style.borderColor =`${putedcolorBorder}`;
                        },50)
                    })

                    inputsi.addEventListener(('input'),()=>{
                        let putedsizeBorder = inputsi.value.trim();
                        if(!putedsizeBorder){
                            return;
                        }
                        clearTimeout(timoutId);
                        timoutId = setTimeout(()=>{
                            rc.style.borderWidth =`${putedsizeBorder}px`;
                        })
                    })

                    inputbr.addEventListener(('input'),()=>{
                        let putedTypeBorder = inputbr.value.trim();
                        if(!putedTypeBorder){
                            return;
                        }
                        clearTimeout(timoutId);
                        timoutId = setTimeout(()=>{
                            rc.style.borderStyle =`${putedTypeBorder}`;
                        },500)
                        inputbr.value ='';
                    })
                    
                }
           
            })

            // ✅ Resizing logic (no structure changes)
            let isResizing = false;
            rc.addEventListener('mousedown', (event) => {
                if (isResizing) return;
        
                isResizing = true;
                let startX = event.clientX;
                let startY = event.clientY;
                let startWidth = rc.offsetWidth;
                let startHeight = rc.offsetHeight;
        
                const mousemove = (e) => {
                    parentRect = canvas.getBoundingClientRect();
                    let newWidth = ((startWidth + (e.clientX - startX))/ parentRect.width) *100;
                    let newHeight = ((startHeight + (e.clientY - startY))/ parentRect.height) *100;
                    rc.style.width = `${newWidth}%`;
                    rc.style.height = `${newHeight}%`;
                };
        
                document.addEventListener('mousemove', mousemove);
                document.addEventListener('mouseup', () => {
                    isResizing = false;
                    document.removeEventListener('mousemove', mousemove);
                }, { once: true });
            });
        });
    
        

        rectangleBtn.addEventListener('click', () => {
            removecolorpic();
            const re = document.createElement('div');
            re.className = 're';
            re.style.left = '100px'; // Default position
            re.style.top = '100px';

            
            //✅here to modify the item turn it or not
            const change = document.createElement('div');
            const inputc = document.createElement('input');
            const border = document.createElement('button');
            border.textContent ='border';
            inputc.className = 'inputdeg';
            inputc.placeholder = 'Enter degrees';

           //COLORRRR
           let color = document.querySelector('.colors');
           if (!color) {
                color = document.createElement('input');
               color.type = 'color';
               color.className = 'colors';
               document.body.appendChild(color);
               color.style.display = 'block';
          } 
          //let rec inv m = if m = ""then "" else (dch m)^ inv (
           change.appendChild(border);
           border.addEventListener('click',()=>{
            re.style.border = '3px dotted red';
            const block = document.createElement('div');
            const radiusBorder = document.createElement('input');
            radiusBorder.textContent ='radius %';
            block.appendChild(radiusBorder);
            const borderingclr = document.createElement('input');
            block.appendChild(borderingclr);
            change.appendChild(block);
            borderingclr.addEventListener('input',()=>{

            })
           })
           change.appendChild(color);
           color.addEventListener('input', () => {
            clearTimeout(intervaleId);
            intervaleId = setTimeout(() => {
                re.style.backgroundColor = color.value;
            }, 0);
            });
        
           change.appendChild(color);
            change.appendChild(inputc);
            div.appendChild(change);
            canvasp.remove();
            canvas.appendChild(re);

            re.addEventListener('dblclick',()=>{
                
                const change = document.createElement('div');
                removecolorpic();
                         //COLORRRR
                         let color = document.querySelector('.colors');
                         if (!color) {
                              color = document.createElement('input');
                             color.type = 'color';
                             color.className = 'colors';
                             document.body.appendChild(color);
                             color.style.display = 'block';
                        }    
                 change.appendChild(color);
                color.addEventListener('input', () => {
                 clearTimeout(intervaleId);
                    intervaleId = setTimeout(() => {
                         re.style.backgroundColor = color.value;
                     }, 0);
                    });
        
                 change.appendChild(color);
                 div.appendChild(change);
                let rotation = parseInt(inputc.value.trim()) || 0;
            
                re.style.transform = `rotate(${rotation}deg)`;
                inputc.value = '';
                const move = (e) =>{
                    parentRect = canvas.getBoundingClientRect();
                    let x = ((e.clientX - parentRect.left) / parentRect.width ) *100;
                    let y = ((e.clientY -parentRect.top) / parentRect.height ) *100;
                    re.style.left = `${x}%`;
                    re.style.top = `${y}%`;
                }
                document.addEventListener('mousemove',move);
                document.addEventListener('mouseup',()=>{
                    document.removeEventListener('mousemove',move);
                },{ once: true})
            })

            let isResizing = false;
            re.addEventListener('mousedown',(event)=>{
                if(isResizing){return;}

                    isResizing = true;
                    let startY = event.clientY;
                    let startX= event.clientX;
                    let startHeight = re.offsetHeight;
                    let startWidth = re.offsetWidth;
                    const move =(e)=>{
                    parentRect = canvas.getBoundingClientRect();
                        let newWidth = ((startWidth + (e.clientX - startX))/ parentRect.width) * 100;
                        let newHeight = ((startHeight + (e.clientY - startY)) / parentRect.height) * 100;
                        re.style.width = `${newWidth}%`;
                        re.style.height = `${newHeight}%`;
                        }
                
                document.addEventListener('mousemove',move);

                document.addEventListener('mouseup', () => {
                    isResizing = false;
                    document.removeEventListener('mousemove', move);
                }, { once: true });
               
            })
        });

        lineBtn.addEventListener('click', () => {
            removecolorpic();
            const hr = document.createElement('hr');
            hr.className = 'hr';
             //✅here to modify the item turn it or not
             const change = document.createElement('div');
             const inputc = document.createElement('input');
             inputc.className = 'inputdeg';
             inputc.placeholder = 'Enter degrees';


            //COLORRRR
            let color = document.querySelector('.colors');
                     if (!color) {
                          color = document.createElement('input');
                         color.type = 'color';
                         color.className = 'colors';
                         document.body.appendChild(color);
                         color.style.display = 'block';
                    }    
             change.appendChild(color);
             color.addEventListener('input', () => {
                clearTimeout(intervaleId);
                intervaleId = setTimeout(() => {
                    hr.style.backgroundColor = color.value;
                }, 0);
             });
             change.appendChild(color);

             change.appendChild(inputc);
             div.appendChild(change);

            canvasp.remove();
            canvas.appendChild(hr);

            hr.addEventListener('dblclick',()=>{
                const change = document.createElement('div');
                removecolorpic();
                
            //COLORRRR
            let color = document.querySelector('.colors');
                     if (!color) {
                          color = document.createElement('input');
                         color.type = 'color';
                         color.className = 'colors';
                         document.body.appendChild(color);
                         color.style.display = 'block';
                    }    
             change.appendChild(color);
             color.addEventListener('input', () => {
                clearTimeout(intervaleId);
                intervaleId = setTimeout(() => {
                    hr.style.backgroundColor = color.value;
                }, 0);
             });
             change.appendChild(color);
             div.appendChild(change);
                let reotation = parseInt(inputc.value.trim()) || [];
                hr.style.transform = `rotate(${reotation}deg)`;
                
                const move =(e) =>{
                    parentRect = canvas.getBoundingClientRect();
                    let x = ((e.clientX - parentRect.left) / parentRect.width ) *100;
                    let y = ((e.clientY -parentRect.top) / parentRect.height ) *100;
                    hr.style.left = `${x}%`;
                    hr.style.top = `${y}%`;
                }
                document.addEventListener('mousemove',move);
                document.addEventListener('mouseup',()=>{
                    document.removeEventListener('mousemove',move);
                })
            })
        });
    }
});

//TEXT PART IS HERE
const text = document.getElementById('text');



text.addEventListener('click',()=>{
    if(div.children.length > 0) {
        div.innerHTML = ''; 
    }else{
        const input = document.createElement('input');
        const change = document.createElement('div');
        input.placeholder = 'enter text';
        input.className = 'inputclear';
        const pcreate = document.createElement('p');
        change.appendChild(input);
        div.appendChild(change);
        const inputsize = document.createElement('input');
        inputsize.placeholder = 'px';
        inputsize.className = 'pxx';
        inputsize.addEventListener('input',()=>{
            const puted= inputsize.value.trim();
            clearTimeout(intervaleId);
            intervaleId = setTimeout(()=>{
                pcreate.style.fontSize = `${puted}px`;
            },0)
        })
        change.appendChild(inputsize);

//PLACE FOR FONT WEIGHT HEHEHEHEHEHEHHEHEHEHEHEHEH
 const weight = document.createElement('input');
 weight.placeholder = 'weight to 900';
 weight.className = 'pxx';
 weight.addEventListener('input',()=>{
    const puted = weight.value.trim();
    clearTimeout(intervaleId);
    intervaleId = setTimeout(()=>{
        pcreate.style.fontWeight = `${puted}`;
    },0)
 })
 change.appendChild(weight);

//INPUT TYPE FONT OF THE TEXT HERE HERE HERE HERE HERE
const fontsinput = document.createElement('input');
const fontOpacity = document.createElement('input');
fontOpacity.className = 'pxx';
fontOpacity.textContent ='transpar 0/1';
const insidechange = document.createElement('div');
fontsinput.placeholder = 'Enter font.';
fontsinput.className = 'pxx';
insidechange.appendChild(fontsinput);
insidechange.appendChild(fontOpacity);
const buttonsWrapper = document.createElement('div'); 
buttonsWrapper.style.display = 'none'; 
insidechange.appendChild(buttonsWrapper);


const fontButtons = [
    { name: 'Fantas', style: 'Fantasy' },
    { name: 'Itali', style: 'Italic' },
    { name: 'Cursi', style: 'Cursive' },
    { name: 'Mono', style: 'Monospace' },
    { name: 'Serif', style: 'Serif' },
    { name: 'S-serif', style: 'Sans-serif' },
    { name: 'Arvo', style: 'Arvo' }
];

//here we add  font button opacity
fontOpacity.addEventListener('click',()=>{
pcreate.style.zIndex = fontOpacity;
})
fontButtons.forEach(font => {
    const btn = document.createElement('button');
    btn.innerText = font.name;
    btn.style.fontFamily = font.style;
    btn.style.fontWeight = '300';
    btn.addEventListener('click', () => {
        pcreate.style.fontFamily = font.style;
    });
    btn.className = 'button';
    buttonsWrapper.appendChild(btn);
});

fontsinput.addEventListener('mouseenter', () => {
    buttonsWrapper.style.display = 'block';
});

fontsinput.addEventListener('input',()=>{
    const puted = fontsinput.value.trim();
    clearTimeout(intervaleId);
    intervaleId = setTimeout(()=>{
        pcreate.style.fontFamily = `${puted}`;
    },0)
})
insidechange.addEventListener('mouseleave', () => {
    buttonsWrapper.style.display = 'none';
});

change.appendChild(insidechange);


//COLOR CHANGING HERE HERE HERE DONT PASS COLOR CHANGING HERE
        const selectColor = document.createElement('input');
            selectColor.type = 'color'; 
            selectColor.style.display = 'block'; 
            selectColor.className = 'colors';
            document.body.appendChild(selectColor); 

            selectColor.addEventListener('input', () => {
                clearTimeout(intervaleId);
                intervaleId = setTimeout(()=>{
                         const selectedColor = selectColor.value; 
                         pcreate.style.color = selectedColor;
                });
              });
            change.appendChild(selectColor);
   
        input.addEventListener('input',()=>{
            clearTimeout(intervaleId);
            intervaleId = setTimeout(()=>{
                pcreate.innerText = input.value.trim();
                pcreate.className = 'pcreate';
                canvasp.remove();
                canvas.appendChild(pcreate);
            },0)
        })
        pcreate.addEventListener('dblclick',()=>{
            const  move = (e) => {
                pcreate.style.position = 'absolute';
                parentRect = canvas.getBoundingClientRect();
                let x = ((e.clientX - parentRect.left) / parentRect.width ) *100;
                let y = ((e.clientY -parentRect.top) / parentRect.height ) *100;
                pcreate.style.left = `${x}%`;
                pcreate.style.top = `${y}%`;
            }
            document.addEventListener('mousemove',move);
            document.addEventListener('mouseup',()=>{
                document.removeEventListener('mousemove',move);
            })
         })
        }
})
const btnbg = document.getElementById('fill-bg');
btnbg.addEventListener('click',()=>{
    const change = document.createElement('div');

    removecolorpic();
    const color = document.createElement('input');
    color.type = 'color';
    document.body.appendChild(color);
    color.className = 'colors';
    color.addEventListener('input',()=>{
        const selectedColor = color.value.trim();
        clearTimeout(intervaleId);
        intervaleId = setTimeout(() => {
            canvas.style.backgroundColor = selectedColor;
        },0);
    })
    change.appendChild(color);
    div.appendChild(change);
})
//clear

const btnclear = document.getElementById('clear');

btnclear.addEventListener('click',()=>{
    canvas.innerHTML = '';
    need.innerHTML = '';
});
//drawing 
const draw = document.getElementById('draw');
draw.addEventListener('click',()=>{
    const brush = document.createElement('button');
    brush.innerText ='Brush';
    brush.className ='button';
    div.appendChild(brush);
    const rubber = document.createElement('button');
    rubber.innerText =' Rubber';
    rubber.className ='button';
    div.appendChild(rubber);

        
brush.addEventListener("click", () => {
    // Remove existing
    let existingBrush = document.querySelector(".brushuser");
    if (existingBrush) {
        existingBrush.remove();
    }

    // Create brush
    const brushuser = document.createElement("div");
    brushuser.className = "brushuser";
    brushuser.style.position = "absolute";
    brushuser.style.width = "30px";
    brushuser.style.height = "30px";
    brushuser.style.borderRadius = "50%";
    brushuser.style.background = "rgba(0,0,0,0.5)";
    brushuser.style.pointerEvents = "none";
    brushuser.style.zIndex = "1000";
    document.body.appendChild(brushuser);

    let lastX = 0,
        lastY = 0;
    let drawing = false;

    // Move
    const move = (e) => {
        brushuser.style.left = `${e.clientX - brushuser.offsetWidth / 2}px`;
        brushuser.style.top = `${e.clientY - brushuser.offsetHeight / 2}px`;

        if (drawing) {
            let dx = Math.abs(e.clientX - lastX);
            let dy = Math.abs(e.clientY - lastY);
            if (dx > 0.1 || dy > 0.1) {
                const dots = document.createElement("div");
                dots.className = "dots";
                dots.style.position = "absolute";
                dots.style.width = "10px";
                dots.style.height = "10px";
                dots.style.borderRadius = "50%";
                dots.style.backgroundColor = "aqua";
                dots.style.left = `${e.clientX}px`;
                dots.style.top = `${e.clientY}px`;
                dots.style.zIndex = "999";
                document.body.appendChild(dots);

                lastX = e.clientX;
                lastY = e.clientY;
            }
        }
    };

    // Function
    const startDrawing = async () => {
        drawing = true;
        await Promise.race([
            new Promise((resolve) =>
                document.addEventListener(
                    "mouseup",
                    () => {
                        drawing = false;
                        resolve();
                    },
                    { once: true }
                )
            ),
            new Promise((resolve) =>
                rubber.addEventListener(
                    "click",
                    () => {
                        drawing = false;
                        resolve();
                    },
                    { once: true }
                )
            ),
        ]);
    };

    // Remove 
    const removeBrush = () => {
        brushuser.remove();
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mousedown", startDrawing);
    };

    // Attach event listeners
    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", startDrawing);
    rubber.addEventListener("click", removeBrush);
});
})

//adding image here
let invertColor = null;
let timoutId = null;
const addImg = document.getElementById('add-img');
addImg.addEventListener('click',() => {
    p.innerText = '';
    canvasp.innerText = '';
    const inputmag = document.createElement('input');

    inputmag.type = 'file';
    inputmag.accept = 'image/*';
    inputmag.style.display = 'none';

    div.appendChild(inputmag);

    inputmag.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if(file) {
            const divetoolsImg = document.createElement('div');

            const reader = new FileReader();
            reader.onload = function(e) {
                const imghere = document.createElement('div');
                imghere.className ='imgdiv';
                
                // positon img
                imghere.style.position = 'absolute';
                imghere.style.left = '0';
                imghere.style.top = '0';
                imghere.style.zIndex = '1000'; 

                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.className ='imghere';
//styling the img eement
                imgElement.style.display = 'block';
                imgElement.style.width = '100%';
                imgElement.style.height = '100%';
                imgElement.style.objectFit = 'contain';
       

                // append canvas
                imghere.appendChild(imgElement);
                canvas.appendChild(imghere);
                //ctx here
                const hiddenCanvas = document.createElement('canvas');
                const ctx = hiddenCanvas.getContext('2d');
                hiddenCanvas.style.display = 'none';
                canvas.appendChild(hiddenCanvas);

                imgElement.onload = function() {
                    hiddenCanvas.width = imgElement.naturalWidth || imgElement.width;
                    hiddenCanvas.height = imgElement.naturalHeight || imgElement.height;
                    ctx.drawImage(imgElement, 0, 0);

                    /* REST OF YOUR ORIGINAL CODE EXACTLY AS IS */
                    let imageData = ctx.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);
                    let pixels = imageData.data;
                    //if it exist make no new
                        if (!invertColor) {
                            invertColor = document.createElement('button');
                            invertColor.className = 'button';
                            invertColor.textContent = 'Invert Colors';
                            invertColor.style.display = 'block';
                            divetoolsImg.appendChild(invertColor);
                        }
                    invertColor.addEventListener('click', () => {
                        for (let i = 0; i < pixels.length; i += 4) {
                            pixels[i] = 255 - pixels[i];
                            pixels[i + 1] = 255 - pixels[i + 1];
                            pixels[i + 2] = 255 - pixels[i + 2];
                        }
                        ctx.putImageData(imageData, 0, 0);
                        imgElement.src = hiddenCanvas.toDataURL();
                        
                    });
                }
                
                const sizeImgWidth = document.createElement('input');
                const sizeHeigthImg = document.createElement('input');
                const opacity = document.createElement('input');
                const border = document.createElement('button');
                const rotation = document.createElement('input');
                const radiusmag = document.createElement('input');
                radiusmag.placeholder = 'Round the image in px';
                radiusmag.className ='button';
                rotation.placeholder ='rotation the img';
                rotation.className ='button';
                border.innerText ='border';
                border.className ='button';
                opacity.className ='button';
                opacity.placeholder ='opacity between 1 and 0';
                sizeHeigthImg.className = 'button';
                sizeHeigthImg.placeholder ='height with px';
                sizeImgWidth.className = 'button';
                sizeImgWidth.placeholder ='width with px';
                divetoolsImg.appendChild(border);
                divetoolsImg.appendChild(rotation);
                divetoolsImg.appendChild(sizeHeigthImg);
                divetoolsImg.appendChild(sizeImgWidth);
                divetoolsImg.appendChild(opacity);
                divetoolsImg.appendChild(radiusmag);
                div.appendChild(divetoolsImg);

                // ALL YOUR ORIGINAL BORDER EVENT LISTENERS EXACTLY AS YOU WROTE THEM
                border.addEventListener('click',() => {
                    imgElement.style.boxSizing = 'border-box';
    
                    imgElement.style.border = '3px dashed red';

                    if(!document.querySelector('.border-width')){
                        const borderwidth = document.createElement('div');   
                        borderwidth.className = 'border-width';
                        const inputbr = document.createElement('input');
                        const inputsi = document.createElement('input');
                        const inputcol = document.createElement('input');
                        const borderRadius = document.createElement('input');
                        const bordernono = document.createElement('button');
                        bordernono.className ='button';
                        bordernono.innerText ='border None';
                        borderRadius.className ='button';
                        borderRadius.placeholder ='radius the image %';
                        inputcol.type ='color';
                        inputcol.style.width ='200px';
                        inputsi.className ='button';
                        inputsi.placeholder ='size border with px';
                        inputbr.className ='button';
                        inputbr.placeholder ='dashed or solid or double';
                        borderwidth.appendChild(borderRadius);
                        borderwidth.appendChild(bordernono);
                        borderwidth.appendChild(inputcol);
                        borderwidth.appendChild(inputbr);
                        borderwidth.appendChild(inputsi);
                        divetoolsImg.appendChild(borderwidth);

                        bordernono.addEventListener('click',() => {
                                imgElement.style.border ='none';
                                inputsi.style.display ='none';
                                inputbr.style.display ='none';
                                borderRadius.style.display ='none';
                                bordernono.style.display ='none';
                        })

                        borderRadius.addEventListener('click',() => {
                            let putedRadius = borderRadius.value.trim();
                            if(!putedRadius){
                                return;
                            }
                            clearTimeout(timoutId);
                            timoutId = setTimeout(() => {
                                imgElement.style.borderRadius =`${putedRadius}%`;
                            }, 50);
                        })

                        inputcol.addEventListener('input',() => {
                            let putedcolorBorder = inputcol.value.trim();
                            clearTimeout(timoutId);
                            timoutId = setTimeout(() => {
                            imgElement.style.borderColor =`${putedcolorBorder}`;
                            },50)
                        })

                        inputsi.addEventListener('input',() => {
                            let putedsizeBorder = inputsi.value.trim();
                            if(!putedsizeBorder){
                                return;
                            }
                            clearTimeout(timoutId);
                                imgElement.style.borderWidth =`${putedsizeBorder}px`;
                            })
                        

                        inputbr.addEventListener('input',() => {
                            let putedTypeBorder = inputbr.value.trim();
                            if(!putedTypeBorder){
                                return;
                            }
                            clearTimeout(timoutId);
                            timoutId = setTimeout(() => {
                                imgElement.style.borderStyle =`${putedTypeBorder}`;
                            },500)
                        })
                    }
                })
            

                /* REST OF YOUR ORIGINAL CODE EXACTLY AS YOU WROTE IT */
                rotation.addEventListener('input',() => {
                    let putedRotation = rotation.value.trim();
                    if(!putedRotation){
                        return;
                    }
                    clearTimeout(timoutId);
                    timoutId = setTimeout(() => {
                        imgElement.style.transform = `rotate(${putedRotation}deg)`;
                    },50)
                })

                radiusmag.addEventListener('input',()=>{
                    const puted = radiusmag.value.trim();
                    if(!puted){
                        return;
                    }
                    imgElement.style.borderRadius = `${puted}px`;
                    imghere.style.borderRadius = `${puted}px`;
                    console.table('here the border created');
                })

                opacity.addEventListener('input',() => {
                    let putedOpacity = opacity.value.trim();
                    if(!putedOpacity) {
                        return;
                    }
                    clearTimeout(timoutId);
                    timoutId = setTimeout(() => {
                        imghere.style.opacity = `${putedOpacity}`;
                    }, 500);
                })
                sizeImgWidth.addEventListener('input',() => {
                    let putedwidth = sizeImgWidth.value.trim();
                    if(!putedwidth){
                        return;
                    }
                    clearTimeout(timoutId);
                    timoutId = setTimeout(() => {
                        imghere.style.width = `${putedwidth}px`;
                    },500)
                })
                sizeHeigthImg.addEventListener('input',() => {
                    let putedheight = sizeHeigthImg.value.trim();
                    if(!putedheight){
                        return;
                    }
                    clearTimeout(timoutId);
                    timoutId = setTimeout(() => {
                        imghere.style.height = `${putedheight}px`;
                    },500)
                })
                
                imghere.addEventListener('dblclick',() => {
                    const move = (e) => {
                        parentRect = canvas.getBoundingClientRect();
                        let x = ((e.clientX - parentRect.left) / parentRect.width) * 100;
                        let y = ((e.clientY - parentRect.top) / parentRect.height) * 100;
                        imghere.style.left = `${x}%`;
                        imghere.style.top = `${y}%`;                    
                    }
                    document.addEventListener('mousemove',move);
                    document.addEventListener('mouseup',() => {
                        document.removeEventListener('mousemove',move);
                    },{once: true})
                })
                //here adiing the new button
                increaseBrush.addEventListener('click',()=>{
                    let sizeIncrease = 10;
                    let startmagwidth = imgElement.offsetWidth;
                    let startmagheight = imgElement.offsetHeight;
                    imghere.style.width = `${startmagwidth + sizeIncrease}px`;
                    imghere.style.height = `${startmagheight + sizeIncrease}px`;
                })
                decreasebrush.addEventListener('click',()=>{
                    let sizeIncrease = 10;
                    let startmagwidth = imgElement.offsetWidth;
                    let startmagheight = imgElement.offsetHeight;
                    imghere.style.width = `${startmagwidth - sizeIncrease}px`;
                    imghere.style.height = `${startmagheight - sizeIncrease}px`;
                })

                let isResizing = false;
                imgElement.addEventListener('mousedown',(event) => {
                   if(isResizing){
                    return;
                   }
                        const initialBorderWidth = parseInt(window.getComputedStyle(imgElement).borderWidth) || 0;
                        const initialBorderRadius = parseInt(window.getComputedStyle(imgElement).borderRadius) || 0;
                        const initialWidth = imgElement.offsetWidth;
                        const initialHeight = imgElement.offsetHeight;
                        
                        const startX = event.clientX;
                        const startY = event.clientY;
                        
                        const resize = (e) => {
                            parentRect = canvas.getBoundingClientRect();
                            
                            // Calculate new dimensions relative to parent
                            const newWidth = initialWidth + (e.clientX - startX);
                            const newHeight = initialHeight + (e.clientY - startY);
                            
                            // Calculate scale factors
                            const widthScale = newWidth / initialWidth;
                            const heightScale = newHeight / initialHeight;
                            const avgScale = (widthScale + heightScale) / 2;
                            
                            // Apply new dimensions
                            imgElement.style.width = `${newWidth}px`;
                            imgElement.style.height = `${newHeight}px`;
                            
                            // Scale border and radius proportionally
                            if (initialBorderWidth > 0) {
                                imgElement.style.borderWidth = `${initialBorderWidth * avgScale}px`;
                            }
                            if (initialBorderRadius > 0) {
                                imgElement.style.borderRadius = `${initialBorderRadius * avgScale}px`;
                            }
                        };
                   document.addEventListener('mousemove',resize);
                   document.addEventListener('mouseup',() => {
                    document.removeEventListener('mousemove',resize);
                    isResizing = false;
                   },{once: true})
                })
                void imgElement.offsetHeight;
            };
            reader.readAsDataURL(file);
        }
    })
    inputmag.click(); 
})