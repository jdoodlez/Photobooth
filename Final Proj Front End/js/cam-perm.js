const video = document.getElementById("video");
const canvas = document.getElementById("camframe");
const ctx = canvas.getContext("2d");
const cambutton = document.getElementById("take_pic");

//Camera Permission

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((error) => {
        console.error("Error accessing the camera: ", error);
    });

    //For capturing photos with delay of 3 seconds
    cambutton.addEventListener("click", () => {
        
        for (let take = 0; take <= 3; take++) {
            cambutton.disabled = true; 
            setTimeout(() => {
                if (take === 3){
                    document.querySelector(".counter").innerText = `All pictures taken`;
                    cambutton.disabled = false;
                    document.getElementById("download").style.display = "block";
                    document.getElementById("reset").style.display = "block";
                }
                else{
                    document.querySelector(".counter").innerText = `Taking picture ${take + 1} of 3`;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    saveIMG();
                }
            }, take * 3000); 
        }
    });
    

//Function to save the images
    function saveIMG() {
    const img_canvas = document.getElementById("camframe");
    const img_data = img_canvas.toDataURL("image/png");

    try {
         document.querySelector(".pic-container").innerHTML += 
        `<img src="${img_data}" class="cam-pic">`;
    }
    catch (error) {
        console.error("Error saving image: ", error);
    }

    }


//Reset button functionality (delete all images)
function resetIMG() {
    const resetBTN = document.getElementById("reset");
    hideButtons();
    try {
        resetBTN.addEventListener("click", () => {
            hideButtons();
            document.querySelector(".pic-container").innerHTML = `
                <div class="counter-container">
                    <p class="counter"></p>
                </div>
            `;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }
    catch (error) {
        console.error("Error resetting images: ", error);
    }
}

//Hide buttons

function hideButtons() {
    document.getElementById("download").style.display = "none";
    document.getElementById("reset").style.display = "none";
}
document.getElementById(".pic-container").style.border = "none";
resetIMG();

