async function askAI(prompt){

const documentText =
document.getElementById("document").value;

const output =
document.getElementById("output");

if(!documentText){
output.innerHTML =
"Please paste a document first.";
return;
}

output.innerHTML =
"🤖 Processing...";

try{

const response = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{
method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${API_KEY}`
},

body:JSON.stringify({

model:"llama-3.3-70b-versatile",

messages:[
{
role:"system",
content:"You are a Legal and Tax Research Assistant."
},
{
role:"user",
content:`
Document:

${documentText}

Task:

${prompt}
`
}
]

})
}
);

const data =
await response.json();

output.innerHTML =
data.choices[0].message.content;

}
catch(error){

output.innerHTML =
error.message;

}

}

function summarizeDoc(){

askAI(`
Summarize this document in simple language.
`);
}

function generateChecklist(){

askAI(`
Generate a compliance checklist from this document.
`);
}

function findRisks(){

askAI(`
Identify risks, assumptions and missing information.
`);
}