var fltPositionX = 0;
var fltPositionZ = 0;
var fltCibleX = 0;
var fltCibleZ = 0;

var tabObjets3D = new Array();

function initScene3D(objgl) {
    var objScene3D = new Object();

    // Mettre les textures dans la scène
    objScene3D.textures = creerTextures(objgl, tabImages);

    // Créer le sol
    /*var obj3DSol = creerObj3DSol(objgl, TEX_SOL, - Math.floor(arrGrille.length / 2), - Math.floor(arrGrille.length / 2), arrGrille.length - 1, arrGrille.length - 1);
    Grille.obj3DSol = obj3DSol;
    tabObjets3D.push(Grille.obj3DSol);*/

    // Créer le ciel
    var obj3DCiel = creerObj3DCiel(objgl, TEX_CIEL);
    Grille.obj3DCiel = obj3DCiel;
    tabObjets3D.push(Grille.obj3DCiel);

    /*var obj3DTresor = creerObj3DMur(objgl, TEX_MUR_INT, x - Math.floor(arrGrille.length / 2), 0, z - Math.floor(arrGrille.length / 2), 1, 2, 1); //creerObj3DTresor(objgl, TEX_TRESOR);
    Grille.obj3DTresor = obj3DTresor;
    tabObjets3D.push(Grille.obj3DTresor);*/

    // -Math.floor(arrGrille.length/2) Math.floor(arrGrille.length/2)
    for (var x = 0; x < arrGrille.length; x++) {
        for (var z = 0; z < arrGrille.length; z++) {
            switch (arrGrille[z][x]) {
                case 0:
                    // placement du sol
                    var obj3D = creerObj3DSol(objgl, TEX_SOL, x - Math.floor(arrGrille.length / 2), z - Math.floor(arrGrille.length / 2) - 1, 1, 1);

                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 0;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_SOL;
                    objGrille.strType = "Sol";
                    objGrille.obj3D = obj3D;

                    Grille.arrObjGrille.push(objGrille);

                    tabObjets3D.push(objGrille.obj3D);
                    break;

                case 1:
                    // placement du sol
                    var obj3D = creerObj3DSol(objgl, TEX_SOL, x - Math.floor(arrGrille.length / 2), z - Math.floor(arrGrille.length / 2) - 1, 1, 1);

                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 0;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_SOL;
                    objGrille.strType = "Sol";
                    objGrille.obj3D = obj3D;

                    Grille.arrObjGrille.push(objGrille);

                    tabObjets3D.push(objGrille.obj3D);

                    // placement du mur int
                    var obj3D = creerObj3DMur(objgl, TEX_MUR_INT, x - Math.floor(arrGrille.length / 2), 0, z - Math.floor(arrGrille.length / 2), 1, 2, 1);

                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 2;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_MUR_INT;
                    objGrille.strType = "Mur int";
                    objGrille.obj3D = obj3D;

                    Grille.arrObjGrille.push(objGrille);

                    tabObjets3D.push(objGrille.obj3D);
                    break;

                case 2:
                    // placement du sol
                    var obj3D = creerObj3DSol(objgl, TEX_SOL, x - Math.floor(arrGrille.length / 2), z - Math.floor(arrGrille.length / 2) - 1, 1, 1);

                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 0;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_SOL;
                    objGrille.strType = "Sol";
                    objGrille.obj3D = obj3D;

                    Grille.arrObjGrille.push(objGrille);

                    tabObjets3D.push(objGrille.obj3D);

                    // placement du mur ext
                    obj3D = creerObj3DMur(objgl, TEX_MUR_EXT, x - Math.floor(arrGrille.length / 2), 0, z - Math.floor(arrGrille.length / 2), 1, 2, 1);

                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 2;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_MUR_EXT;
                    objGrille.strType = "Mur ext";
                    objGrille.obj3D = obj3D;

                    // mur non ouvrable invisible
                    // qui devient visible apres
                    if (x == 15 && z == 13) {
                        objGrille.visible = false;
                    }

                    Grille.arrObjGrille.push(objGrille);

                    if (objGrille.visible == true) {
                        tabObjets3D.push(objGrille.obj3D);
                    }
                    break;

                case 3:
                    // placement du plancher qui est dans l'enclos
                    var obj3D = creerObj3DSol(objgl, TEX_PLANCHER_MILIEU, x - Math.floor(arrGrille.length / 2), z - Math.floor(arrGrille.length / 2) - 1, 1, 1);

                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 0;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_PLANCHER_MILIEU;
                    objGrille.strType = "Plancher milieu";
                    objGrille.obj3D = obj3D;

                    Grille.arrObjGrille.push(objGrille);

                    tabObjets3D.push(objGrille.obj3D);
                    break;



                case 4:
                    // placement du sol
                    var obj3D = creerObj3DSol(objgl, TEX_SOL, x - Math.floor(arrGrille.length / 2), z - Math.floor(arrGrille.length / 2) - 1, 1, 1);

                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 0;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_SOL;
                    objGrille.strType = "Sol";
                    objGrille.obj3D = obj3D;

                    Grille.arrObjGrille.push(objGrille);

                    tabObjets3D.push(objGrille.obj3D);


                    //Get la position du tresor
                    var TresorX = 0;
                    var TresorZ = 0;
                    for (var i = 0; i < arrGrille.length; i++) {
                        for (var k = 0; k < arrGrille.length; k++) {
                            if (arrGrille[k][i] == 5) {
                                var TresorX = i - Math.floor(arrGrille.length / 2);
                                var TresorZ = k - Math.floor(arrGrille.length / 2);

                                break;
                            }
                        }
                    }
                    // console.log(TresorX + "      " + TresorZ);


                    // Placement des flèches

                    var obj3D = creerObj3DFleche(objgl, TEX_FLECHE_2, 0, 0);
                    var FlecheX = x - Math.floor(arrGrille.length / 2);
                    var FlecheZ = z - Math.floor(arrGrille.length / 2);

                    setPositionX(FlecheX, obj3D.transformations);
                    setPositionZ(FlecheZ, obj3D.transformations);

                 //   var fltRadiansY = Math.atan2(FlecheX - TresorX, TresorZ - FlecheZ);
                    var fltRadiansY = Math.atan2(FlecheX - TresorX, FlecheZ-TresorZ);

                    //console.log((fltRadiansY * 180 / Math.PI) + " degré, " + FlecheX + " x, " + FlecheZ + " z");

                    //  console.log(fltRadiansY);
                     //setAngleY(fltRadiansY * 180 / Math.PI, obj3D.transformations);
                     setAngleY(180, obj3D.transformations);


                    


                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 2;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_FLECHE_2;
                    objGrille.strType = "Fleche";
                    objGrille.obj3D = obj3D;

                    // Grille.obj3DTresor = objGrille.obj3D;
                    Grille.arrObjGrille.push(objGrille);
                    Grille.arrObj3DFleches.push(objGrille);

                    tabObjets3D.push(objGrille.obj3D);

                    break;

                case 5:
                    // placement du sol
                    var obj3D = creerObj3DSol(objgl, TEX_SOL, x - Math.floor(arrGrille.length / 2), z - Math.floor(arrGrille.length / 2) - 1, 1, 1);

                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 0;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_SOL;
                    objGrille.strType = "Sol";
                    objGrille.obj3D = obj3D;

                    Grille.arrObjGrille.push(objGrille);

                    tabObjets3D.push(objGrille.obj3D);

                    // placement du tresor
                    var obj3D = creerObj3DMur(objgl, TEX_TRESOR, x - Math.floor(arrGrille.length / 2), 0, z - Math.floor(arrGrille.length / 2), 0.5, 0.5 * 2 / 3, 0.9);

                    var objGrille = object_Grille({});

                    objGrille.objgl = objgl;

                    objGrille.PosGrilleX = x;
                    objGrille.PosGrilleZ = z;

                    objGrille.PosX = x - Math.floor(arrGrille.length / 2);
                    objGrille.PosY = 1;
                    objGrille.PosZ = z - Math.floor(arrGrille.length / 2);

                    objGrille.TEX = TEX_TRESOR;
                    objGrille.strType = "Tresor";
                    objGrille.obj3D = obj3D;

                    Grille.obj3DTresor = objGrille.obj3D;
                    Grille.arrObjGrille.push(objGrille);

                    tabObjets3D.push(objGrille.obj3D);
                    break;

                // save bcp d'espace dans la memoire et load plus rapidement
                default:
                    continue;
            }
        }
    }

    // Mettre les objets 3D sur la scène
    objScene3D.tabObjets3D = tabObjets3D;

    // La caméra
    var camera = creerCamera();
    //console.log('Positions: ' + getPositionsCameraXYZ(camera).slice(0,3));
    setPositionsCameraXYZ([0, 0.5, 0.01], camera);
    setCiblesCameraXYZ([0, 0.5, 0], camera);
    setOrientationsXYZ([0, 1, 0], camera);
    objScene3D.camera = camera;

    return objScene3D;
}