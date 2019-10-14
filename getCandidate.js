var fs = require('fs');

var availableCandidate;

var getPartnerName = (name) =>    {

    var data = fs.readFileSync('candidate.json');
    var fileData = JSON.parse(data);
   // console.log(fileData.available);
    currentUser = name;
   availableCandidate = fileData.available;

    const index = Math.floor(Math.random() * availableCandidate.length);
    const candidateIndex = availableCandidate[index];
    const candidate = candidateIndex.name;
    const candidateSpouse = candidateIndex.spouse;

    //console.log(candidateSpouse);

    if (candidate != currentUser && candidateSpouse != currentUser ) {
   
    //Removing the element from the list
    availableCandidate.splice(index,1);

    var currentData = {available : availableCandidate};
    var writingData = JSON.stringify(currentData,null,2);
    fs.writeFile('candidate.json',writingData,finished);

    function finished(err){
        if(err) {
            console.log(err);
        }
      }

  
    } else {
        console.log('chose spouse');
    }
    return candidate;
};

module.exports = {
    getPartnerName
};