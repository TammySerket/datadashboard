window.onload = function () {
    requiereCohorts();
};
// llamamos los cohorts
async function requiereCohorts() {
    let cohorts = '';
    try {
        const jsonCohorts = await fetch('../data/cohorts.json');
        cohorts = await jsonCohorts.json();
    } catch (err) {
        alert('no se pudieron cargar los datos' + err);
    }
    inputChange(cohorts);
}

inputChange = (cohorts) => {
    const cohortList = document.getElementById('cursos');
    const cohortsId = cohorts.filter(element => {
        return element.id === "lim-2018-03-pre-core-pw";
    })
    const curso = cohortsId[0].id;
    const option = document.createElement('option');
    option.innerText = curso;
    cohortList.appendChild(option)
    
// Escuchar eventos del dom y llamar la funcion cada vez que se cambie el filtro
document.getElementById('cursos').addEventListener('change', async function () {
    const e = document.getElementById("cursos");
    const selection = e.options[e.selectedIndex].text;
    const jsonUsers = await fetch('../data/cohorts/' + selection + '/users.json');
    const jsonProgress = await fetch('../data/cohorts/' + selection + '/progress.json');
    alumnas = await jsonUsers.json();
    progreso = await jsonProgress.json();
    /*console.log(progreso[userId]);*/
    poblarTabla(computeUsersStats(alumnas, progreso, cohorts));
});

}

async function poblarTabla(users) {
    document.getElementById('students').innerText = '';

    // Variables de estadisticas de cohort en general
    let completitudTotalSum = 0, percentLecturasSum = 0,
        percentQuizzSum = 0, percentExercisesSum = 0; completitudTotalUser = 0;

    for (let i = 0; i < users.length; i++) {
        const userList = document.getElementById('students');
        const newStudent = document.createElement('div');
        newStudent.classList.add('col-md-12');

        // para que sea una linea gris y una blanca
        if (i % 2 === 0) {
            newStudent.classList.add('estudiante1');
        } else {
            newStudent.classList.add('estudiante2');
        }
        completitudTotalUser = Math.round((users[i].stats.exercises.percent + users[i].stats.reads.percent + users[i].stats.quizzes.percent) / 3);
        userList.appendChild(newStudent);
        createElement(newStudent, 'h6', users[i].name, 'col-md-2');
        createElement(newStudent, 'h6', completitudTotalUser + ' % ', 'col-md-2');
        createElement(newStudent, 'h6', users[i].stats.exercises.percent + ' % ', 'col-md-2');
        createElement(newStudent, 'h6', users[i].stats.quizzes.scoreAvg, 'col-md-2');
        createElement(newStudent, 'h6', users[i].stats.quizzes.percent + ' % ', 'col-md-2');
        createElement(newStudent, 'h6', users[i].stats.reads.percent + ' % ', 'col-md-2');
    }
    function createElement(parent, element, text, clase) {
        const newElement = document.createElement(element);
        if (text === users.name) {
            newElement.classList.add('col-12');
        }
        newElement.innerText = text;
        newElement.classList.add(clase);
        newElement.classList.add('center');
        newElement.classList.add('col-2');
        parent.appendChild(newElement);
    }
    completitudTotalSum += completitudTotalUser;
    percentLecturasSum += users[i].stats.reads.percent;
    percentQuizzSum += users[i].stats.quizzes.percent;
    percentExercisesSum += users[i].stats.exercises.percent;
   
    filtrarAlumnas(users);
}

function mostrar(id) {
    if (id == "bg") {
        document.getElementById("bg").style.display = "block";
        document.getElementById("bg2").style.display = "none";
    } else if (id == "bg2") {
        document.getElementById("bg").style.display = "none";
        document.getElementById("bg2").style.display = "block";
    };
}

//Funcion para filtrar alumnas y su información correspondiente
filtrarAlumnas = (users) => {
    const btnBuscar = document.getElementById("buscar");  
    const listaAlumnas = users.filter(element => {
        return element.id === document.getElementById('filtroAlumnas').value;
    });
    const nombres = listaAlumnas[0].name;
    const buscar = nombres.includes(btnBuscar.addEventListener("click"));
     console.log(buscar);
    /*btnBuscar.addEventListener("click", () => {
        (element => {
            return element.name === document.getElementById("filtroAlumnas").value;
        });
             console.log(listaAlumnas);      
    })
    
    const buscarAlumna = listaAlumnas.search();
    console.log(buscarAlumna);
    const alumnas = document.getElementById('filtroAlumnas');
    const listaAlumnas = users.filter(element => {
        return element.id === document.getElementById('filtroAlumnas').value;
    })
    const alumna = listaAlumnas[0].id;
    const option = document.createElement('option');
    option.innerText = alumna;
    alumnas.appendChild(option)
  }*/
} 