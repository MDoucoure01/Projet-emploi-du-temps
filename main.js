const profs = [
    { id: 1, nom: 'MBAYE', semaine: '', modules: [1, 2, 3], plannings: [[], [], [], [], []] }, // module salle heur Duree jour
    { id: 2, nom: 'MOUSSA', semaine: '', modules: [6, 2, 3], plannings: [[], [], [], [], []] },
    { id: 3, nom: 'MAR', semaine: '', modules: [4, 3, 5], plannings: [[], [], [], [], []] },
    { id: 4, nom: 'THIORO', semaine: '', modules: [1, 4, 3], plannings: [[], [], [], [], []] },
    { id: 5, nom: 'ADJA', semaine: '', modules: [1, 3], plannings: [[], [], [], [], []] },
];

const modules = [
    { id: 1, nom: 'Javascript', semaine: '', plannings: [[], [], [], [], []] }, // prof salle heur duree jour
    { id: 2, nom: 'Python', semaine: '', plannings: [[], [], [], [], []] },
    { id: 3, nom: 'Java', semaine: '', plannings: [[], [], [], [], []] },
    { id: 4, nom: 'PHP', semaine: '', plannings: [[], [], [], [], []] },
    { id: 5, nom: 'Merise', semaine: '', plannings: [[], [], [], [], []] },
    { id: 6, nom: 'Arabe', semaine: '', plannings: [[], [], [], [], []] },
];


const classes = [
    { id: 1, nom: 'DevWeb', semaine: '', plannings: [[], [], [], []], effectif: 30 },
    { id: 2, nom: 'Gl', semaine: '', plannings: [[], [], [], []], effectif: 29 },
    { id: 3, nom: 'Marketing', semaine: '', plannings: [[], [], [], []], effectif: 50 },
    { id: 4, nom: 'Hackeuse', semaine: '', plannings: [[], [], [], []], effectif: 10 },
];

const salles = [
    { id: 1, nom: '101', semaine: '', plannings: [[], [], [], [], []], effectif: 30 },//profs modules heur dure jour
    { id: 2, nom: '102', semaine: '', plannings: [[], [], [], [], []], effectif: 29 },
    { id: 3, nom: '103', semaine: '', plannings: [[], [], [], [], []], effectif: 50 },
    { id: 4, nom: '104', semaine: '', plannings: [[], [], [], [], []], effectif: 10 },
];

const heures = [
    { id: 1, nom: '8', plannings: [[], [], [], [], []] },
    { id: 2, nom: '9', plannings: [[], [], [], [], []] },
    { id: 3, nom: '10', plannings: [[], [], [], [], []] },
    { id: 4, nom: '11', plannings: [[], [], [], [], []] },
    { id: 5, nom: '12', plannings: [[], [], [], [], []] },
    { id: 6, nom: '13', plannings: [[], [], [], [], []] },
    { id: 7, nom: '14', plannings: [[], [], [], [], []] },
    { id: 8, nom: '15', plannings: [[], [], [], [], []] },
    { id: 9, nom: '16', plannings: [[], [], [], [], []] },
    { id: 10, nom: '17', plannings: [[], [], [], [], []] }
];

const dur = [
    { id: 1, nom: '2' },
    { id: 2, nom: '3' },
    { id: 3, nom: '4' }
];
let SEL2
let SEL1
let SEL3
let nomM = 0
let nomP = 0
let nomS = 0
let nomC = 0
let nomH = 0
let nomD = 0
let heure_finale
let reconnaitre
let verification = []
let ajout_lundi = []
let recupId
let recupIdProf
let cal

let object = {

    module: "",
    prof: "",
    salles: "",
    heures: "",
    duree: "",
    jour: ""
}
let ind
function recherchIndice(sel,data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].nom==sel) {
            ind=i
        }
    }
}
const PLUS = document.querySelectorAll('.PLUS')
for (let index = 0; index < PLUS.length; index++) {
    PLUS[index].addEventListener('click', () => {
        cal = index + 1
        object.jour = cal
        reconnaitre = `.jour${cal}2`
        // console.log(reconnaitre);
        document.querySelector('.ajout').style.display = 'flex';
        let SEL = document.querySelectorAll('.SEL');
        chargerSelect(modules, SEL[0], 'selectionner un module');
        chargerSelect(salles, SEL[2], 'selectionner une salle');
        chargerSelect(heures, SEL[3], 'En heure');
        chargerSelect(dur, SEL[4], 'En durée');
        SEL[0].addEventListener('change', () => {
            nomM = (SEL[0].value);
            object.module = nomM
            for (let i = 0; i < modules.length; i++) {
                if (modules[i].nom == nomM) {
                    recupId = modules[i].id
                }
            }
            let professeur = getProfsByIdModule(+recupId)
            chargerSelect(professeur, SEL[1], 'selectionner un prof');
        })
        SEL[1].addEventListener('change', () => {
            nomP = (SEL[1].value)
            object.prof = nomP
            SEL1 = rechercheId(profs, nomP)
            recherchIndice(nomP,profs)
        })
        SEL[2].addEventListener('change', () => {
            nomS = (SEL[2].value)
            object.salles = nomS
            SEL2 = rechercheId(salles, nomS)
        })
        SEL[3].addEventListener('change', () => {
            nomH = (SEL[3].value)
            object.heures = nomH
            SEL3 = rechercheId(heures, nomH)
        })
        SEL[4].addEventListener('change', () => {
            nomD = (SEL[4].value)
            object.duree = nomD
        })

    })
};

function getProfsByIdModule(idModule) {
    const professeurs = [];
    profs.forEach(prof => {
        if (prof.modules.includes(idModule)) {
            professeurs.push(prof);
        }
    });
    return professeurs;
}


document.querySelector('.annule').addEventListener('click', () => {
    document.querySelector('.ajout').style.display = 'none';
})

document.querySelector('.NB').addEventListener('click', () => {
    validation()
    printPlanning(nomH, nomD, nomP, nomM, nomS)
    console.log(heure_finale);
    document.querySelector('.ajout').style.display = 'none';

})
const boxes = document.querySelectorAll('.BOX');
const selection = document.querySelector('#SELECTION');

function chargerSelect(data, select, label = 'Selectionner') {
    select.innerHTML = '';
    const option = creatingElement('option');
    option.innerHTML = label;
    select.appendChild(option);
    data.forEach(d => {
        const option = creatingElement('option');
        option.innerHTML = d.nom;
        select.appendChild(option);
    });
}

function creatingElement(elName) {
    return document.createElement(elName);
}

boxes.forEach(box => {
    box.addEventListener('click', (e) => {
        // console.log(e.target)
        // const boxTitle = box.classList[0]; au cas ou ......
        const boxTitle = box.classList;

        if (boxTitle.contains('salles')) {
            chargerSelect(salles, selection, 'selectionner une salle');
        }

        if (boxTitle.contains('modules')) {
            chargerSelect(modules, selection, 'selectionner  un cours');
        }

        if (boxTitle.contains('enseignant')) {
            chargerSelect(profs, selection, 'selectionner  un prof');
        }

        if (boxTitle.contains('classes')) {
            chargerSelect(classes, selection, 'selectionner  une classe');
        }
    })
});


function printPlanning(debut, duree, prof, module, salle) {
    const lundi = document.querySelector(`${reconnaitre}`)
    const column = debut - 8;
    const div = creatingElement('div');
    div.innerHTML = `<div>${module}</div><h2>${prof}</h2><div>${salle}</div>`;
    div.style.flexDirection = "column";
    div.style.alignItems = 'center';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.backgroundColor = 'green';
    div.style.width = `${duree * 8}%`;
    div.style.position = 'absolute';
    div.style.height = '100%';
    div.style.marginLeft = `${column * 8}%`
    lundi.appendChild(div);
}


function rechercheId(data, v) {
    let recupID
    for (let i = 0; i < data.length; i++) {
        if (data[i].nom == v) {
            recupID = data[i].id
        }
    }
    return recupID
}

function push_tableau(cal) {
    profs[SEL1 - 1].plannings[cal - 1].push(object)
    modules[(+recupId) - 1].plannings[cal - 1].push(object)
    salles[(+SEL2) - 1].plannings[cal - 1].push(object)
    heures[(+SEL3) - 1].plannings[cal - 1].push(object)
}
function validation() {
    heure_finale = ((+nomH) + (+nomD))
    if (nomS === 0 || nomD === 0 || nomH === 0 || nomP === 0 || nomM === 0) {
        alert("selection tous les cases")
    }
    else {
        if (heure_finale > 17) {
            alert("impossible heur qui depasse la norme")
        }else{
            
        }
    }

}

// function validation_cour(nomP,nomS,nomM,nomH,nomD,cal,reconnaitre) {
//     if(profs[SEL1-1].plannings[cal-1].length==0){
//         alert("tableau prof nul")
//     }
// }

//     const currentClass = {
//         nom : 'DevWeb',
//         semaine : '13/03/2023 - 18/03/2023',
//         effectif: 29,
//         plannings : [
//             [
//                 {module : 2, prof:2, salle: 4, debut: 8, duree :4}
//             ] , 
//             [] , [] , [] , [
//                 {module : 6, prof:2, salle: 4, debut: 10, duree :2},
//                 {module : 6, prof:2, salle: 4, debut: 12, duree :2}
//             ] , [] ]
//     };


//     const prof= getDataById(2,classes);
//     console.log(prof== undefined ? 'doesn\'t exist':prof.nom)
//     // console.log(prof);


//     function getDataById (id,data)
//     {
//         // let p = undefined;
//         // profs.forEach(prof => {
//         //     if(prof.id == id)
//         //     {
//         //         p = prof;
//         //         return ;
//         //     }
//         // });
//         // return p;


//         // return profs.find((p)=>p.id == id) 
//         return data.find((p)=>p.id == id)
//     }

    // chargement des données