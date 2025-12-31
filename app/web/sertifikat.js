var sertifikat={
view:function(){
out=`
<button onclick="download()">Download</button>
<canvas id="canvas" width="1000" height="700"></canvas>
`;
return out;
},

controller:function(arr){
d.modal(sertifikat.view());
arr=arr[0]

const img = { bg: "app/learn/bg.png"}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let bgImage = new Image();
let currentIndex = 0;

bgImage.src = img.bg;
bgImage.onload = () => {
generate(currentIndex);
};

generate=function(index) {
const peserta = arr.peserta;
if (!peserta) return;

// Bersihkan dan gambar latar
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

// Tambahkan teks
ctx.fillStyle = "#000";
ctx.textAlign = "center";

ctx.font = "bold 36px serif";
ctx.fillText("SERTIFIKAT", canvas.width / 2, 100);

ctx.font = "28px sans-serif";
ctx.fillText(arr.peserta, canvas.width / 2, 250);

ctx.font = "22px sans-serif";
ctx.fillText(arr.kursus, canvas.width / 2, 300);
ctx.fillText(arr.tanggal_sertifikat, canvas.width / 2, 350);
ctx.fillText(arr.kredensial, canvas.width / 2, 400);

}



download=function() {
const peserta = arr.peserta;
const link = document.createElement("a");
link.download = `sertifikat_${peserta.replace(/\s/g, "_")}.png`;
link.href = canvas.toDataURL("image/png");
link.click();
}

},

};
