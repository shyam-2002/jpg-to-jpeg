const fs = require("fs");
const fsPromise = fs.promises;

const gm = require("gm");

var folder;
var path_to_images;

function find_folder_count() {

    try {
        return fsPromise.readFile("folder_count.txt", 'utf-8');

    }
    catch (err) {
        console.log(err);
    }
}

find_folder_count()
    .then((result) => {
        folder = result;
        path_to_images = `/run/user/1000/gvfs/mtp:host=realme_RMX2193_CYYSP7TO7T8T69AQ/Internal shared storage/chegg/${folder}`
        console.log(path_to_images);
    })
    .then(() => {
         fs.readdir(path_to_images, (err, data)=>{
             if(err){
                 console.log(err);
             }
             else{
                 var i = 1;
                data.forEach((filename=>{
                    gm(`${path_to_images}/${filename}`)
                          .write(`${path_to_images}/${i}.jpeg`, (err)=>{
                              if(err){
                                  console.log(err);
                              }
                          })

                          i++;
                }))
             }
         })
    })
    .then(()=>{
        console.log("Conversion Complete");
        fs.writeFile("folder_count.txt", parseInt(folder) + 1, (err)=>{
            if(err){
                 console.log(err);
            }
           
        });
    })







