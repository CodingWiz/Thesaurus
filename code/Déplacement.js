var booPgDw = false,
    booVueAir = false,
    blnMultiKeys = false;

var tabKey = new Array();

var intervalBooVueAir = 0;

var timerTresor = 0;

function deplacerCamera() {
    var camera = objScene3D.camera;

    // pour les multi-touches "ctrl shift espace"
    tabKey[event.keyCode] = event.type == "keydown";

    if (!booVueAir) {
        if (event.keyCode == 37 || event.keyCode == 39 ||
            event.keyCode == 65 || event.keyCode == 68) {
            // 37:  Flèche-à-gauche; 39:Flèche-à-droite
            // 65: a, 68: d
            var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
            var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
            var intDirection = (event.keyCode == 37 || event.keyCode == 65) ? -1 : 1;
            var fltAngle = intDirection * (Math.PI / 180 * 11.25); // Tourner 11.25 degrés
            var fltXPrime = fltX * Math.cos(fltAngle) - fltZ * Math.sin(fltAngle);
            var fltZPrime = fltX * Math.sin(fltAngle) + fltZ * Math.cos(fltAngle);
            setCibleCameraX(getPositionCameraX(camera) + fltXPrime, camera);
            setCibleCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
        } 
        else if (event.keyCode == 38 || event.keyCode == 40 ||
                event.keyCode == 87 || event.keyCode == 83) {
            // 38:  Flèche-en-haut; 40:Flèche-en-bas
            // 87: w, 83: s
            var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
            var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
            var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
            var intDirection = (event.keyCode == 38 || event.keyCode == 87) ? 1 : -1;

            var fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
            var fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! COLLISIONS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            var objPosX = getPositionX(camera) + fltXPrime, 
                objPosY = getPositionY(camera), 
                objPosZ = getPositionZ(camera) + fltZPrime;

            // check s'il y a une collision avec le tresor
            if (Grille.blnCollision(objPosX, 1, objPosZ, TEX_TRESOR)) {
                // niveau suivant si < 10
                if (intNiveauCourant < 10) {
                    audioTresor.play();

                    timerTresor = setTimeout(function() {
                        // Your code here

                        //clearTimeout(timerTresor);

                        intNiveauCourant++;
                    
                        changerNiveau(true);
                    }, 2000);
                }
                // game over
                else {
                    blnGameOver = true;

                    gameOver();
                }
            }

            // ferme le mur lorsqu'on sort de l'enclos
            if (Grille.getObjAtPosition((15 - Math.floor(arrGrille.length / 2)), 2, (13 - Math.floor(arrGrille.length / 2))).visible == false && 
                //(getCibleCameraX(camera) <= (14 - Math.floor(arrGrille.length / 2))  &&  getCibleCameraX(camera) >= (16 - Math.floor(arrGrille.length / 2))) && 
                getPositionZ(camera) <= (12 - Math.floor(arrGrille.length / 2))) {
                updateObjGrilleVisibilite(true);
            }

            // check s'il y a une collision avec un mur
            if (!Grille.blnCollision(objPosX, 2, objPosZ, TEX_MUR_INT, TEX_MUR_EXT)) {
                setCibleCameraX(getCibleCameraX(camera) + fltXPrime, camera);
                setCibleCameraZ(getCibleCameraZ(camera) + fltZPrime, camera);
                setPositionCameraX(getPositionCameraX(camera) + fltXPrime, camera);
                setPositionCameraZ(getPositionCameraZ(camera) + fltZPrime, camera);
            }
        }

        // Espace
        if (event.keyCode == 32) {
            if (arrOuvreursMurs[intNiveauCourant-1] > 0 && intScore >= 50) {
                var fltX = getCibleCameraX(camera) - getPositionCameraX(camera);
                var fltZ = getCibleCameraZ(camera) - getPositionCameraZ(camera);
                var fltRayon = Math.sqrt(fltX * fltX + fltZ * fltZ);
                var intDirection = 1; // devant le joueur

                var fltXPrime = intDirection * 0.2 * Math.cos(Math.acos(fltX / fltRayon));
                var fltZPrime = intDirection * 0.2 * Math.sin(Math.asin(fltZ / fltRayon));

                var objPosX = getPositionX(camera) + fltXPrime, 
                    objPosY = getPositionY(camera), 
                    objPosZ = getPositionZ(camera) + fltZPrime;

                if (Grille.blnCollision(objPosX, 2, objPosZ, TEX_MUR_INT)) {
                    //console.log("Destruction du mur en avant de la caméra: " + ++murs);

                    for (var obj3D of tabObjets3D) {
                        if (obj3D == Grille.getObjAtPosition(objPosX, 2, objPosZ).obj3D) {
                            intScore -= 50;
                            updateScore();

                            arrOuvreursMurs[intNiveauCourant-1]--;

                            Grille.rmObjAtPosition(objPosX, 2, objPosZ, TEX_MUR_INT);
                            tabObjets3D.splice(tabObjets3D.indexOf(obj3D), 1);

                            break;
                        }
                    }
                }

                updateOuvreursMurs();
            }
        }

        // Home
        if (event.keyCode == 36) {
            changerNiveau(false);
        }

        // Insert
        if (event.keyCode == 45) {
            // niveau suivant si < 10
            if (intNiveauCourant < 10) {
                audioTresor.play();

                    timerTresor = setTimeout(function() {
                        // Your code here

                        //clearTimeout(timerTresor);

                        intNiveauCourant++;
                    
                        changerNiveau(true);
                    }, 2000);
            }
            // game over
            else {
                blnGameOver = true;
                
                gameOver();
            }
        }

        // PageUp
        if (event.keyCode == 33 && intScore >= 10) {
            booVueAir = true;
            blnMultiKeys = false;
            tabKey = [];
            // ORIGINE : (0 ; 0.5 ; 0.5)
            fltPositionX = getPositionCameraX(camera);
            fltPositionZ = getPositionCameraZ(camera);
            fltCibleX = getCibleCameraX(camera);
            fltCibleZ = getCibleCameraZ(camera);

            setPositionCameraX(0, camera);
            setPositionCameraY(45, camera);
            setPositionCameraZ(0.01, camera);

            setCibleCameraX(0, camera);
            setCibleCameraY(-0.5, camera);
            setCibleCameraZ(0, camera);
            //chrono();
            //chronoReset();
            //booTemps = true;
            booPgDw = true;

            // Il le met au debut de la array
            tabObjets3D.unshift(creerObj3DMur(objgl, TEX_JOUEUR, Math.floor(fltPositionX), 1, Math.ceil(fltPositionZ), 1, 2, 1));

            /*for (var i = tabObjets3D.length - 1; i >= 0; i--) {
                if (tabObjets3D[i].type == 4) {
                    tabObjets3D.splice(i, 1);
                }
            }*/
            /*for (var obj3D of tabObjets3D) {
                if (obj3D == Grille.obj3DCiel || obj3D == Grille.obj3DTresor) {
                    tabObjets3D.splice(tabObjets3D.indexOf(obj3D), 1);
                }
            }*/
            tabObjets3D.splice(tabObjets3D.indexOf(Grille.obj3DCiel), 1);
            tabObjets3D.splice(tabObjets3D.indexOf(Grille.obj3DTresor), 1);

            Grille.arrObj3DFleches.forEach(objGrille => {
                tabObjets3D.splice(tabObjets3D.indexOf(objGrille.obj3D), 1);
            });

            intervalBooVueAir = setInterval(function() {
                if (intScore >= 10) {
                    intScore -= 10;
                    updateScore();
                }
                else {
                    clearInterval(intervalBooVueAir);

                    booVueAir = false;
                    setPositionCameraX(fltPositionX, camera);
                    setPositionCameraY(0.5, camera);
                    setPositionCameraZ(fltPositionZ, camera);

                    setCibleCameraX(fltCibleX, camera);
                    setCibleCameraY(0.5, camera);
                    setCibleCameraZ(fltCibleZ, camera);
                    //booTemps = false;
                    //document.getElementById("chronotime").innerHTML = "";

                    // Il le supprime du debut de la array
                    tabObjets3D.shift();

                    /*tabObjets3D.forEach(obj3D => {
                        if (obj3D == Grille.obj3DTresor) {
                            tabObjets3D.splice(obj3D, 1);
                        }
                    });*/

                    //var obj3DCiel = creerObj3DCiel(objgl, TEX_CIEL);
                    tabObjets3D.push(Grille.obj3DCiel);

                    if (!blnMultiKeys) {
                        tabObjets3D.push(Grille.obj3DTresor);

                        Grille.arrObj3DFleches.forEach(objGrille => {
                            tabObjets3D.push(objGrille.obj3D);
                        });
                    }

                    changerNiveau(false);
                }
            }, 1000);
        }
    }

    // PageDown
    if (event.keyCode == 34 && booVueAir /*booPgDw*/) {
        clearInterval(intervalBooVueAir);

        booVueAir = false;
        setPositionCameraX(fltPositionX, camera);
        setPositionCameraY(0.5, camera);
        setPositionCameraZ(fltPositionZ, camera);

        setCibleCameraX(fltCibleX, camera);
        setCibleCameraY(0.5, camera);
        setCibleCameraZ(fltCibleZ, camera);
        //booTemps = false;
        //document.getElementById("chronotime").innerHTML = "";

        // Il le supprime du debut de la array
        tabObjets3D.shift();

        /*tabObjets3D.forEach(obj3D => {
            if (obj3D == Grille.obj3DTresor) {
                tabObjets3D.splice(obj3D, 1);
            }
        });*/

        //var obj3DCiel = creerObj3DCiel(objgl, TEX_CIEL);
        tabObjets3D.push(Grille.obj3DCiel);

        if (!blnMultiKeys) {
            tabObjets3D.push(Grille.obj3DTresor);

            Grille.arrObj3DFleches.forEach(objGrille => {
                tabObjets3D.push(objGrille.obj3D);
            });
        }
    }

    // dessine tous les objets qui etaient invisibles
    if (tabKey[16] && tabKey[17] && tabKey[32] && booVueAir && !blnMultiKeys) {
        blnMultiKeys = true;

        tabObjets3D.push(Grille.obj3DTresor);

        Grille.arrObj3DFleches.forEach(objGrille => {
            tabObjets3D.push(objGrille.obj3D);
        });

        //alert("Ctrl Shift Espace");
        tabKey = [];

        effacerCanevas(objgl);
        dessiner(objgl, objProgShaders, objScene3D);

        return false;
    }
    // cache tous les objets qui etaient visibles
    else if (tabKey[16] && tabKey[17] && tabKey[32] && booVueAir && blnMultiKeys) {
        blnMultiKeys = false;

        tabObjets3D.splice(tabObjets3D.indexOf(Grille.obj3DTresor), 1);

        Grille.arrObj3DFleches.forEach(objGrille => {
            tabObjets3D.splice(tabObjets3D.indexOf(objGrille.obj3D), 1);
        });

        //alert("Ctrl Shift Espace");
        tabKey = [];

        effacerCanevas(objgl);
        dessiner(objgl, objProgShaders, objScene3D);

        return false;
    }

    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);
}