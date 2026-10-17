let currentQuestion = 0;
let userAnswers = [];
let score = 0;

let student = {
    name: "",
    class: "",
    school: "",
    taluka: ""
};


// Start Quiz

function startQuiz() {

    student.name = document.getElementById("studentName").value;
    student.class = document.getElementById("studentClass").value;
    student.school = document.getElementById("schoolName").value;
    student.taluka = document.getElementById("taluka").value;


    if (
        student.name === "" ||
        student.class === "" ||
        student.school === "" ||
        student.taluka === ""
    ) {

        alert("Please fill all student details.");
        return;

    }


    localStorage.setItem(
        "studentDetails",
        JSON.stringify(student)
    );


    window.location.href = "quiz.html";

}


// Load Question

function loadQuestion() {


    let q = questions[currentQuestion];


    document.getElementById("questionNumber").innerHTML =
    "Question " + (currentQuestion + 1) + " / " + questions.length;


    document.getElementById("questionText").innerHTML =
    q.question;


    let optionsHTML = "";


    q.options.forEach((option,index)=>{


        let checked = "";

        if(userAnswers[currentQuestion] === index){
            checked = "checked";
        }


        optionsHTML += `

        <label class="option">

        <input type="radio"
        name="answer"
        value="${index}"
        ${checked}
        onclick="saveAnswer(${index})">

        ${option}

        </label>

        `;


    });


    document.getElementById("options").innerHTML = optionsHTML;


}



// Save Answer

function saveAnswer(answer){

    userAnswers[currentQuestion] = answer;

}



// Next Question

function nextQuestion(){


    if(currentQuestion < questions.length - 1){

        currentQuestion++;

        loadQuestion();

    }

}



// Previous Question

function previousQuestion(){


    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

}



// Submit Quiz

function submitQuiz(){


    score = 0;


    questions.forEach((q,index)=>{


        if(userAnswers[index] === q.answer){

            score++;

        }


    });


    localStorage.setItem(
        "quizScore",
        score
    );


    window.location.href="result.html";


}
