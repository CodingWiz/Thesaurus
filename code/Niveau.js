var intNiveauCourant = 1;

var arrOuvreursMurs = [4, 4, 3, 3, 2, 2, 1, 1, 0, 0], 
    arrFleches = [18, 16, 14, 12, 10, 8, 6, 4, 2, 0], 
    arrTeleTransporteurs = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5], 
    arrTeleRecepteurs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var blnGameOver = false;

// true => changer niveau, false => recommencer niveau
function changerNiveau(blnChanger) {
    booVueAir = false;
    blnMultiKeys = false;
    tabKey = [];

    // update la visibilite des objets
    // de la grille (visible/invisible)

    // La caméra
    resetCamera();

    // update le niveau courant
    updateNiveauCourant();

    // update les ouvreurs de murs
    arrOuvreursMurs.splice(0, arrOuvreursMurs.length);
    arrOuvreursMurs = [...Grille.arrOuvreursMurs];
    updateOuvreursMurs();

    // update le score
    if (blnChanger) {
        clearTimeout(timerTresor);

        /*Grille.arrObjGrille.splice(Grille.arrObjGrille.indexOf(Grille.arrObj3DFleches[0], 1));
        Grille.arrObj3DFleches.shift();*/

        //console.log(Math.round(parseFloat(parseFloat(document.getElementById("idMeter").value) * 60)));
        intScore += 10 * Math.round(parseFloat(parseFloat(document.getElementById("idMeter").value) * 60));

        audioDebutNiveau.play();
    }
    else if (!blnChanger && intScore >= 200) {
        clearTimeout(timerRecommencer);

        intScore -= 200;
    }
    // game over
    else if (intScore < 200) {
        audioEchec.play();

        intScore = 0;

        blnGameOver = true;

        gameOver();
    }
    updateScore();

    updateObjGrilleVisibilite(false);

    // update le chronometre
    if (intScore > 0 && !blnGameOver) 
        updateChronometre(true);
    else 
        updateChronometre(false);
}

function updateObjGrilleVisibilite(blnObjMurVisible) {
    // update les images present dans la grille
    tabObjets3D.splice(0, tabObjets3D.length);
            
    //tabObjets3D.push(Grille.obj3DSol);
    tabObjets3D.push(Grille.obj3DCiel);
    //tabObjets3D.push(Grille.obj3DTresor);

    Grille.arrObjGrille.forEach(objGrille => {
        // check la visibilite du mur de l'enclos
        // et le met a visible/invisible selon le parametre
        if (objGrille.PosY == 2 && objGrille.PosGrilleX == 15 && objGrille.PosGrilleZ == 13) 
            objGrille.visible = blnObjMurVisible;
        else 
            objGrille.visible = true;

        if (objGrille.visible)
            tabObjets3D.push(objGrille.obj3D);
    });
}

function gameOver() {
    clearInterval(intervalID);
    clearTimeout(timerID);

    updateChronometre(false);
    updateScore();

    effacerCanevas(objgl);

    return false;
}

function updateChronometre(blnResetTimer) {
    document.getElementById("idMeter").value = (blnResetTimer == true) ? document.getElementById("idMeter").optimum : document.getElementById("idMeter").min;
}
function updateNiveauCourant() {
    document.getElementById("idNiveauCourant").innerHTML = intNiveauCourant;
}
function updateOuvreursMurs() {
    document.getElementById("idMurs").innerHTML = arrOuvreursMurs[intNiveauCourant-1];
}
function updateScore() {
    document.getElementById("idScore").innerHTML = intScore + " pts";
}

function resetCamera( ){
    var camera = creerCamera();
    setPositionsCameraXYZ([0, 0.5, 0.01], camera);
    setCiblesCameraXYZ([0, 0.5, 0], camera);
    setOrientationsXYZ([0, 1, 0], camera);
    objScene3D.camera = camera;
}