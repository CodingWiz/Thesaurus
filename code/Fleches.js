
function creerObj3DFleche(objgl, intNoTexture, intX, intZ) {
    //  var tabObjFleche = new Array();

    // for (var i = 0; i < 3; i++) {
    var obj3DFleche = new Object();
    obj3DFleche.fltProfondeur = 1;
    obj3DFleche.fltLargeur = 1;
    obj3DFleche.fltHauteur = 2;
    obj3DFleche.vertex = creerVertexFleche(objgl, intX, intZ, obj3DFleche.fltLargeur, obj3DFleche.fltProfondeur, obj3DFleche.fltHauteur);
    obj3DFleche.couleurs = creerCouleursFleche(objgl, [1, 1, 1, 1]);
    obj3DFleche.texels = creerTexelsFleche(objgl, intNoTexture);
    obj3DFleche.maillage = creerMaillageFleche(objgl);
    obj3DFleche.transformations = creerTransformations();
    // tabObjFleche.push(obj3DFleche);

    // }
    return obj3DFleche;
}

function creerVertexFleche(objgl, intDebutX, intDebutZ, fltLargeur, fltProfondeur, fltHauteur) {

    var tabVertex = [
        // Face avant (Z=1)
        /* 0.0, 1.5, 0.0,   // 0: Centre
         0.0, 1.625, 0.0,   // 1: Coin haut droit
         -0.5, 1.625, 0.0,  // 2: Coin bas droit
         -0.5, 1.375, 0.0,  // 3: Coin bas gauche
         0.0, 1.375, 0.0,  // 4: Coin haut gauche
         0.0, 1.25, 0.0,  // 5: Coin haut gauche
         0.5, 1.5, 0.0,  // 6: Coin haut gauche
         0.0, 1.75, 0.0,  // 7: Coin haut gauche
 
 
         // Face arri�re (Z=-1) 
         0.0, 1.5, 0.25,   // 8: Centre
         0.0, 1.625, 0.25,   // 9: Coin haut droit
         -0.5, 1.625, 0.25,  // 10: Coin bas droit
         -0.5, 1.375, 0.25,  // 11: Coin bas gauche
         0.0, 1.375, 0.25,  // 12: Coin haut gauche
         0.0, 1.25, 0.25,  // 13: Coin haut gauche
         0.5, 1.5, 0.25,  // 14: Coin haut gauche
         0.0, 1.75, 0.25,  // 15: Coin haut gauche*/



        /*8.0, 1.5, -0.5,   // 0: Centre
8.0, 1.625, -0.5,   // 1: Coin haut droit
7.5, 1.625, -0.5,  // 2: Coin bas droit
7.5, 1.375, -0.5,  // 3: Coin bas gauche
8.0, 1.375, -0.5,  // 4: Coin haut gauche
8.0, 1.25, -0.5,  // 5: Coin haut gauche
8.5, 1.5, -0.5,  // 6: Coin haut gauche
8.0, 1.75, -0.5,  // 7: Coin haut gauche


// Face arri�re (Z=-1) 
8.0, 1.5, -0.25,   // 8: Centre
8.0, 1.625, -0.25,   // 9: Coin haut droit
7.5, 1.625, -0.25,  // 10: Coin bas droit
7.5, 1.375, -0.25,  // 11: Coin bas gauche
8.0, 1.375, -0.25,  // 12: Coin haut gauche
8.0, 1.25, -0.25,  // 13: Coin haut gauche
8.5, 1.5, -0.25,  // 14: Coin haut gauche
8.0, 1.75, -0.25,  // 15: Coin haut gauche*/

        /*fltLargeur, 1.5, -0.5,   // 0: Centre
        fltLargeur, 1.625, -0.5,   // 1: Coin haut droit
        fltLargeur - 0.5, 1.625, -0.5,  // 2: Coin bas droit
        fltLargeur - 0.5, 1.375, -0.5,  // 3: Coin bas gauche
        fltLargeur, 1.375, -0.5,  // 4: Coin haut gauche
        fltLargeur, 1.25, -0.5,  // 5: Coin haut gauche
        fltLargeur + 0.5, 1.5, -0.5,  // 6: Coin haut gauche
        fltLargeur, 1.75, -0.5,  // 7: Coin haut gauche


        // Face arri�re (Z=-1) 
        fltLargeur, 1.5, -0.25,   // 8: Centre
        fltLargeur, 1.625, -0.25,   // 9: Coin haut droit
        fltLargeur - 0.5, 1.625, -0.25,  // 10: Coin bas droit
        fltLargeur - 0.5, 1.375, -0.25,  // 11: Coin bas gauche
        fltLargeur, 1.375, -0.25,  // 12: Coin haut gauche
        fltLargeur, 1.25, -0.25,  // 13: Coin haut gauche
        fltLargeur + 0.5, 1.5, -0.25,  // 14: Coin haut gauche
        fltLargeur, 1.75, -0.25,  // 15: Coin haut gauche*/

        intDebutX + (fltLargeur / 2), fltHauteur, intDebutZ + (fltProfondeur / 2),   // 0: Centre
        intDebutX + (fltLargeur / 2), fltHauteur, intDebutZ + ((fltProfondeur / 2) / 2),   // 1: Coin haut droit
        intDebutX + 0, fltHauteur, intDebutZ + ((fltProfondeur / 2) / 2),  // 2: Coin bas droit
        intDebutX + 0, fltHauteur, intDebutZ + (fltProfondeur - ((fltProfondeur / 2) / 2)),  // 3: Coin bas gauche
        intDebutX + (fltLargeur / 2), fltHauteur, intDebutZ + (fltProfondeur - ((fltProfondeur / 2) / 2)),  // 4: Coin haut gauche
        intDebutX + (fltLargeur / 2), fltHauteur, intDebutZ + (fltProfondeur),  // 5: Coin haut gauche
        intDebutX + fltLargeur, fltHauteur, intDebutZ + (fltProfondeur / 2),  // 6: Coin haut gauche
        intDebutX + (fltLargeur / 2), fltHauteur, intDebutZ + 0,  // 7: Coin haut gauche


        // Face arri�re (Z=-1) 
        intDebutX + (fltLargeur / 2), fltHauteur - 0.125, intDebutZ + (fltProfondeur / 2),   // 8: Centre
        intDebutX + (fltLargeur / 2), fltHauteur - 0.125, intDebutZ + ((fltProfondeur / 2) / 2),   // 9: Coin haut droit
        intDebutX + 0, fltHauteur - 0.125, intDebutZ + ((fltProfondeur / 2) / 2),  // 10: Coin bas droit
        intDebutX + 0, fltHauteur - 0.125, intDebutZ + (fltProfondeur - ((fltProfondeur / 2) / 2)),  // 11: Coin bas gauche
        intDebutX + (fltLargeur / 2), fltHauteur - 0.125, intDebutZ + (fltProfondeur - ((fltProfondeur / 2) / 2)),  // 12: Coin haut gauche
        intDebutX + (fltLargeur / 2), fltHauteur - 0.125, intDebutZ + (fltProfondeur),  // 13: Coin haut gauche
        intDebutX + fltLargeur, fltHauteur - 0.125, intDebutZ + (fltProfondeur / 2),  // 14: Coin haut gauche
        intDebutX + (fltLargeur / 2), fltHauteur - 0.125, intDebutZ + 0,  // 14: Coin haut gauche





    ];
    var objFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objFleche;


    /*var tabVertex = [
             -fltLargeur / 2, 0.0, -fltProfondeur / 2,
             fltLargeur / 2, 0.0, -fltProfondeur / 2,
             -fltLargeur / 2, 0.0, fltProfondeur / 2,
             fltLargeur / 2, 0.0, fltProfondeur / 2
        ];
    
    var objFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objFleche;*/

}

function creerCouleursFleche(objgl, tabCouleur) {

    // Face avant
    tabCouleurs = [0.0, 0.0, 0.0, 1.0];
    for (var i = 1; i <= 8; i++)
        tabCouleurs = tabCouleurs.concat([1.0, 0.0, 0.0, 1.0]); // Rouge

    // Face arri�re
    tabCouleurs = tabCouleurs.concat([0.0, 0.0, 0.0, 1.0]); // Blanc 
    for (var i = 1; i <= 8; i++)
        tabCouleurs = tabCouleurs.concat([0.0, 1.0, 0.0, 1.0]); // Vert

    var objCouleursFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.DYNAMIC_DRAW);

    return objCouleursFleche;

    /*tabCouleurs = [];
    for (var i = 0; i < 4; i++)
        tabCouleurs = tabCouleurs.concat(tabCouleur);

    var objCouleursFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursFleche;*/
}

function creerTexelsFleche(objgl, intNoTexture) {
    var tabTexels = [
        /* 0.0, 0.0,
         fltLargeur, 0.0,
         0.0, fltProfondeur,
         fltLargeur, fltProfondeur*/

        /*  0.0, 0.5, 0.0,   // 0: Centre
          0.0, 1.625, 0.0,   // 1: Coin haut droit
          -0.5, 1.625, 0.0,  // 2: Coin bas droit
          -0.5, 1.375, 0.0,  // 3: Coin bas gauche
          0.0, 1.375, 0.0,  // 4: Coin haut gauche
          0.0, 1.25, 0.0,  // 5: Coin haut gauche
          0.5, 1.5, 0.0,  // 6: Coin haut gauche
          0.0, 1.75, 0.0,  // 7: Coin haut gauche
  
  
          // Face arri�re (Z=-1) 
          0.0, 1.5, 0.25,   // 8: Centre
          0.0, 1.625, 0.25,   // 9: Coin haut droit
          -0.5, 1.625, 0.25,  // 10: Coin bas droit
          -0.5, 1.375, 0.25,  // 11: Coin bas gauche
          0.0, 1.375, 0.25,  // 12: Coin haut gauche
          0.0, 1.25, 0.25,  // 13: Coin haut gauche
          0.5, 1.5, 0.25,  // 14: Coin haut gauche
          0.0, 1.75, 0.25,  // 15: Coin haut gauche*/

        0.5, 0.5,
        0.5, 0.25,
        0.0, 0.25,
        0.0, 0.75,
        0.5, 0.75,
        0.5, 1.0,
        1.0, 1.0,
        0.5, 0.0,

        0.5, 0.5,
        0.5, 0.25,
        0.0, 0.25,
        0.0, 0.75,
        0.5, 0.75,
        0.5, 1.0,
        1.0, 1.0,
        0.5, 0.0,




    ];

    var objTexelsFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsFleche);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsFleche.intNoTexture = intNoTexture; objTexelsFleche.pcCouleurTexel = 1.0;

    return objTexelsFleche;
}

function creerMaillageFleche(objgl) {
    // Le maillage                        
    tabMaillageFleche =
        [
            1, 2, 3,
            1, 3, 4,
            7, 5, 6,
            9, 10, 11,
            9, 11, 12,
            15, 14, 13,
            6, 13, 14,
            6, 5, 13,
            6, 7, 14,
            14, 7, 15,
            2, 3, 11,
            2, 11, 10,
            1, 7, 9,
            9, 15, 7,
            4, 5, 13,
            13, 12, 4,
            2, 4,
            10, 12,
            7, 15,
            6, 14,
            5, 13,
            4, 12,
            3, 11,
            2, 10
        ];
    var objMaillageFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageFleche);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillageFleche), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageFleche.intNbTriangles = 16;
    // Le nombre de droites
    objMaillageFleche.intNbDroites = 8;

    return objMaillageFleche;



    /*var tabMaillage =
        [ // Les 2 triangles du sol
            0, 1, 2,
            1, 2, 3,
        ];

    var objMaillageFleche = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageFleche);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageFleche.intNbTriangles = 2;
    // Le nombre de droites
    objMaillageFleche.intNbDroites = 0;

    return objMaillageFleche;*/
}


