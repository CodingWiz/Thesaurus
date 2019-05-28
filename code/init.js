/*
    Legende:

    Soit un couloir = 0
    Soit un mur ouvrable = 1
    Soit un mur non ouvrable = 2
    Soit une cellule qui fait partie de l’enclos = 3
    Soit un tresor = 5
*/
var arrGrille = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2],
    [2, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 4, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 4, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 4, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 2, 2, 2, 2, 2, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 4, 2], // 15x, 13z
    [2, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 2, 3, 3, 3, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0, 1, 0, 2, 3, 3, 3, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 2, 3, 3, 3, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 2, 2, 2, 2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 2],
    [2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 4, 0, 0, 0, 0, 0, 1, 0, 2],
    [2, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 5, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 2],
    [2, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 4, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 2],
    [2, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 2],
    [2, 0, 0, 0, 0, 0, 4, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 4, 1, 0, 1, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 4, 1, 1, 0, 1, 1, 1, 0, 1, 4, 1, 1, 0, 1, 0, 2],
    [2, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 2],
    [2, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 2],
    [2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

var objgl = null,
    objProgShaders = null,
    objScene3D = null;

const OBJ3D_SOL = 0,
    OBJ3D_MURS = 1,
    OBJ3D_CRENEAUX = 2,
    OBJ3D_TUNNELS = 3;

const tabImages = ['Transparent.gif', '../Image/sol.jpg', '../Image/mur-int.jpg', '../Image/mur-ext.png', '../Image/Ciel.jpg', '../Image/imgJoueurRouge.png', "../Image/planches-bois-texture-plancher.jpg", "../Image/TresorPuissance2.jpg", "../Image/Fleche.jpg", '../Image/imgJoueur.png'];
const TEX_TRANSPARENT = 0,
    TEX_SOL = 1,
    TEX_MUR_INT = 2,
    TEX_MUR_EXT = 3,
    TEX_CIEL = 4,
    TEX_JOUEUR = 5,
    TEX_PLANCHER_MILIEU = 6,
    TEX_TRESOR = 7;
    TEX_Fleche = 8;
    TEX_FLECHE_2 = 9;

// objet qui manipule les donnees
// contient un array de tous les objets de la grille
var Grille;

function demarrer() {
    // initialise l'objet Grille 
    // qui contient toutes les donnees
    // necessaires au jeu
    intNiveauCourant = 1;
    intScore = 300;

    blnGameOver = false;

    Grille = fct_Grille({});

    Grille.arrOuvreursMurs = [...arrOuvreursMurs];
    Grille.arrFleches = [...arrFleches];
    Grille.arrTeleTransporteurs = [...arrTeleTransporteurs];
    Grille.arrTeleRecepteurs = [...arrTeleRecepteurs];

    var objCanvas = document.getElementById('monCanvas');
    objgl = initWebGL(objCanvas); // Initialise le contexte WebGL
    objProgShaders = initShaders(objgl);
    objScene3D = initScene3D(objgl); // Créer la scène

    effacerCanevas(objgl);
    dessiner(objgl, objProgShaders, objScene3D);

    objCanvas.focus();

    updateNiveauCourant();
    updateOuvreursMurs();
    updateScore();
    demarrerChrono();

    audioDebutNiveau.play();
}