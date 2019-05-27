// Mur int.js

function creerObj3DMur(objgl, intNoTexture, intDebutX, intDebutY, intDebutZ, fltLargeurX, fltHauteurY, fltProfondeurZ) {

    var obj3DMur = new Object();
    obj3DMur.fltProfondeurZ = fltProfondeurZ; // La profondeur d'un seul mur int
    obj3DMur.fltLargeurX = fltLargeurX; // La largeur d'un seul mur int
    obj3DMur.fltHauteurY = fltHauteurY; // La hauteur d'un seul mur int

    obj3DMur.intDebutX = intDebutX;
    obj3DMur.intDebutY = intDebutY;
    obj3DMur.intDebutZ = intDebutZ;

    // Cr�er les Mur int
    obj3DMur.vertex = creerVertexMur(objgl, obj3DMur.intDebutX, obj3DMur.intDebutY, obj3DMur.intDebutZ,
        obj3DMur.fltLargeurX, obj3DMur.fltProfondeurZ, obj3DMur.fltHauteurY);
    obj3DMur.couleurs = creerCouleursMur(objgl, [0, 0, 0, 1]);
    obj3DMur.texels = creerTexelsMur(objgl, obj3DMur.fltLargeurX, obj3DMur.fltProfondeurZ, obj3DMur.fltHauteurY, intNoTexture);
    obj3DMur.maillage = creerMaillageMur(objgl);

    obj3DMur.transformations = creerTransformations();
    return obj3DMur;
}

function creerVertexMur(objgl, intDebutX, intDebutY, intDebutZ, fltLargeurX, fltProfondeurZ, fltHauteurY) {
    //Mur int
    var tabVertex = [
        (intDebutX + (intDebutX + fltLargeurX)) / 2, fltHauteurY / 2, intDebutZ, // centre devant
        intDebutX + fltLargeurX, fltHauteurY, intDebutZ, //devant haut droit
        intDebutX + fltLargeurX, intDebutY, intDebutZ, //devant bas droit
        intDebutX, intDebutY, intDebutZ, //devant bas gauche
        intDebutX, fltHauteurY, intDebutZ, //devant haut gauche,

        (intDebutX + (intDebutX + fltLargeurX)) / 2, fltHauteurY / 2, intDebutZ - fltProfondeurZ, // centre derriere
        intDebutX + fltLargeurX, fltHauteurY, intDebutZ - fltProfondeurZ, //derriere haut droit
        intDebutX + fltLargeurX, intDebutY, intDebutZ - fltProfondeurZ, //derriere bas droit
        intDebutX, intDebutY, intDebutZ - fltProfondeurZ, //derriere bas gauche
        intDebutX, fltHauteurY, intDebutZ - fltProfondeurZ, //derriere haut gauche

        intDebutX + fltLargeurX, fltHauteurY / 2, (intDebutZ + (intDebutZ - fltProfondeurZ)) / 2, // centre droit

        intDebutX, fltHauteurY / 2, (intDebutZ + (intDebutZ - fltProfondeurZ)) / 2, // centre gauche

        (intDebutX + (intDebutX + fltLargeurX)) / 2, fltHauteurY, (intDebutZ + (intDebutZ - fltProfondeurZ)) / 2, // centre haut
    ];

    var objMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabVertex), objgl.STATIC_DRAW);

    return objMur;
}

function creerCouleursMur(objgl, tabCouleur) {
    var tabCouleurs = [];
    for (var i = 0; i < 20; i++)
        tabCouleurs = tabCouleurs.concat([0, 0, 0, 1]);

    var objCouleursMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objCouleursMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabCouleurs), objgl.STATIC_DRAW);

    return objCouleursMur;
}

function creerTexelsMur(objgl, fltLargeurX, fltProfondeurZ, fltHauteurY, intNoTexture) {
    var tabTexels = [
        // Texels de la face avant
        0.5, 0.5, // 0: Centre devant
        1.0, 0.0, // 1: Coin haut droit
        1.0, 1.0, // 2: Coin bas droit
        0.0, 1.0, // 3: Coin bas gauche
        0.0, 0.0, // 4: Coin haut gauche

        // Texels de la face arrière
        0.5, 0.5, // 5: Centre derriere
        0.0, 0.0, // 6: Coin haut droit
        0.0, 1.0, // 7: Coin bas droit
        1.0, 1.0, // 8: Coin bas gauche
        1.0, 0.0, // 9: Coin haut gauche

        // Texels de la face droit
        0.5, 0.5, // 0: Centre droit

        // Texels de la face gauche
        0.5, 0.5, // 0: Centre gauche

        // Texels de la face haut
        0.5, 0.5 // 0: Centre haut
    ];

    var objTexelsMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ARRAY_BUFFER, objTexelsMur);
    objgl.bufferData(objgl.ARRAY_BUFFER, new Float32Array(tabTexels), objgl.STATIC_DRAW);

    objTexelsMur.intNoTexture = intNoTexture;
    objTexelsMur.pcCouleurTexel = 1;

    return objTexelsMur;
}

function creerMaillageMur(objgl) {
    var tabMaillage = [
        // Les 4 triangles de la face avant
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 1,

        // Les 4 triangles de la face arrière
        5, 6, 7,
        5, 7, 8,
        5, 8, 9,
        5, 9, 6,

        // Les 4 triangles de la face droite
        10, 1, 6,
        10, 6, 7,
        10, 7, 2,
        10, 2, 1,

        // Les 4 triangles de la face gauche
        11, 4, 3,
        11, 3, 8,
        11, 8, 9,
        11, 9, 4,

        // Les 4 triangles de la face haute
        12, 6, 1,
        12, 1, 4,
        12, 4, 9,
        12, 9, 6
    ];

    var objMaillageMur = objgl.createBuffer();
    objgl.bindBuffer(objgl.ELEMENT_ARRAY_BUFFER, objMaillageMur);
    objgl.bufferData(objgl.ELEMENT_ARRAY_BUFFER, new Uint16Array(tabMaillage), objgl.STATIC_DRAW);

    // Le nombre de triangles
    objMaillageMur.intNbTriangles = 20;
    // Le nombre de droites
    objMaillageMur.intNbDroites = 0;

    return objMaillageMur;
}